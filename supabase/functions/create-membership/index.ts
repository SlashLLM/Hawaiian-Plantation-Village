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

type MembershipInput = {
  tierSlug: string;
  firstName: string;
  lastName: string;
  email: string;
  householdNote?: string;
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
    const body = (await req.json()) as MembershipInput;
    const supabase = getServiceClient();

    if (idempotencyKey) {
      const { data: existing } = await supabase
        .from('memberships')
        .select('*, membership_tiers(level, slug)')
        .eq('idempotency_key', idempotencyKey)
        .maybeSingle();
      if (existing) {
        return jsonResponse({ membership: existing, duplicate: true });
      }
    }

    const { data: tier, error: tierErr } = await supabase
      .from('membership_tiers')
      .select('id, slug, level, price_cents')
      .eq('slug', body.tierSlug)
      .eq('is_active', true)
      .single();

    if (tierErr || !tier) {
      return jsonResponse({ error: 'Invalid or inactive membership tier' }, 400);
    }

    const startsOn = new Date().toISOString().slice(0, 10);
    const endsOn = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .slice(0, 10);
    const referenceId = generateReference('HPV-MEM');
    const qrToken = generateToken();
    const tokenHash = await hashToken(qrToken);

    const { data: membership, error: memErr } = await supabase
      .from('memberships')
      .insert({
        reference_id: referenceId,
        tier_id: tier.id,
        member_first_name: body.firstName.trim(),
        member_last_name: body.lastName.trim(),
        member_email: body.email.trim().toLowerCase(),
        household_note: body.householdNote?.trim() ?? null,
        price_cents: tier.price_cents,
        starts_on: startsOn,
        ends_on: endsOn,
        idempotency_key: idempotencyKey ?? null,
        payment_status: 'pending',
        status: 'active',
      })
      .select('*, membership_tiers(level)')
      .single();

    if (memErr || !membership) {
      return jsonResponse({ error: memErr?.message ?? 'Failed to create membership' }, 500);
    }

    await supabase.from('credential_tokens').insert({
      token_hash: tokenHash,
      credential_type: 'membership',
      membership_id: membership.id,
    });

    const qrDataUrl = await qrToDataUrl(qrToken);
    const emailResult = await sendPassEmail({
      referenceId,
      recipientName: `${body.firstName} ${body.lastName}`,
      recipientEmail: body.email,
      title: 'Steward Membership Pass',
      subtitle: `${tier.level} Level`,
      lines: [
        { label: 'Valid from', value: startsOn },
        { label: 'Valid until', value: endsOn },
        { label: 'Annual dues', value: formatCents(tier.price_cents) },
      ],
      qrDataUrl,
      paymentNote: 'Payment status: Pending. Your membership is registered and will be activated when payment is received.',
    });

    await supabase.from('email_deliveries').insert({
      recipient_email: body.email,
      subject: `Steward Membership Pass — ${referenceId}`,
      template_key: 'membership_confirmation',
      membership_id: membership.id,
      status: emailResult.ok ? 'sent' : 'failed',
      resend_message_id: emailResult.ok ? emailResult.messageId : null,
      error_message: emailResult.ok ? null : emailResult.error,
    });

    return jsonResponse({
      membership: {
        id: membership.id,
        referenceId,
        tier: tier.level,
        tierSlug: tier.slug,
        startsOn,
        endsOn,
        priceCents: tier.price_cents,
        paymentStatus: 'pending',
        status: 'active',
        qrToken,
      },
      emailSent: emailResult.ok,
      emailError: emailResult.ok ? null : emailResult.error,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return jsonResponse({ error: message }, 500);
  }
});
