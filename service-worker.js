const cacheName = 'Offline Cache';

const cacheAssets = [
    'index.html',
    'service-worker.js',
    '.assets/bootstrap/css/bootstrap.min.css',
    '.assets/bootstrap/js/bootstrap.min.js',
    '.assets/css/dat-gui-light-theme.css',
    '.assets/css/Lightbox-Gallery.css',
    '.assets/css/style.css',
    '.assets/css/Team-Boxed.css',

    '.assets/fonts/font-awesome.min.css',
    '.assets/fonts/fontawesome-webfont.eot',
    '.assets/fonts/fontawesome-webfont.svg',
    '.assets/fonts/fontawesome-webfont.ttf',
    '.assets/fonts/fontawesome-webfont.woff',
    '.assets/fonts/fontawesome-webfont.woff2',
    '.assets/fonts/FontAwesome.otf',

    '.assets/img/3.jpg',
    '.assets/img/Animation.png',
    '.assets/img/appealing-shape (5).png',
    '.assets/img/duckjames.png',
    '.assets/img/Illustraion2.png',
    '.assets/img/Illustration3.png',
    '.assets/img/turtjessie.png',
    '.assets/img/unknown.png',
    '.assets/img/5.png',
    '.assets/img/2.png',

    '.assets/js/Lightbox-Gallery.js',
    '.assets/img/script.js',
    '.assets/img/stylish-portfolio.js'

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