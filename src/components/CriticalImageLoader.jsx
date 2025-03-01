'use client';

import { useEffect, useRef, useState, memo } from 'react';
import Image from 'next/image';
import Head from 'next/head';

/**
 * Componente CriticalImageLoader
 * 
 * Este componente é especializado em carregar imagens críticas para o LCP (Largest Contentful Paint)
 * com otimizações avançadas como:
 * - Preload da imagem com alta prioridade
 * - Renderização imediata sem lazy loading
 * - Placeholder durante o carregamento
 * - Monitoramento do LCP
 * 
 * @param {Object} props - Propriedades do componente
 * @param {string} props.src - URL da imagem
 * @param {string} props.alt - Texto alternativo para acessibilidade
 * @param {number} props.width - Largura da imagem
 * @param {number} props.height - Altura da imagem
 * @param {string} props.className - Classes CSS adicionais
 * @param {number} props.quality - Qualidade da imagem (1-100)
 * @param {Object} props.style - Estilos inline adicionais
 */
const CriticalImageLoader = memo(({
  src,
  alt,
  width,
  height,
  className = '',
  quality = 90,
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);
  const [lcpTime, setLcpTime] = useState(null);
  
  // Monitorar o LCP
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;
    
    // Criar um PerformanceObserver para monitorar o LCP
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const lcpEntry = entries[entries.length - 1];
        
        // Verificar se o elemento LCP é nossa imagem
        if (imageRef.current && lcpEntry.element === imageRef.current) {
          setLcpTime(lcpEntry.startTime);
          
          // Registrar métricas (pode ser enviado para analytics)
          console.log(`LCP para imagem ${src}: ${lcpEntry.startTime}ms`);
          
          // Marcar como carregado para remover placeholder
          setIsLoaded(true);
        }
        
        lcpObserver.disconnect();
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    return () => {
      lcpObserver.disconnect();
    };
  }, [src]);
  
  // Verificar se a imagem já está em cache
  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);
  
  // Função para lidar com o carregamento da imagem
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  // Extrair o tipo de imagem para o preload
  const getImageType = () => {
    const extension = src.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'webp':
        return 'image/webp';
      case 'avif':
        return 'image/avif';
      default:
        return 'image/jpeg';
    }
  };
  
  return (
    <>
      <Head>
        {/* Preload da imagem crítica com alta prioridade */}
        <link 
          rel="preload" 
          href={src} 
          as="image" 
          fetchpriority="high" 
          type={getImageType()} 
        />
      </Head>
      
      <div 
        className={`critical-image-container ${className}`} 
        style={{ 
          position: 'relative',
          overflow: 'hidden',
          ...style
        }}
      >
        {/* Placeholder enquanto a imagem carrega */}
        {!isLoaded && (
          <div 
            className="critical-image-placeholder"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              zIndex: 1
            }}
          />
        )}
        
        {/* Imagem crítica com prioridade alta */}
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={true} // Sempre carregar com prioridade
          onLoad={handleImageLoad}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
          {...props}
        />
        
        {/* Exibir tempo de LCP em desenvolvimento */}
        {process.env.NODE_ENV === 'development' && lcpTime && (
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              zIndex: 10
            }}
          >
            LCP: {Math.round(lcpTime)}ms
          </div>
        )}
      </div>
    </>
  );
});

CriticalImageLoader.displayName = 'CriticalImageLoader';

export default CriticalImageLoader; 