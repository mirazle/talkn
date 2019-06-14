const cacheName = 'pwa-talkn';
const log = true;
const filesToCache = [
    '/',
    '/index.ejs'
]

if(log)console.log("SW");

// Install Service Worker
self.addEventListener('install', function(event){
    if(log)console.log('[INSTALL]Service Worker: Installing.... ' + cacheName);

    event.waitUntil(

        // Open the Cache
        caches.open(cacheName).then(function(cache) {
            if(log)console.log('[INSTALLED]Service Worker: Caching App Shell at the moment...... ' + cacheName);

            // Add Files to the Cache
            return cache.addAll(filesToCache);
        })
    );
})

// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    if(log)console.log('Service Worker: Activating....');
    var cacheWhitelist = ['dependencies-cache-**v1**', 'dependencies-2-cache-**v1**'];// Version for your cache list 
    if(log)console.log("A");
    event.waitUntil(
        caches.keys().then( (cacheNames) => {
            if(log)console.log("B");
            return Promise.all(

                cacheNames.map(function(cacheName) {
                    if(log)console.log("C");
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        if(log)console.log("D");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {

    if(log)console.log('Service Worker: Fetch', event.request.url);
    if(log)console.log("Url", event.request.url);

    // Https request image is error and undisplay.
    if( event.request.url.indexOf( "https:" ) === 0 ){
        event.respondWith(
            caches.match(event.request).then(function(response) {
                console
                if(response){
                    return response;
                }else{
                    if( event.request.cache !== "only-if-cached" ){
                        return fetch(event.request);
                    }else{
                        return false;
                    }
                }
            })
        );
    }
});