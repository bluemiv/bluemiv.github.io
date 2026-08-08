/**
 * Bluemiv Blog service worker tombstone.
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

  const deletionResults = await Promise.allSettled(
    legacyCacheNames.map((cacheName) => caches.delete(cacheName)),
  );

  return legacyCacheNames.filter(
    (_, index) => deletionResults[index].status === "fulfilled" && deletionResults[index].value,
  );
}

async function releaseLegacyClients(deletedCacheNames) {
  const windowClients = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  const unregistered = await self.registration.unregister();

  await Promise.allSettled(
    windowClients.map(async (client) => {
      try {
        client.postMessage({
          type: CLEANUP_MESSAGE,
          deletedCacheNames,
        });
      } catch {
        // A stale client must not prevent the remaining pages from reloading.
      }

      await client.navigate(client.url);
    }),
  );

  if (!unregistered) {
    throw new Error("Service worker unregister returned false");
  }
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
