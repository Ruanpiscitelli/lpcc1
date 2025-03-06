'use client';

import Link from 'next/link';

export default function NotFound() {
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
        Página não encontrada
      </h1>
      
      <p style={{ 
        fontSize: '1.2rem', 
        marginBottom: '30px',
        color: '#666',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Desculpe, a página que você está procurando não existe ou foi movida.
      </p>
      
      <Link 
        href="/cf2" 
        style={{
          backgroundColor: '#ff0000',
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
  );
} 