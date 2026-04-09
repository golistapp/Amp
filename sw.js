const CACHE_NAME = 'ampkart-tools-v1';

// Yahan wo files hain jo browser save kar lega taki offline bhi app jaldi load ho
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './calculator.html',
  './compressor.html',
  './qr.html',
  'https://ik.imagekit.io/nsyr92pse/1000201093-optimized.jpg'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event (Purana cache clean karne ke liye)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (Offline support ke liye)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Agar file cache mein hai toh wahan se do, warna internet se download karo
      return response || fetch(event.request);
    })
  );
});
