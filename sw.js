// Increment this version number (e.g., v2, v3, v4) whenever you update your index.html logic
const CACHE_NAME = 'vault-v19'; 

const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installs the new version and caches the assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Logic to clean up old versions of the cache so they don't take up space
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Serves files from cache if available, otherwise fetches from network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
