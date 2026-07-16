import {
  corsHeaders,
  formatCents,
  generateReference,
  generateToken,
  getServiceClient,
  hashToken,
  jsonResponse,
} from '../_shared/supabase.ts';
import { sendPassEmail } from '../_shared/email.ts';
import { qrToDataUrl } from '../_shared/qr.ts';

type ItemInput = { ticketTypeId: string; quantity: number };

type BookingInput = {
  eventSlug: string;
  visitDate: string;
  visitTime: string;
  firstName: string;
  lastName: string;
  email: string;
  items: ItemInput[];
  donationCents?: number;
  includeMembership?: boolean;
  membershipTierSlug?: string;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() });
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const idempotencyKey = req.headers.get('x-idempotency-key') ?? undefined;
    const body = (await req.json()) as BookingInput;
    const supabase = getServiceClient();

    if (idempotencyKey) {
      const { data: existing } = await supabase
        .from('bookings')
        .select('*, booking_items(*), events(title)')
        .eq('idempotency_key', idempotencyKey)
        .maybeSingle();
      if (existing) {
        return jsonResponse({
          booking: sanitizeBooking(existing),
          duplicate: true,
          emailSent: true,
        });
      }
    }

    const { data: event, error: eventErr } = await supabase
      .from('events')
      .select('id, slug, title, is_active')
      .eq('slug', body.eventSlug)
      .eq('is_active', true)
      .single();
    if (eventErr || !event) {
      return jsonResponse({ error: 'Invalid or inactive event' }, 400);
    }

    const { data: ticketTypes } = await supabase
      .from('ticket_types')
      .select('id, slug, label, price_cents, is_active')
      .eq('event_id', event.id)
      .eq('is_active', true);

    if (!ticketTypes?.length) {
      return jsonResponse({ error: 'No ticket types available' }, 400);
    }

    const typeMap = Object.fromEntries(ticketTypes.map((t) => [t.id, t]));
    let subtotalCents = 0;
    const lineItems: Array<{
      ticket_type_id: string;
      quantity: number;
      unit_price_cents: number;
      line_total_cents: number;
    }> = [];

    for (const item of body.items ?? []) {
      if (!item.quantity || item.quantity < 1) continue;
      const tt = typeMap[item.ticketTypeId];
      if (!tt) {
        return jsonResponse({ error: `Invalid ticket type: ${item.ticketTypeId}` }, 400);
      }
      const lineTotal = tt.price_cents * item.quantity;
      subtotalCents += lineTotal;
      lineItems.push({
        ticket_type_id: tt.id,
        quantity: item.quantity,
        unit_price_cents: tt.price_cents,
        line_total_cents: lineTotal,
      });
    }

    if (lineItems.length === 0) {
      return jsonResponse({ error: 'Select at least one ticket' }, 400);
    }

    let membershipCents = 0;
    let membershipTierId: string | null = null;
    if (body.includeMembership) {
      const tierSlug = body.membershipTierSlug ?? 'individual';
      const { data: tier } = await supabase
        .from('membership_tiers')
        .select('id, price_cents')
        .eq('slug', tierSlug)
        .eq('is_active', true)
        .single();
      if (!tier) {
        return jsonResponse({ error: 'Invalid membership tier' }, 400);
      }
      membershipCents = tier.price_cents;
      membershipTierId = tier.id;
    }

    const donationCents = Math.max(0, body.donationCents ?? 0);
    const totalCents = subtotalCents + donationCents + membershipCents;
    const referenceId = generateReference('HPV-TKT');
    const qrToken = generateToken();
    const tokenHash = await hashToken(qrToken);

    const { data: booking, error: bookingErr } = await supabase
      .from('bookings')
      .insert({
        reference_id: referenceId,
        event_id: event.id,
        visit_date: body.visitDate,
        visit_time: body.visitTime,
        purchaser_first_name: body.firstName.trim(),
        purchaser_last_name: body.lastName.trim(),
        purchaser_email: body.email.trim().toLowerCase(),
        subtotal_cents: subtotalCents,
        donation_cents: donationCents,
        membership_cents: membershipCents,
        total_cents: totalCents,
        includes_membership: !!body.includeMembership,
        membership_tier_id: membershipTierId,
        idempotency_key: idempotencyKey ?? null,
        payment_status: 'pending',
        status: 'registered',
      })
      .select('*')
      .single();

    if (bookingErr || !booking) {
      return jsonResponse({ error: bookingErr?.message ?? 'Failed to create booking' }, 500);
    }

    const { error: itemsErr } = await supabase.from('booking_items').insert(
      lineItems.map((li) => ({ ...li, booking_id: booking.id }))
    );
    if (itemsErr) {
      return jsonResponse({ error: itemsErr.message }, 500);
    }

    const { error: credErr } = await supabase.from('credential_tokens').insert({
      token_hash: tokenHash,
      credential_type: 'booking',
      booking_id: booking.id,
    });
    if (credErr) {
      return jsonResponse({ error: credErr.message }, 500);
    }

    let membershipRecord = null;
    if (body.includeMembership && membershipTierId) {
      const startsOn = new Date().toISOString().slice(0, 10);
      const endsOn = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .slice(0, 10);
      const memRef = generateReference('HPV-MEM');
      const memToken = generateToken();
      const memHash = await hashToken(memToken);

      const { data: membership } = await supabase
        .from('memberships')
        .insert({
          reference_id: memRef,
          tier_id: membershipTierId,
          member_first_name: body.firstName.trim(),
          member_last_name: body.lastName.trim(),
          member_email: body.email.trim().toLowerCase(),
          price_cents: membershipCents,
          starts_on: startsOn,
          ends_on: endsOn,
          payment_status: 'pending',
          status: 'active',
        })
        .select('*, membership_tiers(level)')
        .single();

      if (membership) {
        await supabase.from('credential_tokens').insert({
          token_hash: memHash,
          credential_type: 'membership',
          membership_id: membership.id,
        });
        membershipRecord = { ...membership, qrToken: memToken };
      }
    }

    const qrDataUrl = await qrToDataUrl(qrToken);
    const itemSummary = lineItems
      .map((li) => {
        const tt = typeMap[li.ticket_type_id];
        return `${tt.label} x${li.quantity}`;
      })
      .join(', ');

    const emailResult = await sendPassEmail({
      referenceId,
      recipientName: `${body.firstName} ${body.lastName}`,
      recipientEmail: body.email,
      title: 'Excursion E-Ticket',
      subtitle: event.title,
      lines: [
        { label: 'Visit date', value: body.visitDate },
        { label: 'Tour time', value: body.visitTime },
        { label: 'Tickets', value: itemSummary },
        { label: 'Amount due', value: formatCents(totalCents) },
      ],
      qrDataUrl,
      paymentNote: 'Payment status: Pending. Present this pass at check-in; payment can be completed on-site or when online payment is enabled.',
    });

    await supabase.from('email_deliveries').insert({
      recipient_email: body.email,
      subject: `Excursion E-Ticket — ${referenceId}`,
      template_key: 'booking_confirmation',
      booking_id: booking.id,
      status: emailResult.ok ? 'sent' : 'failed',
      resend_message_id: emailResult.ok ? emailResult.messageId : null,
      error_message: emailResult.ok ? null : emailResult.error,
    });

    if (membershipRecord) {
      const memQr = await qrToDataUrl(membershipRecord.qrToken);
      const memEmail = await sendPassEmail({
        referenceId: membershipRecord.reference_id,
        recipientName: `${body.firstName} ${body.lastName}`,
        recipientEmail: body.email,
        title: 'Steward Membership Pass',
        subtitle: membershipRecord.membership_tiers?.level ?? 'Membership',
        lines: [
          { label: 'Valid from', value: membershipRecord.starts_on },
          { label: 'Valid until', value: membershipRecord.ends_on },
          { label: 'Annual dues', value: formatCents(membershipRecord.price_cents) },
        ],
        qrDataUrl: memQr,
        paymentNote: 'Membership payment status: Pending.',
      });
      await supabase.from('email_deliveries').insert({
        recipient_email: body.email,
        subject: `Steward Membership Pass — ${membershipRecord.reference_id}`,
        template_key: 'membership_confirmation',
        membership_id: membershipRecord.id,
        status: memEmail.ok ? 'sent' : 'failed',
        resend_message_id: memEmail.ok ? memEmail.messageId : null,
        error_message: memEmail.ok ? null : memEmail.error,
      });
    }

    return jsonResponse({
      booking: {
        ...sanitizeBooking(booking),
        eventTitle: event.title,
        qrToken,
      },
      membership: membershipRecord
        ? {
            referenceId: membershipRecord.reference_id,
            tier: membershipRecord.membership_tiers?.level,
            qrToken: membershipRecord.qrToken,
          }
        : null,
      emailSent: emailResult.ok,
      emailError: emailResult.ok ? null : emailResult.error,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return jsonResponse({ error: message }, 500);
  }
});

function sanitizeBooking(booking: Record<string, unknown>) {
  const { idempotency_key: _ik, ...rest } = booking;
  return rest;
}
