const CACHE_NAME = '__CACHE_NAME__';
const CACHE_WHITELIST = [CACHE_NAME];

async function cleanupCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map((cacheName) => {
      if (!CACHE_WHITELIST.includes(cacheName)) {
        console.log(`[SW] 캐시 제거: '${cacheName}'`);
        return caches.delete(cacheName);
      }
    }),
  );
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(cleanupCaches());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await cleanupCaches();
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Service Worker 자기 자신은 제외
  if (/\/sw\.js$/i.test(url.pathname.toLowerCase())) return;

  // sitemap.xml, rss.xml, manifest.webmanifest 등은 캐시하지 않음
  if (
    /\/(sitemap\.xml|rss\.xml|feed\.xml|manifest\.webmanifest)$/i.test(url.pathname.toLowerCase())
  ) {
    return;
  }

  // GET이 아닌 요청은 제외
  if (event.request.method !== 'GET') return;

  // chrome extension 등 제외
  if (url.protocol !== 'https:') return;

  // 외부 도메인 (Google Ads 등)은 제외
  if (url.origin !== self.location.origin) return;

  if (!url.pathname.startsWith('/')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then(async (networkResponse) => {
          const clonedResponse = networkResponse.clone();
          const networkEtag = networkResponse.headers.get('Etag');

          await cache.put(event.request, clonedResponse);

          const cached = await cache.match(event.request);
          const cachedEtag = cached?.headers?.get('Etag');

          const isUpdated = networkEtag && cachedEtag && networkEtag !== cachedEtag;

          if (isUpdated) {
            console.log('[SW:fetch] 새로운 컨텐츠 감지됨 → postMessage & 캐시 정리');
            const clients = await self.clients.matchAll();
            if (clients.length > 0) {
              clients.forEach((client) => client.postMessage({ type: 'NEW_VERSION_AVAILABLE' }));
            }
          }

          return networkResponse;
        });

        event.waitUntil(fetchPromise);

        return cachedResponse || fetch(event.request);
      }),
    ),
  );
});
