var CACHE_NAME = 'talknSwCache';
var urlsToCache = [
    '/',
    '/index.ejs'
];
console.log("==== SW");
self.addEventListener('install', function(event) {
    console.log("==== INSTALL");
    // インストール処理
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    console.log("==== FETCH");
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // キャッシュがあったのでそのレスポンスを返す
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});