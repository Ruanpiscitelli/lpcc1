'use client';

import React, { useEffect, memo, lazy, Suspense } from 'react';
import Link from 'next/link';
import styles from '../styles/LandingPage.module.css';
import { optimizeBFCache } from '../utils/performance-utils';
import VideoPlayerCF2 from './VideoPlayerCF2';
import { loadScriptWithFallback } from '../utils/fallback-scripts';

// Lazy loading para componentes não críticos
const FooterAccordion = lazy(() => import('./FooterAccordion'));
const ExitPopup = lazy(() => import('./ExitPopup'));

// Componente de fallback para componentes lazy
const FallbackComponent = () => <div style={{ minHeight: '50px' }}></div>;

// Memoizar componentes estáticos para evitar re-renderizações
const WarningBar = memo(() => (
  <div className={styles.background2}>
    <p className={styles.warningText}>Ex-entregador de gás QUEBRA O SILÊNCIO e alerta sobre o colapso iminente da sua aposentadoria...</p>
  </div>
));

WarningBar.displayName = 'WarningBar';

const Header = memo(() => (
  <header className={styles.header}>
    {/* Box vermelho */}
    <div className={styles.backgroundBorder}>
      <div className={styles.heading}>
        <div className={styles.overlapGroup}>
          <div className={styles.reignOfTerror}>A Bomba-Relógio da Aposentadoria do Servidor</div>
        </div>
      </div>
    </div>
    
    {/* Box branco */}
    <div className={styles.background}>
      <div className={styles.headingStrongNo}>
        <div className={styles.headingMain}>Nesse exato momento seu patrimônio tá derretendo...</div>
        <div className={styles.headingSecondary}>mas eu tenho a solução!</div>
      </div>
      <div className={styles.takeFourWrapper}>
        <div className={styles.takeFour}>
          <span>Aplique esse sistema de </span>
          <span className={styles.textBold}>três cliques</span>
          <span> para proteger seu patrimônio — </span>
          <span className={styles.textBold}>ENQUANTO AINDA DÁ TEMPO!</span>
        </div>
      </div>
    </div>
    
    {/* Triângulo branco */}
    <div className={styles.border}></div>
    
    {/* Borda gradiente (visível apenas no desktop) */}
    <div className={styles.gradientBorder}></div>
  </header>
));

Header.displayName = 'Header';

const Footer = memo(() => (
  <div className={styles.container2}>
    {/* Aviso de risco de investimento */}
    <p className={styles.disclaimerText}>
      Investimentos envolvem riscos e podem causar perdas ao investidor. Certifique-se dos riscos e se o investimento faz sentido para o seu perfil antes de investir. Não há garantia de retorno. Retornos passados não garantem retornos futuros.
    </p>
    
    {/* Aviso importante */}
    <Suspense fallback={<FallbackComponent />}>
      <FooterAccordion />
    </Suspense>
    
    <p className={styles.footer}>
      <span>Copyright © 2025 - Todos os direitos reservados.</span>
    </p>
    <div className={styles.footerLinks}>
      <a href="/cf2/terms" aria-label="Termos e Condições">Termos e Condições</a>
      <span>|</span>
      <a href="/cf2/privacy" aria-label="Política de Privacidade">Política de Privacidade</a>
    </div>
  </div>
));

Footer.displayName = 'Footer';

// Componente principal memoizado
const LandingPageCF2 = memo(function LandingPageCF2() {
  useEffect(() => {
    // Otimizar para back/forward cache
    optimizeBFCache();
    
    // Pré-conectar a domínios importantes - movido para um módulo separado
    const preconnectToDomains = (domains) => {
      if (typeof document === 'undefined') return;
      
      const fragment = document.createDocumentFragment();
      domains.forEach(domain => {
        if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
          const link = document.createElement('link');
          link.rel = 'preconnect';
          link.href = domain;
          link.crossOrigin = 'anonymous';
          fragment.appendChild(link);
        }
      });
      
      document.head.appendChild(fragment);
    };
    
    // Pré-conectar apenas aos domínios mais críticos inicialmente
    preconnectToDomains([
      'https://images.converteai.net',
      'https://scripts.converteai.net',
      'https://cdn.converteai.net'
    ]);
    
    // Pré-carregar recursos críticos com prioridade
    const preloadCriticalResources = () => {
      const resources = [
        { href: 'https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/6759dd77d07a5ff5c7ca43f4/embed.html', as: 'document', rel: 'preload' },
        { href: 'https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js', as: 'script', rel: 'preload', 'data-id': '6759dd77d07a5ff5c7ca43f4' }
      ];
      
      const fragment = document.createDocumentFragment();
      resources.forEach(resource => {
        if (!document.querySelector(`link[rel="${resource.rel}"][href="${resource.href}"]`)) {
          const link = document.createElement('link');
          link.rel = resource.rel;
          link.href = resource.href;
          link.as = resource.as;
          fragment.appendChild(link);
        }
      });
      
      document.head.appendChild(fragment);
    };
    
    // Executar preload após um pequeno atraso para não competir com recursos críticos
    setTimeout(preloadCriticalResources, 300);

    // Carregar recursos não críticos apenas quando o navegador estiver ocioso
    const loadNonCriticalResources = () => {
      // Pré-conectar a domínios secundários
      preconnectToDomains(['https://cdnjs.cloudflare.com']);
      
      // Carregar lazysizes de forma otimizada
      if (!document.querySelector('script[src*="lazysizes"]')) {
        loadScriptWithFallback(
          'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js',
          {
            async: true,
            crossOrigin: "anonymous",
            referrerPolicy: "origin"
          },
          () => console.log('Lazysizes carregado com sucesso'),
          (error) => console.error('Falha ao carregar lazysizes:', error)
        );
      }
    };
    
    // Usar requestIdleCallback para carregar recursos não críticos
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNonCriticalResources, { timeout: 2000 });
    } else {
      // Fallback para navegadores que não suportam requestIdleCallback
      setTimeout(loadNonCriticalResources, 1000);
    }
    
    // Limpar event listeners e timeouts
    return () => {
      // Cleanup code if needed
    };
  }, []);
  
  return (
    <>
      {/* Exit Popup - carregado de forma lazy com prioridade baixa */}
      <Suspense fallback={null}>
        {typeof window !== 'undefined' && window.innerWidth > 768 ? (
          <ExitPopup />
        ) : null}
      </Suspense>
      
      <div className={styles.frame}>
        <div className={styles.body}>
          {/* Barra de aviso fixa no topo */}
          <WarningBar />
          
          {/* Conteúdo principal */}
          <div className={styles.main}>
            <div className={styles.container}>
              {/* Cabeçalho com boxes vermelho e branco */}
              <Header />
              
              {/* Wrapper do vídeo - estrutura otimizada para melhorar o LCP */}
              <div className={`${styles.borderWrapper} player-wrapper`}>
                <VideoPlayerCF2 />
              </div>
            </div>
          </div>
          
          {/* Rodapé */}
          <Footer />
        </div>
      </div>
    </>
  );
});

LandingPageCF2.displayName = 'LandingPageCF2';

export default LandingPageCF2; 