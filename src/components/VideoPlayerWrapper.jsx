'use client';

import React, { useEffect, useRef, memo } from 'react';
import styles from '../styles/VideoPlayer.module.css';
import { deferThirdPartyResources } from '../utils/performance-utils';

// Componente de carregamento para mostrar enquanto o vídeo está sendo carregado
const LoadingComponent = memo(() => (
  <div 
    style={{ 
      width: '100%', 
      maxWidth: '800px', 
      margin: '0 auto', 
      height: '450px', 
      backgroundColor: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <div style={{ color: 'white' }}>Carregando vídeo...</div>
  </div>
));

LoadingComponent.displayName = 'LoadingComponent';

// Componente otimizado para o player de vídeo
const VideoPlayerWrapper = memo(function VideoPlayerWrapper() {
  const scriptRef = useRef(null);
  const containerRef = useRef(null);
  const playerLoaded = useRef(false);

  useEffect(() => {
    // Função para carregar o player de vídeo
    const loadVideoPlayer = () => {
      if (playerLoaded.current) return;
      
      // Verificar se o container existe
      if (!containerRef.current) return;
      
      try {
        // Limpar o container antes de adicionar os novos elementos
        if (containerRef.current.firstChild) {
          containerRef.current.innerHTML = '';
        }

        // Criar a estrutura do player conforme fornecido
        const wrapper = document.createElement('div');
        wrapper.id = 'ifr_6759dd77d07a5ff5c7ca43f4_wrapper';
        wrapper.style.position = 'absolute';
        wrapper.style.top = '0';
        wrapper.style.left = '0';
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        wrapper.style.margin = '0';

        const aspectRatio = document.createElement('div');
        aspectRatio.id = 'ifr_6759dd77d07a5ff5c7ca43f4_aspect';
        aspectRatio.style.position = 'relative';
        aspectRatio.style.width = '100%';
        aspectRatio.style.height = '100%';

        const iframe = document.createElement('iframe');
        iframe.id = 'ifr_6759dd77d07a5ff5c7ca43f4';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.src = 'https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/6759dd77d07a5ff5c7ca43f4/embed.html';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.referrerPolicy = 'origin';

        // Montar a estrutura do player
        aspectRatio.appendChild(iframe);
        wrapper.appendChild(aspectRatio);
        containerRef.current.appendChild(wrapper);

        // Carregar o script do SmartPlayer
        if (!document.querySelector('script[data-id="6759dd77d07a5ff5c7ca43f4"]')) {
          const script = document.createElement('script');
          script.src = 'https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js';
          script.setAttribute('data-id', '6759dd77d07a5ff5c7ca43f4');
          document.head.appendChild(script);
          scriptRef.current = script;
        }
        
        playerLoaded.current = true;
      } catch (error) {
        console.error('Erro ao carregar o player de vídeo:', error);
      }
    };
    
    // Usar IntersectionObserver para carregar o vídeo apenas quando visível
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Carregar o player quando estiver visível
            loadVideoPlayer();
            observer.disconnect();
          }
        });
      }, {
        rootMargin: '200px 0px', // Carregar o vídeo 200px antes de entrar na viewport
        threshold: 0.1
      });
      
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      
      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback para navegadores que não suportam IntersectionObserver
      // Verificar se deferThirdPartyResources está definida e é uma função
      if (typeof deferThirdPartyResources === 'function') {
        try {
          deferThirdPartyResources(loadVideoPlayer, 1000);
        } catch (error) {
          console.error('Erro ao adiar carregamento do vídeo:', error);
          // Fallback seguro em caso de erro
          setTimeout(loadVideoPlayer, 1000);
        }
      } else {
        // Fallback caso a função não esteja disponível
        setTimeout(loadVideoPlayer, 1000);
      }
    }
  }, []);

  return (
    <div className={styles.videoContainer} ref={containerRef} style={{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Placeholder que será substituído pelo iframe */}
      <div className={styles.videoPlaceholder}>
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner}></div>
        </div>
        <p>Carregando vídeo...</p>
      </div>
    </div>
  );
});

VideoPlayerWrapper.displayName = 'VideoPlayerWrapper';

export default VideoPlayerWrapper; 