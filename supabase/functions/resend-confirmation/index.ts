import {
  corsHeaders,
  formatCents,
  getServiceClient,
  hashToken,
  jsonResponse,
  requireStaff,
} from '../_shared/supabase.ts';
import { sendPassEmail } from '../_shared/email.ts';
import { qrToDataUrl } from '../_shared/qr.ts';

type ResendInput = {
  bookingId?: string;
  membershipId?: string;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() });
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const authHeader = req.headers.get('Authorization');
    await requireStaff(authHeader);
    const body = (await req.json()) as ResendInput;
    const service = getServiceClient();

    if (body.bookingId) {
      const { data: booking } = await service
        .from('bookings')
        .select('*, events(title), booking_items(quantity, ticket_types(label))')
        .eq('id', body.bookingId)
        .single();
      if (!booking) return jsonResponse({ error: 'Booking not found' }, 404);

      const { data: cred } = await service
        .from('credential_tokens')
        .select('id')
        .eq('booking_id', booking.id)
        .single();

      // Regenerate token for resend (revoke old, create new)
      const newToken = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
      const tokenHash = await hashToken(newToken);
      if (cred) {
        await service.from('credential_tokens').update({ is_revoked: true }).eq('id', cred.id);
      }
      await service.from('credential_tokens').insert({
        token_hash: tokenHash,
        credential_type: 'booking',
        booking_id: booking.id,
      });

      const itemSummary = (booking.booking_items ?? [])
        .map((bi: { quantity: number; ticket_types: { label: string } }) =>
          `${bi.ticket_types?.label} x${bi.quantity}`)
        .join(', ');

      const qrDataUrl = await qrToDataUrl(newToken);
      const emailResult = await sendPassEmail({
        referenceId: booking.reference_id,
        recipientName: `${booking.purchaser_first_name} ${booking.purchaser_last_name}`,
        recipientEmail: booking.purchaser_email,
        title: 'Excursion E-Ticket (Resent)',
        subtitle: booking.events?.title ?? 'Excursion',
        lines: [
          { label: 'Visit date', value: booking.visit_date },
          { label: 'Tour time', value: booking.visit_time },
          { label: 'Tickets', value: itemSummary },
          { label: 'Amount due', value: formatCents(booking.total_cents) },
        ],
        qrDataUrl,
        paymentNote: `Payment status: ${booking.payment_status}.`,
      });

      await service.from('email_deliveries').insert({
        recipient_email: booking.purchaser_email,
        subject: `Excursion E-Ticket — ${booking.reference_id}`,
        template_key: 'booking_confirmation_resend',
        booking_id: booking.id,
        status: emailResult.ok ? 'sent' : 'failed',
        resend_message_id: emailResult.ok ? emailResult.messageId : null,
        error_message: emailResult.ok ? null : emailResult.error,
      });

      return jsonResponse({ ok: emailResult.ok, error: emailResult.ok ? null : emailResult.error });
    }

    if (body.membershipId) {
      const { data: membership } = await service
        .from('memberships')
        .select('*, membership_tiers(level)')
        .eq('id', body.membershipId)
        .single();
      if (!membership) return jsonResponse({ error: 'Membership not found' }, 404);

      const { data: cred } = await service
        .from('credential_tokens')
        .select('id')
        .eq('membership_id', membership.id)
        .single();

      const newToken = crypto.randomUUID().replace(/-/g, '') + crypto.randomUUID().replace(/-/g, '');
      const tokenHash = await hashToken(newToken);
      if (cred) {
        await service.from('credential_tokens').update({ is_revoked: true }).eq('id', cred.id);
      }
      await service.from('credential_tokens').insert({
        token_hash: tokenHash,
        credential_type: 'membership',
        membership_id: membership.id,
      });

      const qrDataUrl = await qrToDataUrl(newToken);
      const emailResult = await sendPassEmail({
        referenceId: membership.reference_id,
        recipientName: `${membership.member_first_name} ${membership.member_last_name}`,
        recipientEmail: membership.member_email,
        title: 'Steward Membership Pass (Resent)',
        subtitle: membership.membership_tiers?.level ?? 'Membership',
        lines: [
          { label: 'Valid from', value: membership.starts_on },
          { label: 'Valid until', value: membership.ends_on },
          { label: 'Annual dues', value: formatCents(membership.price_cents) },
        ],
        qrDataUrl,
        paymentNote: `Payment status: ${membership.payment_status}.`,
      });

      await service.from('email_deliveries').insert({
        recipient_email: membership.member_email,
        subject: `Steward Membership Pass — ${membership.reference_id}`,
        template_key: 'membership_confirmation_resend',
        membership_id: membership.id,
        status: emailResult.ok ? 'sent' : 'failed',
        resend_message_id: emailResult.ok ? emailResult.messageId : null,
        error_message: emailResult.ok ? null : emailResult.error,
      });

      return jsonResponse({ ok: emailResult.ok, error: emailResult.ok ? null : emailResult.error });
    }

    return jsonResponse({ error: 'Provide bookingId or membershipId' }, 400);
  } catch (err) {
    if (err instanceof Response) return err;
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return jsonResponse({ error: message }, 500);
  }
});
