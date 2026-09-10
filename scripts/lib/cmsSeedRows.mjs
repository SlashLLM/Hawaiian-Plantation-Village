/**
 * Shared row builder for the two CMS copy scripts:
 * - sync-home-about-seed.mjs   (regenerates supabase/seed_cms.sql, insert-only)
 * - generate-copy-migration.mjs (emits a migration that upserts over live rows)
 *
 * Both read the same authoring source of truth: DEFAULT_PAGE_SECTIONS in
 * src/lib/content/fallbacks.js.
 */
import { DEFAULT_PAGE_SECTIONS } from '../../src/lib/content/fallbacks.js';
import { PAGE_KEYS } from '../../src/lib/content/sectionKeys.js';

/** Escapes a JS value into a single-quoted Postgres JSON literal body. */
export const sqlJson = (value) => JSON.stringify(value).replace(/'/g, "''");

/**
 * Sections that hold admin-entered RECORDS rather than editorial copy — their
 * payload is a `{ items: [...] }` list maintained through the CMS admin panels
 * (events, news, careers, timeline, leadership, testimonials, partners).
 *
 * The seed still ships starter values for a fresh database, but the copy
 * migration must never force-update them: production already holds real
 * entries here (events with real dates and uploaded images), and overwriting
 * them with the code defaults would be data loss, not a copy change.
 */
export const ADMIN_DATA_SECTIONS = new Set([
  'home.events',
  'home.testimonials',
  'home.partners',
  'about.news',
  'about.careers',
  'about.timeline',
  'about.leadership',
]);

/** One row per section, with sort_order restarting at 1 for each page. */
export function sectionRows() {
  return PAGE_KEYS.flatMap((pageKey) =>
    Object.entries(DEFAULT_PAGE_SECTIONS[pageKey] ?? {}).map(([sectionKey, payload], i) => ({
      pageKey,
      sectionKey,
      sortOrder: i + 1,
      payload,
    })),
  );
}

/** Renders section rows as the VALUES list of a page_sections insert. */
export function sectionValuesSql(rows) {
  return rows
    .map(
      (row) =>
        `  ('${row.pageKey}', '${row.sectionKey}', 'published', ${row.sortOrder}, '${sqlJson(row.payload)}'::jsonb, now())`,
    )
    .join(',\n');
}
