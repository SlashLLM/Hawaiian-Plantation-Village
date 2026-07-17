import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const PLACEHOLDER_MARKERS = ['your-project', 'your-anon-key', 'example.com'];

function hasPlaceholderEnv(value) {
  if (!value) return true;
  const lower = value.toLowerCase();
  return PLACEHOLDER_MARKERS.some((marker) => lower.includes(marker));
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !hasPlaceholderEnv(supabaseUrl) &&
  !hasPlaceholderEnv(supabaseAnonKey)
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function getFunctionsUrl() {
  if (!supabaseUrl) return null;
  return `${supabaseUrl}/functions/v1`;
}
