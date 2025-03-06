'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Simular progresso de carregamento
        const newProgress = prevProgress + Math.random() * 10;
        return newProgress > 90 ? 90 : newProgress; // Limitar a 90% para evitar falsa conclusão
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <div style={{ marginBottom: '20px' }}>Carregando conteúdo...</div>
      
      {/* Barra de progresso */}
      <div style={{ 
        width: '300px', 
        height: '10px', 
        backgroundColor: '#e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: `${progress}%`, 
          height: '100%', 
          backgroundColor: '#ff0000',
          transition: 'width 0.3s ease-in-out'
        }} />
      </div>
      
      <div style={{ marginTop: '10px' }}>{Math.round(progress)}%</div>
    </div>
  );
}