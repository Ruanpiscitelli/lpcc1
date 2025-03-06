import React from 'react';
import Head from 'next/head';
import SimpleConverteaiPlayer from '../components/SimpleConverteaiPlayer';

/**
 * Página de teste para o player do Converteai
 */
export default function VideoTestPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Head>
        <title>Teste de Player Converteai</title>
        <meta name="description" content="Página de teste para o player Converteai com solução para CORS e CSP" />
      </Head>
      
      <main>
        <h1 style={{ fontSize: '28px', marginBottom: '20px', textAlign: 'center' }}>
          Teste de Player Converteai
        </h1>
        
        <div style={{ marginBottom: '20px' }}>
          <p>Esta é uma página de teste para verificar se o player está carregando corretamente com as soluções para CORS e CSP.</p>
        </div>
        
        {/* Componente de player com solução para CORS e CSP */}
        <SimpleConverteaiPlayer 
          playerId="67c39663c033d97a19fff443" 
          accountId="9f42948f-1e82-4960-b793-0f0c80350dc8" 
        />
        
        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '15px' }}>Instruções de Teste</h2>
          <ol style={{ marginLeft: '20px' }}>
            <li>Verifique se o player carrega sem erros no console</li>
            <li>Confirme se o vídeo inicia corretamente ao clicar no play</li>
            <li>Teste em diferentes navegadores para garantir compatibilidade</li>
            <li>Verifique se não há erros de CORS ou CSP no console</li>
          </ol>
          
          <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e6f7ff', borderRadius: '5px' }}>
            <strong>Nota:</strong> Se encontrar problemas, verifique o console do navegador para mensagens de erro detalhadas.
          </div>
        </div>
      </main>
    </div>
  );
} 