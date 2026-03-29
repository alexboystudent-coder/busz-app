const CACHE_NAME = "busz-cache-v1";
const urlsToCache = [
    "/index.html",
    "/css.css",
    "/js.js",
    "/manifest.json",
    "/icon.png"
];

// telepítéskor cache-elünk mindent
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => cache.addAll(urlsToCache))
    );
});

// fetch esemény: offline módban cache-t használ
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
              .then(response => {
                  return response || fetch(event.request);
              })
    );
});