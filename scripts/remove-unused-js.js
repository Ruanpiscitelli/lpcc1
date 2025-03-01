// Analisa e identifica JavaScript não utilizado
const fs = require('fs');
const path = require('path');

// Lista de funções/componentes que você sabe que não são necessários
const UNUSED_PATTERNS = [
  'UnusedComponent',
  'debugFunction',
  'consoleTracker',
  'devTools',
  // Adicione mais padrões conforme necessário
];

// Diretórios para verificar
const DIRS_TO_CHECK = [
  './src/components',
  './src/utils',
  './src/hooks',
];

function scanAndReportUnusedCode() {
  console.log('Analisando código não utilizado...');
  let totalUnused = 0;
  
  DIRS_TO_CHECK.forEach(dir => {
    fs.readdirSync(dir, { withFileTypes: true })
      .filter(file => !file.isDirectory() && /\.(js|jsx)$/.test(file.name))
      .forEach(file => {
        const filePath = path.join(dir, file.name);
        const content = fs.readFileSync(filePath, 'utf8');
        
        UNUSED_PATTERNS.forEach(pattern => {
          if (content.includes(pattern)) {
            console.log(`ENCONTRADO padrão não utilizado "${pattern}" em ${filePath}`);
            totalUnused++;
          }
        });
      });
  });
  
  console.log(`Total de padrões não utilizados encontrados: ${totalUnused}`);
}

scanAndReportUnusedCode(); 