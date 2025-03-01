'use client';

import { useState, useEffect, useRef, memo } from 'react';
import Image from 'next/image';

/**
 * Componente OptimizedImage
 * 
 * Este componente implementa uma estratégia de carregamento progressivo para imagens
 * com placeholder, transição suave e detecção de interseção para carregamento
 * apenas quando a imagem estiver próxima de entrar na viewport.
 * 
 * @param {string} src - URL da imagem
 * @param {string} alt - Texto alternativo para acessibilidade
 * @param {string} placeholderColor - Cor de fundo do placeholder (opcional)
 * @param {boolean} priority - Se a imagem deve ter prioridade alta (opcional)
 * @param {Object} props - Outras propriedades para passar ao componente Image
 */
const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality = 75,
  placeholder = 'blur',
  blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7yQCgAAAABJRU5ErkJggg==',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  
  // Para melhorar o LCP, pré-carregar imagens prioritárias
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  // Função para lidar com o carregamento da imagem
  const handleImageLoad = () => {
    setLoaded(true);
  };

  // Efeito para verificar se a imagem já está em cache
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <div 
      className={`optimized-image-wrapper ${className}`}
      style={{ 
        position: 'relative',
        width: '100%',
        maxWidth: width,
        aspectRatio: `${width}/${height}`,
        backgroundColor: '#f0f0f0', // Cor de placeholder
        overflow: 'hidden'
      }}
    >
      {/* Placeholder enquanto a imagem carrega */}
      {!loaded && !priority && (
        <div 
          className="image-placeholder"
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
      
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleImageLoad}
        style={{
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        {...props}
      />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage; 