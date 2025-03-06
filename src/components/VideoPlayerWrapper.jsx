'use client';

import React, { useEffect, useRef, memo } from 'react';
import styles from '../styles/VideoPlayer.module.css';

// Componente otimizado para o player de vídeo
const VideoPlayerWrapper = memo(function VideoPlayerWrapper() {
  const containerRef = useRef(null);
  const playerLoaded = useRef(false);
  
  useEffect(() => {
    if (playerLoaded.current || typeof window === 'undefined') return;
    
    // Função para iniciar o carregamento do player após um pequeno delay
    const loadPlayer = () => {
      try {
        // Criando o wrapper e elemento de aspecto
        const wrapper = document.getElementById('ifr_67c39663c033d97a19fff443_wrapper') || 
                        document.querySelector(`[data-player-wrapper="true"]`);
        
        if (wrapper) {
          // Criando o iframe diretamente
          const iframe = document.createElement('iframe');
          iframe.id = 'ifr_67c39663c033d97a19fff443';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = true;
          iframe.src = 'https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/embed.html';
          iframe.style.position = 'absolute';
          iframe.style.top = '0';
          iframe.style.left = '0';
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.referrerPolicy = 'origin';
          
          // Limpa conteúdo existente e adiciona iframe
          const aspectRatio = document.getElementById('ifr_67c39663c033d97a19fff443_aspect') || 
                              document.querySelector(`[data-player-aspect="true"]`);
          if (aspectRatio) {
            aspectRatio.innerHTML = '';
            aspectRatio.appendChild(iframe);
          }
          
          // Carrega o script SDK após o iframe estar pronto
          const script = document.createElement('script');
          script.src = "https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js";
          script.setAttribute('data-id', '67c39663c033d97a19fff443');
          script.async = true;
          document.head.appendChild(script);
          
          playerLoaded.current = true;
        }
      } catch (err) {
        console.error('Erro ao carregar player:', err);
      }
    };
    
    // Carrega o player após um pequeno delay para garantir que o DOM está pronto
    setTimeout(loadPlayer, 300);
    
    // Cleanup
    return () => {
      playerLoaded.current = false;
    };
  }, []);

  return (
    <div className={styles.videoContainer} ref={containerRef}>
      <div id="ifr_67c39663c033d97a19fff443_wrapper" data-player-wrapper="true" style={{ margin: '0 auto', width: '100%' }}>
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} id="ifr_67c39663c033d97a19fff443_aspect" data-player-aspect="true">
          {/* O iframe será criado dinamicamente pelo JavaScript */}
        </div>
      </div>
    </div>
  );
});

VideoPlayerWrapper.displayName = 'VideoPlayerWrapper';

export default VideoPlayerWrapper; 