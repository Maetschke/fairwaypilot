/* FairwayPilot Service Worker (M0.6)
 * Landing unter '/', App unter '/app'. HTML network-first (frische Deploys landen sofort);
 * jede Seite wird unter ihrer EIGENEN URL gecacht (nicht mehr alles unter '/'), Offline-Fallback
 * = gleiche URL, sonst App-Shell '/app'. Statische Assets: stale-while-revalidate.
 * WICHTIG: Cache-Version-Bump (v2) loescht beim Aktivieren automatisch alle alten Caches und
 * behebt damit haengende Alt-Staende (z.B. versehentlich gecachte Paywall-Version). */
var FP_CACHE = 'fp-shell-v2';
var SHELL = ['/app', '/', '/manifest.json', '/icon-192.png', '/icon-512.png', '/icon-32.png', '/logo-mark.png'];
self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(FP_CACHE).then(function(c){ return c.addAll(SHELL).catch(function(){}); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== FP_CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.indexOf('/api/') === 0) return;
  var isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') !== -1;
  if (isHTML){
    e.respondWith(fetch(req).then(function(res){
      var copy = res.clone(); caches.open(FP_CACHE).then(function(c){ c.put(req, copy); });
      return res;
    }).catch(function(){ return caches.match(req).then(function(m){ return m || caches.match('/app'); }); }));
    return;
  }
  e.respondWith(caches.match(req).then(function(cached){
    var net = fetch(req).then(function(res){
      var copy = res.clone(); caches.open(FP_CACHE).then(function(c){ c.put(req, copy); });
      return res;
    }).catch(function(){ return cached; });
    return cached || net;
  }));
});
