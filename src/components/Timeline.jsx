import React from 'react';
import styles from '../styles/EnhancedTranscript.module.css';

const Timeline = () => {
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineItem}>
        <div className={styles.timelineMarker}></div>
        <div className={styles.timelineContent}>
          <h3 className={styles.timelineHeading}>7 anos atrás</h3>
          <p>Eu era entregador de gás, ganhando um salário mínimo e lutando para sobreviver com o básico.</p>
        </div>
      </div>
      
      <div className={styles.timelineItem}>
        <div className={styles.timelineMarker}></div>
        <div className={styles.timelineContent}>
          <h3 className={styles.timelineHeading}>5 anos atrás</h3>
          <p>Descobri o mercado financeiro e comecei a estudar Forex de forma obsessiva, investindo todo meu tempo livre.</p>
        </div>
      </div>
      
      <div className={styles.timelineItem}>
        <div className={styles.timelineMarker}></div>
        <div className={styles.timelineContent}>
          <h3 className={styles.timelineHeading}>3 anos atrás</h3>
          <p>Desenvolvi, junto com uma equipe de especialistas em programação, um algoritmo revolucionário que identifica padrões no mercado.</p>
        </div>
      </div>
      
      <div className={styles.timelineItem}>
        <div className={styles.timelineMarker}></div>
        <div className={styles.timelineContent}>
          <h3 className={styles.timelineHeading}>Hoje</h3>
          <p>Alcancei a liberdade financeira e estou compartilhando meu sistema com outros brasileiros que desejam transformar suas vidas.</p>
        </div>
      </div>
    </div>
  );
};

export default Timeline; 