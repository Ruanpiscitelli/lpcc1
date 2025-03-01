import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          {/* Inline Critical CSS para a LandingPage */}
          <style dangerouslySetInnerHTML={{ __html: `
            /* Reset básico */
            *, *::before, *::after {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            /* Estilos críticos para o LCP */
            .landingPage {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              padding: 0 1rem;
              font-family: sans-serif;
              background-color: #fff;
              color: #333;
            }
            
            /* Otimização para evitar layout shifts */
            img, video {
              max-width: 100%;
              height: auto;
              display: block;
            }
            
            /* Placeholder para imagens */
            .image-placeholder {
              background-color: #f0f0f0;
            }
            
            /* Animações otimizadas para o GPU */
            @media (prefers-reduced-motion: no-preference) {
              .fade-in {
                animation: fadeIn 0.5s ease-in;
                will-change: opacity;
              }
              
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            }
          `}} />
          
          {/* Pré-carrega a imagem crítica para LCP */}
          <link rel="preload" href="/imagens/hero.jpg" as="image" fetchpriority="high" />
          
          {/* Estabelece conexão com fontes e recursos críticos */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://scripts.converteai.net" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://scripts.converteai.net" />
          
          {/* Meta tags para melhorar a performance */}
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <meta name="format-detection" content="telephone=no" />
        </Head>
        <body>
          <Main />
          <NextScript />
          
          {/* Script para detectar conexões lentas e ajustar a experiência */}
          <script dangerouslySetInnerHTML={{ __html: `
            (function() {
              // Detectar conexão lenta
              const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
              if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
                document.documentElement.classList.add('slow-connection');
                
                // Desabilitar animações em conexões lentas
                const style = document.createElement('style');
                style.textContent = '* { animation-duration: 0.001s !important; transition-duration: 0.001s !important; }';
                document.head.appendChild(style);
              }
            })();
          `}} />
        </body>
      </Html>
    );
  }
}

export default MyDocument; 