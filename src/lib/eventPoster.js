/**
 * The promo poster shown once to each first-time visitor (see
 * `src/components/EventPosterModal.jsx`).
 *
 * To swap in next year's poster: drop the artwork in `public/images/`, point
 * `src` at it, and give the poster a new `id`. The id is part of the
 * localStorage key, so changing it re-shows the modal to everyone — people who
 * dismissed last year's poster still get the new one.
 *
 * Set `ACTIVE_POSTER` to `null` to turn the popup off entirely.
 */
export const ACTIVE_POSTER = {
  id: 'harvest-moon-2026',
  src: '/images/harvest-moon-festival-2026.jpg',
  alt:
    'Hawaii\'s Plantation Village 4th Annual Harvest Moon Festival — Saturday, September 26, 2026, 9:00 a.m. to 2:00 p.m. Free admission and on-site parking.',
  caption: 'Saturday, September 26, 2026 · 9:00 a.m. – 2:00 p.m. · Free admission & parking',
  /** Last day the popup appears, inclusive. After this it stops on its own. */
  showUntil: '2026-09-26',
  /** Where the "See event details" button goes — a page id from `navigation.js`. */
  ctaPage: 'events',
  ctaLabel: 'See event details',
};

const STORAGE_PREFIX = 'hpv:poster-seen:';

/** Local calendar date as YYYY-MM-DD — matches how the rest of the site reads dates. */
export function todayISO(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** False once the event has passed, so a forgotten poster retires itself. */
export function isPosterCurrent(poster = ACTIVE_POSTER, today = todayISO()) {
  if (!poster) return false;
  if (!poster.showUntil) return true;
  return today <= poster.showUntil;
}

// localStorage throws outright in some privacy modes, so every access is guarded.
// A visitor we can't remember simply sees the poster again — better than a crash.
export function hasSeenPoster(poster = ACTIVE_POSTER) {
  if (!poster) return true;
  try {
    return window.localStorage.getItem(`${STORAGE_PREFIX}${poster.id}`) === '1';
  } catch {
    return false;
  }
}

export function markPosterSeen(poster = ACTIVE_POSTER) {
  if (!poster) return;
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${poster.id}`, '1');
  } catch {
    /* no-op — the poster just shows again next visit */
  }
}
