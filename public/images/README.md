# Pasta de Imagens

Esta pasta é destinada para armazenar todas as imagens utilizadas no projeto da landing page.

## Recomendações

### Formatos de Imagem
- **JPG/JPEG**: Ideal para fotografias e imagens com muitas cores
- **PNG**: Melhor para imagens que precisam de transparência
- **SVG**: Perfeito para ícones, logos e ilustrações que precisam ser escaláveis
- **WebP**: Formato moderno com melhor compressão, recomendado para otimização de desempenho

### Otimização
- Comprima as imagens antes de adicioná-las ao projeto (use ferramentas como TinyPNG, ImageOptim)
- Dimensione as imagens para o tamanho exato em que serão exibidas
- Considere usar o componente `next/image` do Next.js para otimização automática

### Nomenclatura
- Use nomes descritivos em minúsculas
- Separe palavras com hífens (ex: `banner-principal.jpg`)
- Evite espaços e caracteres especiais nos nomes dos arquivos

## Como Usar no Código

### Em componentes React
```jsx
import Image from 'next/image';

// Usando o componente Image do Next.js (recomendado)
<Image 
  src="/images/nome-da-imagem.jpg" 
  alt="Descrição da imagem" 
  width={800} 
  height={600} 
  priority={false} // Defina como true para imagens acima da dobra
  loading="lazy" // Para imagens abaixo da dobra
/>

// Usando a tag img tradicional
<img 
  src="/images/nome-da-imagem.jpg" 
  alt="Descrição da imagem" 
  loading="lazy" 
/>
```

### Em CSS
```css
.elemento {
  background-image: url('/images/nome-da-imagem.jpg');
}
