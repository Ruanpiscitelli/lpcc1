import React from 'react';
import Head from 'next/head';
import SimpleConverteaiPlayer from '../components/SimpleConverteaiPlayer';

/**
 * Página de exemplo com o player do Converteai
 */
export default function VideoExamplePage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Head>
        <title>Exemplo de Vídeo Converteai</title>
        <meta name="description" content="Página de exemplo com player de vídeo otimizado" />
      </Head>
      
      <main>
        <h1 style={{ fontSize: '28px', marginBottom: '20px', textAlign: 'center' }}>
          Exemplo de Vídeo Converteai
        </h1>
        
        {/* Componente de player simplificado */}
        <SimpleConverteaiPlayer 
          playerId="67c39663c033d97a19fff443" 
          accountId="9f42948f-1e82-4960-b793-0f0c80350dc8" 
        />
        
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Como usar este componente</h2>
          <p>O SimpleConverteaiPlayer é uma forma simplificada de adicionar vídeos do Converteai ao seu site, mantendo a performance através de:</p>
          
          <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
            <li>Preload de recursos críticos</li>
            <li>DNS prefetch para domínios importantes</li>
            <li>Carregamento otimizado de scripts</li>
            <li>Integração simplificada com o SDK do Converteai</li>
          </ul>
        </div>
      </main>
    </div>
  );
} 