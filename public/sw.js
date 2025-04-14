const CACHE_NAME = 'v1';

self.addEventListener('install', () => {});

self.addEventListener('activate', () => {});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  if (url.pathname.startsWith('/')) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((fetchResponse) => {
              return caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, fetchResponse.clone());
                return fetchResponse;
              });
            })
          );
        })
        .catch(() => caches.match('/offline.html')),
    );
    return;
  }
});
