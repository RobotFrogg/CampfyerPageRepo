const cacheName = 'Offline Cache';

const cacheAssets = [
    'index.html',

]

// call install event
self.addEventListener('install', (e) => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Files Cached');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker: Activated');
});

// call fetch event
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});