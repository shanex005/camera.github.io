//SERVICE WORKER

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('cached_site.js').then(function(registration) {
       
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
       
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

 

    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
      displayNotification();
  });

  function displayNotification() {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: 'Here is a notification body!',
          icon: 'images/icons/icon-144x144.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'explore', title: 'Explore this new world',
              icon: 'images/icons/icon-128x128.png'},
            {action: 'close', title: 'Close notification',
              icon: 'images/icons/icon-144x144.png'},
          ]
        };
        reg.showNotification('Hello world!', options);
      });
    }
  }
