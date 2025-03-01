'use client';

import dynamic from 'next/dynamic';
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

// Componente que será renderizado apenas no cliente
const NoSSR = dynamic(() => Promise.resolve(({ children }) => <>{children}</>), {
  ssr: false,
  loading: () => <LoadingComponent />
});

// Componente otimizado para o player de vídeo
const VideoPlayerWrapper = memo(function VideoPlayerWrapper() {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const playerLoaded = useRef(false);

  useEffect(() => {
    // Função para carregar o player de vídeo
    const loadVideoPlayer = () => {
      if (playerLoaded.current) return;
      
      // Verificar se o container existe
      if (!containerRef.current) return;
      
      try {
        // Criar o iframe apenas quando necessário
        const iframe = document.createElement('iframe');
        iframe.id = 'video-player';
        iframe.title = 'Vídeo Explicativo';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy'; // Usar carregamento lazy para o iframe
        iframe.src = 'https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/6759dd77d07a5ff5c7ca43f4/embed.html';
        iframe.className = styles.videoIframe;
        
        // Limpar o container antes de adicionar o iframe
        if (containerRef.current.firstChild) {
          containerRef.current.innerHTML = '';
        }
        
        // Adicionar o iframe ao container
        containerRef.current.appendChild(iframe);
        iframeRef.current = iframe;
        playerLoaded.current = true;
        
        // Adicionar evento para monitorar quando o vídeo estiver pronto
        window.addEventListener('message', handleVideoMessage);
      } catch (error) {
        console.error('Erro ao carregar o player de vídeo:', error);
      }
    };
    
    // Função para lidar com mensagens do iframe do vídeo
    const handleVideoMessage = (event) => {
      // Verificar se a mensagem é do player de vídeo
      if (event.data && typeof event.data === 'object' && event.data.type === 'converteai') {
        // Aqui você pode reagir a eventos do player
        // Por exemplo: event.data.action === 'video:start'
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
        window.removeEventListener('message', handleVideoMessage);
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
      
      return () => {
        window.removeEventListener('message', handleVideoMessage);
      };
    }
  }, []);

  return (
    <div className={styles.videoContainer} ref={containerRef}>
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