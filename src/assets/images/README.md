# Pasta de Imagens em Assets

Esta pasta é destinada para armazenar imagens que serão importadas diretamente nos componentes React usando o sistema de módulos do JavaScript.

## Diferença entre `/public/images` e `/src/assets/images`

### `/public/images`
- Imagens na pasta `/public` são servidas como arquivos estáticos
- São acessadas via URL direta (ex: `/images/foto.jpg`)
- Não passam pelo processo de build do Next.js
- Ideal para imagens que precisam de URL pública, como favicons, imagens de compartilhamento social, etc.

### `/src/assets/images`
- Imagens aqui são importadas como módulos e processadas pelo webpack
- Passam pelo processo de otimização durante o build
- Ideal para imagens que são parte da UI da aplicação
- Melhor para usar com o componente `next/image` com importação local

## Como Usar no Código

### Importação e uso em componentes React
```jsx
import Image from 'next/image';
import minhaImagem from '@/assets/images/minha-imagem.jpg';

// Usando com o componente Image do Next.js
function MeuComponente() {
  return (
    <Image 
      src={minhaImagem} 
      alt="Descrição da imagem"
      placeholder="blur" // Opcional: mostra uma versão desfocada durante o carregamento
      // Não é necessário especificar width e height, pois são obtidos automaticamente
    />
  );
}
```

### Vantagens de usar imagens importadas
- Verificação de tipos em tempo de compilação (o build falha se a imagem não existir)
- Otimização automática de imagens
- Geração automática de placeholders de blur
- Dimensões da imagem são determinadas automaticamente

## Recomendações

### Quando usar esta pasta
- Para imagens que são parte da UI e design da aplicação
- Para imagens que se beneficiam da otimização automática
- Quando você quer importar a imagem como um módulo

### Formatos recomendados
- Mesmos formatos recomendados para `/public/images`
- Dê preferência para formatos modernos como WebP quando possível
