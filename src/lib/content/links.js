import { pathFromPageId } from '../navigation.js';
import { PAGE_KEYS, PAGE_LABELS } from './sectionKeys.js';

/**
 * One link shape shared by the per-event "Learn more" button and the page
 * builder's CTA block. A link can point at a CMS-built page, another page on
 * this site, or an article somewhere else.
 */
export const BLANK_LINK = {
  enabled: false,
  label: 'Learn More',
  kind: 'page',
  pageSlug: '',
  sitePage: '',
  url: '',
};

export const LINK_KINDS = [
  { value: 'page', label: 'A page built in the CMS' },
  { value: 'site', label: 'Another page on this site' },
  { value: 'external', label: 'An article on another website' },
];

export const SITE_PAGE_CHOICES = PAGE_KEYS.map((key) => ({
  value: key,
  label: PAGE_LABELS[key] ?? key,
}));

/** Path for a CMS-built page. Kept here so the admin and public side agree. */
export function customPagePath(slug) {
  return `/events/${slug}`;
}

/**
 * Only http(s) links are allowed through. Anything else — `javascript:`,
 * `data:`, a typo — resolves to nothing rather than becoming an href.
 */
export function isSafeExternalUrl(url) {
  if (typeof url !== 'string' || !url.trim()) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function normalizeLink(link) {
  if (!link || typeof link !== 'object') return { ...BLANK_LINK };
  return { ...BLANK_LINK, ...link };
}

/**
 * Resolve a stored link into something renderable.
 * Returns null when the link is disabled or its target is missing/unsafe, so
 * callers can render nothing without repeating the checks.
 *
 * @returns {{ label: string, href: string, external: boolean } | null}
 */
export function resolveLink(link, fallbackLabel = 'Learn More') {
  const resolved = normalizeLink(link);
  if (!resolved.enabled) return null;

  const label = resolved.label?.trim() || fallbackLabel;

  switch (resolved.kind) {
    case 'page': {
      const slug = resolved.pageSlug?.trim();
      if (!slug) return null;
      return { label, href: customPagePath(slug), external: false };
    }
    case 'site': {
      const page = resolved.sitePage?.trim();
      if (!page || !PAGE_KEYS.includes(page)) return null;
      return { label, href: pathFromPageId(page), external: false };
    }
    case 'external': {
      const url = resolved.url?.trim();
      if (!isSafeExternalUrl(url)) return null;
      return { label, href: url, external: true };
    }
    default:
      return null;
  }
}

/** Short human-readable target, for admin list tables. */
export function describeLinkTarget(link) {
  const resolved = normalizeLink(link);
  if (!resolved.enabled) return '';
  switch (resolved.kind) {
    case 'page':
      return resolved.pageSlug ? customPagePath(resolved.pageSlug) : 'No page selected';
    case 'site':
      return resolved.sitePage ? (PAGE_LABELS[resolved.sitePage] ?? resolved.sitePage) : 'No page selected';
    case 'external':
      return resolved.url || 'No URL set';
    default:
      return '';
  }
}
