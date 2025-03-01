import dynamic from 'next/dynamic';

// Carregamento dinâmico do componente de vídeo
export const DynamicVideoPlayer = dynamic(
  () => import('./VideoPlayer'),
  {
    ssr: false,
    loading: () => <div className="video-placeholder" style={{ 
      height: '400px', 
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p>Carregando player...</p>
    </div>
  }
);

// Carregamento dinâmico do componente de formulário
export const DynamicContactForm = dynamic(
  () => import('./ContactForm'),
  {
    ssr: false,
    loading: () => <div className="form-placeholder">Carregando formulário...</div>
  }
);

// Carregamento dinâmico de componentes de terceiros (como mapas, chats, etc)
export const DynamicThirdPartyWidget = dynamic(
  () => import('./ThirdPartyWidget'),
  {
    ssr: false,
    loading: () => <div className="widget-placeholder">Carregando widget...</div>
  }
);

// Função para observar quando um elemento entra na viewport
export function useIntersectionObserver(callback, options = {}) {
  const { root = null, rootMargin = '0px', threshold = 0 } = options;
  
  return (elementRef) => {
    if (typeof window !== 'undefined' && elementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              callback();
              observer.disconnect();
            }
          });
        },
        { root, rootMargin, threshold }
      );
      
      observer.observe(elementRef.current);
      
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }
  };
} 