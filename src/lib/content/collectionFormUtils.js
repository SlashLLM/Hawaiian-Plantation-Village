/** Default plantation camp cultures shown in admin dropdowns. */
export const DEFAULT_CAMP_CULTURES = [
  'Chinese',
  'Japanese',
  'Filipino',
  'Portuguese',
  'Korean',
  'Puerto Rican',
  'Okinawan',
  'Spanish',
];

/** Build sorted unique culture options from defaults, existing entries, and current value. */
export function collectCampCultureOptions(entries = [], currentValue = '') {
  const fromEntries = entries
    .filter((entry) => entry.content_type === 'camp_story')
    .map((entry) => entry.metadata?.culture ?? entry.category ?? '')
    .filter(Boolean);

  const combined = [...DEFAULT_CAMP_CULTURES, ...fromEntries];
  if (currentValue && !combined.some((c) => c.toLowerCase() === currentValue.toLowerCase())) {
    combined.push(currentValue);
  }

  const seen = new Set();
  return combined.filter((culture) => {
    const key = culture.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Immutably set a nested value on a metadata object using a dot-path.
 */
export function updateMetadata(metadata, path, value) {
  const next = structuredClone(metadata ?? {});
  const keys = path.split('.');
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    if (cursor[key] == null || typeof cursor[key] !== 'object') {
      cursor[key] = {};
    }
    cursor = cursor[key];
  }
  cursor[keys[keys.length - 1]] = value;
  return next;
}

/** Read a nested value from metadata using a dot-path. */
export function getMetadataAt(metadata, path, fallback = '') {
  if (!metadata || typeof metadata !== 'object') return fallback;
  const keys = path.split('.');
  let cursor = metadata;
  for (const key of keys) {
    if (cursor == null || typeof cursor !== 'object') return fallback;
    cursor = cursor[key];
  }
  return cursor === undefined || cursor === null ? fallback : cursor;
}

/** Format seconds as "Xm Ys" for oral history length labels. */
export function formatAudioLength(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '';
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}m ${s < 10 ? '0' : ''}${s}s`;
}
