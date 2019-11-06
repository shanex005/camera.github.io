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