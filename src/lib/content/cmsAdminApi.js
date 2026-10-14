import { supabase } from '../supabase.js';
import { clearCache } from './cache.js';

function assertNoError(error, fallback = 'Save failed') {
  if (error) throw new Error(error.message || fallback);
}

export function notifyCmsUpdated(scope = 'all') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('hpv:cms-updated', { detail: { scope } }));
  }
}

export function invalidateCmsCache(scope = 'all') {
  if (scope === 'all' || scope === 'sections') clearCache('home-events');
  if (scope === 'all' || scope === 'collections') clearCache('collection:');
  if (scope === 'all' || scope === 'curriculum') clearCache('curriculum');
  if (scope === 'all' || scope === 'customPages') clearCache('custom-pages');
}

export async function fetchAllContentEntries({ pageKey, contentType } = {}) {
  let query = supabase
    .from('content_entries')
    .select('*')
    .order('sort_order')
    .order('updated_at', { ascending: false });
  if (pageKey) query = query.eq('page_key', pageKey);
  if (contentType) query = query.eq('content_type', contentType);
  const { data, error } = await query;
  assertNoError(error, 'Failed to load entries');
  return data ?? [];
}

export async function saveContentEntry(record, editingId = null) {
  const payload = {
    ...record,
    published_at: record.status === 'published' ? new Date().toISOString() : null,
  };
  if (payload.content_type === 'camp_story' && !payload.page_key) {
    payload.page_key = 'stories';
  }
  const query = editingId
    ? supabase.from('content_entries').update(payload).eq('id', editingId)
    : supabase.from('content_entries').insert(payload);
  const { error } = await query;
  assertNoError(error, 'Failed to save entry');
  invalidateCmsCache('collections');
  notifyCmsUpdated('collections');
}

export async function setContentEntryStatus(id, status) {
  const { error } = await supabase.from('content_entries').update({
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }).eq('id', id);
  assertNoError(error, 'Failed to update entry status');
  invalidateCmsCache('collections');
  notifyCmsUpdated('collections');
}

export async function deleteContentEntry(id) {
  const { error } = await supabase.from('content_entries').delete().eq('id', id);
  assertNoError(error, 'Failed to delete entry');
  invalidateCmsCache('collections');
  notifyCmsUpdated('collections');
}

export async function fetchAllPageSections() {
  const { data, error } = await supabase
    .from('page_sections')
    .select('*')
    .order('page_key')
    .order('sort_order');
  assertNoError(error, 'Failed to load page sections');
  return data ?? [];
}

export async function savePageSection(record, editingId = null) {
  const payload = {
    ...record,
    published_at: record.status === 'published' ? new Date().toISOString() : null,
  };
  const query = editingId
    ? supabase.from('page_sections').update(payload).eq('id', editingId)
    : supabase.from('page_sections').insert(payload);
  const { error } = await query;
  assertNoError(error, 'Failed to save section');
  invalidateCmsCache('sections');
  notifyCmsUpdated('sections');
}

export async function setPageSectionStatus(id, status) {
  const { error } = await supabase.from('page_sections').update({
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }).eq('id', id);
  assertNoError(error, 'Failed to update section status');
  invalidateCmsCache('sections');
  notifyCmsUpdated('sections');
}

export async function fetchCustomPages() {
  const { data, error } = await supabase
    .from('custom_pages')
    .select('*')
    .order('updated_at', { ascending: false });
  assertNoError(error, 'Failed to load pages');
  return data ?? [];
}

export async function saveCustomPage(record, editingId = null) {
  const payload = {
    ...record,
    published_at: record.status === 'published' ? new Date().toISOString() : null,
  };
  const query = editingId
    ? supabase.from('custom_pages').update(payload).eq('id', editingId).select().maybeSingle()
    : supabase.from('custom_pages').insert(payload).select().maybeSingle();
  const { data, error } = await query;
  assertNoError(error, 'Failed to save page');
  invalidateCmsCache('customPages');
  notifyCmsUpdated('customPages');
  return data ?? null;
}

export async function setCustomPageStatus(id, status) {
  const { error } = await supabase.from('custom_pages').update({
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  }).eq('id', id);
  assertNoError(error, 'Failed to update page status');
  invalidateCmsCache('customPages');
  notifyCmsUpdated('customPages');
}

export async function deleteCustomPage(id) {
  const { error } = await supabase.from('custom_pages').delete().eq('id', id);
  assertNoError(error, 'Failed to delete page');
  invalidateCmsCache('customPages');
  notifyCmsUpdated('customPages');
}

export async function fetchCurriculumModulesAdmin() {
  const { data, error } = await supabase.from('curriculum_modules').select('*').order('sort_order');
  assertNoError(error, 'Failed to load curriculum modules');
  return data ?? [];
}

export async function fetchCurriculumCheckpoints(moduleId) {
  const { data, error } = await supabase
    .from('curriculum_checkpoints')
    .select('*')
    .eq('module_id', moduleId)
    .order('sort_order');
  assertNoError(error, 'Failed to load checkpoints');
  return data ?? [];
}

export async function saveCurriculumModule(record, editingId = null) {
  const query = editingId
    ? supabase.from('curriculum_modules').update(record).eq('id', editingId)
    : supabase.from('curriculum_modules').insert(record);
  const { error } = await query;
  assertNoError(error, 'Failed to save module');
  invalidateCmsCache('curriculum');
  notifyCmsUpdated('curriculum');
}

export async function setCurriculumModuleActive(id, isActive) {
  const { error } = await supabase.from('curriculum_modules').update({ is_active: isActive }).eq('id', id);
  assertNoError(error, 'Failed to update module');
  invalidateCmsCache('curriculum');
  notifyCmsUpdated('curriculum');
}

export async function saveCurriculumCheckpoint(record, editingId = null) {
  const query = editingId
    ? supabase.from('curriculum_checkpoints').update(record).eq('id', editingId)
    : supabase.from('curriculum_checkpoints').insert(record);
  const { error } = await query;
  assertNoError(error, 'Failed to save checkpoint');
  invalidateCmsCache('curriculum');
  notifyCmsUpdated('curriculum');
}
