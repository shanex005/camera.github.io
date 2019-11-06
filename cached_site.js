
var cache_name = 'camera2';

self.addEventListener('install', e => {
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
      fetch(event.request)
      .then(res =>{
          // make clone of res
          const resClone = res.clone();
          //open cache
          caches.open(cache_name)
          .then(cache =>{
              //add response cache
              cache.put(event.request, resClone);

          });
          return res;
      }).catch(err => caches.match(event.request).then(res => res)) 
      );

  });



///////////////////////push notification


  self.addEventListener('notificationclose', event =>{
    var notification =  event.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification: ' + primaryKey);
  }); 


  self.addEventListener('notificationclick', event =>{
    var notification =  event.notification;
    var action = event.action;
    if( action == 'close'){
      notification.close();
    }
    else {
      clients.openWindow("http://www.google.com")
    }
  });
