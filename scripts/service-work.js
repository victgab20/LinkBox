
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js'
        ]);
      })
    );
  });
  
  
  self.addEventListener('activate', (event) => {
    // Limpa os caches antigos se nescessario
    event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cacheName => {  
                  if (cacheName.startsWith('my-cache')) {
                      return caches.delete(cacheName);
                  }

              }).map(cacheNames =>{
                  return caches.delete(cacheNames);
              })
          )
      })
    )
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  