
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/dashboard.html',
          '/login.html',
          '/cadastro.html',
          '/styles.css',
          '/dashboard.css',
          '/cadastro.css',
          '/login.css',
          '/script.js'
        ]);
      })
    );
  });
  
  
  self.addEventListener('activate', (event) => {
    // Limpa os caches antigos se nescessario
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  