const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function normalizeSlug(raw) {
  if (raw == null || typeof raw !== 'string') return '';
  return raw
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function isValidSlug(slug) {
  return typeof slug === 'string' && SLUG_RE.test(slug);
}

export function validateSiteSettings(payload) {
  if (!payload || typeof payload !== 'object') return false;
  return Boolean(payload.brand?.title && Array.isArray(payload.nav));
}

export function validatePageSectionPayload(payload) {
  return payload !== null && typeof payload === 'object';
}

export function mergeWithFallback(remote, fallback) {
  if (!remote) return fallback;
  if (!fallback) return remote;
  if (Array.isArray(remote)) return remote.length ? remote : fallback;
  if (typeof remote === 'object') {
    return { ...fallback, ...remote };
  }
  return remote ?? fallback;
}
