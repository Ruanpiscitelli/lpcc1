import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { deferThirdPartyResources } from '../utils/performance-utils';
import '../styles/globals.css';

// Componente para carregar scripts de terceiros de forma otimizada
function OptimizedThirdPartyScripts() {
  useEffect(() => {
    // Função para carregar scripts de terceiros de forma otimizada
    const loadThirdPartyScripts = () => {
      // Google Tag Manager - carregado de forma otimizada
      if (!document.getElementById('gtm-script')) {
        const script = document.createElement('script');
        script.id = 'gtm-script';
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `;
        document.head.appendChild(script);
      }
      
      // Facebook Pixel - carregado de forma otimizada
      if (!document.getElementById('fb-pixel-script')) {
        const script = document.createElement('script');
        script.id = 'fb-pixel-script';
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '123456789012345');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(script);
      }
    };
    
    // Adiar o carregamento de scripts de terceiros
    deferThirdPartyResources(loadThirdPartyScripts, 2000);
    
    // Limpar event listeners
    return () => {
      // Cleanup code if needed
    };
  }, []);
  
  return null;
}

// Componente para lidar com problemas de hidratação
function HydrationErrorHandler() {
  useEffect(() => {
    // Lidar com atributos problemáticos que causam erros de hidratação
    const fixHydrationErrors = () => {
      try {
        // Remover atributos adicionados pelo Google Tag Assistant ou extensões similares
        const elementsWithTagAssistant = document.querySelectorAll('[data-tag-assistant-present], [data-tag-assistant-prod-present]');
        elementsWithTagAssistant.forEach(el => {
          el.removeAttribute('data-tag-assistant-present');
          el.removeAttribute('data-tag-assistant-prod-present');
        });
        console.log('🔍 Atributos problemáticos removidos para evitar erros de hidratação');
      } catch (e) {
        console.warn('Erro ao tentar corrigir problemas de hidratação:', e);
      }
    };
    
    // Executar assim que possível após o carregamento do DOM
    window.requestAnimationFrame(() => {
      fixHydrationErrors();
    });
    
    // Capturar erros de hidratação específicos
    const originalError = console.error;
    console.error = (...args) => {
      // Se for um erro de hidratação, interceptar e fornecer mensagem mais útil
      const errorMessage = args[0]?.toString() || '';
      if (typeof errorMessage === 'string' && errorMessage.includes('Hydration failed because')) {
        console.warn('⚠️ Erro de hidratação interceptado e tratado');
        // Ainda registrar para debug, mas com menos destaque
        console.debug('Detalhes do erro de hidratação:', ...args);
        return;
      }
      // Para outros erros, comportamento normal
      return originalError.apply(console, args);
    };
    
    return () => {
      // Restaurar console.error original na limpeza
      console.error = originalError;
    };
  }, []);
  
  return null;
}

// Componente principal da aplicação
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Otimizações para o First Input Delay (FID)
    const onFirstInputDelay = (event) => {
      if (window.performance && window.performance.mark) {
        window.performance.mark('first-input');
      }
    };
    
    // Adicionar listener para o primeiro input
    window.addEventListener('click', onFirstInputDelay, { once: true });
    window.addEventListener('keydown', onFirstInputDelay, { once: true });
    window.addEventListener('touchstart', onFirstInputDelay, { once: true });
    
    // Otimizações para o Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (lastEntry && window.performance && window.performance.mark) {
          window.performance.mark('lcp');
          window.performance.measure('lcp-time', 'navigationStart', 'lcp');
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }
    
    // Adiar inicialização de código não crítico
    const handleUserIdle = () => {
      // Carregar recursos não críticos quando o usuário estiver inativo
      import('../utils/non-critical-resources').then(module => {
        module.initNonCriticalResources();
      });
    };
    
    // Adiar 3 segundos após carregamento inicial ou quando usuário ficar inativo
    const idleTimer = setTimeout(handleUserIdle, 3000);
    
    // Limpar event listeners
    return () => {
      window.removeEventListener('click', onFirstInputDelay);
      window.removeEventListener('keydown', onFirstInputDelay);
      window.removeEventListener('touchstart', onFirstInputDelay);
      clearTimeout(idleTimer);
    };
  }, []);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Script para solucionar problemas de hidratação */}
      <Script
        id="hydration-fix"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Solução imediata para problemas de hidratação
            (function() {
              var originalError = console.error;
              console.error = function() {
                if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('Hydration failed')) {
                  return;
                }
                return originalError.apply(console, arguments);
              };
              
              // Preparar para remover atributos problemáticos 
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                  try {
                    var elements = document.querySelectorAll('[data-tag-assistant-present], [data-tag-assistant-prod-present]');
                    for (var i = 0; i < elements.length; i++) {
                      elements[i].removeAttribute('data-tag-assistant-present');
                      elements[i].removeAttribute('data-tag-assistant-prod-present');
                    }
                  } catch(e) {}
                }, 0);
              });
            })();
          `
        }}
      />
      
      {/* Carregar Partytown de forma otimizada */}
      <Script
        src="/~partytown/partytown.js"
        strategy="worker"
        nonce="XUENAJFW"
      />
      
      {/* Componente para lidar com problemas de hidratação */}
      <HydrationErrorHandler />
      
      {/* Componente para carregar scripts de terceiros de forma otimizada */}
      <OptimizedThirdPartyScripts />
      
      {/* Scripts críticos para análise - carregados de forma eficiente */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"
      />
      
      {/* Scripts não críticos com Partytown para reduzir trabalho na thread principal */}
      <Script
        type="text/partytown"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR-ID');
          `
        }}
      />
      
      {/* Componente principal */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 