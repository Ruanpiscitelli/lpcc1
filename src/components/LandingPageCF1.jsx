'use client';

import React, { useEffect, memo, lazy, Suspense } from 'react';
import Link from 'next/link';
import styles from '../styles/LandingPage.module.css';
import { optimizeBFCache } from '../utils/performance-utils';
import VideoPlayerCF1 from './VideoPlayerCF1';
import { loadScriptWithFallback } from '../utils/fallback-scripts';
import ClientExitPopupWrapper from './ClientExitPopupWrapper';

// Lazy loading para componentes não críticos
const FooterAccordion = lazy(() => import('./FooterAccordion'));

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
      <a href="/cf1/terms" aria-label="Termos e Condições">Termos e Condições</a>
      <span>|</span>
      <a href="/cf1/privacy" aria-label="Política de Privacidade">Política de Privacidade</a>
    </div>
  </div>
));

Footer.displayName = 'Footer';

// Componente principal memoizado
const LandingPageCF1 = memo(() => {
  useEffect(() => {
    // Otimizar para Back/Forward Cache
    optimizeBFCache();

    // Preconnect com domínios críticos
    const preconnectUrls = [
      'https://scripts.converteai.net',
      'https://cdn.converteai.net',
      'https://player-vz-6759dd77d-07a.tv.pandavideo.com.br',
      'https://player-vz-6759dd77d-07a.tv.pandavideo.com.br'
    ];

    preconnectUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload recursos críticos
    const preloadResources = [
      {
        url: 'https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js',
        as: 'script'
      },
      {
        url: 'https://cdn.converteai.net/lib/js/smartplayer/v1/smartplayer.min.js',
        as: 'script'
      }
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.as;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Carregar recursos não críticos quando o navegador estiver ocioso
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Carregar recursos não críticos aqui
      });
    } else {
      setTimeout(() => {
        // Fallback para navegadores que não suportam requestIdleCallback
      }, 1);
    }

    // Cleanup
    return () => {
      // Remover elementos criados dinamicamente se necessário
    };
  }, []);

  return (
    <>
      {/* Exit Popup */}
      <ClientExitPopupWrapper />
      
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
                <VideoPlayerCF1 />
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

LandingPageCF1.displayName = 'LandingPageCF1';

export default LandingPageCF1; 