self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
  // Kosongkan bagian ini jika portofolio tidak butuh akses offline penuh
});