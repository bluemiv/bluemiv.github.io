export const LEGACY_CACHE_PREFIX = "bluemiv-blog-";
export const LEGACY_SERVICE_WORKER_PATH = "/sw.js";

export function isLegacyCacheName(cacheName: string): boolean {
  return cacheName.startsWith(LEGACY_CACHE_PREFIX);
}

export function isLegacyServiceWorkerUrl(scriptUrl: string, siteOrigin: string): boolean {
  try {
    const url = new URL(scriptUrl);
    return url.origin === siteOrigin && url.pathname === LEGACY_SERVICE_WORKER_PATH;
  } catch {
    return false;
  }
}
