'use client';

import { useEffect, useRef } from 'react';
import { runWhenIdle } from '../utils/performance-utils';

export default function ServiceWorkerRegistration() {
  const registrationRef = useRef(null);
  const updateTimeoutRef = useRef(null);

  useEffect(() => {
    // Registrar o service worker apenas no ambiente de produção e se o navegador suportar
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.location.hostname !== 'localhost' &&
      !window.location.hostname.includes('127.0.0.1')
    ) {
      // Registrar o service worker com um atraso maior para não impactar o carregamento inicial
      const registerServiceWorker = () => {
        // Verificar se já foi registrado
        if (registrationRef.current) return;

        navigator.serviceWorker
          .register('/sw.js', {
            scope: '/',
            updateViaCache: 'none', // Não usar cache para atualizações do SW
            type: 'module' // Usar módulo ES para melhor performance
          })
          .then((registration) => {
            registrationRef.current = registration;
            console.log('Service Worker registrado com sucesso:', registration.scope);
            
            // Verificar atualizações a cada 12 horas (aumentado para reduzir carga)
            setInterval(() => {
              // Verificar atualizações apenas quando o navegador estiver ocioso
              runWhenIdle(() => {
                registration.update();
                console.log('Verificando atualizações do Service Worker');
              }, { timeout: 10000 });
            }, 12 * 60 * 60 * 1000);
          })
          .catch((error) => {
            console.error('Erro ao registrar o Service Worker:', error);
            
            // Tentar novamente após um atraso em caso de erro, mas com backoff exponencial
            const retryDelay = registrationRef.current ? 10000 : 5000;
            setTimeout(() => {
              registrationRef.current = null;
              registerServiceWorker();
            }, retryDelay);
          });
      };

      // Registrar o service worker após o carregamento da página
      // e quando o navegador estiver ocioso
      if (document.readyState === 'complete') {
        runWhenIdle(() => {
          setTimeout(registerServiceWorker, 5000); // Atraso aumentado para 5 segundos
        }, { timeout: 10000 });
      } else {
        window.addEventListener('load', () => {
          runWhenIdle(() => {
            setTimeout(registerServiceWorker, 5000); // Atraso aumentado para 5 segundos
          }, { timeout: 10000 });
        }, { once: true }); // Usar { once: true } para remover automaticamente o listener
      }

      // Função única para lidar com atualizações do service worker
      const handleServiceWorkerUpdate = () => {
        // Evitar múltiplas atualizações
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
        
        console.log('Service Worker atualizado, recarregando a página...');
        
        // Mostrar notificação ao usuário antes de recarregar, apenas se permitido
        if ('Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification('Atualização disponível', {
              body: 'A página será recarregada para aplicar as atualizações.',
              icon: '/images/icon-192x192.png'
            });
          } catch (error) {
            console.error('Erro ao mostrar notificação:', error);
          }
        }
        
        // Recarregar a página após um pequeno atraso
        // e apenas se o usuário não estiver interagindo com a página
        updateTimeoutRef.current = setTimeout(() => {
          // Verificar se o usuário está interagindo com a página
          if (document.visibilityState === 'visible' && !document.querySelector('input:focus, textarea:focus')) {
            window.location.reload();
          } else {
            // Se o usuário estiver interagindo, adiar a atualização
            console.log('Adiando atualização pois o usuário está interagindo com a página');
            
            // Tentar novamente quando a página ficar visível
            document.addEventListener('visibilitychange', function onVisibilityChange() {
              if (document.visibilityState === 'visible') {
                document.removeEventListener('visibilitychange', onVisibilityChange);
                handleServiceWorkerUpdate();
              }
            });
          }
        }, 2000);
      };

      // Verificar atualizações do service worker - apenas um listener
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.onstatechange = (event) => {
          if (event.target.state === 'redundant') {
            handleServiceWorkerUpdate();
          }
        };
      }

      // Lidar com atualizações do service worker - apenas um listener
      navigator.serviceWorker.addEventListener('controllerchange', handleServiceWorkerUpdate);

      // Retornar função de limpeza para remover event listeners e timeouts
      return () => {
        navigator.serviceWorker.removeEventListener('controllerchange', handleServiceWorkerUpdate);
        
        if (updateTimeoutRef.current) {
          clearTimeout(updateTimeoutRef.current);
        }
      };
    }
  }, []);

  // Este componente não renderiza nada visualmente
  return null;
}
