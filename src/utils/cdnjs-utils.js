/**
 * Utilitários para carregar recursos do CDNJS
 */

/**
 * Biblioteca de versões e caminhos para recursos do CDNJS
 */
export const CDNJS_LIBRARIES = {
  // Bibliotecas CSS
  animatecss: {
    version: '4.1.1',
    css: '/animate.min.css'
  },
  
  // Bibliotecas JavaScript
  lazysizes: {
    version: '5.3.2',
    js: '/lazysizes.min.js'
  },
  
  // Adicione mais bibliotecas conforme necessário
  fontawesome: {
    version: '6.4.0',
    css: '/css/all.min.css'
  },
  
  swiper: {
    version: '9.3.2',
    js: '/swiper-bundle.min.js',
    css: '/swiper-bundle.min.css'
  }
};

/**
 * Carrega um script do CDNJS
 * @param {string} library Nome da biblioteca
 * @param {string} version Versão da biblioteca
 * @param {string} path Caminho do arquivo
 * @returns {Promise} Promise que resolve quando o script é carregado
 */
export function loadCdnjsScript(library, version, path) {
  return new Promise((resolve, reject) => {
    // Verificar se o script já existe
    const existingScript = document.getElementById(`cdnjs-${library}`);
    if (existingScript) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.id = `cdnjs-${library}`;
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/${library}/${version}${path}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log(`CDNJS: ${library} carregado com sucesso`);
      resolve();
    };
    
    script.onerror = (error) => {
      console.error(`CDNJS: Erro ao carregar ${library}`, error);
      // Remover o script com erro para permitir nova tentativa
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      reject(error);
    };
    
    document.body.appendChild(script);
  });
}

/**
 * Carrega um estilo do CDNJS
 * @param {string} library Nome da biblioteca
 * @param {string} version Versão da biblioteca
 * @param {string} path Caminho do arquivo
 * @returns {Promise} Promise que resolve quando o estilo é carregado
 */
export function loadCdnjsStyle(library, version, path) {
  return new Promise((resolve, reject) => {
    // Verificar se o estilo já existe
    const existingStyle = document.getElementById(`cdnjs-style-${library}`);
    if (existingStyle) {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.id = `cdnjs-style-${library}`;
    link.rel = 'stylesheet';
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/${library}/${version}${path}`;
    
    link.onload = () => {
      console.log(`CDNJS: Estilo ${library} carregado com sucesso`);
      resolve();
    };
    
    link.onerror = (error) => {
      console.error(`CDNJS: Erro ao carregar estilo ${library}`, error);
      // Remover o link com erro para permitir nova tentativa
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      reject(error);
    };
    
    document.head.appendChild(link);
  });
}

/**
 * Pré-carrega múltiplos recursos do CDNJS
 * @param {Array} resources Array de objetos com {library, version, path, type}
 * @returns {Promise} Promise que resolve quando todos os recursos são carregados
 */
export function preloadCdnjsResources(resources) {
  if (typeof window === 'undefined') return Promise.resolve();
  
  const promises = resources.map(resource => {
    const { library, version, path, type = 'script' } = resource;
    
    if (type === 'style') {
      return loadCdnjsStyle(library, version, path);
    } else {
      return loadCdnjsScript(library, version, path);
    }
  });
  
  return Promise.all(promises);
} 