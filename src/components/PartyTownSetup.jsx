'use client';

import React, { useEffect } from 'react';
import { setupPartytown } from '../utils/partytown-config';

/**
 * Componente responsável por configurar o Partytown para otimização de scripts de terceiros
 * Não renderiza nenhum elemento visível
 */
export default function PartyTownSetup() {
  useEffect(() => {
    // Configurar o Partytown apenas no cliente e apenas uma vez
    if (typeof window !== 'undefined') {
      setupPartytown();
    }
  }, []);

  // Não renderiza nada visível
  return null;
}
