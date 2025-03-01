import React from 'react';
import styles from '../styles/EnhancedTranscript.module.css';

const ProgressSteps = () => {
  return (
    <div className={styles.progressSteps}>
      <div className={styles.progressStep}>
        <div className={styles.stepNumber}>1</div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepHeading}>Sinais de mercado são identificados pelo algoritmo</h3>
          <p>Nosso algoritmo analisa o mercado 24/7 e identifica automaticamente os melhores momentos para operar.</p>
        </div>
      </div>
      
      <div className={styles.progressStep}>
        <div className={styles.stepNumber}>2</div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepHeading}>Você recebe alerta instantâneo no seu celular</h3>
          <p>Os sinais são enviados imediatamente para seu celular, com instruções precisas sobre o que fazer.</p>
        </div>
      </div>
      
      <div className={styles.progressStep}>
        <div className={styles.stepNumber}>3</div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepHeading}>Execute a operação com 1 clique</h3>
          <p>Basta seguir as instruções simples e executar a operação em poucos segundos na sua corretora.</p>
        </div>
      </div>
      
      <div className={styles.progressStep}>
        <div className={styles.stepNumber}>4</div>
        <div className={styles.stepContent}>
          <h3 className={styles.stepHeading}>Acompanhe os resultados no seu saldo</h3>
          <p>Veja seu saldo crescer automaticamente quando o alvo de lucro é atingido.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps; 