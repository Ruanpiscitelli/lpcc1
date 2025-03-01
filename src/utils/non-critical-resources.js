/**
 * Este arquivo contém funções que inicializam recursos não críticos
 * que podem ser carregados de forma assíncrona após o carregamento inicial
 */

// Inicializar recursos não críticos
export function initNonCriticalResources() {
  // Inicializar tracking avançado
  setupAdvancedTracking();
  
  // Carregar recursos adicionais
  loadAdditionalResources();
  
  console.log('Recursos não críticos inicializados');
}

// Configurar tracking avançado
function setupAdvancedTracking() {
  // Código que seria executado na thread principal agora está isolado
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      // Inicializar tracking quando o navegador estiver ocioso
      console.log('Tracking avançado inicializado');
    });
  } else {
    setTimeout(() => {
      // Fallback para browsers sem requestIdleCallback
      console.log('Tracking avançado inicializado (fallback)');
    }, 5000);
  }
}

// Carregar recursos adicionais
function loadAdditionalResources() {
  // Carregar imagens de baixa prioridade
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
  
  // Carregar outros widgets ou recursos
  console.log('Recursos adicionais carregados');
} 