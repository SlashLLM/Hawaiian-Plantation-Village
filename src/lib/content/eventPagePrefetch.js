import { cachedFetch, getCached } from './cache.js';
import { fetchCustomPageBySlug } from './cmsApi.js';

/**
 * Warming for CMS-built event pages.
 *
 * Clicking "Learn more" otherwise costs three sequential waits: the route's JS
 * chunk, the page row, then the first image. Starting all three the moment a
 * visitor shows intent — hovering, focusing, or touching the link — usually
 * makes the click land on an already-loaded page.
 *
 * The cache is the same one ContentProvider uses, so `invalidateCmsCache
 * ('customPages')` clears these entries when an admin republishes.
 */

/** Keys share the `custom-pages` prefix so one clearCache call drops them all. */
function cacheKey(slug, preview) {
  return `custom-pages:${preview ? 'preview' : 'public'}:${slug}`;
}

// cachedFetch stores resolved values, not promises, so concurrent callers would
// each fetch. Track in-flight requests here to collapse hover + click into one.
const inFlight = new Map();

/** Loads the route's JS chunk. Same specifier App.jsx lazy-loads, so one chunk. */
export function preloadEventPageRoute() {
  return import('../../pages/vintage/CustomEventPage.jsx');
}

/**
 * Synchronous cache peek.
 * @returns the page, `null` for a known miss, or `undefined` when not cached.
 */
export function getCachedCustomPage(slug, { preview = false } = {}) {
  if (!slug) return undefined;
  return getCached(cacheKey(slug, preview));
}

/** Warms the browser cache for the first image on the page. */
function preloadFirstImage(page) {
  if (typeof window === 'undefined' || typeof Image === 'undefined') return;
  const firstImage = (Array.isArray(page?.blocks) ? page.blocks : [])
    .map((block) => block?.image)
    .find((url) => typeof url === 'string' && url);
  if (firstImage) {
    const img = new Image();
    img.src = firstImage;
  }
}

/** Fetches and caches a page. Safe to call repeatedly; errors are swallowed. */
export function prefetchCustomPage(slug, { preview = false } = {}) {
  if (!slug) return Promise.resolve(null);
  const key = cacheKey(slug, preview);

  const cached = getCached(key);
  if (cached !== undefined) return Promise.resolve(cached);

  const existing = inFlight.get(key);
  if (existing) return existing;

  const request = cachedFetch(key, () => fetchCustomPageBySlug(slug, { preview }))
    .then((page) => {
      preloadFirstImage(page);
      return page;
    })
    .catch(() => null)
    .finally(() => inFlight.delete(key));

  inFlight.set(key, request);
  return request;
}

/** Warms both the route chunk and the page data. Used on hover/focus/touch. */
export function prefetchEventPage(slug, { preview = false } = {}) {
  preloadEventPageRoute();
  return prefetchCustomPage(slug, { preview });
}

/** Test seam — drops in-flight tracking between cases. */
export function resetPrefetchState() {
  inFlight.clear();
}
