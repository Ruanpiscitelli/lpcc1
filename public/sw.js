/**
 * Service Worker otimizado para melhorar o desempenho
 * Versão: 1.0.0
 */

// Nome do cache
const CACHE_NAME = 'ai-landing-page-v1';

// Recursos para pré-cachear
const PRECACHE_ASSETS = [
  '/',
  '/cf1',
  '/~partytown/partytown.js',
  '/~partytown/partytown-sw.js',
  '/~partytown/partytown-media.js',
  '/~partytown/partytown-atomics.js',
  '/~partytown/partytown-config.json'
];

// Instalar o service worker
self.addEventListener('install', (event) => {
  // Ativar imediatamente, sem esperar que o antigo termine
  self.skipWaiting();
  
  // Pré-cachear recursos importantes
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Pré-cacheando recursos');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .catch((error) => {
        console.error('Service Worker: Erro ao pré-cachear recursos:', error);
      })
  );
});

// Ativar o service worker
self.addEventListener('activate', (event) => {
  // Tomar controle de todos os clientes imediatamente
  event.waitUntil(clients.claim());
  
  // Limpar caches antigos
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName !== CACHE_NAME;
          }).map((cacheName) => {
            console.log('Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          })
        );
      })
  );
});

// Estratégia de cache: Cache First, então Network
self.addEventListener('fetch', (event) => {
  // Ignorar requisições não GET
  if (event.request.method !== 'GET') return;
  
  // Ignorar requisições de análise e rastreamento
  if (
    event.request.url.includes('google-analytics.com') ||
    event.request.url.includes('googletagmanager.com') ||
    event.request.url.includes('facebook.net') ||
    event.request.url.includes('analytics') ||
    event.request.url.includes('tracking')
  ) {
    return;
  }
  
  // Ignorar requisições para a API
  if (event.request.url.includes('/api/')) {
    return;
  }
  
  // Estratégia específica para arquivos do Partytown
  if (event.request.url.includes('/~partytown/')) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then((response) => {
              // Não cachear respostas com erro
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clonar a resposta para cachear
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              
              return response;
            });
        })
    );
    return;
  }
  
  // Estratégia para outros recursos: Cache First, então Network
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Retornar do cache se disponível
        if (cachedResponse) {
          // Atualizar o cache em segundo plano para recursos HTML
          if (event.request.url.endsWith('/') || event.request.url.includes('.html')) {
            fetch(event.request)
              .then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  return;
                }
                
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, response);
                  });
              })
              .catch(() => {
                // Ignorar erros de rede ao atualizar o cache
              });
          }
          
          return cachedResponse;
        }
        
        // Se não estiver no cache, buscar da rede
        return fetch(event.request)
          .then((response) => {
            // Não cachear respostas com erro
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar a resposta para cachear
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Erro ao buscar recurso:', error);
            
            // Retornar uma página offline para navegação
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('Recurso não disponível offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Evento de sincronização em background
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

// Função para sincronizar dados de analytics
async function syncAnalytics() {
  // Implementação de sincronização de analytics
  console.log('[Service Worker] Sincronizando dados de analytics');
  
  // Aqui você pode implementar a lógica para enviar dados armazenados localmente
  // para serviços de analytics quando a conexão for restaurada
}

// Evento de push notification
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/images/icon-192x192.png',
    badge: '/images/badge.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Evento de clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
