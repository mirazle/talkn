const cacheName = 'pwa-talkn';

const filesToCache = [
    '/',
    '/index.ejs'
]
//console.log("SW");
// Install Service Worker
self.addEventListener('install', function(event){
    //console.log('[INSTALL]Service Worker: Installing.... ' + cacheName);

    event.waitUntil(

        // Open the Cache
        caches.open(cacheName).then(function(cache) {
            //console.log('[INSTALLED]Service Worker: Caching App Shell at the moment...... ' + cacheName);

            // Add Files to the Cache
            return cache.addAll(filesToCache);
        })
    );
})

// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    //console.log('Service Worker: Activating....');
    var cacheWhitelist = ['dependencies-cache-**v1**', 'dependencies-2-cache-**v1**'];// Version for your cache list 

    event.waitUntil(
        caches.keys().then( (cacheNames) => {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                  if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                  }
                })
            );
        })
    );
    return self.clients.claim();
});

if( self.clients && self.clients.claim ){
    self.clients.claim()
}

self.addEventListener('fetch', function(event) {

    //console.log('Service Worker: Fetch', event.request.url);

    //console.log("Url", event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});