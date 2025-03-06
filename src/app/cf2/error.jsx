'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Registrar o erro em um serviço de monitoramento
    console.error('Erro na página:', error);
  }, [error]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        marginBottom: '20px',
        color: '#333'
      }}>
        Algo deu errado
      </h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        marginBottom: '30px',
        color: '#666',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Desculpe, ocorreu um erro ao carregar esta página. Nossa equipe foi notificada.
      </p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#ff0000',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          Tentar novamente
        </button>
        
        <Link 
          href="/cf1" 
          style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease'
          }}
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}