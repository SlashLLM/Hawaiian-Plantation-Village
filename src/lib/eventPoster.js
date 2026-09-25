import { resolveLink } from './content/links.js';

/**
 * The promo popup shown once to each first-time visitor (see
 * `src/components/EventPosterModal.jsx`).
 *
 * It is managed from Admin → Content → Site Popup, which saves a
 * `page_sections` row (`site.popup`) holding a payload shaped like
 * `DEFAULT_POSTER_PAYLOAD` below. That default is only used when the row does
 * not exist yet (fresh database, or Supabase not configured locally).
 *
 * The payload `id` is part of the localStorage key, so a new id re-shows the
 * popup to everyone — people who dismissed the last poster still get the new
 * one. The admin panel issues a new id whenever the artwork changes.
 */
export const POPUP_PAGE_KEY = 'site';
export const POPUP_SECTION_KEY = 'popup';

export const DEFAULT_POSTER_PAYLOAD = {
  enabled: true,
  id: 'harvest-moon-festival-2026',
  image: '/images/harvest-moon-festival-2026.jpg',
  alt:
    'Hawaii\'s Plantation Village 4th Annual Harvest Moon Festival — Saturday, September 26, 2026, 9:00 a.m. to 2:00 p.m. Free admission and on-site parking.',
  caption: 'Saturday, September 26, 2026 · 9:00 a.m. – 2:00 p.m. · Free admission & parking',
  /** Last day the popup appears, inclusive. After this it stops on its own. */
  showUntil: '2026-09-26',
  /** Where the button (and a click on the artwork) goes — the shared link model from links.js. */
  link: {
    enabled: true,
    label: 'See event details',
    kind: 'site',
    pageSlug: '',
    sitePage: 'events',
    url: '',
  },
};

/**
 * Turn a stored payload into what the modal renders, or null when there is
 * nothing to show (switched off, or no artwork). A link whose target is
 * missing or unsafe just drops the button rather than hiding the poster.
 *
 * @returns {{ id: string, src: string, alt: string, caption: string,
 *   showUntil: string, link: { label: string, href: string, external: boolean } | null } | null}
 */
export function normalizePoster(payload) {
  if (!payload || typeof payload !== 'object' || payload.enabled === false) return null;
  const src = typeof payload.image === 'string' ? payload.image.trim() : '';
  if (!src) return null;
  return {
    id: payload.id || src,
    src,
    alt: payload.alt?.trim() || 'Upcoming event poster',
    caption: payload.caption?.trim() || '',
    showUntil: payload.showUntil || '',
    link: resolveLink({ ...payload.link, enabled: true }, 'Learn more'),
  };
}

const STORAGE_PREFIX = 'hpv:poster-seen:';

/** Local calendar date as YYYY-MM-DD — matches how the rest of the site reads dates. */
export function todayISO(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** False once the event has passed, so a forgotten poster retires itself. */
export function isPosterCurrent(poster, today = todayISO()) {
  if (!poster) return false;
  if (!poster.showUntil) return true;
  return today <= poster.showUntil;
}

// localStorage throws outright in some privacy modes, so every access is guarded.
// A visitor we can't remember simply sees the poster again — better than a crash.
export function hasSeenPoster(poster) {
  if (!poster) return true;
  try {
    return window.localStorage.getItem(`${STORAGE_PREFIX}${poster.id}`) === '1';
  } catch {
    return false;
  }
}

export function markPosterSeen(poster) {
  if (!poster) return;
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${poster.id}`, '1');
  } catch {
    /* no-op — the poster just shows again next visit */
  }
}
