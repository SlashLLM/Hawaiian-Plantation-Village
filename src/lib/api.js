import { supabase, getFunctionsUrl, isSupabaseConfigured } from './supabase.js';

function createIdempotencyKey() {
  return crypto.randomUUID();
}

async function invokeFunction(name, body, { auth = false, idempotencyKey } = {}) {
  const baseUrl = getFunctionsUrl();
  if (!baseUrl || !isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
  }

  const headers = {
    'Content-Type': 'application/json',
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  };

  if (idempotencyKey) {
    headers['x-idempotency-key'] = idempotencyKey;
  }

  if (auth) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('You must be signed in to perform this action.');
    }
    headers.Authorization = `Bearer ${session.access_token}`;
  }

  const res = await fetch(`${baseUrl}/${name}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const payload = await res.json();
  if (!res.ok) {
    throw new Error(payload.error ?? `Request failed (${res.status})`);
  }
  return payload;
}

export async function createBooking(bookingData) {
  const idempotencyKey = createIdempotencyKey();
  return invokeFunction('create-booking', bookingData, { idempotencyKey });
}

export async function createMembership(membershipData) {
  const idempotencyKey = createIdempotencyKey();
  return invokeFunction('create-membership', membershipData, { idempotencyKey });
}

export async function verifyCredential(payload) {
  return invokeFunction('verify-credential', payload, { auth: true });
}

export async function resendConfirmation(payload) {
  return invokeFunction('resend-confirmation', payload, { auth: true });
}

export async function fetchEventsWithTickets() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('events')
    .select('id, slug, title, description, event_date, start_time, end_time, is_special, ticket_types(id, slug, label, price_cents, requires_id, sort_order), tour_time_slots(id, label, sort_order)')
    .eq('is_active', true)
    .order('is_special', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((e) => ({
    ...e,
    ticket_types: (e.ticket_types ?? []).sort((a, b) => a.sort_order - b.sort_order),
    tour_time_slots: (e.tour_time_slots ?? []).sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export async function fetchMembershipTiers() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('membership_tiers')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');
  if (error) throw error;
  return data ?? [];
}

export { fetchPublishedContent } from './content/cmsApi.js';
export {
  fetchSiteSettings,
  fetchPageSections,
  fetchAllPageSections,
  fetchGroupTicketTypes,
  fetchTourTimeSlots,
  fetchCurriculumModules,
  fetchCurriculumModule,
  uploadCmsImage,
  uploadCmsAudio,
  uploadCmsVideo,
  uploadCmsMedia,
  getPublicMediaUrl,
} from './content/cmsApi.js';

export function formatCents(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
