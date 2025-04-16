const CACHE_NAME = '__CACHE_NAME__';

async function cleanupCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(async (cacheName) => {
      if (CACHE_NAME !== cacheName) {
        console.log('[SW:fetch] 새로운 컨텐츠 감지됨 → postMessage & 캐시 정리');
        const clients = await self.clients.matchAll();
        if (clients.length > 0) {
          clients.forEach((client) => client.postMessage({ type: 'NEW_VERSION_AVAILABLE' }));
        }
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

  // 캐시 제외할 리소스 목록
  const excludedPaths = [
    '/sw.js',
    '/sitemap.xml',
    '/rss.xml',
    '/feed.xml',
    '/manifest.webmanifest',
    '/robots.txt',
    '/ads.txt',
  ];

  // 소문자 처리 후 정확히 일치하는 경로 제외
  if (excludedPaths.includes(url.pathname.toLowerCase())) return;

  // GET이 아닌 요청은 제외
  if (event.request.method !== 'GET') return;

  // chrome extension 등 제외
  if (url.protocol !== 'https:') return;

  // 외부 도메인 (Google Ads 등)은 제외
  if (url.origin !== self.location.origin) return;

  if (event.request.headers.has('range')) return;

  if (!url.pathname.startsWith('/')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then(async (networkResponse) => {
          const clonedResponse = networkResponse.clone();
          await cache.put(event.request, clonedResponse);
          return networkResponse;
        });

        event.waitUntil(fetchPromise);

        return cachedResponse || fetch(event.request);
      }),
    ),
  );
});
