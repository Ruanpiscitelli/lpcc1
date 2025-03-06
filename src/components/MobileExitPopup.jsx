'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import styles from '../styles/MobileExitPopup.module.css';
import { usePathname } from 'next/navigation';

// Configurações do exit intent para mobile
const SCROLL_THRESHOLD = 40; // Reduzido para maior sensibilidade
const INACTIVITY_THRESHOLD = 30000; // 30 segundos de inatividade
const SESSION_DURATION = 45000; // 45 segundos na página
const POPUP_COOLDOWN = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

const MobileExitPopup = () => {
  const pathname = usePathname();
  
  // Se não estiver em nenhuma das rotas corretas, retorna null imediatamente
  if (!['/cf1', '/cf2', '/cf1-escrito'].includes(pathname)) return null;

  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [popupStyle, setPopupStyle] = useState("overlay"); // "overlay" ou "bottomBanner"
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const lastActivityTime = useRef(Date.now());
  const sessionStartTime = useRef(Date.now());
  const popupRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const sessionTimerRef = useRef(null);
  const previousScrollRef = useRef(0);

  // Verificar se o popup já foi mostrado recentemente (com localStorage para persistência)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      
      // Verificar exibição na sessão atual
      const hasShownInSession = sessionStorage.getItem('exitPopupShown') === 'true';
      
      // Verificar cooldown (em localStorage para persistir entre sessões)
      const lastShownTime = localStorage.getItem('exitPopupLastShown');
      const now = Date.now();
      
      // Se já foi mostrado nas últimas 24 horas, não mostrar novamente
      const isInCooldownPeriod = lastShownTime && (now - parseInt(lastShownTime) < POPUP_COOLDOWN);
      
      setHasShownPopup(hasShownInSession || isInCooldownPeriod);
      
      // Determinar tipo de popup baseado na altura da tela
      // Para telas menores, usar bottomBanner
      if (window.innerHeight < 700) {
        setPopupStyle("bottomBanner");
      }
      
      // Configurar listener para o botão voltar
      configureBackButtonDetection();
    }
  }, []);
  
  // Detectar uso do botão voltar
  const configureBackButtonDetection = useCallback(() => {
    // Salvar o estado atual da navegação
    window.history.pushState(null, document.title, window.location.href);
    
    // Quando o usuário pressionar voltar, mostrar popup e prevenir navegação
    window.addEventListener('popstate', (e) => {
      // Prevenir navegação real
      window.history.pushState(null, document.title, window.location.href);
      // Mostrar popup
      showExitPopup();
    });
  }, []);

  // Função para mostrar o popup
  const showExitPopup = useCallback(() => {
    if (!hasShownPopup && mounted) {
      setShowPopup(true);
      setHasShownPopup(true);
      sessionStorage.setItem('exitPopupShown', 'true');
      
      // Salvar timestamp no localStorage para limitar frequência
      localStorage.setItem('exitPopupLastShown', Date.now().toString());
      
      // Registrar evento de analytics (se disponível)
      if (window.gtag) {
        window.gtag('event', 'exit_popup_shown', {
          'event_category': 'Engagement',
          'event_label': 'Mobile Exit Popup',
          'popup_style': popupStyle
        });
      }
      
      // Limpar todos os timers quando o popup é mostrado
      clearAllTimers();
    }
  }, [hasShownPopup, mounted, popupStyle]);

  // Limpar todos os timers
  const clearAllTimers = () => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
  };

  // Fechar o popup
  const closePopup = (action) => {
    setShowPopup(false);
    
    // Registrar evento de analytics (se disponível)
    if (window.gtag) {
      window.gtag('event', 'exit_popup_action', {
        'event_category': 'Engagement',
        'event_label': action,
        'popup_style': popupStyle
      });
    }
  };

  // Lidar com o clique no botão de desconto
  const handleDiscountClick = () => {
    // Aqui você pode redirecionar para a página de checkout com desconto
    // window.location.href = '/checkout?discount=SPECIAL20';
    
    // Para este exemplo, apenas fechamos o popup
    closePopup('accepted_offer');
  };

  // Detectar scroll rápido para cima (comportamento de saída em dispositivos móveis)
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime.current;
    
    // Calcular velocidade de scroll (pixels/ms)
    if (timeDelta > 0) {
      scrollVelocity.current = Math.abs(currentScrollY - lastScrollY.current) / timeDelta;
    }
    
    // Atualizar o tempo da última atividade
    lastActivityTime.current = currentTime;
    lastScrollTime.current = currentTime;
    
    // Limpar o timer existente
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    
    // Verificar se o usuário está rolando rapidamente para cima no topo da página
    if (currentScrollY < previousScrollRef.current && 
        previousScrollRef.current - currentScrollY > SCROLL_THRESHOLD && 
        currentScrollY < 200 &&
        scrollVelocity.current > 0.5) { // Verifica se a rolagem é rápida o suficiente
      
      scrollTimerRef.current = setTimeout(() => {
        showExitPopup();
      }, 100);
    }
    
    // Verificar se o usuário rolou até o final da página
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (pageHeight - scrollPosition < 200) {
      // O usuário está próximo do final da página
      scrollTimerRef.current = setTimeout(() => {
        showExitPopup();
      }, 500);
    }
    
    previousScrollRef.current = currentScrollY;
    lastScrollY.current = currentScrollY;
  }, [showExitPopup]);

  // Detectar quando a página perde o foco
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      // O usuário mudou de aba ou minimizou a janela
      showExitPopup();
    }
  }, [showExitPopup]);

  // Verificar inatividade do usuário
  const checkInactivity = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastActivityTime.current > INACTIVITY_THRESHOLD) {
      showExitPopup();
    } else {
      inactivityTimerRef.current = setTimeout(checkInactivity, 5000); // Verificar a cada 5 segundos
    }
  }, [showExitPopup]);

  // Verificar duração da sessão
  const checkSessionDuration = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - sessionStartTime.current > SESSION_DURATION) {
      showExitPopup();
    }
  }, [showExitPopup]);

  // Registrar atividade do usuário
  const handleUserActivity = useCallback(() => {
    lastActivityTime.current = Date.now();
  }, []);

  // Configurar event listeners
  useEffect(() => {
    if (mounted && !hasShownPopup) {
      // Iniciar timers
      inactivityTimerRef.current = setTimeout(checkInactivity, INACTIVITY_THRESHOLD);
      sessionTimerRef.current = setTimeout(checkSessionDuration, SESSION_DURATION);
      
      // Adicionar event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Event listeners para registrar atividade
      ['touchstart', 'touchmove', 'click', 'keydown'].forEach(event => {
        document.addEventListener(event, handleUserActivity, { passive: true });
      });
      
      // Orientação da tela (detectar mudança de orientação)
      window.addEventListener('orientationchange', () => {
        // Geralmente, mudar a orientação do dispositivo indica que o usuário está engajado
        // mas pode ser um bom momento para mostrar o popup
        setTimeout(() => {
          if (Math.random() > 0.5) { // 50% de chance de mostrar na mudança de orientação
            showExitPopup();
          }
        }, 1000);
      });
      
      // Limpar event listeners
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('orientationchange', showExitPopup);
        
        ['touchstart', 'touchmove', 'click', 'keydown'].forEach(event => {
          document.removeEventListener(event, handleUserActivity);
        });
        
        clearAllTimers();
      };
    }
  }, [
    mounted,
    hasShownPopup,
    handleScroll,
    handleVisibilityChange,
    handleUserActivity,
    checkInactivity,
    checkSessionDuration,
    showExitPopup
  ]);

  // Lidar com clique fora do popup para fechá-lo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup('clicked_outside');
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside, { passive: true });
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showPopup]);

  // Não renderizar nada no servidor
  if (!mounted) return null;

  // Determinar qual componente renderizar baseado no estilo selecionado
  const renderPopupContent = () => {
    const content = pathname === '/cf1-escrito' ? {
      title: "PARE AGORA!",
      subtitle: "Sua Aposentadoria Está em Risco",
      message: "Não feche esta página! Enquanto você hesita, sua aposentadoria está perdendo valor a cada segundo."
    } : {
      title: "Espere!",
      subtitle: "Não Perca Esta Oportunidade Única",
      message: "Antes de sair, queremos oferecer um desconto exclusivo só para você."
    };
    
    if (popupStyle === "bottomBanner") {
      return (
        <div className={styles.bottomBanner} ref={popupRef}>
          <button 
            className={styles.closeButtonBanner} 
            onClick={() => closePopup('clicked_close')}
            aria-label="Fechar popup"
          >
            ×
          </button>
          
          <div className={styles.bannerContent}>
            <div className={styles.bannerText}>
              <h3 className={styles.bannerTitle}>{content.title}</h3>
              {pathname === '/cf1-escrito' ? (
                <p>Última chance de garantir {' '}
                  <span style={{ color: '#ff0000', fontWeight: 'bold' }}>70% OFF</span>
                  {' '} no Sistema Automático de Renda!
                </p>
              ) : (
                <p>Aproveite {' '}
                  <span style={{ fontWeight: 'bold' }}>20% OFF</span>
                  {' '} na sua primeira compra!
                </p>
              )}
            </div>
            
            <button 
              className={styles.bannerButton} 
              onClick={handleDiscountClick}
            >
              {pathname === '/cf1-escrito' ? 'GARANTIR FUTURO AGORA' : 'APROVEITAR 20% OFF'}
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className={styles.exitPopupOverlay}>
        <div className={styles.exitPopupContent} ref={popupRef}>
          <button 
            className={styles.closeButton} 
            onClick={() => closePopup('clicked_close')}
            aria-label="Fechar popup"
          >
            ×
          </button>
          
          <div className={styles.popupHeader}>
            <h2 className={styles.exitPopupTitle}>{content.title}</h2>
            <h3 className={styles.exitPopupSubtitle}>{content.subtitle}</h3>
          </div>
          
          <div className={styles.exitPopupText}>
            <p>{content.message}</p>
            
            <div className={styles.offerHighlight}>
              {pathname === '/cf1-escrito' ? (
                <>
                  <span className={styles.discount} style={{ color: '#ff0000' }}>70% OFF</span>
                  <p>No Sistema Automático de Renda</p>
                  <span className={styles.timeLimit}>ÚLTIMA CHANCE - Oferta expira em breve!</span>
                </>
              ) : (
                <>
                  <span className={styles.discount}>20% OFF</span>
                  <p>Em sua primeira compra</p>
                  <span className={styles.timeLimit}>Válido por 24 horas</span>
                </>
              )}
            </div>
            
            {pathname === '/cf1-escrito' ? (
              <p>Junte-se aos milhares de servidores que já estão protegendo seu futuro financeiro com nosso sistema que gera R$5.000 por semana de forma automática!</p>
            ) : (
              <p>Aproveite esta oportunidade única para experimentar nosso produto com um desconto especial!</p>
            )}
          </div>
          
          <div className={styles.exitPopupButtons}>
            <button 
              className={styles.continueButton} 
              onClick={handleDiscountClick}
            >
              {pathname === '/cf1-escrito' ? 'QUERO GARANTIR MEU FUTURO AGORA!' : 'QUERO COMEÇAR AGORA!'}
            </button>
            <button 
              className={styles.noThanksButton} 
              onClick={() => closePopup('declined_offer')}
            >
              {pathname === '/cf1-escrito' ? 'Não, prefiro arriscar minhas economias' : 'Não, prefiro perder esta oportunidade'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar o popup usando createPortal para garantir que ele seja renderizado no body
  return showPopup ? createPortal(
    renderPopupContent(),
    document.body
  ) : null;
};

export default MobileExitPopup; 