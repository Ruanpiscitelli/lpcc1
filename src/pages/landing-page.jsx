import { useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './LandingPage.module.css';
import { inter } from '../utils/font-optimization';
import CriticalImageLoader from '../components/CriticalImageLoader';
import dynamic from 'next/dynamic';

// Carregar componentes não críticos de forma dinâmica
const DynamicContent = dynamic(() => import('../components/DynamicComponents').then(mod => mod.DynamicContactForm), {
  ssr: false,
  loading: () => <div className="loading-placeholder">Carregando conteúdo...</div>
});

export default function LandingPage() {
  const containerRef = useRef(null);
  
  // Reportar o LCP para análise de performance
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Observar o LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const lcpEntry = entries[entries.length - 1];
          console.log('LCP:', lcpEntry.startTime);
          console.log('LCP Element:', lcpEntry.element);
          
          // Marcar o elemento LCP com uma classe para análise visual
          if (lcpEntry.element) {
            lcpEntry.element.classList.add('lcp-element');
          }
          
          lcpObserver.disconnect();
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      return () => {
        lcpObserver.disconnect();
      };
    }
  }, []);
  
  // Função para carregar recursos não críticos após o LCP
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Função para carregar recursos não críticos
    const loadNonCriticalResources = () => {
      // Carregar estilos adicionais
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = '/styles/non-critical.css';
      document.head.appendChild(linkElement);
      
      // Carregar scripts não críticos
      const scriptElement = document.createElement('script');
      scriptElement.src = '/scripts/analytics.js';
      scriptElement.defer = true;
      scriptElement.async = true;
      document.body.appendChild(scriptElement);
    };
    
    // Usar requestIdleCallback para carregar recursos não críticos quando o navegador estiver ocioso
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNonCriticalResources, { timeout: 5000 });
    } else {
      // Fallback para navegadores que não suportam requestIdleCallback
      setTimeout(loadNonCriticalResources, 2000);
    }
  }, []);
  
  return (
    <>
      <Head>
        {/* Meta tags para melhorar a performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <title>Landing Page Otimizada</title>
        <meta name="description" content="Landing page com otimizações para melhorar o LCP" />
        
        {/* Preconnect para domínios críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
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
          .${styles.heroContainer} {
            position: relative;
            width: 100%;
            max-width: 1200px;
            height: auto;
            aspect-ratio: 3 / 2;
            background-color: #f0f0f0;
            overflow: hidden;
          }
          
          @media (max-width: 768px) {
            .${styles.heroContainer} {
              aspect-ratio: 4 / 3;
            }
          }
          
          /* Prevenir layout shifts */
          .${styles.heroImage} {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          /* Otimização para o GPU */
          .${styles.heroImage} {
            transform: translateZ(0);
            will-change: transform;
          }
          
          /* Destacar o elemento LCP para debug */
          .lcp-element {
            outline: 2px solid red;
          }
        `}} />
      </Head>
      
      <div className={`${styles.landingPage} ${inter.variable}`} ref={containerRef}>
        {/* Container para a imagem hero com dimensões definidas */}
        <div className={styles.heroContainer}>
          {/* Componente otimizado para carregar a imagem crítica para o LCP */}
          <CriticalImageLoader
            src="/imagens/hero.jpg"
            alt="Hero da Landing Page"
            width={1200}
            height={800}
            quality={90}
            className={styles.heroImage}
          />
        </div>
        
        <h1 className={styles.title}>Bem-vindo à Landing Page</h1>
        <p className={styles.description}>Conteúdo crítico que precisa ser renderizado o quanto antes.</p>
        
        {/* Conteúdo não crítico carregado dinamicamente */}
        <DynamicContent />
      </div>
    </>
  );
} 