/**
 * Generates a Supabase migration that force-updates site copy in an
 * ALREADY-SEEDED database.
 *
 * Why this exists: supabase/seed_cms.sql inserts page_sections with
 * `on conflict (page_key, section_key) do nothing`, so re-running the seed
 * cannot change a row that already exists. This emits the same payloads with
 * `on conflict ... do update`, which is the only way a copy change in
 * src/lib/content/fallbacks.js reaches a live site.
 *
 * WARNING: this overwrites section copy edited through the /admin CMS. Confirm
 * no unsaved staff edits are pending before applying it.
 *
 * Admin-owned record lists (ADMIN_DATA_SECTIONS — events, news, careers,
 * timeline, leadership, testimonials, partners) are deliberately EXCLUDED:
 * production holds real entries there, and replacing them with code defaults
 * would be data loss rather than a copy change.
 *
 * Run: node scripts/generate-copy-migration.mjs [name]
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULT_SITE_SETTINGS } from '../src/lib/content/fallbacks.js';
import {
  ADMIN_DATA_SECTIONS,
  sectionRows,
  sectionValuesSql,
  sqlJson,
} from './lib/cmsSeedRows.mjs';

const name = process.argv[2] ?? 'copy_rewrite';
const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
const filename = `${stamp}_${name}.sql`;
const outPath = fileURLToPath(new URL(`../supabase/migrations/${filename}`, import.meta.url));

const allRows = sectionRows();
const rows = allRows.filter((row) => !ADMIN_DATA_SECTIONS.has(`${row.pageKey}.${row.sectionKey}`));
const skipped = allRows.length - rows.length;
const valuesSql = sectionValuesSql(rows);

const sql = `-- Site copy sync, generated from src/lib/content/fallbacks.js by
-- scripts/generate-copy-migration.mjs. Unlike supabase/seed_cms.sql this
-- upserts with \`do update\`, so it overwrites copy that already exists —
-- including section copy edited through the /admin CMS.
--
-- Admin-owned record lists are excluded on purpose (events, news, careers,
-- timeline, leadership, testimonials, partners): those rows hold real entries
-- created by staff, and are edited in /admin rather than in code.

-- public.site_settings must be the CMS table from 20260714100000_cms_full.sql.
-- A leftover Payload CMS table of the same name (no "payload" column) squats
-- this name on some databases, which makes "create table if not exists" a
-- no-op and every settings read fail with 42703. Repair it before upserting:
-- the CMS table is a single 'default' row, so nothing is lost by recreating.
do $$
begin
  if exists (select 1 from information_schema.tables
             where table_schema = 'public' and table_name = 'site_settings')
     and not exists (select 1 from information_schema.columns
                     where table_schema = 'public' and table_name = 'site_settings'
                       and column_name = 'payload') then
    drop table public.site_settings cascade;
  end if;
end $$;

create table if not exists public.site_settings (
  id text primary key default 'default',
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

-- Same policy names and predicates as 20260714100000_cms_full.sql.
drop policy if exists "Public read site settings" on public.site_settings;
create policy "Public read site settings" on public.site_settings for select using (true);

drop policy if exists "Admin manage site settings" on public.site_settings;
create policy "Admin manage site settings" on public.site_settings for all
  using (public.is_admin()) with check (public.is_admin());

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

insert into public.site_settings (id, payload)
values (
  'default',
  '${sqlJson(DEFAULT_SITE_SETTINGS)}'::jsonb
)
on conflict (id) do update
  set payload = excluded.payload,
      updated_at = now();

insert into public.page_sections (page_key, section_key, status, sort_order, payload, published_at)
values
${valuesSql}
on conflict (page_key, section_key) do update
  set payload = excluded.payload,
      status = 'published',
      sort_order = excluded.sort_order,
      published_at = coalesce(page_sections.published_at, excluded.published_at),
      updated_at = now();
`;

writeFileSync(outPath, sql.replace(/\n/g, '\r\n'), 'utf8');
console.log(
  `Wrote supabase/migrations/${filename} (${rows.length} copy sections; ${skipped} admin-owned list sections left untouched)`,
);
