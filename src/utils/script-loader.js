/**
 * Utilitário para carregar scripts de forma otimizada
 * Ajuda a reduzir o impacto de scripts de terceiros no carregamento da página
 */

// Função para carregar um script quando a página estiver ociosa
export function loadScriptOnIdle(src, options = {}) {
  const {
    id = null,
    async = true,
    defer = true,
    onLoad = () => {},
    onError = () => {},
    timeout = 2000, // Tempo máximo de espera antes de carregar o script
    attributes = {}
  } = options;

  return new Promise((resolve, reject) => {
    const loadScript = () => {
      // Verificar se o script já existe
      if (id && document.getElementById(id)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;
      
      if (id) script.id = id;
      
      // Adicionar atributos personalizados
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });

      script.onload = () => {
        onLoad();
        resolve();
      };

      script.onerror = (error) => {
        onError(error);
        reject(error);
      };

      document.body.appendChild(script);
    };

    // Usar requestIdleCallback se disponível, caso contrário usar setTimeout
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const idleCallbackId = window.requestIdleCallback(loadScript, { timeout });
        return () => window.cancelIdleCallback(idleCallbackId);
      } else {
        const timeoutId = setTimeout(loadScript, 50); // Pequeno atraso para não bloquear o carregamento inicial
        return () => clearTimeout(timeoutId);
      }
    }
  });
}

// Função para carregar um script quando o elemento estiver visível
export function loadScriptOnVisible(elementSelector, src, options = {}) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Fallback para navegadores que não suportam IntersectionObserver
    return loadScriptOnIdle(src, options);
  }

  return new Promise((resolve, reject) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        loadScriptOnIdle(src, options)
          .then(resolve)
          .catch(reject);
      }
    }, {
      rootMargin: '200px', // Carregar quando estiver a 200px de entrar na viewport
      threshold: 0
    });

    const element = document.querySelector(elementSelector);
    if (element) {
      observer.observe(element);
    } else {
      // Se o elemento não for encontrado, carregar o script normalmente
      loadScriptOnIdle(src, options)
        .then(resolve)
        .catch(reject);
    }
  });
}

// Função para carregar múltiplos scripts em sequência
export async function loadScriptsSequentially(scriptsConfig) {
  for (const config of scriptsConfig) {
    try {
      await loadScriptOnIdle(config.src, config.options);
    } catch (error) {
      console.error(`Erro ao carregar script ${config.src}:`, error);
    }
  }
}

// Função para carregar scripts após o evento LCP
export function loadScriptsAfterLCP(scriptsConfig) {
  if (typeof window === 'undefined') return;

  // Usar o PerformanceObserver para detectar o LCP
  if ('PerformanceObserver' in window) {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        lcpObserver.disconnect();
        
        // Carregar scripts após um pequeno atraso para garantir que o LCP foi renderizado
        setTimeout(() => {
          loadScriptsSequentially(scriptsConfig);
        }, 100);
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    // Fallback: se o LCP não for detectado em 5 segundos, carregar os scripts
    setTimeout(() => {
      lcpObserver.disconnect();
      loadScriptsSequentially(scriptsConfig);
    }, 5000);
  } else {
    // Fallback para navegadores que não suportam PerformanceObserver
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadScriptsSequentially(scriptsConfig);
      }, 1000);
    });
  }
} 