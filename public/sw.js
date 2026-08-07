/**
 * Bluemiv Tech Blog service worker tombstone.
 *
 * Keep this file at /sw.js permanently. Its only job is to replace the legacy
 * caching worker, remove caches created by it, unregister itself, and release
 * open pages from the old controller. Do not add fetch or cache-write logic.
 */

"use strict";

const LEGACY_CACHE_PREFIXES = ["bluemiv-blog-"];
const CLEANUP_MESSAGE = "BLUEMIV_SW_CLEANUP_COMPLETE";

async function deleteLegacyCaches() {
  const cacheNames = await caches.keys();
  const legacyCacheNames = cacheNames.filter((cacheName) =>
    LEGACY_CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix)),
  );

  await Promise.all(
    legacyCacheNames.map((cacheName) => caches.delete(cacheName)),
  );

  return legacyCacheNames;
}

async function releaseLegacyClients(deletedCacheNames) {
  const windowClients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  windowClients.forEach((client) => {
    client.postMessage({
      type: CLEANUP_MESSAGE,
      deletedCacheNames,
    });
  });

  await self.registration.unregister();

  await Promise.allSettled(
    windowClients.map((client) => client.navigate(client.url)),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const deletedCacheNames = await deleteLegacyCaches();
      await releaseLegacyClients(deletedCacheNames);
    })(),
  );
});
