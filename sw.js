const CACHE='tcg-collection-note-v227-shell';
const SHELL=['./','./index.html','./manifest.webmanifest','./app-icon.png','./app-icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('tcg-collection-note-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;event.respondWith(fetch(req).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));}return response;}).catch(()=>caches.match(req).then(cached=>cached||caches.match('./index.html'))));});
