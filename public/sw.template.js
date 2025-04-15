const CACHE_NAME = '__CACHE_NAME__';

self.addEventListener('install', () => {});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
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
  if (/\/sw\.js$/.test(url.pathname)) return;

  // GET이 아닌 요청은 제외
  if (event.request.method !== 'GET') return;

  // chrome extension 등 제외
  if (url.protocol === 'chrome-extension:') return;

  // 외부 도메인 (Google Ads 등)은 제외
  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith('/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });

          event.waitUntil(fetchPromise);

          // 캐시가 있으면 먼저 응답하고, 없으면 네트워크 응답을 사용
          return cachedResponse || fetch(event.request);
        });
      }),
    );
  }
});
