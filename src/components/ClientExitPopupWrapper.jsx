'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Importar o ClientExitPopup de forma dinâmica
const ClientExitPopup = dynamic(() => import('./ClientExitPopup'), {
  ssr: false,
  loading: () => null
});

// Componente wrapper para o ClientExitPopup
export default function ClientExitPopupWrapper() {
  return (
    <Suspense fallback={null}>
      <ClientExitPopup />
    </Suspense>
  );
} 