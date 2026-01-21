const CACHE_NAME = '__CACHE_NAME__';

async function cleanupCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(async (cacheName) => {
      if (CACHE_NAME !== cacheName) {
        console.log('[SW] 새로운 컨텐츠가 있음. 캐시 정리');
        await caches.delete(cacheName);
      }
    }),
  );
}

async function sendPostMessage() {
  const allClients = await self.clients.matchAll({ includeUncontrolled: true });
  allClients.forEach((client) => client.postMessage({ type: 'NEW_VERSION_AVAILABLE' }));
}

self.addEventListener('install', () => {
  self.skipWaiting(); // activate 실행
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await cleanupCaches();
      await self.clients.claim();
      await sendPostMessage();
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
    '/naver0b3c7144e2b65f42ae8194ba42c9f26c.html',
    '/google8ae0c2a16b4b1e23.html',
    '/app-ads.txt',
    '/privacy',
    '/privacy/easy-dots',
    '/privacy/easy-dots/en',
    '/privacy/easy-dots/ko',
    '/privacy/kpop/en',
    '/privacy/kpop/ko',
    '/privacy/kpop/jp',
    '/privacy/kpop/cn',
    '/privacy/lottocat645',
    '/privacy/ai-wallpaper/en',
    '/privacy/ai-wallpaper/ko',
    '/privacy/ai-wallpaper/jp',
    '/privacy/pixel-blur',
    '/privacy/pixel-blur/en',
    '/privacy/pixel-blur/ko',
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
