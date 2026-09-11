import { useEffect } from 'react';
import { normalizeLink } from '../lib/content/links.js';
import {
  preloadEventPageRoute,
  prefetchCustomPage,
} from '../lib/content/eventPagePrefetch.js';

/** Touch devices have no hover, so warm a short list of linked pages on idle. */
const DEFAULT_LIMIT = 6;

function onIdle(fn) {
  if (typeof window === 'undefined') return () => {};
  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(fn, { timeout: 2000 });
    return () => window.cancelIdleCallback?.(handle);
  }
  const handle = setTimeout(fn, 1200);
  return () => clearTimeout(handle);
}

/**
 * Warms the event-page route and the pages the given events link to, once the
 * browser is idle. Use on pages where a visitor is likely to open one — the
 * Events page — rather than everywhere, so the landing page stays lean.
 *
 * @param {Array<object>} events  event items carrying a `learnMore` link
 * @param {{ preview?: boolean, limit?: number }} [options]
 */
export function useEventPagePrefetch(events, { preview = false, limit = DEFAULT_LIMIT } = {}) {
  // Join the slugs so the effect re-runs only when the targets actually change.
  const slugs = (Array.isArray(events) ? events : [])
    .map((event) => {
      const link = normalizeLink(event?.learnMore);
      return link.enabled && link.kind === 'page' ? link.pageSlug : '';
    })
    .filter(Boolean)
    .slice(0, limit);
  const slugKey = slugs.join(',');

  useEffect(() => {
    if (!slugKey) return undefined;
    return onIdle(() => {
      preloadEventPageRoute();
      slugKey.split(',').forEach((slug) => prefetchCustomPage(slug, { preview }));
    });
  }, [slugKey, preview]);
}

export default useEventPagePrefetch;
