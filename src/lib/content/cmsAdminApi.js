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
  if (scope === 'all' || scope === 'settings') clearCache('settings');
  if (scope === 'all' || scope === 'sections') clearCache('sections');
  if (scope === 'all' || scope === 'collections') clearCache('collection:');
  if (scope === 'all' || scope === 'catalog') {
    clearCache('group-tickets');
    clearCache('tour-slots');
  }
  if (scope === 'all' || scope === 'curriculum') clearCache('curriculum');
}

export async function saveSiteSettings(payload) {
  const { error } = await supabase.from('site_settings').upsert({ id: 'default', payload });
  assertNoError(error, 'Failed to save settings');
  invalidateCmsCache('settings');
  notifyCmsUpdated('settings');
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

export async function fetchCatalogData() {
  const [ev, mt, gt, ts] = await Promise.all([
    supabase.from('events').select('*, ticket_types(*)').order('title'),
    supabase.from('membership_tiers').select('*').order('sort_order'),
    supabase.from('group_ticket_types').select('*').order('sort_order'),
    supabase.from('tour_time_slots').select('*, events(slug, title)').order('sort_order'),
  ]);
  assertNoError(ev.error, 'Failed to load events');
  assertNoError(mt.error, 'Failed to load membership tiers');
  assertNoError(gt.error, 'Failed to load group tickets');
  assertNoError(ts.error, 'Failed to load tour slots');
  return {
    events: ev.data ?? [],
    tiers: mt.data ?? [],
    groupTickets: gt.data ?? [],
    tourSlots: ts.data ?? [],
  };
}

export async function saveEvent(record, editingId = null) {
  const query = editingId
    ? supabase.from('events').update(record).eq('id', editingId)
    : supabase.from('events').insert(record);
  const { error } = await query;
  assertNoError(error, 'Failed to save event');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function setEventActive(id, isActive) {
  const { error } = await supabase.from('events').update({ is_active: isActive }).eq('id', id);
  assertNoError(error, 'Failed to update event');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function saveTicketType(record, editingId = null) {
  const query = editingId
    ? supabase.from('ticket_types').update(record).eq('id', editingId)
    : supabase.from('ticket_types').insert(record);
  const { error } = await query;
  assertNoError(error, 'Failed to save ticket type');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function setTicketTypeActive(id, isActive) {
  const { error } = await supabase.from('ticket_types').update({ is_active: isActive }).eq('id', id);
  assertNoError(error, 'Failed to update ticket type');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function saveMembershipTier(record, editingId = null) {
  const query = editingId
    ? supabase.from('membership_tiers').update(record).eq('id', editingId)
    : supabase.from('membership_tiers').insert(record);
  const { error } = await query;
  assertNoError(error, 'Failed to save membership tier');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function setMembershipTierActive(id, isActive) {
  const { error } = await supabase.from('membership_tiers').update({ is_active: isActive }).eq('id', id);
  assertNoError(error, 'Failed to update membership tier');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function saveGroupTicketType(record, editingId = null) {
  const query = editingId
    ? supabase.from('group_ticket_types').update(record).eq('id', editingId)
    : supabase.from('group_ticket_types').insert(record);
  const { error } = await query;
  assertNoError(error, 'Failed to save group ticket');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function setGroupTicketActive(id, isActive) {
  const { error } = await supabase.from('group_ticket_types').update({ is_active: isActive }).eq('id', id);
  assertNoError(error, 'Failed to update group ticket');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function saveTourSlot(record, editingId = null) {
  const query = editingId
    ? supabase.from('tour_time_slots').update(record).eq('id', editingId)
    : supabase.from('tour_time_slots').insert(record);
  const { error } = await query;
  assertNoError(error, 'Failed to save tour slot');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
}

export async function setTourSlotActive(id, isActive) {
  const { error } = await supabase.from('tour_time_slots').update({ is_active: isActive }).eq('id', id);
  assertNoError(error, 'Failed to update tour slot');
  invalidateCmsCache('catalog');
  notifyCmsUpdated('catalog');
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
