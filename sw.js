/* Plan Zajęć UWM: same-origin network-first with offline fallback.
   Updating this worker never deletes cookies, localStorage or IndexedDB. */
'use strict';
const PREFIX = 'uwm-plan-zajec-shell-';
const CURRENT = PREFIX + '20261021-a1';
// Prefetch a fully working app shell. The OpenStreetMap background remains online-only.
const SHELL = [
  './index.html',
  './vendor/leaflet.css?v=20261021-a1',
  './style.css?v=20261021-a1',
  './vendor/leaflet.js?v=20261021-a1',
  './data.js?v=20261021-a1',
  './coordinates.js?v=20261021-a1',
  './engine.js?v=20261021-a1',
  './preferences.js?v=20261021-a1',
  './ui.js?v=20261021-a1',
  './app-update.js?v=20261021-a1'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CURRENT);
    // Atomic install: if an essential file is missing, keep the former SW active.
    await cache.addAll(SHELL.map(path => new Request(path, {cache: 'reload'})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CURRENT)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Do not cache or intercept OSM map tiles, university PDFs, or external services.
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CURRENT);
    try {
      // Always bypass the browser's HTTP cache for the latest deployed file.
      const response = await fetch(request, {cache: 'no-store'});
      if (response.ok && response.type === 'basic' && !request.headers.has('range')) {
        try { await cache.put(request, response.clone()); }
        catch (error) { console.warn('Cache Storage:', error); }
      }
      return response;
    } catch (error) {
      const saved = await cache.match(request, {ignoreSearch: true});
      if (saved) return saved;
      if (request.mode === 'navigate') {
        const fallback = await cache.match(new URL('./index.html', self.registration.scope));
        if (fallback) return fallback;
      }
      return Response.error();
    }
  })());
});
