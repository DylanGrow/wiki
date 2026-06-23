const sw = self as any;

const CACHE_NAME = 'secops-wiki-v1.1.0';
const ASSETS = [
  '/wiki/',
  '/wiki/index.html',
  '/wiki/manifest.json',
  '/wiki/icon.svg',
];

const OFFLINE_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Offline Operation Mode | SecOps Wiki</title>
  <style>
    body { background-color: #090d16; color: #cbd5e1; font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
    .card { background: rgba(15, 23, 42, 0.7); padding: 2.5rem; border: 1px solid rgba(20, 184, 166, 0.2); border-radius: 12px; max-width: 440px; box-shadow: 0 0 25px rgba(20, 184, 166, 0.1); }
    h1 { color: #f8fafc; margin-top: 0; font-size: 1.5rem; font-family: monospace; tracking: 0.1em; }
    p { font-size: 0.875rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.5rem; }
    .btn { display: inline-block; padding: 0.6rem 1.2rem; background: #0d9488; color: #fff; text-decoration: none; border-radius: 6px; font-size: 0.75rem; font-family: monospace; font-weight: bold; letter-spacing: 0.05em; transition: background 0.2s; }
    .btn:hover { background: #14b8a6; }
  </style>
</head>
<body>
  <div class="card">
    <h1 style="color: #f43f5e;">SECURE_LINK_OFFLINE</h1>
    <p>The requested Wiki document is not stored in your offline database or service worker cache. Re-establish network interface connection to view this node.</p>
    <a href="/wiki/" class="btn">RETURN TO WORKSPACE</a>
  </div>
</body>
</html>
`;

sw.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => {
      sw.skipWaiting();
    })
  );
});

sw.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => {
      sw.clients.claim();
    })
  );
});

sw.addEventListener('fetch', (event: any) => {
  const url = new URL(event.request.url);

  // If requesting a page (navigation), return index.html fallback for SPA routing
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/wiki/index.html').then((response) => {
        return response || fetch(event.request).catch(() => {
          return new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html' } });
        });
      })
    );
    return;
  }

  // Ignore cross-origin requests
  if (url.origin !== sw.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Hashed assets are immutable
        if (url.pathname.includes('/assets/')) {
          return cachedResponse;
        }

        // Stale-while-revalidate for local mutable assets
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
        }).catch(() => {
          // Silently absorb fetch failures (offline state)
        });
        
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Return fallback if offline and not in cache
        if (event.request.destination === 'image') {
          return caches.match('/wiki/icon.svg') as Promise<Response>;
        }
        return new Response('Network error occurred.', { status: 408, headers: { 'Content-Type': 'text/plain' } });
      });
    })
  );
});
