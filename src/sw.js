/* FairwayPilot Service Worker (M0.5)
 * App-Shell offline-faehig; HTML network-first (frische Deploys landen sofort),
 * statische Assets stale-while-revalidate. Dynamische API und Cross-Origin werden
 * bewusst NICHT gecached (Supabase, /api/*, CDN, Kartenkacheln). */
var FP_CACHE = 'fp-shell-v1';
var SHELL = ['/', '/manifest.json', '/icon-192.png', '/icon-512.png', '/icon-32.png', '/logo-mark.png'];
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
      var copy = res.clone(); caches.open(FP_CACHE).then(function(c){ c.put('/', copy); });
      return res;
    }).catch(function(){ return caches.match('/'); }));
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
