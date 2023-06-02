// Evento de instalação do Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          // Aqui você pode adicionar os arquivos que deseja armazenar em cache
          '/',
          '/index.html',
          '/styles.css',
          '/script.js'
        ]);
      })
    );
  });
  
  // Evento de ativação do Service Worker
  self.addEventListener('activate', (event) => {
    // Limpar caches antigos, se necessário
  });
  
  // Evento fetch
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  