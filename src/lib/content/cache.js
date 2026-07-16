const store = new Map();

export function getCached(key) {
  return store.get(key);
}

export function setCached(key, value) {
  store.set(key, value);
  return value;
}

export function clearCache(prefix) {
  if (!prefix) {
    store.clear();
    return;
  }
  [...store.keys()].filter((k) => k.startsWith(prefix)).forEach((k) => store.delete(k));
}

export async function cachedFetch(key, fetcher) {
  const hit = getCached(key);
  if (hit !== undefined) return hit;
  const value = await fetcher();
  setCached(key, value);
  return value;
}
