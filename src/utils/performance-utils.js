/**
 * Utilitários para otimização de performance
 */

/**
 * Carrega um script apenas quando o componente estiver visível no viewport
 * @param {string} src URL do script
 * @param {string} id ID do script
 * @param {Function} onLoad Callback quando o script for carregado
 * @param {Function} onError Callback quando ocorrer um erro
 * @param {Object} options Opções adicionais
 */
export function loadScriptWhenVisible(src, id, onLoad, onError, options = {}) {
  if (typeof window === 'undefined') return;

  const { rootMargin = '200px', threshold = 0.1, delay = 0, targetId = null } = options;

  // Verificar se o script já existe para evitar duplicação
  if (document.getElementById(id)) {
    if (onLoad && typeof onLoad === 'function') {
      // Chamar onLoad se o script já estiver carregado
      onLoad();
    }
    return;
  }
  
  // Se for um script de player de vídeo, verificar se o container existe
  if (id.includes('scr_') && targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
      console.warn(`Elemento alvo ${targetId} não encontrado para o script ${id}`);
      if (onError && typeof onError === 'function') {
        onError(new Error(`Elemento alvo ${targetId} não encontrado`));
      }
      return;
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Desconectar o observer imediatamente para evitar múltiplas chamadas
        observer.disconnect();
        
        // Adicionar um pequeno atraso opcional para não competir com recursos críticos
        setTimeout(() => {
          // Verificar novamente se o script já existe para evitar duplicação
          if (document.getElementById(id)) {
            if (onLoad && typeof onLoad === 'function') {
              onLoad();
            }
            return;
          }
          
          // Verificar novamente se o elemento alvo existe (para scripts de player)
          if (id.includes('scr_') && targetId) {
            const targetElement = document.getElementById(targetId);
            if (!targetElement) {
              console.warn(`Elemento alvo ${targetId} não encontrado para o script ${id} no momento de carregar`);
              if (onError && typeof onError === 'function') {
                onError(new Error(`Elemento alvo ${targetId} não encontrado no momento de carregar`));
              }
              return;
            }
          }
          
          const script = document.createElement('script');
          script.src = src;
          script.id = id;
          script.async = true;
          script.defer = true;
          
          // Garantir que os callbacks são funções antes de atribuí-los
          if (onLoad && typeof onLoad === 'function') {
            script.onload = onLoad;
          }
          
          if (onError && typeof onError === 'function') {
            script.onerror = onError;
          }
          
          // Adicionar tratamento de erro global para o script
          script.addEventListener('error', (e) => {
            console.error(`Erro ao carregar script ${id}:`, e);
            // Remover o script com erro para permitir nova tentativa
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          });
          
          // Adicionar um atributo de data para rastreamento
          script.setAttribute('data-load-time', new Date().toISOString());
          
          // Adicionar o script ao body
          document.body.appendChild(script);
        }, delay);
      }
    });
  }, { rootMargin, threshold });

  // Observar o elemento com o ID especificado ou o body se não encontrar
  const target = targetId ? document.getElementById(targetId) : (document.getElementById(id) || document.body);
  observer.observe(target);

  // Retornar função para limpar o observer
  return () => observer.disconnect();
}

/**
 * Atrasa a execução de scripts não críticos
 * @param {Function} callback Função a ser executada
 * @param {number} delay Tempo de atraso em ms
 */
export function deferNonCriticalScript(callback, delay = 3000) {
  if (typeof window === 'undefined') return;
  
  // Usar requestIdleCallback quando disponível para melhor performance
  const executeWithDelay = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        setTimeout(callback, delay);
      }, { timeout: 1000 });
    } else {
      setTimeout(callback, delay);
    }
  };
  
  // Verificar se o documento já foi carregado
  if (document.readyState === 'complete') {
    executeWithDelay();
  } else {
    // Caso contrário, esperar o evento load e então adicionar o timeout
    window.addEventListener('load', executeWithDelay, { once: true });
  }
}

/**
 * Pré-conecta a domínios importantes
 * @param {Array} domains Lista de domínios para pré-conectar
 */
export function preconnectToDomains(domains) {
  if (typeof window === 'undefined') return;
  
  // Usar requestIdleCallback para não bloquear a renderização
  const setupPreconnect = () => {
    const fragment = document.createDocumentFragment();
    
    domains.forEach(domain => {
      // Verificar se já existe um preconnect para este domínio
      if (document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
        return;
      }
      
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      fragment.appendChild(link);
      
      // Também adicionar dns-prefetch como fallback
      const dnsLink = document.createElement('link');
      dnsLink.rel = 'dns-prefetch';
      dnsLink.href = domain;
      fragment.appendChild(dnsLink);
    });
    
    document.head.appendChild(fragment);
  };
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(setupPreconnect, { timeout: 1000 });
  } else {
    setTimeout(setupPreconnect, 20); // Atraso mínimo para não bloquear a renderização
  }
}

/**
 * Otimiza o carregamento de fontes usando preload
 * @param {string[]} fontUrls - Array de URLs das fontes para precarregar
 */
export const preloadFonts = (fontUrls) => {
  if (typeof document === 'undefined' || !Array.isArray(fontUrls)) return;
  
  fontUrls.forEach(fontUrl => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = fontUrl;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Detecta quando o navegador está ocioso para executar tarefas não críticas
 * @param {Function} callback Função a ser executada
 * @param {Object} options Opções adicionais
 */
export function runWhenIdle(callback, options = {}) {
  if (typeof window === 'undefined') return;
  
  const { timeout = 1000 } = options;
  
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout });
  } else {
    return setTimeout(callback, 50); // Atraso maior para simular requestIdleCallback
  }
}

/**
 * Verifica se o navegador suporta back/forward cache
 * @returns {boolean}
 */
export function supportsBFCache() {
  if (typeof window === 'undefined') return false;
  
  // Verificar se o navegador suporta o evento pageshow
  return 'onpageshow' in window;
}

/**
 * Otimiza o site para o Back/Forward Cache (BFCache)
 * https://web.dev/articles/bfcache
 */
export const optimizeBFCache = () => {
  if (typeof window === 'undefined') return;

  // Evitar uso de unload que impede o BFCache
  window.addEventListener('pagehide', (event) => {
    // Código a ser executado quando a página é escondida
    // Não usar 'unload' aqui
  });

  // Usar 'pageshow' para detectar quando a página é restaurada do BFCache
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // Página foi restaurada do BFCache
      // Reinicializar estados se necessário
    }
  });
};

/**
 * Divide o trabalho em chunks para evitar bloquear a thread principal
 * @param {Array} tasks - Array de funções a serem executadas
 * @param {number} [chunkSize=5] - Número de tarefas por chunk
 * @param {number} [delay=1] - Atraso entre chunks em ms
 */
export const chunkedTasks = (tasks, chunkSize = 5, delay = 1) => {
  if (typeof window === 'undefined') return;
  
  let index = 0;
  
  const executeChunk = () => {
    const limit = Math.min(index + chunkSize, tasks.length);
    
    while (index < limit) {
      tasks[index]();
      index++;
    }
    
    if (index < tasks.length) {
      setTimeout(executeChunk, delay);
    }
  };
  
  // Iniciar a execução dos chunks
  if (tasks.length > 0) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => executeChunk(), { timeout: 1000 });
    } else {
      setTimeout(executeChunk, 1);
    }
  }
};

/**
 * Carrega scripts de forma otimizada
 * @param {string} src - URL do script
 * @param {Object} [options] - Opções adicionais
 * @param {boolean} [options.async=true] - Carregar de forma assíncrona
 * @param {boolean} [options.defer=false] - Adiar carregamento
 * @param {string} [options.type='text/javascript'] - Tipo do script
 * @param {Function} [options.onLoad] - Callback quando carregado
 * @param {Function} [options.onError] - Callback em caso de erro
 * @returns {Promise} - Promise resolvida quando o script for carregado
 */
export const loadScriptOptimized = (src, options = {}) => {
  if (typeof document === 'undefined') return Promise.resolve();
  
  const {
    async = true,
    defer = false,
    type = 'text/javascript',
    onLoad,
    onError,
  } = options;
  
  return new Promise((resolve, reject) => {
    // Verificar se o script já existe
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.type = type;
    script.async = async;
    script.defer = defer;
    
    script.onload = () => {
      if (onLoad) onLoad();
      resolve();
    };
    
    script.onerror = (error) => {
      if (onError) onError(error);
      reject(error);
    };
    
    // Adicionar ao final do body para não bloquear o parsing
    document.body.appendChild(script);
  });
};

/**
 * Otimiza o carregamento de recursos de terceiros
 * @param {Function} callback - Função a ser executada
 * @param {number} [delay=2000] - Atraso em ms
 */
export const deferThirdPartyResources = (callback, delay = 2000) => {
  if (typeof window === 'undefined' || typeof callback !== 'function') return;
  
  // Verificar se callback é uma função antes de executar
  const safeCallback = () => {
    try {
      callback();
    } catch (error) {
      console.error('Erro ao executar callback diferido:', error);
    }
  };
  
  // Usar requestIdleCallback se disponível
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(safeCallback, { timeout: delay });
  } else if ('requestAnimationFrame' in window) {
    // Fallback para requestAnimationFrame
    window.requestAnimationFrame(() => {
      setTimeout(safeCallback, 100);
    });
  } else {
    // Último fallback para setTimeout
    setTimeout(safeCallback, delay);
  }
};

/**
 * Otimiza o carregamento de imagens
 * @param {NodeList|Array} images - Coleção de elementos de imagem
 */
export const optimizeImageLoading = (images) => {
  if (typeof window === 'undefined' || !images || images.length === 0) return;
  
  // Converter para array se for NodeList
  const imagesArray = Array.from(images);
  
  // Função para carregar uma imagem
  const loadImage = (img) => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      delete img.dataset.src;
    }
    
    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
      delete img.dataset.srcset;
    }
  };
  
  // Criar um observador de interseção para carregar imagens quando visíveis
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '200px 0px', // Carregar imagens 200px antes de entrarem na viewport
      threshold: 0.01
    });
    
    imagesArray.forEach((img) => observer.observe(img));
  } else {
    // Fallback para navegadores que não suportam IntersectionObserver
    chunkedTasks(imagesArray.map(img => () => loadImage(img)));
  }
};

/**
 * Otimiza o carregamento de CSS
 * @param {string} href - URL do arquivo CSS
 * @param {Object} [options] - Opções adicionais
 * @returns {Promise} - Promise resolvida quando o CSS for carregado
 */
export const loadCSSOptimized = (href, options = {}) => {
  if (typeof document === 'undefined') return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    // Verificar se o CSS já existe
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    if (options.media) link.media = options.media;
    if (options.id) link.id = options.id;
    
    link.onload = resolve;
    link.onerror = reject;
    
    document.head.appendChild(link);
  });
};

/**
 * Otimiza o carregamento de scripts de terceiros
 * @param {Array} scripts - Array de objetos com informações dos scripts
 */
export const optimizeThirdPartyScripts = (scripts) => {
  if (typeof window === 'undefined' || !scripts || scripts.length === 0) return;
  
  // Dividir scripts em críticos e não críticos
  const criticalScripts = scripts.filter(script => script.critical);
  const nonCriticalScripts = scripts.filter(script => !script.critical);
  
  // Carregar scripts críticos imediatamente
  criticalScripts.forEach(script => {
    loadScriptOptimized(script.src, script.options);
  });
  
  // Adiar carregamento de scripts não críticos
  deferThirdPartyResources(() => {
    chunkedTasks(nonCriticalScripts.map(script => {
      return () => loadScriptOptimized(script.src, script.options);
    }));
  });
};

/**
 * Carrega CSS crítico inline
 * @param {string} cssPath - Caminho para o arquivo CSS crítico
 * @param {boolean} [removeAfterLoad=false] - Se deve remover o estilo após carregar o CSS externo
 */
export const loadCriticalCSS = (cssPath, removeAfterLoad = false) => {
  if (typeof window === 'undefined') return;
  
  // Criar um ID único para o estilo crítico baseado no caminho
  const styleId = `critical-css-${cssPath.replace(/[^\w]/g, '-')}`;
  
  // Verificar se já existe
  if (document.getElementById(styleId)) return;
  
  // Carregar o CSS através de fetch
  fetch(cssPath)
    .then(response => response.text())
    .then(cssText => {
      // Criar elemento de estilo e inserir o CSS
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = cssText;
      document.head.appendChild(style);
      
      // Se devemos remover após carregar o CSS externo
      if (removeAfterLoad) {
        // Carregar o CSS externo e remover o inline quando carregar
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        link.onload = () => {
          // Remover o estilo inline quando o CSS externo carregar
          const criticalStyle = document.getElementById(styleId);
          if (criticalStyle) {
            criticalStyle.remove();
          }
        };
        document.head.appendChild(link);
      }
    })
    .catch(error => {
      console.error('Erro ao carregar CSS crítico:', error);
    });
};

/**
 * Melhora a prioridade de carregamento de recursos críticos
 * @param {Object} options - Opções de configuração
 * @param {boolean} [options.preloadFonts=true] - Se deve precarregar fontes
 * @param {boolean} [options.preloadLCP=true] - Se deve precarregar imagem LCP
 * @param {boolean} [options.preconnectDomains=true] - Se deve fazer preconnect para domínios
 */
export const optimizeResourceLoading = (options = {}) => {
  if (typeof window === 'undefined') return;
  
  const {
    preloadFonts = true,
    preloadLCP = true,
    preconnectDomains = true
  } = options;
  
  // Detectar se o dispositivo é de alta velocidade
  const isHighPerformanceConnection = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) return true; // Assumir conexão rápida se não puder detectar
    
    // Verificar tipo de conexão ou largura de banda estimada
    return (
      connection.type === 'wifi' || 
      connection.type === 'ethernet' || 
      connection.downlink >= 5 || // 5 Mbps ou mais
      connection.effectiveType === '4g'
    );
  };
  
  const highPerformance = isHighPerformanceConnection();
  
  // Otimizar o carregamento com base na performance da conexão
  if (preconnectDomains) {
    // Domínios críticos para preconnect
    const criticalDomains = [
      'https://images.converteai.net',
      'https://cdn.converteai.net'
    ];
    
    // Adicionar apenas os domínios mais importantes se a conexão for lenta
    const domainsToConnect = highPerformance 
      ? criticalDomains.concat([
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com'
        ])
      : criticalDomains;
    
    // Criar links de preconnect
    domainsToConnect.forEach(domain => {
      // Verificar se já existe
      if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
      
      // DNS prefetch como fallback
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${domain}"]`)) {
        const dnsLink = document.createElement('link');
        dnsLink.rel = 'dns-prefetch';
        dnsLink.href = domain;
        document.head.appendChild(dnsLink);
      }
    });
  }
  
  // Precarregar fontes críticas
  if (preloadFonts && highPerformance) {
    const criticalFonts = [
      '/fonts/your-critical-font.woff2'
    ];
    
    criticalFonts.forEach(fontUrl => {
      if (!document.querySelector(`link[rel="preload"][href="${fontUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = fontUrl;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }
  
  // Precarregar imagem LCP
  if (preloadLCP) {
    const lcpImageUrl = 'https://images.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/6759dd77d07a5ff5c7ca43f4/thumbnail.jpg';
    
    if (!document.querySelector(`link[rel="preload"][href="${lcpImageUrl}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = lcpImageUrl;
      link.as = 'image';
      link.type = 'image/jpeg';
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
  }
};

/**
 * Minificação de chunks de JavaScript em runtime
 * Ajuda a reduzir o tamanho do chunk 517 e outros
 */
export const optimizeChunks = () => {
  if (typeof window === 'undefined') return;
  
  // Verificar se o navegador suporta module/nomodule
  const supportsModules = 'noModule' in document.createElement('script');
  
  // Adicionar atributo `type="module"` para scripts que podem ser carregados como módulos
  // Isso pode ajudar a reduzir o tamanho dos chunks, pois os navegadores modernos
  // podem fazer tree-shaking mais eficiente com módulos ES
  if (supportsModules) {
    // Encontrar scripts que podem ser convertidos para módulos
    const scripts = document.querySelectorAll('script[src*="/_next/static/chunks/"]');
    scripts.forEach(script => {
      if (!script.type && !script.noModule) {
        // Adicionar type="module" para browsers modernos
        const moduleScript = document.createElement('script');
        moduleScript.type = 'module';
        moduleScript.src = script.src;
        moduleScript.async = script.async;
        moduleScript.defer = true;
        
        // Criar um fallback para navegadores antigos
        const noModuleScript = document.createElement('script');
        noModuleScript.noModule = true;
        noModuleScript.src = script.src;
        noModuleScript.async = script.async;
        
        // Substituir o script original
        script.parentNode.replaceChild(moduleScript, script);
        document.head.appendChild(noModuleScript);
      }
    });
  }
  
  // Otimizar a ordem de carregamento de chunks com prioridade baixa
  const lowPriorityChunks = ['517-b8105c30972b0de5.js'];
  lowPriorityChunks.forEach(chunkName => {
    const script = document.querySelector(`script[src*="${chunkName}"]`);
    if (script) {
      // Configurar o script para baixa prioridade
      script.setAttribute('fetchpriority', 'low');
      script.async = true;
      script.defer = true;
      
      // Se possível, mover para o fim do body
      if (script.parentNode !== document.body) {
        document.body.appendChild(script);
      }
    }
  });
};
