/**
 * Immutably set a nested value on a payload object using a dot-path.
 * Array indices in the path are supported (e.g. "items.0.label").
 */
export function updatePayload(payload, path, value) {
  const next = structuredClone(payload ?? {});
  const keys = path.split('.');
  let cursor = next;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    const index = Number(nextKey);
    const shouldBeArray = Number.isInteger(index) && String(index) === nextKey;
    if (cursor[key] == null || typeof cursor[key] !== 'object') {
      cursor[key] = shouldBeArray ? [] : {};
    }
    cursor = cursor[key];
  }
  cursor[keys[keys.length - 1]] = value;
  return next;
}

/** Read a nested value from a payload using a dot-path. */
export function getAtPath(payload, path, fallback = '') {
  if (!payload || typeof payload !== 'object') return fallback;
  const keys = path.split('.');
  let cursor = payload;
  for (const key of keys) {
    if (cursor == null || typeof cursor !== 'object') return fallback;
    cursor = cursor[key];
  }
  return cursor === undefined || cursor === null ? fallback : cursor;
}

export function stampClassOptions() {
  return [
    { value: 'green', label: 'Green' },
    { value: 'rust', label: 'Rust' },
    { value: 'teal', label: 'Teal' },
    { value: 'gold', label: 'Gold' },
  ];
}
