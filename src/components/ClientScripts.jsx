'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, memo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { setupPartytown, isPartytownLoaded } from '../utils/partytown-config';
import { loadScriptOnIdle, loadScriptOnVisible, loadScriptsAfterLCP } from '../utils/script-loader';

// Carregamento dinâmico do Google Tag Manager com prioridade baixa
const GoogleTagManagerScript = dynamic(
  () => import("./GoogleTagManagerScript"),
  { 
    ssr: false, 
    loading: () => null,
  }
);

// Carregamento dinâmico do Service Worker Registration com prioridade baixa
const ServiceWorkerRegistration = dynamic(
  () => import("./ServiceWorkerRegistration"),
  { 
    ssr: false,
    loading: () => null,
  }
);

// Componente para o script de fallback do player - memoizado para evitar re-renderizações
const PlayerFallbackScript = memo(() => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef(null);
  
  // Verificar se o container existe antes de carregar o script
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkContainer = () => {
        const container = document.getElementById('vid_64e3a9c5f22eda0009e3c8c1');
        if (container) {
          setShouldLoad(true);
          return true;
        }
        return false;
      };
      
      // Verificar imediatamente
      if (!checkContainer()) {
        // Se não encontrar, verificar novamente após o carregamento completo
        const observer = new MutationObserver(() => {
          if (checkContainer()) {
            observer.disconnect();
          }
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
        
        // Desconectar após 10 segundos para evitar vazamento de memória
        setTimeout(() => observer.disconnect(), 10000);
      }
    }
  }, []);
  
  // Carregar o script apenas quando o container existir
  useEffect(() => {
    if (shouldLoad) {
      loadScriptOnIdle('https://scripts.converteai.net/1f58c8e0-bf61-4c5c-87c5-96dae9d8d3c3/players/64e3a9c5f22eda0009e3c8c1/player.js', {
        id: 'player_fallback_script',
        async: true,
        defer: true
      }).catch(error => {
        console.error('Erro ao carregar o script do player:', error);
      });
    }
  }, [shouldLoad]);
  
  return null;
});

PlayerFallbackScript.displayName = 'PlayerFallbackScript';

// Componente para o iframe do GTM - memoizado para evitar re-renderizações
const GTMIframe = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const iframeRef = useRef(null);
  
  // Carregar o iframe apenas quando a página estiver completamente carregada
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadIframe = () => {
        setIsVisible(true);
      };
      
      // Usar requestIdleCallback para carregar em momento ocioso
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadIframe, { timeout: 5000 });
      } else {
        // Fallback para navegadores que não suportam requestIdleCallback
        window.addEventListener('load', () => {
          setTimeout(loadIframe, 2000);
        });
      }
    }
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <iframe
      ref={iframeRef}
      src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
      height="0"
      width="0"
      style={{ display: 'none', visibility: 'hidden' }}
      title="Google Tag Manager"
      loading="lazy"
    />
  );
});

GTMIframe.displayName = 'GTMIframe';

// Componente principal - memoizado para evitar re-renderizações
const ClientScripts = memo(() => {
  const pathname = usePathname();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLCPLoaded, setIsLCPLoaded] = useState(false);
  const [isFIDReady, setIsFIDReady] = useState(false); // Novo estado para o First Input Delay
  const bodyRef = useRef(null);
  
  // Função para pré-conectar a domínios críticos
  const preconnectToCriticalDomains = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const domains = [
      'https://scripts.converteai.net',
      'https://cdn.converteai.net',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com'
    ];
    
    // Pré-conectar apenas aos domínios mais essenciais primeiro
    const criticalDomains = domains.slice(0, 2);
    const nonCriticalDomains = domains.slice(2);
    
    // Pré-conectar imediatamente aos domínios críticos
    criticalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      const dnsLink = document.createElement('link');
      dnsLink.rel = 'dns-prefetch';
      dnsLink.href = domain;
      document.head.appendChild(dnsLink);
    });
    
    // Adiar a pré-conexão para domínios não críticos
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        nonCriticalDomains.forEach(domain => {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
          
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = domain;
          document.head.appendChild(dnsLink);
        });
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        nonCriticalDomains.forEach(domain => {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
          
          const dnsLink = document.createElement('link');
          dnsLink.rel = 'dns-prefetch';
          dnsLink.href = domain;
          document.head.appendChild(dnsLink);
        });
      }, 200);
    }
  }, []);
  
  // Configurar Partytown e carregar scripts após o carregamento da página
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Pré-conectar a domínios críticos imediatamente
    preconnectToCriticalDomains();
    
    // Configurar Partytown se ainda não estiver carregado - adiar para após o primeiro paint
    if (!isPartytownLoaded()) {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          setupPartytown();
        }, { timeout: 3000 });
      } else {
        setTimeout(() => {
          setupPartytown();
        }, 1000);
      }
    }
    
    // Observar quando o corpo da página estiver visível
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPageLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (document.body) {
      observer.observe(document.body);
    }
    
    // Observar o evento LCP
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          setIsLCPLoaded(true);
          lcpObserver.disconnect();
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Observar FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          setIsFIDReady(true);
          fidObserver.disconnect();
        }
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
      
      // Fallback: se o LCP não for detectado em 5 segundos, considerar como carregado
      setTimeout(() => {
        setIsLCPLoaded(true);
        lcpObserver.disconnect();
      }, 5000);
      
      // Fallback para FID
      setTimeout(() => {
        setIsFIDReady(true);
        fidObserver.disconnect();
      }, 6000);
    } else {
      // Fallback para navegadores que não suportam PerformanceObserver
      window.addEventListener('load', () => {
        setTimeout(() => {
          setIsLCPLoaded(true);
          setIsFIDReady(true);
        }, 1000);
      });
    }
    
    return () => {
      observer.disconnect();
    };
  }, [preconnectToCriticalDomains]);
  
  // Carregar scripts não críticos após o LCP e FID
  useEffect(() => {
    if (isLCPLoaded) {
      // Scripts menos críticos após o LCP
      const lcpScripts = [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
          options: {
            id: 'gtag-script',
            async: true,
            defer: true
          }
        }
      ];
      
      // Carregar scripts logo após o LCP
      loadScriptsAfterLCP(lcpScripts);
      
      // Scripts de menor prioridade apenas após FID
      if (isFIDReady) {
        const fidScripts = [
          {
            src: 'https://connect.facebook.net/en_US/fbevents.js',
            options: {
              id: 'fb-pixel-script',
              async: true,
              defer: true
            }
          }
        ];
        
        // Carregar após o usuário poder interagir
        setTimeout(() => {
          loadScriptsAfterLCP(fidScripts);
        }, 50);
      }
    }
  }, [isLCPLoaded, isFIDReady]);
  
  return (
    <>
      {/* Carregar componentes de forma progressiva baseado nos eventos de performance */}
      {isPageLoaded && (
        <>
          <PlayerFallbackScript />
          {isLCPLoaded && (
            <>
              <GoogleTagManagerScript />
              {isFIDReady && (
                <>
                  <ServiceWorkerRegistration />
                  <GTMIframe />
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
});

ClientScripts.displayName = 'ClientScripts';

export default ClientScripts;
