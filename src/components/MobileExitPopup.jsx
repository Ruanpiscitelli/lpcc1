'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import styles from '../styles/MobileExitPopup.module.css';

// Configurações do exit intent para mobile
const SCROLL_THRESHOLD = 50; // Distância de scroll para cima para acionar o popup
const INACTIVITY_THRESHOLD = 30000; // 30 segundos de inatividade
const SESSION_DURATION = 45000; // 45 segundos na página

const MobileExitPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const lastActivityTime = useRef(Date.now());
  const sessionStartTime = useRef(Date.now());
  const popupRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const sessionTimerRef = useRef(null);

  // Verificar se o popup já foi mostrado nesta sessão
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      const hasShown = sessionStorage.getItem('exitPopupShown') === 'true';
      setHasShownPopup(hasShown);
    }
  }, []);

  // Função para mostrar o popup
  const showExitPopup = useCallback(() => {
    if (!hasShownPopup && mounted) {
      setShowPopup(true);
      setHasShownPopup(true);
      sessionStorage.setItem('exitPopupShown', 'true');
      
      // Registrar evento de analytics (se disponível)
      if (window.gtag) {
        window.gtag('event', 'exit_popup_shown', {
          'event_category': 'Engagement',
          'event_label': 'Mobile Exit Popup'
        });
      }
      
      // Limpar todos os timers quando o popup é mostrado
      clearAllTimers();
    }
  }, [hasShownPopup, mounted]);

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
        'event_label': action
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
    
    // Atualizar o tempo da última atividade
    lastActivityTime.current = Date.now();
    
    // Limpar o timer existente
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    
    // Verificar se o usuário está rolando rapidamente para cima
    if (currentScrollY < lastScrollY.current && 
        lastScrollY.current - currentScrollY > SCROLL_THRESHOLD && 
        currentScrollY < 300) {
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
      
      // Limpar event listeners
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        
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
    checkSessionDuration
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

  // Renderizar o popup usando createPortal para garantir que ele seja renderizado no body
  return showPopup ? createPortal(
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
          <h2 className={styles.exitPopupTitle}>Espere!</h2>
          <h3 className={styles.exitPopupSubtitle}>Temos uma oferta especial para você</h3>
        </div>
        
        <div className={styles.exitPopupText}>
          <p>Antes de sair, queremos oferecer um desconto exclusivo só para você.</p>
          
          <div className={styles.offerHighlight}>
            <span className={styles.discount}>20% OFF</span>
            <p>Em sua primeira compra</p>
            <span className={styles.timeLimit}>Válido por 24 horas</span>
          </div>
          
          <p>Aproveite esta oportunidade única para experimentar nosso produto com um desconto especial!</p>
        </div>
        
        <div className={styles.exitPopupButtons}>
          <button 
            className={styles.continueButton} 
            onClick={handleDiscountClick}
          >
            Quero aproveitar o desconto!
          </button>
          <button 
            className={styles.noThanksButton} 
            onClick={() => closePopup('declined_offer')}
          >
            Não, obrigado
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) : null;
};

export default MobileExitPopup; 