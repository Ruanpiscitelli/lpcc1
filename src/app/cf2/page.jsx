import LandingPage from '../../components/landingPage';
import { Suspense } from 'react';
import ClientExitPopupWrapper from '../../components/ClientExitPopupWrapper';

// Metadados estáticos para a página
export const metadata = {
  title: 'A Bomba-Relógio da Aposentadoria do Servidor',
  description: 'Descubra como proteger seu patrimônio antes que seja tarde demais',
  openGraph: {
    title: 'A Bomba-Relógio da Aposentadoria do Servidor',
    description: 'Descubra como proteger seu patrimônio antes que seja tarde demais',
    type: 'website',
    locale: 'pt_BR',
  },
};

// Configuração de viewport
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Configuração para geração estática
export const dynamic = 'force-static';
export const revalidate = false;
export const fetchCache = 'force-cache';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

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
        <LandingPage />
      </Suspense>
      
      {/* Componente de Exit Popup */}
      <ClientExitPopupWrapper />
    </>
  );
} 