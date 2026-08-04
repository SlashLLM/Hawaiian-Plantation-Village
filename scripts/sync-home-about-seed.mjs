/**
 * Rewrites site_settings + home/about page_sections in supabase/seed_cms.sql
 * from src/lib/content/fallbacks.js so CMS seed matches offline fallbacks.
 *
 * Run: node scripts/sync-home-about-seed.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SITE_SETTINGS, DEFAULT_PAGE_SECTIONS } from '../src/lib/content/fallbacks.js';

const SEED_PATH = fileURLToPath(new URL('../supabase/seed_cms.sql', import.meta.url));
const sqlJson = (value) => JSON.stringify(value).replace(/'/g, "''");

const settingsSql = `insert into public.site_settings (id, payload)
values (
  'default',
  '${sqlJson(DEFAULT_SITE_SETTINGS)}'::jsonb
)
on conflict (id) do update
  set payload = excluded.payload,
      updated_at = now();`;

const homeKeys = Object.keys(DEFAULT_PAGE_SECTIONS.home);
const aboutIntroKeys = [
  'header',
  'mission',
  'timelineIntro',
  'leadershipIntro',
  'newsIntro',
  'careersIntro',
  'contactIntro',
];
const aboutListKeys = ['news', 'careers', 'timeline', 'leadership'];

const homeRows = homeKeys.map(
  (key, i) =>
    `  ('home', '${key}', 'published', ${i + 1}, '${sqlJson(DEFAULT_PAGE_SECTIONS.home[key])}'::jsonb, now())`,
);

const aboutIntroRows = aboutIntroKeys.map(
  (key, i) =>
    `  ('about', '${key}', 'published', ${i + 1}, '${sqlJson(DEFAULT_PAGE_SECTIONS.about[key])}'::jsonb, now())`,
);

const aboutListRows = aboutListKeys.map(
  (key, i) =>
    `  ('about', '${key}', 'published', ${i + 8}, '${sqlJson(DEFAULT_PAGE_SECTIONS.about[key])}'::jsonb, now())`,
);

let seed = readFileSync(SEED_PATH, 'utf8').replace(/\r\n/g, '\n');

const settingsStart = seed.indexOf('insert into public.site_settings');
const pageSectionsMarker = '-- Page sections (home, visit, about)';
const settingsEnd = seed.indexOf(pageSectionsMarker);
if (settingsStart === -1 || settingsEnd === -1) {
  throw new Error('Could not locate site_settings or home/about page sections markers');
}

const headEnd = seed.lastIndexOf('-- ---', settingsStart);
const afterSettingsHeader = headEnd === -1 ? seed.slice(0, settingsStart) : seed.slice(0, headEnd);
const fromPageSections = seed.slice(settingsEnd);

const aboutListsMarker = '-- About list sections';
const additionalMarker = '-- Additional page sections (learn, play, stories, support, tickets)';
const aboutListsIdx = fromPageSections.indexOf(aboutListsMarker);
const additionalIdx = fromPageSections.indexOf(additionalMarker);
if (aboutListsIdx === -1 || additionalIdx === -1) {
  throw new Error('Could not find about list / additional section boundaries');
}

const firstInsert = fromPageSections.slice(0, aboutListsIdx);
const visitStartInFirst = firstInsert.indexOf("  ('visit', 'header'");
const aboutStartInFirst = firstInsert.indexOf("  ('about', 'header'");
if (visitStartInFirst === -1 || aboutStartInFirst === -1) {
  throw new Error('Could not isolate visit rows inside first page_sections insert');
}
const visitRows = firstInsert.slice(visitStartInFirst, aboutStartInFirst).replace(/,\s*$/, '');

const newPageSections = `-- ---------------------------------------------------------------------------
-- Page sections (home, visit, about)
-- ---------------------------------------------------------------------------

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
${homeRows.join(',\n')},
${visitRows},
${aboutIntroRows.join(',\n')}
on conflict (page_key, section_key) do nothing;

-- About list sections (page-wise CMS)
insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
${aboutListRows.join(',\n')}
on conflict (page_key, section_key) do nothing;

`;

const rest = fromPageSections.slice(additionalIdx);

const settingsHeader = `-- ---------------------------------------------------------------------------
-- Site settings
-- ---------------------------------------------------------------------------

`;

writeFileSync(
  SEED_PATH,
  `${afterSettingsHeader.replace(/\s+$/, '')}\n\n${settingsHeader}${settingsSql}\n\n${newPageSections}${rest}`.replace(/\n/g, '\r\n'),
  'utf8',
);

console.log(
  `Synced site_settings, ${homeKeys.length} home sections, ${aboutIntroKeys.length} about intro sections, ${aboutListKeys.length} about list sections`,
);
