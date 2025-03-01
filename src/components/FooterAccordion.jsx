'use client';

import React, { useState, useEffect } from 'react';
import styles from '../styles/LandingPage.module.css';

export default function FooterAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  // Inicializar o estado como aberto após a montagem do componente
  useEffect(() => {
    // Pequeno atraso para garantir que a animação funcione corretamente
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.footerAccordionItem} data-important="">
      <div 
        className={`${styles.footerAccordionToggle} ${isOpen ? styles.footerAccordionToggleBgActive : ''}`}
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        style={{ cursor: 'pointer' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion();
          }
        }}
      >
        <span className={styles.iconImportante}></span>
        <h4>Importante</h4>
        <button 
          aria-label={isOpen ? "Ver Menos" : "Ver Mais"} 
          className={styles.buttonAccordionActive}
          onClick={(e) => {
            e.stopPropagation(); // Evitar duplo disparo do evento
            toggleAccordion();
          }}
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#fff',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0 10px'
          }}
        >
          {isOpen ? '−' : '+'}
        </button>
      </div>
      <div 
        className={`${styles.footerAccordionBox} ${isOpen ? styles.footerAccordionVisible : styles.footerAccordionHidden}`}
        aria-hidden={!isOpen}
        style={{
          transition: 'max-height 0.3s ease-out',
          maxHeight: isOpen ? '1000px' : '0',
          overflow: 'hidden'
        }}
      >
        <p>
          Este conteúdo é oferecido pela <strong>WILLTRADER CONSULTORIA E ANÁLISES</strong>. Os materiais são fornecidos "como estão", sem garantias sobre precisão, resultados ou confiabilidade. A <strong>WILLTRADER</strong> não oferece aconselhamento financeiro pessoal, sendo apenas um recurso informativo. Os retornos financeiros apresentados são excepcionais e não devem ser esperados pelo investidor médio, sendo sempre proporcionais ao tamanho do seu investimento. A expertise do profissional em sua área de atuação não implica necessariamente o sucesso da estratégia veiculada na campanha, não devendo ser interpretada como uma promessa de retorno financeiro. Os riscos são inerentes a qualquer operação financeira.
        </p>
      </div>
    </div>
  );
}
