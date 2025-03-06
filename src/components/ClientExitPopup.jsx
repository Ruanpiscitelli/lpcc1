'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importar os popups de saída de forma dinâmica para evitar problemas com SSR
const MobileExitPopup = dynamic(() => import('./MobileExitPopup'), {
  ssr: false,
  loading: () => null
});

const DesktopExitPopup = dynamic(() => import('./DesktopExitPopup'), {
  ssr: false,
  loading: () => null
});

const ClientExitPopup = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Detectar se o dispositivo é móvel e configurar event listeners
  useEffect(() => {
    // Verificar se estamos no navegador
    if (typeof window !== 'undefined') {
      // Função para verificar se o dispositivo é móvel
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Verificar inicialmente
      checkIfMobile();

      // Adicionar event listener para redimensionamento
      window.addEventListener('resize', checkIfMobile);

      // Marcar a página como carregada
      setIsPageLoaded(true);

      // Limpar event listener
      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }
  }, []);

  // Não renderizar nada até que a página esteja carregada
  if (!isPageLoaded) return null;

  // Renderizar o popup apropriado com base no dispositivo
  return isMobile ? <MobileExitPopup /> : <DesktopExitPopup />;
};

export default ClientExitPopup; 