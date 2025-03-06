'use client';

import React from 'react';
import { Suspense } from 'react';
import ClientExitPopupWrapper from '../../components/ClientExitPopupWrapper';
import TranscriptPage from '../../components/TranscriptPage';

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
        <TranscriptPage />
      </Suspense>
      
      {/* Componente de Exit Popup */}
      <ClientExitPopupWrapper />
    </>
  );
} 