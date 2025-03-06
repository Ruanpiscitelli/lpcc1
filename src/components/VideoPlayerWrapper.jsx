'use client';

import React, { useEffect, useRef, memo, useState } from 'react';
import styles from '../styles/VideoPlayer.module.css';
import { loadScriptWithFallback } from '../utils/fallback-scripts';

// Componente otimizado para o player de vídeo
const VideoPlayerWrapper = memo(function VideoPlayerWrapper() {
  const containerRef = useRef(null);
  const playerLoaded = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 3;
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  const [isClient, setIsClient] = useState(false);
  
  // Efeito para verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient || playerLoaded.current || typeof window === 'undefined') return;
    
    // Adicionar preload para recursos necessários
    const preloadResources = () => {
      const resources = [
        { rel: 'preconnect', href: 'https://scripts.converteai.net', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://cdn.converteai.net', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://images.converteai.net', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://scripts.converteai.net' },
        { rel: 'dns-prefetch', href: 'https://cdn.converteai.net' },
        { rel: 'dns-prefetch', href: 'https://images.converteai.net' }
      ];
      
      resources.forEach(resource => {
        try {
          // Verificar se o link já existe para evitar duplicações
          const existingLink = document.querySelector(`link[rel="${resource.rel}"][href="${resource.href}"]`);
          if (existingLink) return;
          
          const link = document.createElement('link');
          Object.entries(resource).forEach(([key, value]) => {
            link[key] = value;
          });
          document.head.appendChild(link);
        } catch (e) {
          console.warn('Erro ao adicionar preload:', e);
        }
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
        
        // Verificar se o SDK já está carregado
        if (window.SmartPlayer) {
          console.log('SDK já está disponível, usando instância existente');
          createIframe();
          return;
        }
        
        // Verificar se já existe um script sendo carregado
        const scriptUrl = "https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js";
        const existingScript = document.querySelector(`script[src*="${scriptUrl}"]`);
        if (existingScript) {
          console.log('SDK já está sendo carregado, aguardando...');
          existingScript.onload = createIframe;
          return;
        }
        
        // Usar o sistema de fallback para carregar o script
        loadScriptWithFallback(
          scriptUrl,
          {
            async: true,
            defer: true,
            crossOrigin: "anonymous",
            referrerPolicy: "origin",
            importance: "high",
            fetchPriority: 'fetchPriority' in HTMLScriptElement.prototype ? "high" : undefined,
            'data-id': '6759dd77d07a5ff5c7ca43f4'
          },
          createIframe,
          (error) => {
            console.error('Erro ao carregar o SDK do Converteai:', error);
            setErrorDetails(JSON.stringify({
              message: error?.message || 'Erro desconhecido',
              type: 'SDK Load Error',
              source: 'scripts.converteai.net'
            }));
            setLoadError(true);
          }
        );
      } catch (error) {
        console.error('Erro ao iniciar carregamento do player:', error);
        setErrorDetails(JSON.stringify({
          message: error?.message || 'Erro desconhecido',
          type: 'Load Error',
          source: 'VideoPlayerWrapper'
        }));
        setLoadError(true);
      }
    };
    
    // Função para criar o iframe
    const createIframe = () => {
      try {
        console.log('Criando iframe para o player...');
        
        // Verificar se o iframe já existe
        const existingIframe = document.getElementById('ifr_6759dd77d07a5ff5c7ca43f4');
        if (existingIframe) {
          console.log('Iframe já existe, usando existente');
          setIsLoading(false);
          playerLoaded.current = true;
          return;
        }
        
        // Criando o iframe diretamente
        const iframe = document.createElement('iframe');
        iframe.id = 'ifr_6759dd77d07a5ff5c7ca43f4';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        iframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
        iframe.src = 'https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/6759dd77d07a5ff5c7ca43f4/embed.html';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.referrerPolicy = 'origin';
        iframe.loading = 'eager';
        iframe.importance = 'high';
        
        // Detectar quando o iframe terminar de carregar
        iframe.onload = () => {
          console.log('Iframe carregado com sucesso');
          setIsLoading(false);
          playerLoaded.current = true;
        };
        
        iframe.onerror = (e) => {
          console.error('Erro ao carregar iframe:', e);
          setErrorDetails(JSON.stringify({
            message: e?.message || 'Erro ao carregar iframe',
            type: e?.type || 'unknown',
            target: e?.target?.src || 'unknown source'
          }, null, 2));
          
          if (retryCount.current < maxRetries) {
            retryCount.current += 1;
            console.log(`Tentativa de iframe ${retryCount.current} de ${maxRetries}...`);
            setTimeout(createIframe, 1000 * retryCount.current);
          } else {
            setLoadError(true);
            setIsLoading(false);
          }
        };
        
        // Limpa conteúdo existente e adiciona iframe
        const aspectRatio = document.getElementById('ifr_6759dd77d07a5ff5c7ca43f4_aspect');
        if (aspectRatio) {
          aspectRatio.innerHTML = '';
          aspectRatio.appendChild(iframe);
        } else {
          console.error('Elemento para o iframe não encontrado');
          setErrorDetails('Elemento para o iframe não encontrado');
          setLoadError(true);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Erro ao criar iframe:', err);
        setErrorDetails(err?.message || 'Erro ao criar iframe');
        setLoadError(true);
        setIsLoading(false);
      }
    };
    
    // Carrega o player após um pequeno delay para garantir que o DOM está pronto
    const timerRef = setTimeout(() => {
      try {
        loadPlayer();
      } catch (e) {
        console.error('Erro ao iniciar carregamento:', e);
        setErrorDetails(e?.message || 'Erro ao iniciar carregamento');
        setLoadError(true);
        setIsLoading(false);
      }
    }, 300);
    
    // Cleanup
    return () => {
      clearTimeout(timerRef);
      playerLoaded.current = false;
    };
  }, [isClient]); // Adicionado isClient como dependência

  // Função para tentar novamente
  const handleRetry = () => {
    setLoadError(false);
    setIsLoading(true);
    setErrorDetails('');
    playerLoaded.current = false;
    retryCount.current = 0;
    
    // Usar uma abordagem diferente para recarregar o player
    try {
      // Remover scripts antigos
      const oldScripts = document.querySelectorAll('script[src*="converteai.net"]');
      oldScripts.forEach(script => script.remove());
      
      // Remover iframes antigos
      const oldIframes = document.querySelectorAll('iframe[src*="converteai.net"]');
      oldIframes.forEach(iframe => iframe.remove());
      
      // Forçar recarregamento após limpeza
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (e) {
      console.error('Erro ao limpar recursos:', e);
      // Fallback para recarregamento simples
      window.location.reload();
    }
  };

  return (
    <div className={styles.videoContainer} ref={containerRef} suppressHydrationWarning>
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
            {errorDetails && (
              <pre style={{ 
                textAlign: 'left', 
                background: '#f1f1f1', 
                padding: '10px', 
                borderRadius: '4px',
                fontSize: '12px',
                maxHeight: '100px',
                overflow: 'auto',
                marginBottom: '15px'
              }}>
                {errorDetails}
              </pre>
            )}
            <button 
              onClick={handleRetry}
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
      
      <div 
        id="ifr_6759dd77d07a5ff5c7ca43f4_wrapper" 
        data-player-wrapper="true" 
        style={{ margin: '0 auto', width: '100%' }}
        suppressHydrationWarning
      >
        <div 
          style={{ padding: '56.25% 0 0 0', position: 'relative' }} 
          id="ifr_6759dd77d07a5ff5c7ca43f4_aspect" 
          data-player-aspect="true"
          suppressHydrationWarning
        >
          {/* O iframe será criado dinamicamente pelo JavaScript */}
        </div>
      </div>
    </div>
  );
});

VideoPlayerWrapper.displayName = 'VideoPlayerWrapper';

export default VideoPlayerWrapper; 