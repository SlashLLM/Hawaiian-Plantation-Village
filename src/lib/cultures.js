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
