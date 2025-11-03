const CACHE = "myspeak-sns-v1.1.3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k!==CACHE).map(k => caches.delete(k)))
    )
  );
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  // まずキャッシュ、なければネット
  e.respondWith(
    caches.match(req).then(res => res || fetch(req).catch(()=> caches.match("./index.html")))
  );
});
