const cache = new Map();
const TTL = 5 * 60 * 1000; // 5 minutes

export const getCachedENSResolution = (ensName) => {
  const cached = cache.get(ensName);
  if (cached && Date.now() - cached.timestamp < TTL) {
    return cached.value;
  }
  return null;
}

export const setCachedENSResolution = (ensName, value) => {
  cache.set(ensName, { value, timestamp: Date.now() });
}

export const clearENSCache = () => {
  cache.clear();
}