// Cache name
const CACHE_NAME = 'pokedex-pwa-v1';

// Files to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/index.js'

];

//Insatll event: Cavche files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

//Fetch event: Serve cached files offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});