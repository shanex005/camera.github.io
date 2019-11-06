
var cache_name = 'camera';
var file_to_cache = ['/','/index.html','/main.js'];

self.addEventListener('install', e => {
 e.waitUntil(
   caches.open(cache_name).then(cache => {
     return cache.addAll(file_to_cache);
   }).then(() =>{
     return self.skipWaiting();
   })
 );
});

self.addEventListener('activate' , e => {
    e.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
          if(key !== cache_name) return caches.delete(key);
        }));
      }));
      return self.clients.claim();
});



self.addEventListener('fetch', event => {

  console.log(event.request.url);
  
  event.respondWith(
      caches.match(event.request)
        .then( response => {
          return response || fetch(event.request);
        })  
      );


  // event.respondWith(
  //   return fetch(event.request)
  //   .then(response => {
  //     cache.put(event.request,
  //       response.clone());
  //       return response;
  //   })  
  // );



  });