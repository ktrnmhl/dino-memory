// Offline-Speicher: legt das Spiel beim ersten Öffnen im Tablet ab.
// Bei jeder neuen Version VERSION hochzählen, damit das iPad die neue Fassung holt.
const VERSION = 'dino-memory-v2';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png'];

const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap';

// Schrift gleich beim ersten Öffnen mitnehmen; klappt das nicht, läuft das Spiel mit Ersatzschrift
async function cacheFont(c) {
  try {
    const css = await fetch(FONT_CSS);
    await c.put(FONT_CSS, css.clone());
    const urls = [...(await css.text()).matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]);
    await Promise.all(urls.map(u => fetch(u).then(r => c.put(u, r))));
  } catch (err) {}
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES).then(() => cacheFont(c))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Erst aus dem Speicher, sonst aus dem Netz (und dann merken, z. B. die Schrift von Google Fonts)
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok || res.type === 'opaque') {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, copy));
      }
      return res;
    }))
  );
});
