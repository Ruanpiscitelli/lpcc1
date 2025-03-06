'use client';

import React from 'react';
import { Suspense } from 'react';
import LandingPageCF2 from '../../components/LandingPageCF2';
import ClientExitPopupWrapper from '../../components/ClientExitPopupWrapper';

// Componente de fallback para o Suspense
const PageLoading = () => (
  <div style={{ 
    width: '100%', 
    height: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  }}>
    <div>Carregando...</div>
  </div>
);

export default function Page() {
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <LandingPageCF2 />
      </Suspense>
      
      {/* Componente de Exit Popup */}
      <ClientExitPopupWrapper />
    </>
  );
} 