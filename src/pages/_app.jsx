import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </Head>
      
      {/* Carregar scripts externos de forma segura */}
      <Script
        id="handle-hydration-error"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('error', function(e) {
              // Capturar e lidar com erros de hidratação
              if (e.message.includes('Hydration failed because the server')) {
                console.warn('Hydration error intercepted:', e.message);
                e.stopImmediatePropagation();
              }
            });
            
            // Remover atributos problemáticos adicionados por extensões
            document.addEventListener('DOMContentLoaded', function() {
              setTimeout(() => {
                try {
                  const elementsWithTagAssistant = document.querySelectorAll('[data-tag-assistant-present], [data-tag-assistant-prod-present]');
                  elementsWithTagAssistant.forEach(el => {
                    el.removeAttribute('data-tag-assistant-present');
                    el.removeAttribute('data-tag-assistant-prod-present');
                  });
                } catch (e) {
                  console.warn('Error cleaning tag assistant attributes:', e);
                }
              }, 0);
            });
          `,
        }}
      />
      
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp; 