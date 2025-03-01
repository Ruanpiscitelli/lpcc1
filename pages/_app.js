import React, { useEffect, useState } from 'react';
import { inter, roboto, combineClassNames } from '../src/utils/fonts';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Importar os popups de saída de forma dinâmica para evitar problemas com SSR
const MobileExitPopup = dynamic(() => import('../src/components/MobileExitPopup'), {
  ssr: false,
  loading: () => null
});

const DesktopExitPopup = dynamic(() => import('../src/components/DesktopExitPopup'), {
  ssr: false,
  loading: () => null
});

// Função para pré-carregar recursos críticos
function preloadCriticalResources() {
  // Preconnect para domínios críticos
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload de imagens críticas
  const criticalImages = [
    '/images/hero-image.webp',
    '/images/logo.webp'
  ];

  criticalImages.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image;
    document.head.appendChild(link);
  });
}

// Função para carregar scripts não críticos após o carregamento da página
function loadNonCriticalScripts() {
  const scripts = [
    // Lista de scripts não críticos para carregar depois
    { src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX', async: true },
    { src: '/js/analytics.js', defer: true }
  ];

  scripts.forEach(script => {
    const scriptElement = document.createElement('script');
    scriptElement.src = script.src;
    if (script.async) scriptElement.async = true;
    if (script.defer) scriptElement.defer = true;
    document.body.appendChild(scriptElement);
  });
}

export default function MyApp({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Detectar se o dispositivo é móvel e configurar event listeners
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== 'undefined') {
      // Função para verificar se o dispositivo é móvel
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Verificar inicialmente
      checkIfMobile();

      // Adicionar event listener para redimensionamento
      window.addEventListener('resize', checkIfMobile);

      // Pré-carregar recursos críticos
      preloadCriticalResources();

      // Marcar a página como carregada
      setIsPageLoaded(true);

      // Carregar scripts não críticos após o carregamento da página
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          loadNonCriticalScripts();
        });
      } else {
        window.addEventListener('load', () => {
          loadNonCriticalScripts();
        });
      }

      // Limpar event listeners
      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Preload de fontes críticas */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <div className={combineClassNames(inter.variable, roboto.variable)}>
        <Component {...pageProps} />
        {/* Renderizar o popup de saída apropriado com base no dispositivo */}
        {isPageLoaded && (isMobile ? <MobileExitPopup /> : <DesktopExitPopup />)}
      </div>
    </>
  );
} 