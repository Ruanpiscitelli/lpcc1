import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* Preconnect para domínios críticos */}
          <link rel="preconnect" href="https://images.converteai.net" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://scripts.converteai.net" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://cdn.converteai.net" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
          
          {/* DNS Prefetch para domínios secundários */}
          <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
          
          {/* Preload de recursos críticos */}
          <link 
            rel="preload" 
            href="https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/6759dd77d07a5ff5c7ca43f4/embed.html" 
            as="document" 
          />
          
          {/* Meta tags para otimização de performance */}
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          
          {/* Script de otimização para reduzir o trabalho na thread principal */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Função para detectar navegadores lentos e ajustar a experiência
                (function() {
                  var startTime = Date.now();
                  
                  // Verificar se o navegador suporta requestIdleCallback
                  var hasIdleCallback = 'requestIdleCallback' in window;
                  
                  // Verificar se o navegador suporta IntersectionObserver
                  var hasIntersectionObserver = 'IntersectionObserver' in window;
                  
                  // Verificar se o navegador suporta performance.now
                  var hasPerformanceNow = 'performance' in window && typeof window.performance.now === 'function';
                  
                  // Definir classe no HTML com base nos recursos suportados
                  document.documentElement.className += 
                    (hasIdleCallback ? ' has-idle-callback' : '') +
                    (hasIntersectionObserver ? ' has-intersection-observer' : '') +
                    (hasPerformanceNow ? ' has-performance-now' : '');
                  
                  // Medir tempo de inicialização do JavaScript
                  if (hasPerformanceNow) {
                    window.addEventListener('load', function() {
                      setTimeout(function() {
                        var timing = {
                          initTime: Date.now() - startTime,
                          loadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
                          jsTime: window.performance.now()
                        };
                        
                        // Armazenar métricas para uso posterior
                        window.__PERFORMANCE_METRICS = timing;
                        
                        // Ajustar experiência com base no desempenho
                        if (timing.initTime > 1000) {
                          // Navegador lento - reduzir animações e efeitos
                          document.documentElement.className += ' reduce-animations';
                        }
                      }, 0);
                    });
                  }
                  
                  // Função para carregar scripts de forma otimizada
                  window.__loadScript = function(src, async, defer) {
                    var script = document.createElement('script');
                    script.src = src;
                    if (async) script.async = true;
                    if (defer) script.defer = true;
                    document.body.appendChild(script);
                    return script;
                  };
                  
                  // Função para carregar recursos não críticos quando o navegador estiver ocioso
                  window.__loadNonCriticalResources = function() {
                    if (hasIdleCallback) {
                      window.requestIdleCallback(function() {
                        // Carregar recursos não críticos aqui
                      }, { timeout: 2000 });
                    } else {
                      setTimeout(function() {
                        // Carregar recursos não críticos aqui
                      }, 1000);
                    }
                  };
                })();
              `,
            }}
          />
          
          {/* Estilos críticos inline para melhorar o FCP */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                /* Estilos críticos para o primeiro render */
                body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
                
                /* Reduzir animações para dispositivos com preferência de movimento reduzido */
                @media (prefers-reduced-motion: reduce) {
                  * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                  }
                }
                
                /* Classe para reduzir animações em navegadores lentos */
                .reduce-animations * {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                  scroll-behavior: auto !important;
                }
                
                /* Otimizações para layout shifting */
                .player-wrapper {
                  min-height: 450px;
                }
                
                /* Otimizações para o LCP */
                .video-container {
                  background-color: #000;
                }
              `,
            }}
          />
          
          {/* Precarregar fontes críticas */}
          <link 
            rel="preload" 
            href="/fonts/your-main-font.woff2" 
            as="font" 
            type="font/woff2" 
            crossOrigin="anonymous" 
          />
          
          {/* Estilos críticos inline para melhorar FCP */}
          <style dangerouslySetInnerHTML={{ __html: `
            /* Estilos essenciais para o primeiro conteúdo visível */
            body { 
              margin: 0; 
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              color: #333;
              background-color: #ffffff;
            }
            .hero { 
              padding: 1rem;
              max-width: 1200px;
              margin: 0 auto;
            }
            h1 { 
              font-size: clamp(1.875rem, 5vw, 3rem); 
              line-height: 1.2;
              margin-bottom: 1rem;
            }
            p {
              font-size: clamp(1rem, 3vw, 1.25rem);
              line-height: 1.5;
            }
            .btn {
              display: inline-block;
              padding: 0.75rem 1.5rem;
              background-color: #0070f3;
              color: white;
              border-radius: 0.375rem;
              font-weight: 500;
              text-decoration: none;
              transition: background-color 0.2s ease;
            }
            .btn:hover {
              background-color: #0051bb;
            }
            @media (prefers-color-scheme: dark) {
              body {
                color: #f0f0f0;
                background-color: #1a1a1a;
              }
              .btn {
                background-color: #3694ff;
              }
              .btn:hover {
                background-color: #1a82ff;
              }
            }
          `}} />
          
          {/* Carregar CSS principal de forma não bloqueante */}
          <link 
            rel="preload" 
            href="/styles/main.css" 
            as="style" 
            onLoad="this.onload=null;this.rel='stylesheet'" 
          />
          <noscript>
            <link rel="stylesheet" href="/styles/main.css" />
          </noscript>
          
          {/* Carregue o smartplayer de forma otimizada */}
          <script
            type="text/partytown"
            src="URL_DO_SEU_SMARTPLAYER"
            strategy="lazyOnload"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 