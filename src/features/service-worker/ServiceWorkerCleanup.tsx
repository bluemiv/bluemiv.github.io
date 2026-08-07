"use client";

import { useEffect } from "react";

const CACHE_PREFIX = "bluemiv-blog-";
const LEGACY_SCRIPT_PATH = "/sw.js";

export function ServiceWorkerCleanup() {
  useEffect(() => {
    async function cleanupLegacyServiceWorker() {
      if (!("serviceWorker" in navigator)) return;

      const registrations = await navigator.serviceWorker.getRegistrations();
      const legacyScriptUrl = new URL(LEGACY_SCRIPT_PATH, window.location.origin).href;

      await Promise.all(
        registrations
          .filter((registration) => {
            const worker = registration.active ?? registration.waiting ?? registration.installing;
            return worker?.scriptURL === legacyScriptUrl;
          })
          .map((registration) => registration.unregister()),
      );

      if (!("caches" in window)) return;

      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX))
          .map((cacheName) => caches.delete(cacheName)),
      );
    }

    cleanupLegacyServiceWorker().catch((error) => {
      console.warn("[APP] Legacy service worker cleanup failed", error);
    });
  }, []);

  return null;
}
