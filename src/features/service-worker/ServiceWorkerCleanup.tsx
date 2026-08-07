"use client";

import { useEffect } from "react";

const CACHE_PREFIX = "bluemiv-blog-";
const LEGACY_SCRIPT_PATH = "/sw.js";

export function ServiceWorkerCleanup() {
  useEffect(() => {
    async function cleanupLegacyServiceWorker() {
      if (!("serviceWorker" in navigator)) return;

      const legacyScriptUrl = new URL(
        LEGACY_SCRIPT_PATH,
        window.location.origin,
      ).href;
      const hadLegacyController =
        navigator.serviceWorker.controller?.scriptURL === legacyScriptUrl;
      const registrations = await navigator.serviceWorker.getRegistrations();

      const unregisterResults = await Promise.all(
        registrations
          .filter((registration) => {
            const workers = [
              registration.active,
              registration.waiting,
              registration.installing,
            ];
            return workers.some(
              (worker) => worker?.scriptURL === legacyScriptUrl,
            );
          })
          .map((registration) => registration.unregister()),
      );

      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX))
            .map((cacheName) => caches.delete(cacheName)),
        );
      }

      const unregisteredLegacyWorker = unregisterResults.some(Boolean);
      if (hadLegacyController && unregisteredLegacyWorker)
        window.location.reload();
    }

    cleanupLegacyServiceWorker().catch((error) => {
      console.warn("[APP] Legacy service worker cleanup failed", error);
    });
  }, []);

  return null;
}
