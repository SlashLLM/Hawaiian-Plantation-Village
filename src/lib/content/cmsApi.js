import { supabase, isSupabaseConfigured } from '../supabase.js';

const CMS_BUCKET = 'cms-media';

export async function fetchSiteSettings() {
  if (!supabase) return null;
  const { data, error } = await supabase.from('site_settings').select('payload').eq('id', 'default').maybeSingle();
  if (error) throw error;
  return data?.payload ?? null;
}

export async function fetchPageSections(pageKey, { preview = false } = {}) {
  if (!supabase) return [];
  let query = supabase.from('page_sections').select('*').order('sort_order');
  if (pageKey) query = query.eq('page_key', pageKey);
  if (!preview) query = query.eq('status', 'published');
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchAllPageSections({ preview = false } = {}) {
  return fetchPageSections(null, { preview });
}

export async function fetchPublishedContent(type, { pageKey } = {}) {
  if (!supabase) return [];
  let query = supabase
    .from('content_entries')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('published_at', { ascending: false });
  if (type) query = query.eq('content_type', type);
  if (pageKey) query = query.eq('page_key', pageKey);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function fetchContentBySlug(slug) {
  if (!supabase) return null;
  const { data, error } = await supabase.from('content_entries').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchGroupTicketTypes() {
  if (!supabase) return [];
  const { data, error } = await supabase.from('group_ticket_types').select('*').eq('is_active', true).order('sort_order');
  if (error) throw error;
  return data ?? [];
}

export async function fetchTourTimeSlots(eventSlug = 'guided-tour') {
  if (!supabase) return [];
  const { data: event } = await supabase.from('events').select('id').eq('slug', eventSlug).maybeSingle();
  if (!event) return [];
  const { data, error } = await supabase
    .from('tour_time_slots')
    .select('*')
    .eq('event_id', event.id)
    .eq('is_active', true)
    .order('sort_order');
  if (error) throw error;
  return data ?? [];
}

export async function fetchCurriculumModules() {
  if (!supabase) return [];
  const { data: modules, error } = await supabase
    .from('curriculum_modules')
    .select('*, curriculum_checkpoints(*)')
    .eq('is_active', true)
    .order('sort_order');
  if (error) throw error;
  return (modules ?? []).map((m) => ({
    ...m,
    curriculum_checkpoints: (m.curriculum_checkpoints ?? []).sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export async function fetchCurriculumModule(slug) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('curriculum_modules')
    .select('*, curriculum_checkpoints(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    ...data,
    curriculum_checkpoints: (data.curriculum_checkpoints ?? []).sort((a, b) => a.sort_order - b.sort_order),
  };
}

const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const AUDIO_MAX_BYTES = 25 * 1024 * 1024;
const VIDEO_MAX_BYTES = 100 * 1024 * 1024;

/**
 * Upload a file to cms-media and record it in media_assets.
 * @param {File} file
 * @param {string} altText
 * @param {{ acceptPrefix?: string, maxBytes?: number, kindLabel?: string }} [options]
 */
export async function uploadCmsMedia(file, altText = '', options = {}) {
  if (!supabase || !isSupabaseConfigured) throw new Error('Supabase not configured');
  const acceptPrefix = options.acceptPrefix ?? 'image/';
  const maxBytes = options.maxBytes ?? IMAGE_MAX_BYTES;
  const kindLabel = options.kindLabel ?? 'file';

  if (!file?.type?.startsWith(acceptPrefix)) {
    throw new Error(`Only ${kindLabel} files are allowed`);
  }
  if (file.size > maxBytes) {
    const mb = Math.round(maxBytes / (1024 * 1024));
    throw new Error(`${kindLabel.charAt(0).toUpperCase() + kindLabel.slice(1)} must be under ${mb}MB`);
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(CMS_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(CMS_BUCKET).getPublicUrl(path);
  const publicUrl = urlData.publicUrl;

  const { data: { user } } = await supabase.auth.getUser();
  const { data: asset, error: assetError } = await supabase
    .from('media_assets')
    .insert({
      storage_path: path,
      public_url: publicUrl,
      alt_text: altText,
      mime_type: file.type,
      file_size: file.size,
      uploaded_by: user?.id ?? null,
    })
    .select('*')
    .single();
  if (assetError) throw assetError;
  return asset;
}

export async function uploadCmsImage(file, altText = '') {
  return uploadCmsMedia(file, altText, {
    acceptPrefix: 'image/',
    maxBytes: IMAGE_MAX_BYTES,
    kindLabel: 'image',
  });
}

export async function uploadCmsAudio(file, label = '') {
  return uploadCmsMedia(file, label, {
    acceptPrefix: 'audio/',
    maxBytes: AUDIO_MAX_BYTES,
    kindLabel: 'audio',
  });
}

export async function uploadCmsVideo(file, label = '') {
  return uploadCmsMedia(file, label, {
    acceptPrefix: 'video/',
    maxBytes: VIDEO_MAX_BYTES,
    kindLabel: 'video',
  });
}

export function getPublicMediaUrl(path) {
  if (!supabase || !path) return path;
  if (path.startsWith('http')) return path;
  const { data } = supabase.storage.from(CMS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
