'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import styles from '../styles/ExitPopup.module.css';

export default function ExitPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Função para detectar quando o mouse sai da janela
    const handleMouseOut = (e) => {
      // Verificar se o mouse realmente saiu da janela
      if (
        !hasShown && 
        (e.clientY <= 0 || 
        e.clientX <= 0 || 
        e.clientX >= window.innerWidth || 
        e.clientY >= window.innerHeight)
      ) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    // Adicionar um pequeno delay para evitar que o popup apareça imediatamente ao carregar a página
    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handleMouseOut);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseout', handleMouseOut);
      setIsMounted(false);
    };
  }, [hasShown]);

  // Função para fechar o popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Não renderizar nada no servidor ou se o popup não deve ser mostrado
  if (!isMounted || !showPopup) return null;

  // Usar createPortal para renderizar o popup diretamente no body
  return createPortal(
    <div className={styles.exitPopupOverlay}>
      <div className={styles.exitPopupContent}>
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
          <button 
            className={styles.continueButton} 
            onClick={closePopup}
          >
            CONTINUAR ASSISTINDO
          </button>
          
          <Link href="/cf1-escrito" className={styles.transcriptButton}>
            Não pode assistir agora? Clique aqui para a versão texto
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
