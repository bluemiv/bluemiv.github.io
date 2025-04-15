const CACHE_NAME = '__CACHE_NAME__';

self.addEventListener('install', () => {
  console.log('서비스 워커 설치');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('서비스 워커 활성화');
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log(`캐시 '${cacheName}' 제거`);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Serice Worker가 자기 자신(sw.js)은 캐싱하면 안 되므로 제외
  if (/\/sw\.js/.test(url.pathname.toLowerCase())) return;

  // GET이 아닌 요청은 제외
  if (event.request.method !== 'GET') return;

  // chrome extension 등 제외
  if (url.protocol !== 'https:') return;

  // 외부 도메인 (Google Ads 등)은 제외
  if (url.origin !== self.location.origin) return;

  if (!url.pathname.startsWith('/')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then(async (networkResponse) => {
          const clonedNetworkResponse = networkResponse.clone();
          const networkEtag = networkResponse.headers.get('Etag');

          const cached = await cache.match(event.request);
          const cachedEtag = cached?.headers?.get('Etag');

          console.log('캐시 저장');
          await cache.put(event.request, clonedNetworkResponse);

          console.log('networkEtag', networkEtag);
          console.log('cachedEtag', cachedEtag);
          if (networkEtag && cachedEtag && networkEtag !== cachedEtag) {
            console.log('새로운 컨텐츠가 있어서 postMessage 전송');
            self.clients.matchAll().then((clients) => {
              clients.forEach((client) => client.postMessage({ type: 'NEW_VERSION_AVAILABLE' }));
            });
          }

          return networkResponse;
        });

        event.waitUntil(fetchPromise);

        // 캐시가 있으면 먼저 응답하고, 없으면 네트워크 응답을 사용
        return cachedResponse || fetch(event.request);
      });
    }),
  );
});
