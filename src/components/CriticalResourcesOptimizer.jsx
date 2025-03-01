'use client';

import { useEffect, memo } from 'react';
import Head from 'next/head';
import { inter } from '../utils/font-optimization';

/**
 * Componente responsável por otimizar o carregamento de recursos críticos
 * para melhorar o LCP (Largest Contentful Paint)
 */
const CriticalResourcesOptimizer = memo(() => {
  // Função para pré-carregar recursos críticos
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Função para criar e adicionar links de preconnect
    const addPreconnect = (url, crossOrigin = true) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      if (crossOrigin) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      // Adicionar dns-prefetch como fallback
      const dnsLink = document.createElement('link');
      dnsLink.rel = 'dns-prefetch';
      dnsLink.href = url;
      document.head.appendChild(dnsLink);
    };

    // Pré-conectar a domínios críticos
    const criticalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://scripts.converteai.net',
      'https://cdn.converteai.net'
    ];
    
    criticalDomains.forEach(domain => addPreconnect(domain));

    // Detectar conexão lenta e ajustar a experiência
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Desabilitar animações em conexões lentas
        document.documentElement.classList.add('slow-connection');
        const style = document.createElement('style');
        style.textContent = '* { animation-duration: 0.001s !important; transition-duration: 0.001s !important; }';
        document.head.appendChild(style);
        
        // Carregar versões de baixa resolução das imagens
        document.documentElement.classList.add('low-res-images');
      }
    }

    // Observar o LCP para análise de performance
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lcpEntry = entries[entries.length - 1];
          
          // Registrar o LCP para análise (pode ser enviado para analytics)
          console.log('LCP:', lcpEntry.startTime);
          console.log('LCP Element:', lcpEntry.element);
          
          // Marcar que o LCP foi carregado
          document.documentElement.classList.add('lcp-loaded');
          
          lcpObserver.disconnect();
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }

    // Adicionar suporte para carregamento de imagens nativas com lazy loading
    if ('loading' in HTMLImageElement.prototype) {
      document.documentElement.classList.add('lazy-loading-supported');
    } else {
      // Remover o import dinâmico de lazysizes e usar uma solução mais simples
      console.log('Navegador não suporta lazy loading nativo - usando alternativa');
      // Você pode adicionar uma solução mais simples aqui se necessário
    }
  }, []);

  return (
    <Head>
      {/* Preload da imagem crítica para o LCP */}
      <link 
        rel="preload" 
        href="/imagens/hero.jpg" 
        as="image" 
        fetchpriority="high" 
        type="image/jpeg" 
      />
      
      {/* Preload da fonte crítica */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Inline Critical CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Estilos críticos para o LCP */
        .heroContainer {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: auto;
          aspect-ratio: 3 / 2;
          background-color: #f0f0f0;
          overflow: hidden;
        }
        
        @media (max-width: 768px) {
          .heroContainer {
            aspect-ratio: 4 / 3;
          }
        }
        
        /* Prevenir layout shifts */
        img.heroImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Otimização para o GPU */
        .heroImage {
          transform: translateZ(0);
          will-change: transform;
        }
      `}} />
      
      {/* Meta tags para otimização de performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
});

CriticalResourcesOptimizer.displayName = 'CriticalResourcesOptimizer';

export default CriticalResourcesOptimizer; 