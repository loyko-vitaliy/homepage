const VERSION = 1
const CACHE_NAME = `PWA-RESUME-V${VERSION}`

const assetsToCache = [
  './',
  './index.html',
  './assets/img/avatar.png',
  './favicon.ico',
  'https://volodymyrkushnir.com/assets/stylesheets/base.css',
  './assets/css/index.css',
  './assets/js/index.js',
]

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key)
          }
        })
      )
    )
  )
})

self.addEventListener('install', (event) =>
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      fetch('./manifest.json')
        .then((response) => response.json())
        .then((assets) => cache.addAll(assetsToCache))
    )
  )
)

self.addEventListener('fetch', (event) =>
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)))
)
