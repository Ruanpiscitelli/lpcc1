'use client';

import React, { useEffect, useRef, memo, useState } from 'react';
import styles from '../styles/VideoPlayer.module.css';

// Componente otimizado para o player de vídeo
const VideoPlayerWrapper = memo(function VideoPlayerWrapper() {
  const containerRef = useRef(null);
  const playerLoaded = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  useEffect(() => {
    if (playerLoaded.current || typeof window === 'undefined') return;
    
    // Adicionar preload para recursos necessários
    const preloadResources = () => {
      const resources = [
        { rel: 'preconnect', href: 'https://scripts.converteai.net', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://cdn.converteai.net', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://images.converteai.net', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://scripts.converteai.net' },
        { rel: 'dns-prefetch', href: 'https://cdn.converteai.net' },
        { rel: 'dns-prefetch', href: 'https://images.converteai.net' },
        { rel: 'preload', href: 'https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js', as: 'script' }
      ];
      
      resources.forEach(resource => {
        const link = document.createElement('link');
        Object.entries(resource).forEach(([key, value]) => {
          link[key] = value;
        });
        document.head.appendChild(link);
      });
    };
    
    // Tenta precarregar os recursos
    try {
      preloadResources();
    } catch (e) {
      console.warn('Preload não foi possível:', e);
    }
    
    // Função para iniciar o carregamento do player após um pequeno delay
    const loadPlayer = () => {
      try {
        console.log('Iniciando carregamento do player...');
        setIsLoading(true);
        
        // Carrega o script SDK diretamente
        const script = document.createElement('script');
        script.src = "https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js";
        script.async = true;
        
        script.onload = () => {
          console.log('SDK carregado com sucesso');
          
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
          
          // Detectar quando o iframe terminar de carregar
          iframe.onload = () => {
            console.log('Iframe carregado com sucesso');
            setIsLoading(false);
            playerLoaded.current = true;
          };
          
          iframe.onerror = (e) => {
            console.error('Erro ao carregar iframe:', e);
            setLoadError(true);
            setIsLoading(false);
          };
          
          // Limpa conteúdo existente e adiciona iframe
          const aspectRatio = document.getElementById('ifr_67c39663c033d97a19fff443_aspect');
          if (aspectRatio) {
            aspectRatio.innerHTML = '';
            aspectRatio.appendChild(iframe);
          }
        };
        
        script.onerror = (e) => {
          console.error('Erro ao carregar SDK:', e);
          setLoadError(true);
          setIsLoading(false);
        };
        
        document.head.appendChild(script);
      } catch (err) {
        console.error('Erro ao carregar player:', err);
        setLoadError(true);
        setIsLoading(false);
      }
    };
    
    // Carrega o player após um pequeno delay para garantir que o DOM está pronto
    const timerRef = setTimeout(loadPlayer, 300);
    
    // Cleanup
    return () => {
      clearTimeout(timerRef);
      playerLoaded.current = false;
    };
  }, []);

  return (
    <div className={styles.videoContainer} ref={containerRef}>
      {isLoading && (
        <div className={styles.videoPlaceholder}>
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      )}
      
      {loadError && (
        <div className={styles.videoPlaceholder} style={{ backgroundColor: '#f8f9fa' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Ocorreu um erro ao carregar o vídeo.</p>
            <button 
              onClick={() => {
                setLoadError(false);
                setIsLoading(true);
                playerLoaded.current = false;
                setTimeout(() => window.location.reload(), 100);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}
      
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