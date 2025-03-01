import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src: string;
  alt: string;
  lowQualityPlaceholder?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  lowQualityPlaceholder = true,
  priority = false,
  ...props
}: OptimizedImageProps) => {
  const [loading, setLoading] = useState(true);
  const [blur, setBlur] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (lowQualityPlaceholder && !priority) {
      // Gera um placeholder de baixa qualidade
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 10;
        canvas.height = (10 * img.height) / img.width;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          setBlur(canvas.toDataURL('image/jpeg', 0.1));
        }
      };
      
      img.src = src;
    }
  }, [src, lowQualityPlaceholder, priority]);

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        priority={priority}
        placeholder={blur ? 'blur' : 'empty'}
        blurDataURL={blur}
        onLoadingComplete={() => setLoading(false)}
        className={`
          transition-opacity duration-300 ease-in-out
          ${loading ? 'opacity-0' : 'opacity-100'}
        `}
        {...props}
      />
    </div>
  );
}; 