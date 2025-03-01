import React from 'react';
import Link from 'next/link';
import styles from '../styles/CtaButton.module.css';

export default function SingleCtaButton() {
  return (
    <div className={styles.singleCtaContainer}>
      <Link href="https://clkdmg.site/checkouts/ab-order-bump-x?src=t4-orderbump" className={styles.buttonLink}>
        <button className={styles.button}>
          <span className={styles.shadow}></span>
          <span className={styles.edge}></span>
          <span className={styles.front}>QUERO GARANTIR MINHA VAGA NO COPY CASH AGORA →</span>
        </button>
      </Link>
    </div>
  );
} 