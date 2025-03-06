import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { loadScriptWithFallback } from '../utils/fallback-scripts';

/**
 * Componente super otimizado para exibir o player do Converteai com soluções para CORS e CSP
 * @param {Object} props Propriedades do componente
 * @param {string} props.playerId ID do player (ex: 67c39663c033d97a19fff443)
 * @param {string} props.accountId ID da conta (ex: 9f42948f-1e82-4960-b793-0f0c80350dc8)
 */
const SimpleConverteaiPlayer = ({ 
  playerId = '67c39663c033d97a19fff443',
  accountId = '9f42948f-1e82-4960-b793-0f0c80350dc8' 
}) => {
  const playerContainerRef = useRef(null);
  const scriptRef = useRef(null);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const retryCount = useRef(0);
  const maxRetries = 3;

  useEffect(() => {
    // Definir variáveis para controle
    let isMounted = true;
    let sdkLoaded = false;

    // Verificar se o script já foi carregado globalmente
    if (window.sdk && document.querySelector(`script[data-id="${playerId}"]`)) {
      console.log("SDK do Converteai já carregado globalmente");
      setIsLoading(false);
      return;
    }

    // Função para criar o iframe do player
    const createIframe = () => {
      if (!playerContainerRef.current) return;
      
      try {
        // Limpar o container
        playerContainerRef.current.innerHTML = '';
        
        // Criar o iframe
        const iframe = document.createElement('iframe');
        iframe.id = `ifr_${playerId}`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.allowFullscreen = true;
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
        iframe.referrerPolicy = 'origin';
        iframe.sandbox = 'allow-scripts allow-same-origin allow-forms';
        
        // Adicionar ao container
        playerContainerRef.current.appendChild(iframe);
        
        return iframe;
      } catch (err) {
        console.error("Erro ao criar iframe:", err);
        return null;
      }
    };

    // Função para carregar o player
    const loadPlayer = async () => {
      if (!isMounted) return;
      
      try {
        // Criar o iframe
        const iframe = createIframe();
        if (!iframe) throw new Error("Não foi possível criar o iframe");
        
        // Tentar carregar o script do SDK
        await loadScriptWithFallback(
          'https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js',
          {
            async: true,
            defer: true,
            crossOrigin: 'anonymous',
            referrerPolicy: 'origin'
          },
          // Callback de sucesso
          () => {
            if (!isMounted) return;
            
            try {
              // Verificar se o SDK foi carregado corretamente
              if (window.sdk && typeof window.sdk.create === 'function') {
                console.log("SDK do Converteai carregado, inicializando player");
                
                // Inicializar o player
                window.sdk.create({
                  playerId: playerId,
                  accountId: accountId,
                  selector: playerContainerRef.current.id
                });
                
                setIsLoading(false);
                sdkLoaded = true;
              } else {
                throw new Error("SDK carregado, mas API não disponível");
              }
            } catch (err) {
              console.error("Erro ao inicializar player:", err);
              handleLoadError();
            }
          },
          // Callback de erro
          (err) => {
            if (!isMounted) return;
            console.error("Erro ao carregar SDK:", err);
            handleLoadError();
          }
        );
      } catch (err) {
        if (!isMounted) return;
        console.error("Erro ao carregar player:", err);
        handleLoadError();
      }
    };

    // Função para lidar com erros de carregamento
    const handleLoadError = () => {
      if (retryCount.current < maxRetries) {
        retryCount.current += 1;
        const delay = Math.pow(2, retryCount.current) * 1000; // Backoff exponencial
        console.log(`Tentativa ${retryCount.current} de ${maxRetries} em ${delay/1000}s...`);
        
        setTimeout(() => {
          if (isMounted && !sdkLoaded) {
            loadPlayer();
          }
        }, delay);
      } else {
        console.error("Falha ao carregar o player após várias tentativas");
        setLoadError(true);
        setIsLoading(false);
      }
    };

    // Iniciar carregamento
    loadPlayer();

    // Cleanup
    return () => {
      isMounted = false;
      
      // Remover script se existir
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
    };
  }, [playerId, accountId]);

  return (
    <>
      <Head>
        {/* Meta tags para CSP */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* Preconnect para domínios essenciais */}
        <link rel="preconnect" href="https://scripts.converteai.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.converteai.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        
        {/* Preload para recursos críticos */}
        <link 
          rel="preload" 
          href="/scripts/converteai-sdk.min.js" 
          as="script" 
          crossOrigin="anonymous" 
        />
      </Head>
      
      <div className="converteai-player-container" style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        {isLoading && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            zIndex: 1
          }}>
            <div>Carregando player...</div>
          </div>
        )}
        
        {loadError && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            zIndex: 2,
            flexDirection: 'column',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '10px' }}>
              Não foi possível carregar o player.
            </div>
            <button 
              onClick={() => {
                setLoadError(false);
                setIsLoading(true);
                retryCount.current = 0;
                // Forçar reload da página
                window.location.reload();
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
        )}
        
        <div 
          id={`player-${playerId}`}
          ref={playerContainerRef}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            backgroundColor: '#000'
          }}
        />
      </div>
    </>
  );
};

export default SimpleConverteaiPlayer; 