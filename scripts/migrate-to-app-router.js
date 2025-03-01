#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const PAGES_DIR = path.join(process.cwd(), 'pages');
const APP_DIR = path.join(process.cwd(), 'src/app');

// Garantir que o diretório app existe
if (!fs.existsSync(APP_DIR)) {
  fs.mkdirSync(APP_DIR, { recursive: true });
}

function promptUser() {
  rl.question('Digite o caminho da página a ser migrada (ex: index.js ou about/index.js): ', (pageFile) => {
    if (!pageFile) {
      console.log('Nenhum arquivo informado. Encerrando.');
      rl.close();
      return;
    }
    
    const sourcePath = path.join(PAGES_DIR, pageFile);
    
    if (!fs.existsSync(sourcePath)) {
      console.log(`Arquivo não encontrado: ${sourcePath}`);
      promptUser();
      return;
    }
    
    // Determinar o caminho de destino no app directory
    let destDir = path.dirname(pageFile);
    let fileName = path.basename(pageFile);
    
    // Ajustar "index.js" para "page.js" no app router
    if (fileName === 'index.js' || fileName === 'index.jsx' || fileName === 'index.tsx') {
      fileName = 'page' + path.extname(fileName);
    }
    
    const destDirPath = path.join(APP_DIR, destDir);
    const destPath = path.join(destDirPath, fileName);
    
    // Criar diretório de destino se não existir
    if (!fs.existsSync(destDirPath)) {
      fs.mkdirSync(destDirPath, { recursive: true });
    }
    
    // Ler o conteúdo do arquivo original
    const content = fs.readFileSync(sourcePath, 'utf8');
    
    // Transformar o conteúdo para o formato App Router
    const transformedContent = transformContent(content);
    
    // Escrever no novo arquivo
    fs.writeFileSync(destPath, transformedContent);
    
    console.log(`✅ Migrado: ${sourcePath} → ${destPath}`);
    
    rl.question('Deseja migrar outra página? (s/n): ', (answer) => {
      if (answer.toLowerCase() === 's') {
        promptUser();
      } else {
        console.log('Migração concluída!');
        rl.close();
      }
    });
  });
}

// Função para transformar o conteúdo de Pages para App Router
function transformContent(content) {
  // Detectar e transformar getServerSideProps/getStaticProps
  let transformed = content;
  
  // Remover getServerSideProps/getStaticProps e transformar em funções async
  transformed = transformed.replace(
    /export\s+async\s+function\s+getServerSideProps\s*\(\s*{\s*([^}]*)\s*}\s*\)\s*{([^}]*)return\s+{\s*props\s*:\s*{([^}]*)}\s*}\s*}/g,
    '// Dados carregados diretamente no componente\nasync function getData($1) {$2return {$3};\n}'
  );
  
  transformed = transformed.replace(
    /export\s+async\s+function\s+getStaticProps\s*\(\s*{\s*([^}]*)\s*}\s*\)\s*{([^}]*)return\s+{\s*props\s*:\s*{([^}]*)}\s*}\s*}/g,
    '// Dados carregados diretamente no componente\nasync function getData($1) {$2return {$3};\n}'
  );
  
  // Transformar a função do componente para usar os dados diretamente
  transformed = transformed.replace(
    /export\s+default\s+function\s+(\w+)\s*\(\s*{\s*([^}]*)\s*}\s*\)/g,
    'export default async function $1() {\n  const { $2 } = await getData()'
  );
  
  // Adicionar nota sobre a migração
  transformed = '// Migrado de Pages Router para App Router\n\n' + transformed;
  
  return transformed;
}

console.log('🚀 Assistente de Migração: Pages Router → App Router');
console.log('---------------------------------------------------');
promptUser(); 