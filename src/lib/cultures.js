/**
 * Shared slug helper for the eight cultural homes.
 *
 * Homepage culture tiles (`home.cultures.items`) carry only a display `name`,
 * while the richer camp records (`camp_story` / CAMPS_DATA) are keyed by id —
 * `chinese`, `japanese`, `puerto_rican`, and so on. This maps one to the other
 * so a tile can deep-link into /explore/:cultureId.
 */

export function cultureSlug(culture) {
  const source =
    typeof culture === 'string' ? culture : culture?.id ?? culture?.culture ?? culture?.name ?? '';
  return source
    .trim()
    .toLowerCase()
    .replace(/[ʻ'’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/** Finds the camp record matching a slug, tolerating id/culture/name spellings. */
export function findCampBySlug(camps, slug) {
  if (!slug) return undefined;
  const target = cultureSlug(slug);
  return camps.find(
    (camp) =>
      cultureSlug(camp.id) === target ||
      cultureSlug(camp.culture) === target ||
      cultureSlug(camp.name) === target,
  );
}

export const CHRONOLOGICAL_CULTURES = [
  'hawaiian',
  'chinese',
  'portuguese',
  'japanese',
  'okinawan',
  'puerto_rican',
  'korean',
  'filipino',
];

export function parseArrivalYear(arrival) {
  if (!arrival) return 9999;
  const str = String(arrival).toLowerCase();
  if (str.includes('before')) return -1;
  const match = str.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 9999;
}

export function sortCampsChronologically(camps = []) {
  return [...camps].sort((a, b) => {
    const yearA = parseArrivalYear(a.arrival);
    const yearB = parseArrivalYear(b.arrival);
    if (yearA !== yearB) return yearA - yearB;
    const indexA = CHRONOLOGICAL_CULTURES.indexOf(cultureSlug(a));
    const indexB = CHRONOLOGICAL_CULTURES.indexOf(cultureSlug(b));
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    return 0;
  });
}
