const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = '/offline.html';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        OFFLINE_URL,
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || caches.match(OFFLINE_URL);
      })
    );
  }
});
