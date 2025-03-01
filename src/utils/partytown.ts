export const partytownConfig = {
  debug: process.env.NODE_ENV === 'development',
  forward: ['dataLayer.push', 'fbq', 'gtag', 'smartplayer'],
  resolveUrl: (url: URL) => {
    // Bloqueia chamadas para visitorapi se não estiver usando
    if (url.hostname.includes('visitorapi.com')) {
      return false;
    }
    return url;
  }
}; 