// Scadenzario: cache di sicurezza per usare la pagina anche senza connessione.
// Prova sempre la rete per prima, così gli aggiornamenti arrivano subito.
var CACHE = 'scadenzario-cache';

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.search.indexOf('check=') !== -1) return;

  var key = req.mode === 'navigate' ? new Request(url.origin + url.pathname) : req;
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(key, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(key).then(function (hit) { return hit || Response.error(); });
    })
  );
});
