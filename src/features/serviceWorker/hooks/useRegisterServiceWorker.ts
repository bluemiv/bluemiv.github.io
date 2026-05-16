import { useEffect } from 'react';

const CACHE_PREFIX = 'bluemiv-blog-';

export default function useRegisterServiceWorker() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const cleanupDevelopmentServiceWorker = async () => {
      const hadController = Boolean(navigator.serviceWorker.controller);
      const registrations = await navigator.serviceWorker.getRegistrations();

      await Promise.all(registrations.map((registration) => registration.unregister()));

      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX))
            .map((cacheName) => caches.delete(cacheName)),
        );
      }

      if (hadController) window.location.reload();
    };

    if (process.env.NODE_ENV !== 'production') {
      cleanupDevelopmentServiceWorker().catch((error) => {
        console.warn('[APP] Development service worker cleanup failed', error);
      });
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

        await registration.update();
      } catch (error) {
        console.warn('[APP] Service worker registration failed', error);
      }
    };

    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker, { once: true });
    }

    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);
}
