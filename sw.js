const r=self,a="secops-wiki-v1.1.0",c=["/wiki/","/wiki/index.html","/wiki/manifest.json","/wiki/icon.svg"],h=`
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
`;r.addEventListener("install",e=>{e.waitUntil(caches.open(a).then(n=>n.addAll(c)).then(()=>{r.skipWaiting()}))});r.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(n=>Promise.all(n.filter(t=>t!==a).map(t=>caches.delete(t)))).then(()=>{r.clients.claim()}))});r.addEventListener("fetch",e=>{const n=new URL(e.request.url);if(e.request.mode==="navigate"){e.respondWith(caches.match("/wiki/index.html").then(t=>t||fetch(e.request).catch(()=>new Response(h,{headers:{"Content-Type":"text/html"}}))));return}n.origin===r.location.origin&&e.respondWith(caches.match(e.request).then(t=>t?(n.pathname.includes("/assets/")||fetch(e.request).then(i=>{if(i.status===200){const o=i.clone();caches.open(a).then(s=>{s.put(e.request,o)})}}).catch(()=>{}),t):fetch(e.request).then(i=>{if(!i||i.status!==200||i.type!=="basic")return i;const o=i.clone();return caches.open(a).then(s=>{s.put(e.request,o)}),i}).catch(()=>e.request.destination==="image"?caches.match("/wiki/icon.svg"):new Response("Network error occurred.",{status:408,headers:{"Content-Type":"text/plain"}}))))});
