/**
 * Rewrites site_settings + every page_sections row in supabase/seed_cms.sql
 * from src/lib/content/fallbacks.js so the CMS seed matches offline fallbacks.
 *
 * `fallbacks.js` is the authoring source of truth: edit copy there, then run
 * this to regenerate the seed. Note that the seed's page_sections insert uses
 * `on conflict do nothing`, so it only populates a fresh database — to push
 * changed copy to an already-seeded database, generate a migration with
 * `node scripts/generate-copy-migration.mjs`, which upserts with `do update`.
 *
 * Run: node scripts/sync-home-about-seed.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SITE_SETTINGS } from '../src/lib/content/fallbacks.js';
import { sectionRows, sectionValuesSql, sqlJson } from './lib/cmsSeedRows.mjs';

const SEED_PATH = fileURLToPath(new URL('../supabase/seed_cms.sql', import.meta.url));

const settingsSql = `insert into public.site_settings (id, payload)
values (
  'default',
  '${sqlJson(DEFAULT_SITE_SETTINGS)}'::jsonb
)
on conflict (id) do update
  set payload = excluded.payload,
      updated_at = now();`;

const rows = sectionRows();
const valuesSql = sectionValuesSql(rows);

const pageSectionsBlock = `-- ---------------------------------------------------------------------------
-- Page sections (all pages, generated from src/lib/content/fallbacks.js)
-- ---------------------------------------------------------------------------

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
${valuesSql}
on conflict (page_key, section_key) do nothing;

`;

const seed = readFileSync(SEED_PATH, 'utf8').replace(/\r\n/g, '\n');

const settingsStart = seed.indexOf('insert into public.site_settings');
const pageSectionsStart = seed.indexOf('-- Page sections');
// Everything after the page_sections group starts at the partner-logos comment.
const pageSectionsEnd = seed.indexOf('-- Partner logos / social proof');
if (settingsStart === -1 || pageSectionsStart === -1 || pageSectionsEnd === -1) {
  throw new Error('Could not locate site_settings / page_sections / partner-logos markers');
}

// Keep only the file's leading comment lines. Anchoring on the FIRST rule
// (rather than the last) matters: anchoring on the last one preserved whatever
// stale "Site settings" banner the previous run left behind, so the header
// block grew by one copy every time this script ran.
const headEnd = seed.indexOf('-- ---');
const head = (headEnd === -1 ? seed.slice(0, settingsStart) : seed.slice(0, headEnd)).replace(
  /\s+$/,
  '',
);
const rest = seed.slice(pageSectionsEnd);

const settingsHeader = `-- ---------------------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------------------

`;

writeFileSync(
  SEED_PATH,
  `${head}\n\n${settingsHeader}${settingsSql}\n\n${pageSectionsBlock}${rest}`.replace(/\n/g, '\r\n'),
  'utf8',
);

const pageCount = new Set(rows.map((row) => row.pageKey)).size;
console.log(`Synced site_settings and ${rows.length} page sections across ${pageCount} pages`);
