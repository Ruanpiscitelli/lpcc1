partytown = {
  debug: false,
  forward: ['smartplayer'],
  resolveUrl: function(url, location, type) {
    if (url.hostname.includes('visitorapi.com')) {
      // Bloqueia chamadas para visitorapi se não estiver usando
      return false;
    }
    return url;
  }
}; 