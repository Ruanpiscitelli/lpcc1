'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import styles from '../styles/ExitPopup.module.css';

// Configurações do exit intent
const EXIT_INTENT_SENSITIVITY = 20;
const INACTIVITY_THRESHOLD = 60000; // 60 segundos
const SESSION_DURATION = 30000; // 30 segundos

const ExitPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  const lastActivityTime = useRef(Date.now());
  const sessionStartTime = useRef(Date.now());
  const mousePosition = useRef({ x: 0, y: 0 });
  const popupRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const sessionTimerRef = useRef(null);

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

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  // Detectar movimento do mouse
  const handleMouseMove = useCallback((e) => {
    const { clientY } = e;
    const currentPosition = { x: e.clientX, y: clientY };
    lastActivityTime.current = Date.now();
    
    if (mousePosition.current.y - clientY > EXIT_INTENT_SENSITIVITY && clientY < 100) {
      showExitPopup();
    }
    
    mousePosition.current = currentPosition;
  }, [showExitPopup]);

  // Detectar saída do mouse
  const handleMouseLeave = useCallback((e) => {
    if (e.clientY <= 0) {
      showExitPopup();
    }
  }, [showExitPopup]);

  // Detectar mudança de aba
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      showExitPopup();
    }
  }, [showExitPopup]);

  // Detectar scroll até o final
  const handleScroll = useCallback(() => {
    lastActivityTime.current = Date.now();
    
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (pageHeight - scrollPosition < 200) {
      showExitPopup();
    }
  }, [showExitPopup]);

  // Verificar inatividade
  const checkInactivity = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastActivityTime.current > INACTIVITY_THRESHOLD) {
      showExitPopup();
    } else {
      inactivityTimerRef.current = setTimeout(checkInactivity, 5000);
    }
  }, [showExitPopup]);

  // Verificar duração da sessão
  const checkSessionDuration = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - sessionStartTime.current > SESSION_DURATION) {
      showExitPopup();
    }
  }, [showExitPopup]);

  // Setup dos event listeners
  useEffect(() => {
    if (mounted && !hasShownPopup) {
      inactivityTimerRef.current = setTimeout(checkInactivity, INACTIVITY_THRESHOLD);
      sessionTimerRef.current = setTimeout(checkSessionDuration, SESSION_DURATION);
      
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('scroll', handleScroll);
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
    checkInactivity,
    checkSessionDuration
  ]);

  // Não renderizar nada se não estiver montado
  if (!mounted) return null;

  return showPopup ? createPortal(
    <div className={styles.exitPopupOverlay}>
      <div className={styles.exitPopupContent} ref={popupRef}>
        <button className={styles.closeButton} onClick={closePopup} aria-label="Fechar">
          &times;
        </button>
        
        <h2 className={styles.exitPopupTitle}>ESPERE!</h2>
        <h3 className={styles.exitPopupSubtitle}>Seu Patrimônio Está Evaporando Nesse Exato Momento</h3>
        
        <div className={styles.exitPopupText}>
          <p>O mercado financeiro está instável e sua aposentadoria corre perigo. Enquanto você assiste esse vídeo, milhares de servidores estão perdendo suas economias.</p>
          <p>Se você tem dinheiro guardado ou está próximo da aposentadoria, clique em "Continuar Assistindo" e descubra como o ex-entregador de gás desenvolveu um sistema automático que está gerando R$5.000 por semana para pessoas comuns — incluindo os 3 passos para começar AGORA mesmo antes que seja tarde demais.</p>
          <p>Esta tecnologia que mapeia o mercado 24h por dia funciona com apenas três cliques. Não perca esta oportunidade de proteger seu futuro financeiro!</p>
        </div>
        
        <div className={styles.exitPopupButtons}>
          <button className={styles.continueButton} onClick={closePopup}>
            CONTINUAR ASSISTINDO
          </button>
          
          <Link href="/cf1-escrito" className={styles.transcriptButton}>
            Não pode assistir agora? Clique aqui para a versão texto
          </Link>
        </div>
      </div>
    </div>,
    document.body
  ) : null;
};

export default ExitPopup;
