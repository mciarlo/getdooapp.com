// Google Analytics (GA4), loaded on every page.
// Google's standard install code: load gtag.js, then config sends the page view.
(function () {
  var id = 'G-QPQX6JHKDW';
  var loader = document.createElement('script');
  loader.async = true;
  loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.head.appendChild(loader);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', id);
})();
