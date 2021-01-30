importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
workbox.loadModule('workbox-strategies');

if (workbox) {
    console.log("workbox has been loaded");
}else {
    console.log("workbox didn't load");
}

workbox.precaching.precacheAndRoute([
    {url:"/",revision:'1'},
    {url:"/index.html",revision:'1'},
    {url:"/nav.html",revision:'1'},
    {url:"/detail-club.html",revision:'1'},
    {url:"/pages/standing.html",revision:'1'},
    {url:"/pages/saved.html",revision:'1'},
    {url:"/css/materialize.min.css",revision:'1'},
    {url:"/css/style.css",revision:'1'},
    {url:"/js/api.js",revision:'1'},
    {url:"/js/idb.js",revision:'1'},
    {url:"/js/db.js",revision:'1'},
    {url:"/js/materialize.min.js",revision:'1'},
    {url:"/js/standing.js",revision:'1'},
    {url:"/js/nav.js",revision:'1'},
    {url:"/js/detail.js",revision:'1'},
    {url:"/js/saved.js",revision:'1'},
    {url:"/js/button.js",revision:'1'},
    {url:"/js/notif.js",revision:'1'},
    {url:"/js/reg-push.js",revision:'1'},
    {url:"/js/reg-sw.js",revision:'1'},
    {url:"/icon/PL-48.png",revision:'1'},
    {url:"/icon/PL-96.png",revision:'1'},
    {url:"/icon/PL-192.png",revision:'1'},
    {url:"/icon/PL-512.png",revision:'1'},
    {url:"/icon/PL-apple-192.png",revision:'1'},
    {url:"/icon/image-null.png",revision:'3'},
    {url:"/manifest.json",revision:'1'},
],{
ignoreUrlParametersMatching:[/.*/]
})

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'bola-fetch',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        }),
      ],
    })
  );

workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ]
  })
);

  self.addEventListener('push', (event)=>{
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    let options = {
      body: body,
      icon: 'icon/PL-48.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

