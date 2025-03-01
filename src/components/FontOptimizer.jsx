'use client';

import { useEffect } from 'react';

/**
 * FontOptimizer - Componente para otimizar o carregamento de fontes
 * 
 * Este componente implementa várias estratégias para melhorar o carregamento de fontes:
 * 1. Precarregamento de fontes críticas
 * 2. Implementação de font-display: swap para melhorar a experiência do usuário
 * 3. Detecção de fontes já carregadas para evitar flash de texto não estilizado (FOUT)
 * 4. Armazenamento em cache de fontes para carregamentos subsequentes
 */
export default function FontOptimizer() {
  useEffect(() => {
    // Lista de fontes críticas para a aplicação
    const criticalFonts = [
      {
        family: 'Montserrat',
        weights: [400, 500, 600, 700],
        display: 'swap',
        preload: true
      },
      {
        family: 'Inter',
        weights: [400, 500],
        display: 'swap',
        preload: true
      }
    ];

    // Função para verificar se a fonte já está carregada
    const isFontLoaded = (fontFamily) => {
      // Verificar se a fonte já está disponível no navegador
      return document.fonts.check(`1em ${fontFamily}`);
    };

    // Função para adicionar preload para fontes críticas
    const preloadCriticalFonts = () => {
      criticalFonts.forEach(font => {
        if (!font.preload) return;
        
        font.weights.forEach(weight => {
          // Criar link de preload para cada variação de fonte
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = `/fonts/${font.family.toLowerCase()}-${weight}.woff2`;
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
          document.head.appendChild(link);
        });
      });
    };

    // Função para adicionar regras de font-display
    const addFontDisplayRules = () => {
      // Criar uma folha de estilo para adicionar regras de font-display
      const style = document.createElement('style');
      
      let cssRules = '';
      criticalFonts.forEach(font => {
        cssRules += `
          @font-face {
            font-family: '${font.family}';
            font-display: ${font.display};
            font-weight: normal;
            font-style: normal;
          }
        `;
      });
      
      style.textContent = cssRules;
      document.head.appendChild(style);
    };

    // Função para otimizar o carregamento de fontes
    const optimizeFontLoading = () => {
      // Adicionar classe ao body para indicar que as fontes estão sendo carregadas
      document.body.classList.add('fonts-loading');
      
      // Verificar quando as fontes estão carregadas
      if ('fonts' in document) {
        Promise.all(
          criticalFonts.flatMap(font => 
            font.weights.map(weight => 
              new FontFace(font.family, `url(/fonts/${font.family.toLowerCase()}-${weight}.woff2) format('woff2')`, { 
                weight: weight.toString(),
                display: font.display
              }).load()
            )
          )
        )
        .then(loadedFonts => {
          // Adicionar as fontes carregadas ao FontFaceSet do documento
          loadedFonts.forEach(font => document.fonts.add(font));
          
          // Indicar que as fontes foram carregadas
          document.body.classList.remove('fonts-loading');
          document.body.classList.add('fonts-loaded');
          
          // Armazenar no sessionStorage que as fontes foram carregadas
          try {
            sessionStorage.setItem('fontsLoaded', 'true');
          } catch (e) {
            console.warn('Não foi possível armazenar o estado das fontes:', e);
          }
        })
        .catch(error => {
          console.error('Erro ao carregar fontes:', error);
          // Em caso de erro, ainda remover a classe de carregamento
          document.body.classList.remove('fonts-loading');
        });
      }
    };

    // Verificar se as fontes já foram carregadas anteriormente
    const checkPreviouslyLoadedFonts = () => {
      try {
        if (sessionStorage.getItem('fontsLoaded') === 'true') {
          // Se as fontes já foram carregadas, adicionar classe imediatamente
          document.body.classList.add('fonts-loaded');
          return true;
        }
      } catch (e) {
        console.warn('Não foi possível verificar o estado das fontes:', e);
      }
      return false;
    };

    // Implementar estratégia de carregamento de fontes
    if (!checkPreviouslyLoadedFonts()) {
      // Precarregar fontes críticas
      preloadCriticalFonts();
      
      // Adicionar regras de font-display
      addFontDisplayRules();
      
      // Otimizar carregamento de fontes
      if (document.readyState === 'complete') {
        optimizeFontLoading();
      } else {
        window.addEventListener('load', optimizeFontLoading);
      }
    }

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener('load', optimizeFontLoading);
    };
  }, []);

  return null; // Este componente não renderiza nada visualmente
} 