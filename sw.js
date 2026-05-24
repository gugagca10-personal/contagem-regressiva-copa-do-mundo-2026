const CACHE = 'copa2026-v2';
const ASSETS = [
  '/contagem-regressiva-copa-do-mundo-2026/',
  '/contagem-regressiva-copa-do-mundo-2026/index.html',
  '/contagem-regressiva-copa-do-mundo-2026/manifest.json',
  '/contagem-regressiva-copa-do-mundo-2026/icon-192.svg',
  '/contagem-regressiva-copa-do-mundo-2026/icon-512.svg',
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;0,900;1,700&display=swap',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
