/**
 * Arquivo de fallback para scripts externos
 * Usado quando não é possível carregar os scripts de CDNs externas
 */

// Registrar scripts de fallback para uso em casos de erro de carregamento
const fallbackScripts = {
  // Mapear scripts CDN para versões locais ou alternativas
  'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js': '/scripts/lazysizes.min.js',
  'https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js': '/scripts/converteai/lib/js/smartplayer/v1/sdk.min.js',
  '/scripts/converteai/lib/js/smartplayer/v1/sdk.min.js': '/scripts/converteai-sdk.min.js'
};

/**
 * Tenta carregar um script a partir de uma URL, com fallback para versão local
 * @param {string} url - URL original do script
 * @param {object} options - Opções de carregamento
 * @param {function} onSuccess - Callback para sucesso 
 * @param {function} onError - Callback para erro
 * @returns {HTMLScriptElement} - Elemento de script criado
 */
export function loadScriptWithFallback(url, options = {}, onSuccess = null, onError = null) {
  return new Promise((resolve, reject) => {
    console.log(`Tentando carregar script: ${url}`);
    
    // Verificar se o script já está carregado
    if (document.querySelector(`script[src="${url}"]`)) {
      console.log(`Script já carregado: ${url}`);
      if (onSuccess) onSuccess();
      resolve(null);
      return;
    }
    
    // Tentar carregar o script original
    const script = document.createElement('script');
    script.src = url;
    script.async = options.async !== false;
    script.defer = options.defer === true;
    
    // Adicionar crossorigin se especificado
    if (options.crossOrigin) {
      script.crossOrigin = options.crossOrigin;
    }
    
    // Definir referrer policy
    script.referrerPolicy = options.referrerPolicy || 'origin';
    
    // Função para tentar o fallback
    const tryFallback = () => {
      const fallbackUrl = fallbackScripts[url];
      
      if (fallbackUrl) {
        console.log(`Tentando carregar script de fallback: ${fallbackUrl}`);
        
        // Verificar se o fallback já está carregado
        if (document.querySelector(`script[src="${fallbackUrl}"]`)) {
          console.log(`Script de fallback já carregado: ${fallbackUrl}`);
          if (onSuccess) onSuccess();
          resolve(null);
          return;
        }
        
        const fallbackScript = document.createElement('script');
        fallbackScript.src = fallbackUrl;
        fallbackScript.async = options.async !== false;
        fallbackScript.defer = options.defer === true;
        
        fallbackScript.onload = () => {
          console.log(`Script de fallback carregado com sucesso: ${fallbackUrl}`);
          if (onSuccess) onSuccess();
          resolve(fallbackScript);
        };
        
        fallbackScript.onerror = (err) => {
          console.error(`Erro ao carregar script de fallback: ${fallbackUrl}`, err);
          
          // Tentar injetar script inline como último recurso
          console.log("Tentando injetar script inline como último recurso");
          
          try {
            // Para o Converteai, temos uma versão inline simplificada
            if (url.includes('converteai')) {
              const inlineScript = document.createElement('script');
              inlineScript.textContent = `
                // Fallback inline para Converteai
                (function(){
                  if(!window.sdk) {
                    window.sdk = {
                      init: function(opts) {
                        try {
                          var iframe = document.getElementById("ifr_" + opts.playerId);
                          if (iframe) {
                            try {
                              iframe.src = "https://scripts.converteai.net/" + opts.accountId + "/" + opts.playerId + "/player.html";
                              iframe.onload = function() { console.log("Player carregado via fallback inline"); };
                            } catch(e) { console.error("Erro ao inicializar iframe:", e); }
                          }
                        } catch(e) { console.error("Erro no SDK fallback:", e); }
                      },
                      create: function(opts) {
                        try {
                          if (!opts || !opts.playerId) { console.error("PlayerId necessário"); return; }
                          var playerId = opts.playerId;
                          var accountId = opts.accountId || "";
                          var target = document.getElementById(opts.selector || "player");
                          if (!target) { console.error("Elemento de destino não encontrado"); return; }
                          
                          target.innerHTML = '<iframe id="ifr_' + playerId + '" allowfullscreen="true" style="width:100%;height:100%;border:none" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="origin" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>';
                          this.init({playerId: playerId, accountId: accountId, targetElement: target});
                        } catch(e) { console.error("Erro ao criar player:", e); }
                      }
                    };
                  }
                })();
              `;
              
              document.body.appendChild(inlineScript);
              console.log("Script inline do Converteai injetado com sucesso");
              if (onSuccess) onSuccess();
              resolve(inlineScript);
              return;
            }
          } catch (inlineErr) {
            console.error("Erro ao injetar script inline:", inlineErr);
          }
          
          if (onError) onError(err);
          reject(err);
        };
        
        document.body.appendChild(fallbackScript);
      } else {
        console.error(`Não há fallback disponível para: ${url}`);
        if (onError) onError(new Error(`Não há fallback disponível para: ${url}`));
        reject(new Error(`Não há fallback disponível para: ${url}`));
      }
    };
    
    // Callbacks para o script original
    script.onload = () => {
      console.log(`Script carregado com sucesso: ${url}`);
      if (onSuccess) onSuccess();
      resolve(script);
    };
    
    script.onerror = (err) => {
      console.error(`Erro ao carregar script: ${url}`, err);
      // Tentar versão de fallback
      tryFallback();
    };
    
    // Adicionar o script ao documento
    document.body.appendChild(script);
  });
}

export default fallbackScripts; 