"use client";

import { useEffect } from "react";

import { isLegacyCacheName, isLegacyServiceWorkerUrl } from "./serviceWorkerConfig";

function isLegacyWorker(worker: ServiceWorker | null): boolean {
  if (!worker) return false;

  return isLegacyServiceWorkerUrl(worker.scriptURL, window.location.origin);
}

export function ServiceWorkerCleanup() {
  useEffect(() => {
    async function cleanupLegacyServiceWorker() {
      if (!("serviceWorker" in navigator)) return;

      const hadLegacyController = isLegacyWorker(navigator.serviceWorker.controller);
      const registrations = await navigator.serviceWorker.getRegistrations();

      const unregisterResults = await Promise.allSettled(
        registrations
          .filter((registration) => {
            const workers = [registration.active, registration.waiting, registration.installing];
            return workers.some(isLegacyWorker);
          })
          .map((registration) => registration.unregister()),
      );

      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.allSettled(
          cacheNames.filter(isLegacyCacheName).map((cacheName) => caches.delete(cacheName)),
        );
      }

      const unregisteredLegacyWorker = unregisterResults.some(
        (result) => result.status === "fulfilled" && result.value,
      );
      if (hadLegacyController && unregisteredLegacyWorker) window.location.reload();
    }

    cleanupLegacyServiceWorker().catch((error) => {
      console.warn("[APP] Legacy service worker cleanup failed", error);
    });
  }, []);

  return null;
}
