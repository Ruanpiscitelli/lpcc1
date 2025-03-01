const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Instale as dependências necessárias primeiro:
// npm install -g sharp imagemin-webp

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGE_DIRS = ['images', 'assets', 'banners'];

function optimizeImages() {
  console.log('Otimizando imagens...');
  
  // Verificar cada diretório de imagens
  IMAGE_DIRS.forEach(dir => {
    const dirPath = path.join(PUBLIC_DIR, dir);
    
    if (!fs.existsSync(dirPath)) {
      console.log(`Diretório ${dirPath} não encontrado, pulando...`);
      return;
    }
    
    fs.readdirSync(dirPath)
      .filter(file => /\.(jpe?g|png)$/i.test(file))
      .forEach(file => {
        const filePath = path.join(dirPath, file);
        const fileSize = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
        
        // Verificar tamanho da imagem (mais de 200KB)
        if (fs.statSync(filePath).size > 200 * 1024) {
          console.log(`Otimizando imagem grande: ${filePath} (${fileSize} MB)`);
          
          // Converter para WebP
          const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');
          try {
            execSync(`npx sharp ${filePath} -o ${webpPath} --webp`);
            console.log(`Convertido para WebP: ${webpPath}`);
            
            // Criar versões responsivas
            const baseName = path.basename(webpPath);
            const dirName = path.dirname(webpPath);
            
            [640, 768, 1024, 1280].forEach(width => {
              const resizedPath = path.join(dirName, `${path.parse(baseName).name}-${width}.webp`);
              execSync(`npx sharp ${filePath} -resize ${width} -o ${resizedPath} --webp`);
              console.log(`Criada versão ${width}px: ${resizedPath}`);
            });
          } catch (err) {
            console.error(`Erro ao otimizar ${filePath}:`, err.message);
          }
        }
      });
  });
  
  console.log('Otimização de imagens concluída!');
}

optimizeImages(); 