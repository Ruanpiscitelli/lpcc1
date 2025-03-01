'use client';

import React from 'react';
import Image from 'next/image';

// Exemplo de como você importaria imagens locais
// import bannerImage from '@/assets/images/banner.jpg';
// import logoImage from '@/assets/images/logo.png';

// Este é um componente de exemplo para demonstrar o uso de imagens
export default function ImageExample() {
  return (
    <div className="image-examples">
      <h2>Exemplos de Uso de Imagens</h2>
      
      <h3>1. Imagem da pasta public (URL direta)</h3>
      <div className="example-container">
        <Image 
          src="/images/exemplo-public.jpg" // Caminho relativo à pasta public
          alt="Exemplo de imagem da pasta public"
          width={400}
          height={300}
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        <code>src="/images/exemplo-public.jpg"</code>
      </div>
      
      <h3>2. Imagem importada da pasta assets (quando você tiver imagens)</h3>
      <div className="example-container">
        {/* 
        <Image 
          src={bannerImage} // Objeto importado
          alt="Exemplo de imagem importada"
          placeholder="blur" // Mostra uma versão desfocada durante o carregamento
          priority={false} // Defina como true para imagens acima da dobra
        />
        <code>import bannerImage from '@/assets/images/banner.jpg';</code>
        */}
        <p>Descomente o código acima quando tiver imagens na pasta assets.</p>
      </div>
      
      <h3>3. Imagem remota (com domínios permitidos)</h3>
      <div className="example-container">
        <Image 
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" 
          alt="Exemplo de imagem remota"
          width={400}
          height={300}
          style={{ objectFit: 'cover' }}
          loading="lazy"
        />
        <p>Nota: Para usar imagens remotas, você precisa configurar os domínios permitidos no arquivo next.config.mjs:</p>
        <pre>
          {`
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
};
          `}
        </pre>
      </div>
      
      <style jsx>{`
        .image-examples {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        
        h3 {
          font-size: 18px;
          margin: 30px 0 10px;
        }
        
        .example-container {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        
        code, pre {
          background-color: #f5f5f5;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: monospace;
          display: block;
          margin-top: 10px;
        }
        
        pre {
          padding: 15px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
