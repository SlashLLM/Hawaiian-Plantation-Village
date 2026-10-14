/**
 * Report how the linked Supabase database differs from the static site files.
 *
 * Page copy, site settings and ticketing are static: staticContent.js and
 * src/data/ticketing.js are the source of truth and the site no longer reads
 * those tables. Only the Content CMS tabs (stories, archives, upcoming events,
 * event pages, news, careers, curriculum) are read from Supabase at runtime.
 *
 * Use this to spot copy that exists only in the database (e.g. edited there
 * directly) before it is forgotten. It reads with the anon key, applies the
 * same merge the site used to apply, and lists the paths that differ. Nothing
 * is written unless --json is passed.
 *
 * Run: node scripts/export-static-content.mjs            (report differences)
 *      node scripts/export-static-content.mjs --json out  (also dump merged JSON)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_SITE_SETTINGS, DEFAULT_PAGE_SECTIONS } from '../src/lib/content/staticContent.js';
import { mapGroupTicketType, sectionsToMap } from '../src/lib/content/mappers.js';
import { mergeWithFallback, mergeSectionPayload } from '../src/lib/content/validators.js';

function loadEnv() {
  const env = {};
  const text = readFileSync(new URL('../.env', import.meta.url), 'utf8');
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
  return env;
}

const env = loadEnv();
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function query(builder) {
  const { data, error } = await builder;
  if (error) throw error;
  return data;
}

// Same queries and merge as the pre-static ContentProvider / Tickets / Support.
const [settingsRow, sectionRows, eventRows, tierRows, groupRows] = await Promise.all([
  query(supabase.from('site_settings').select('payload').eq('id', 'default').maybeSingle()),
  query(supabase.from('page_sections').select('*').eq('status', 'published').order('sort_order')),
  query(
    supabase
      .from('events')
      .select('id, slug, title, description, event_date, start_time, end_time, is_special, ticket_types(id, slug, label, price_cents, requires_id, sort_order), tour_time_slots(id, label, sort_order)')
      .eq('is_active', true)
      .order('is_special', { ascending: true }),
  ),
  query(supabase.from('membership_tiers').select('*').eq('is_active', true).order('sort_order')),
  query(supabase.from('group_ticket_types').select('*').eq('is_active', true).order('sort_order')),
]);

const settings = mergeWithFallback(settingsRow?.payload ?? null, DEFAULT_SITE_SETTINGS);

const remoteSections = sectionsToMap(sectionRows);
const sections = { ...DEFAULT_PAGE_SECTIONS };
Object.keys(remoteSections).forEach((pageKey) => {
  const defaultPage = DEFAULT_PAGE_SECTIONS[pageKey] ?? {};
  sections[pageKey] = { ...defaultPage };
  Object.keys(remoteSections[pageKey]).forEach((sectionKey) => {
    // home.events is still CMS-managed (Upcoming Events tab) and merged at runtime.
    if (pageKey === 'home' && sectionKey === 'events') return;
    sections[pageKey][sectionKey] = mergeSectionPayload(defaultPage[sectionKey] ?? {}, remoteSections[pageKey][sectionKey]);
  });
});

const events = eventRows.map((e) => ({
  ...e,
  ticket_types: (e.ticket_types ?? []).sort((a, b) => a.sort_order - b.sort_order),
  tour_time_slots: (e.tour_time_slots ?? []).sort((a, b) => a.sort_order - b.sort_order),
}));

/** Lists every leaf path whose value differs between a and b. */
function diffPaths(a, b, path = '', out = []) {
  if (JSON.stringify(a) === JSON.stringify(b)) return out;
  const bothObjects = a && b && typeof a === 'object' && typeof b === 'object' && Array.isArray(a) === Array.isArray(b);
  if (!bothObjects) {
    out.push(path || '(root)');
    return out;
  }
  new Set([...Object.keys(a), ...Object.keys(b)]).forEach((k) => diffPaths(a[k], b[k], `${path}.${k}`, out));
  return out;
}

const report = {
  siteSettings: diffPaths(DEFAULT_SITE_SETTINGS, settings),
  pageSections: diffPaths(DEFAULT_PAGE_SECTIONS, sections),
};
console.log(JSON.stringify(report, null, 2));
console.log(`events: ${events.length}, membership tiers: ${tierRows.length}, group tickets: ${groupRows.length}`);

const jsonIdx = process.argv.indexOf('--json');
if (jsonIdx > -1) {
  const dir = process.argv[jsonIdx + 1] ?? 'static-export';
  mkdirSync(dir, { recursive: true });
  const dump = {
    settings,
    sections,
    events,
    membershipTiers: tierRows,
    groupTickets: groupRows.map(mapGroupTicketType),
  };
  Object.entries(dump).forEach(([name, value]) => {
    writeFileSync(`${dir}/${name}.json`, JSON.stringify(value, null, 2));
  });
  console.log(`wrote ${Object.keys(dump).length} files to ${dir}`);
}
