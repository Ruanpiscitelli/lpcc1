'use client';

import React from 'react';
import { Suspense } from 'react';
import LandingPageCF1 from '../../components/LandingPageCF1';

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
    <Suspense fallback={<PageLoading />}>
      <LandingPageCF1 />
    </Suspense>
  );
} 