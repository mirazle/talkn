// service.worker.js
var cacheName = 'talkn for web';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('Opened cache');
      return cache.addAll(['/manifest.json', '/talkn.components.js']);
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;

  // Only deal with requests to your own server
  if (new URL(request.url).origin !== location.origin) {
    return;
  }

  // check if request
  if (/\.js$|.txt|.ico$|.png$|.jpg$|.jpeg$|.svg$|.gif$/.test(request.url)) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(function (response) {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            console.log(response, cache);
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();

          caches.open(cacheName).then(function (cache) {
            console.log(response, cache);
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
    );
  }
});
