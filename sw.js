/* Service worker — deixa o app abrir offline depois da primeira visita. */
var CACHE = "controle-notas-v4";
var CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-maskable.svg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(CORE); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) {
          return k === CACHE ? null : caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var sameOrigin = new URL(req.url).origin === self.location.origin;

  if (sameOrigin) {
    // arquivos do app: rede primeiro (pega sempre a versão nova), cache quando estiver offline
    e.respondWith(
      fetch(req, { cache: "no-store" }).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || (req.mode === "navigate" ? caches.match("./index.html") : Response.error());
        });
      })
    );
  } else {
    // fontes do Google etc.: usa o cache e atualiza em segundo plano
    e.respondWith(
      caches.match(req).then(function (hit) {
        var net = fetch(req).then(function (res) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
          return res;
        }).catch(function () { return hit; });
        return hit || net;
      })
    );
  }
});
