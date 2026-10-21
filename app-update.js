/* Automatic updates for GitHub Pages. Preferences stay in localStorage. */
(() => {
  'use strict';
  if (!('serviceWorker' in navigator)) return;

  const ASSETS = [
    './index.html', './style.css', './vendor/leaflet.css',
    './data.js', './coordinates.js', './engine.js',
    './preferences.js', './ui.js', './app-update.js'
  ];
  const CHECK_EVERY_MS = 10 * 60 * 1000;
  let registration;
  let baseline = null;
  let checking = null;
  let lastCheck = 0;
  let hasReloaded = false;
  let pendingUpdate = false;

  function safeToReload() {
    // Never interrupt editing of an unsaved language/group form.
    return !document.querySelector('dialog[open]');
  }
  function reloadForUpdate() {
    if (hasReloaded) return;
    if (!safeToReload()) { pendingUpdate = true; return; }
    hasReloaded = true;
    location.reload();
  }

  // Fetch actual bytes, not HTTP cache metadata: catches data.js-only edits too.
  // All files must fetch successfully to avoid falsely refreshing on partial outages.
  async function fingerprint() {
    const responses = await Promise.all(ASSETS.map(path =>
      fetch(path, {cache: 'no-store'}).then(response => {
        if (!response.ok) throw new Error('HTTP ' + response.status + ': ' + path);
        return response.text();
      })
    ));
    const content = responses.map((value, i) => ASSETS[i] + ':' + value.length + ':' + value).join('\n');
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(content));
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  async function checkForUpdates(force = false) {
    if (!navigator.onLine || !navigator.serviceWorker.controller) return;
    if (document.visibilityState === 'hidden') return;
    if (checking) return checking;
    if (!force && Date.now() - lastCheck < CHECK_EVERY_MS) return;
    lastCheck = Date.now();
    checking = (async () => {
      try {
        if (registration) await registration.update();
        const current = await fingerprint();
        if (baseline !== null && current !== baseline) reloadForUpdate();
        else baseline = current;
      } catch (error) {
        // Connectivity errors must not stop the timetable or delete settings.
        console.info('Nie udało się sprawdzić aktualizacji planu:', error);
      } finally {
        checking = null;
      }
    })();
    return checking;
  }

  navigator.serviceWorker.addEventListener('controllerchange', reloadForUpdate);
  window.addEventListener('load', async () => {
    try {
      registration = await navigator.serviceWorker.register('./sw.js', {updateViaCache: 'none'});
      await registration.update();
      await checkForUpdates(true);
    } catch (error) {
      console.warn('Tryb offline niedostępny:', error);
    }
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      if (pendingUpdate) reloadForUpdate();
      else void checkForUpdates();
    }
  });
  document.addEventListener('close', () => {
    if (pendingUpdate) reloadForUpdate();
  }, true);
  window.addEventListener('online', () => { void checkForUpdates(true); });
  setInterval(() => { void checkForUpdates(); }, CHECK_EVERY_MS);
})();
