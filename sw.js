// Scadenzario - service worker.
// OGNI VOLTA che cambi un file dell'app, aumenta il numero qui sotto (v15 -> v16 ...).
// Senza questo l'app non si accorge della novità.
var CACHE = 'scadenzario-v17';
var ESSENZIALI = ['./', 'index.html'];
var ALTRI = ['manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

// Installazione: la nuova versione si scarica in disparte e resta in attesa.
// L'app continua a usare quella corrente finché l'utente non tocca "Aggiorna".
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    var fresh = function (f) { return new Request(f, { cache: 'reload' }); };
    return c.addAll(ESSENZIALI.map(fresh)).then(function () {
      return Promise.all(ALTRI.map(function (f) { return c.add(fresh(f)).catch(function () {}); }));
    });
  }));
});

// Attivazione: ogni versione ha la sua cache, quelle vecchie si eliminano.
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('message', function (e) {
  var d = e.data || {};
  if (d.type === 'SKIP_WAITING') self.skipWaiting();
  if (d.type === 'VERSION' && e.source) e.source.postMessage({ type: 'VERSION', cache: CACHE });
});

// Risposte dalla cache della versione corrente; la rete solo se manca qualcosa.
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(function (c) {
      return c.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        if (req.mode === 'navigate') return c.match('./').then(function (h) { return h || fetch(req); });
        return fetch(req);
      });
    })
  );
});
