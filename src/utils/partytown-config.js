/**
 * Configuração do Partytown para mover scripts de terceiros para web workers
 */

export const partytownConfig = {
  // Configurações básicas
  lib: '/~partytown/',
  debug: false,
  
  // Scripts a serem encaminhados
  forward: ['dataLayer.push', 'fbq'],
  
  // Resolver URLs para scripts específicos
  resolveUrl: (url) => {
    if (url.hostname === 'www.googletagmanager.com') {
      const proxyUrl = new URL('/api/gtm-proxy', window.location.origin);
      proxyUrl.searchParams.append('url', url.href);
      return proxyUrl;
    }
    if (url.hostname === 'connect.facebook.net') {
      const proxyUrl = new URL('/api/fb-proxy', window.location.origin);
      proxyUrl.searchParams.append('url', url.href);
      return proxyUrl;
    }
    return url;
  },
  
  // Configurações de log (desativadas para melhorar performance)
  logCalls: false,
  logGetters: false,
  logSetters: false,
  logImageRequests: false,
  logScriptExecution: false,
  logSendBeaconRequests: false,
  logStackTraces: false,
  logMainAccess: false
};

/**
 * Função para configurar o Partytown de forma segura
 */
export function setupPartytown() {
  if (typeof window === 'undefined') return;
  
  try {
    // Configurar o Partytown
    window.partytown = partytownConfig;
    
    // Carregar o script do Partytown manualmente
    const script = document.createElement('script');
    script.src = '/~partytown/partytown.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    console.log('Partytown configurado com sucesso');
  } catch (error) {
    console.error('Erro ao configurar Partytown:', error);
  }
}

/**
 * Função para verificar se o Partytown está carregado
 */
export function isPartytownLoaded() {
  if (typeof window === 'undefined') return false;
  
  return (
    typeof window.partytown !== 'undefined' &&
    document.querySelector('script[src*="partytown.js"]') !== null
  );
} 