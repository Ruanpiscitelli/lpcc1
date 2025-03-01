partytown = {
  debug: false,
  forward: ['smartplayer', 'dataLayer.push', 'fbq', 'gtag'],
  lib: '/~partytown/',
  resolveUrl: function(url, location, type) {
    // Redireciona chamadas do visitorapi para nosso proxy
    if (url.hostname.includes('visitorapi.com')) {
      const proxyUrl = new URL('/api/visitor-proxy', location.origin);
      return proxyUrl;
    }
    return url;
  },
  // Adicionando proxy para o smartplayer
  proxytown: {
    'smartplayer': {
      elements: {
        // Proxy para elementos do DOM
        querySelector: function(selector) {
          return document.querySelector(selector);
        },
        querySelectorAll: function(selector) {
          return document.querySelectorAll(selector);
        }
      }
    }
  }
}; 