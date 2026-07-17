import {
  corsHeaders,
  hashToken,
  jsonResponse,
  requireStaff,
} from '../_shared/supabase.ts';

type VerifyInput = {
  token?: string;
  referenceId?: string;
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
    const { profile, service } = await requireStaff(authHeader);
    const body = (await req.json()) as VerifyInput;

    if (!body.token && !body.referenceId) {
      return jsonResponse({ error: 'Provide token or referenceId' }, 400);
    }

    let credential = null;

    if (body.token) {
      const tokenHash = await hashToken(body.token.trim());
      const { data } = await service
        .from('credential_tokens')
        .select('*, bookings(*, events(title)), memberships(*, membership_tiers(level))')
        .eq('token_hash', tokenHash)
        .maybeSingle();
      credential = data;
    } else if (body.referenceId) {
      const ref = body.referenceId.trim().toUpperCase();
      if (ref.startsWith('HPV-TKT')) {
        const { data: booking } = await service
          .from('bookings')
          .select('*, events(title)')
          .eq('reference_id', ref)
          .maybeSingle();
        if (booking) {
          const { data: cred } = await service
            .from('credential_tokens')
            .select('*')
            .eq('booking_id', booking.id)
            .maybeSingle();
          credential = cred ? { ...cred, bookings: booking } : null;
        }
      } else if (ref.startsWith('HPV-MEM')) {
        const { data: membership } = await service
          .from('memberships')
          .select('*, membership_tiers(level)')
          .eq('reference_id', ref)
          .maybeSingle();
        if (membership) {
          const { data: cred } = await service
            .from('credential_tokens')
            .select('*')
            .eq('membership_id', membership.id)
            .maybeSingle();
          credential = cred ? { ...cred, memberships: membership } : null;
        }
      }
    }

    if (!credential) {
      await service.from('scan_logs').insert({
        scanned_by: profile.id,
        scan_result: 'unknown',
        reference_id: body.referenceId ?? null,
        metadata: { tokenProvided: !!body.token },
      });
      return jsonResponse({
        result: 'unknown',
        message: 'Credential not found',
      });
    }

    if (credential.is_revoked) {
      await service.from('scan_logs').insert({
        credential_token_id: credential.id,
        scanned_by: profile.id,
        scan_result: 'revoked',
        reference_id: body.referenceId ?? null,
        credential_type: credential.credential_type,
      });
      return jsonResponse({ result: 'revoked', message: 'This pass has been revoked' });
    }

    if (credential.credential_type === 'booking' && credential.bookings) {
      const booking = credential.bookings;
      if (booking.status === 'cancelled') {
        await service.from('scan_logs').insert({
          credential_token_id: credential.id,
          scanned_by: profile.id,
          scan_result: 'revoked',
          reference_id: booking.reference_id,
          credential_type: 'booking',
        });
        return jsonResponse({ result: 'revoked', message: 'Booking was cancelled' });
      }
      if (booking.status === 'checked_in') {
        await service.from('scan_logs').insert({
          credential_token_id: credential.id,
          scanned_by: profile.id,
          scan_result: 'already_checked_in',
          reference_id: booking.reference_id,
          credential_type: 'booking',
          metadata: { checkedInAt: booking.checked_in_at },
        });
        return jsonResponse({
          result: 'already_checked_in',
          message: 'Party already checked in',
          details: {
            referenceId: booking.reference_id,
            name: `${booking.purchaser_first_name} ${booking.purchaser_last_name}`,
            event: booking.events?.title,
            visitDate: booking.visit_date,
            visitTime: booking.visit_time,
            checkedInAt: booking.checked_in_at,
          },
        });
      }

      const { data: updated, error: updateErr } = await service
        .from('bookings')
        .update({
          status: 'checked_in',
          checked_in_at: new Date().toISOString(),
          checked_in_by: profile.id,
        })
        .eq('id', booking.id)
        .eq('status', 'registered')
        .select('*, events(title)')
        .maybeSingle();

      if (updateErr || !updated) {
        const { data: current } = await service
          .from('bookings')
          .select('status, checked_in_at, reference_id, purchaser_first_name, purchaser_last_name, visit_date, visit_time, events(title)')
          .eq('id', booking.id)
          .single();
        if (current?.status === 'checked_in') {
          return jsonResponse({
            result: 'already_checked_in',
            message: 'Party already checked in',
            details: {
              referenceId: current.reference_id,
              name: `${current.purchaser_first_name} ${current.purchaser_last_name}`,
              event: current.events?.title,
              visitDate: current.visit_date,
              visitTime: current.visit_time,
              checkedInAt: current.checked_in_at,
            },
          });
        }
        return jsonResponse({ error: 'Check-in failed' }, 500);
      }

      await service.from('scan_logs').insert({
        credential_token_id: credential.id,
        scanned_by: profile.id,
        scan_result: 'valid_checked_in',
        reference_id: updated.reference_id,
        credential_type: 'booking',
      });

      return jsonResponse({
        result: 'valid_checked_in',
        message: 'Ticket verified and checked in',
        details: {
          referenceId: updated.reference_id,
          name: `${updated.purchaser_first_name} ${updated.purchaser_last_name}`,
          event: updated.events?.title,
          visitDate: updated.visit_date,
          visitTime: updated.visit_time,
          paymentStatus: updated.payment_status,
        },
      });
    }

    if (credential.credential_type === 'membership' && credential.memberships) {
      const membership = credential.memberships;
      const today = new Date().toISOString().slice(0, 10);

      if (membership.status === 'revoked') {
        await service.from('scan_logs').insert({
          credential_token_id: credential.id,
          scanned_by: profile.id,
          scan_result: 'revoked',
          reference_id: membership.reference_id,
          credential_type: 'membership',
        });
        return jsonResponse({ result: 'revoked', message: 'Membership revoked' });
      }

      if (membership.ends_on < today || membership.status === 'expired') {
        await service.from('scan_logs').insert({
          credential_token_id: credential.id,
          scanned_by: profile.id,
          scan_result: 'expired',
          reference_id: membership.reference_id,
          credential_type: 'membership',
        });
        return jsonResponse({
          result: 'expired',
          message: 'Membership has expired',
          details: {
            referenceId: membership.reference_id,
            name: `${membership.member_first_name} ${membership.member_last_name}`,
            tier: membership.membership_tiers?.level,
            endsOn: membership.ends_on,
          },
        });
      }

      await service.from('scan_logs').insert({
        credential_token_id: credential.id,
        scanned_by: profile.id,
        scan_result: 'active_member',
        reference_id: membership.reference_id,
        credential_type: 'membership',
      });

      return jsonResponse({
        result: 'active_member',
        message: 'Active membership verified',
        details: {
          referenceId: membership.reference_id,
          name: `${membership.member_first_name} ${membership.member_last_name}`,
          tier: membership.membership_tiers?.level,
          startsOn: membership.starts_on,
          endsOn: membership.ends_on,
          paymentStatus: membership.payment_status,
        },
      });
    }

    return jsonResponse({ result: 'unknown', message: 'Unable to verify credential' });
  } catch (err) {
    if (err instanceof Response) return err;
    const message = err instanceof Error ? err.message : 'Unexpected error';
    return jsonResponse({ error: message }, 500);
  }
});
