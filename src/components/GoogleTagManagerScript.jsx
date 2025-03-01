'use client';

import Script from 'next/script';
import React, { useEffect } from 'react';
import { deferNonCriticalScript, optimizeBFCache, runWhenIdle } from '../utils/performance-utils';
import { isPartytownLoaded } from '../utils/partytown-config';

export default function GoogleTagManagerScript() {
  useEffect(() => {
    // Verificar se o Partytown está carregado antes de inicializar o dataLayer
    const initializeDataLayer = () => {
      // Inicializar o dataLayer com um atraso maior para não impactar o carregamento inicial
      deferNonCriticalScript(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        });
      }, 5000); // Aumentar o atraso para 5 segundos
    };

    // Verificar se o Partytown está carregado antes de inicializar o dataLayer
    if (isPartytownLoaded()) {
      initializeDataLayer();
    } else {
      // Tentar novamente após um atraso
      setTimeout(() => {
        initializeDataLayer();
      }, 3000);
    }

    // Otimizar para back/forward cache
    optimizeBFCache();

    // Executar tarefas não críticas quando o navegador estiver ocioso
    runWhenIdle(() => {
      // Pré-carregar recursos que serão necessários mais tarde
      const linkPrefetch = document.createElement('link');
      linkPrefetch.rel = 'prefetch';
      linkPrefetch.href = 'https://www.google-analytics.com/analytics.js';
      document.head.appendChild(linkPrefetch);
    }, { timeout: 5000 }); // Adicionar timeout para garantir que execute eventualmente

    return () => {
      // Cleanup se necessário
    };
  }, []);

  // Garantir que o script só seja renderizado no cliente
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div suppressHydrationWarning>
      {/* Carregar o script do GTM com prioridade baixa usando a estratégia afterInteractive */}
      <Script 
        id="google-tag-manager" 
        strategy="afterInteractive" // Mudar para afterInteractive para melhor performance
        src="https://www.googletagmanager.com/gtm.js?id=GTM-PKD2BDQ"
        onLoad={() => {
          // Marcar como carregado para métricas de performance
          if (window.performance && window.performance.mark) {
            window.performance.mark('gtm-loaded');
          }
        }}
        onError={(e) => {
          console.error('Erro ao carregar o GTM:', e);
          // Tentar carregar novamente com estratégia de fallback, mas com atraso maior
          setTimeout(() => {
            runWhenIdle(() => {
              const script = document.createElement('script');
              script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-PKD2BDQ";
              script.async = true;
              script.defer = true;
              document.body.appendChild(script);
            }, { timeout: 3000 });
          }, 7000); // Atrasar a tentativa de fallback
        }}
      />
    </div>
  );
}
