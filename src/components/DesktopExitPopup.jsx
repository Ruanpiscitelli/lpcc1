'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import styles from '../styles/DesktopExitPopup.module.css';

// Configurações do exit intent
const EXIT_INTENT_SENSITIVITY = 20; // Sensibilidade para detectar movimento para cima
const INACTIVITY_THRESHOLD = 60000; // 60 segundos de inatividade
const SESSION_DURATION = 30000; // 30 segundos na página

const DesktopExitPopup = () => {
  const pathname = usePathname();
  
  // Se não estiver em nenhuma das rotas corretas, retorna null imediatamente
  if (!['/cf1', '/cf2', '/cf1-escrito'].includes(pathname)) return null;
  
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastActivityTime = useRef(Date.now());
  const sessionStartTime = useRef(Date.now());
  const mousePosition = useRef({ x: 0, y: 0 });
  const popupRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const sessionTimerRef = useRef(null);

  // Verificar se já foi mostrado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      const hasShown = sessionStorage.getItem('exitPopupShown') === 'true';
      setHasShownPopup(hasShown);
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
  }, []);

  const showExitPopup = useCallback(() => {
    if (!hasShownPopup && mounted) {
      setShowPopup(true);
      setHasShownPopup(true);
      sessionStorage.setItem('exitPopupShown', 'true');
      clearAllTimers();
    }
  }, [hasShownPopup, mounted, clearAllTimers]);

  const closePopup = useCallback((action) => {
    setShowPopup(false);
  }, []);

  const handleDiscountClick = useCallback(() => {
    window.location.href = 'https://clkdmg.site/checkouts/ab-order-bump-x?src=t4-orderbump';
    closePopup('accepted_offer');
  }, [closePopup]);

  // Detectar movimento do mouse para o topo da página (exit intent)
  const handleMouseMove = useCallback((e) => {
    const { clientY } = e;
    const currentPosition = { x: e.clientX, y: clientY };
    
    // Atualizar o tempo da última atividade
    lastActivityTime.current = Date.now();
    
    // Verificar se o mouse está se movendo rapidamente para cima
    if (mousePosition.current.y - clientY > EXIT_INTENT_SENSITIVITY && clientY < 100) {
      showExitPopup();
    }
    
    // Atualizar a posição do mouse
    mousePosition.current = currentPosition;
  }, [showExitPopup]);

  // Detectar quando o mouse sai da janela
  const handleMouseLeave = useCallback((e) => {
    // Verificar se o mouse saiu pelo topo da página
    if (e.clientY <= 0) {
      showExitPopup();
    }
  }, [showExitPopup]);

  // Detectar quando a página perde o foco
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      // O usuário mudou de aba ou minimizou a janela
      showExitPopup();
    }
  }, [showExitPopup]);

  // Detectar quando o usuário rola até o final da página
  const handleScroll = useCallback(() => {
    // Atualizar o tempo da última atividade
    lastActivityTime.current = Date.now();
    
    // Verificar se o usuário rolou até o final da página
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (pageHeight - scrollPosition < 200) {
      // O usuário está próximo do final da página
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
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('scroll', handleScroll);
      
      // Event listeners para registrar atividade
      document.addEventListener('click', handleUserActivity);
      document.addEventListener('keydown', handleUserActivity);
      
      // Limpar event listeners
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('click', handleUserActivity);
        document.removeEventListener('keydown', handleUserActivity);
        clearAllTimers();
      };
    }
  }, [
    mounted,
    hasShownPopup,
    handleMouseLeave,
    handleMouseMove,
    handleVisibilityChange,
    handleScroll,
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
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  // Lidar com tecla ESC para fechar o popup
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closePopup('pressed_escape');
      }
    };

    if (showPopup) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showPopup]);

  // Não renderizar nada se não estiver montado
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
        
        {pathname === '/cf1-escrito' ? (
          <>
            <div className={styles.popupHeader}>
              <h2 className={styles.exitPopupTitle}>PARE AGORA!</h2>
              <h3 className={styles.exitPopupSubtitle}>Sua Aposentadoria Está em Risco</h3>
            </div>
            
            <div className={styles.exitPopupText}>
              <p>Não feche esta página! Enquanto você hesita, sua aposentadoria está perdendo valor a cada segundo.</p>
              
              <div className={styles.offerHighlight}>
                <span className={styles.discount} style={{ color: '#ff0000' }}>70% OFF</span>
                <p>No Sistema Automático de Renda</p>
                <span className={styles.timeLimit}>ÚLTIMA CHANCE - Oferta expira em breve!</span>
              </div>
              
              <p>Junte-se aos milhares de servidores que já estão protegendo seu futuro financeiro com nosso sistema que gera R$5.000 por semana de forma automática!</p>
            </div>
            
            <div className={styles.exitPopupButtons}>
              <button 
                className={styles.continueButton} 
                onClick={handleDiscountClick}
              >
                QUERO GARANTIR MEU FUTURO AGORA!
              </button>
              <button 
                className={styles.noThanksButton} 
                onClick={() => closePopup('declined_offer')}
              >
                Não, prefiro arriscar minhas economias
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.popupHeader}>
              <h2 className={styles.exitPopupTitle}>Espere!</h2>
              <h3 className={styles.exitPopupSubtitle}>Não Perca Esta Oportunidade Única</h3>
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
                QUERO COMEÇAR AGORA!
              </button>
              <button 
                className={styles.noThanksButton} 
                onClick={() => closePopup('declined_offer')}
              >
                Não, prefiro perder esta oportunidade
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  ) : null;
};

export default DesktopExitPopup; 