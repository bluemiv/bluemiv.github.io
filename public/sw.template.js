const CACHE_NAME = '__CACHE_NAME__';
const BUILD_VERSION = '__BUILD_VERSION__';
const CACHE_PREFIX = 'bluemiv-blog-';

async function cleanupCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(async (cacheName) => {
      if (cacheName.startsWith(CACHE_PREFIX) && CACHE_NAME !== cacheName) {
        console.log('[SW] 새로운 컨텐츠가 있음. 캐시 정리');
        await caches.delete(cacheName);
      }
    }),
  );
}

async function sendPostMessage() {
  const allClients = await self.clients.matchAll({ includeUncontrolled: true });
  allClients.forEach((client) =>
    client.postMessage({ type: 'APP_UPDATE_AVAILABLE', version: BUILD_VERSION }),
  );
}

async function hasPreviousContentCache() {
  const cacheNames = await caches.keys();
  return cacheNames.some(
    (cacheName) => cacheName.startsWith(CACHE_PREFIX) && CACHE_NAME !== cacheName,
  );
}

function shouldCacheResponse(response) {
  return response && response.ok && response.status === 200 && response.type === 'basic';
}

self.addEventListener('install', () => {
  self.skipWaiting(); // activate 실행
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const hasUpdate = await hasPreviousContentCache();
      await cleanupCaches();
      await self.clients.claim();
      if (hasUpdate) await sendPostMessage();
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
    '/privacy/pomodoro-flow',
    '/privacy/pomodoro-flow/en',
    '/privacy/pomodoro-flow/ko',
    '/privacy/musepiece',
    '/privacy/musepiece/en',
    '/privacy/musepiece/ko',
    '/privacy/musepiece/jp',
    '/privacy/blim',
    '/privacy/blim/en',
    '/privacy/blim/ko',
    '/privacy/blim/jp',
    '/privacy/luna',
    '/blim/account-deletion',
  ];

  // 소문자 처리 후 정확히 일치하는 경로 제외
  if (excludedPaths.includes(url.pathname.toLowerCase())) return;

  // GET이 아닌 요청은 제외
  if (event.request.method !== 'GET') return;

  // chrome extension 등 제외
  if (!['http:', 'https:'].includes(url.protocol)) return;

  // 외부 도메인 (Google Ads 등)은 제외
  if (url.origin !== self.location.origin) return;

  if (event.request.headers.has('range')) return;

  if (!url.pathname.startsWith('/')) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then(async (networkResponse) => {
            if (shouldCacheResponse(networkResponse)) {
              await cache.put(event.request, networkResponse.clone());
            }

            return networkResponse;
          })
          .catch((error) => {
            if (cachedResponse) return cachedResponse;
            throw error;
          });

        if (cachedResponse) {
          event.waitUntil(fetchPromise.catch(() => undefined));
          return cachedResponse;
        }

        return fetchPromise;
      }),
    ),
  );
});
