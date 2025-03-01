import { useEffect } from 'react';

export default function VideoPlayer() {
  useEffect(() => {
    // Garante que o código só roda no cliente
    if (typeof window !== 'undefined') {
      // Aguarda o DOM estar completamente carregado
      window.addEventListener('load', () => {
        // Verifica se o smartplayer existe
        if (window.smartplayer) {
          try {
            // Inicializa o player com configuração segura
            window.smartplayer({
              // Suas configurações aqui
              container: '#video-container', // Certifique-se que este elemento existe
              url: 'URL_DO_SEU_VIDEO',
              width: '100%',
              height: '100%',
              // Desabilita tracking que pode causar erros
              smart: false
            });
          } catch (err) {
            console.error('Erro ao inicializar smartplayer:', err);
          }
        }
      });
    }
  }, []);

  return (
    <div id="video-container" className="video-wrapper">
      {/* Elemento de fallback enquanto o player carrega */}
      <div className="video-placeholder">Carregando vídeo...</div>
    </div>
  );
} 