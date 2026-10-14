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
