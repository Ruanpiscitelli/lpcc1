/**
 * Script para copiar os arquivos do Partytown para a pasta pública
 * Este script é executado antes do build para garantir que os arquivos do Partytown
 * estejam disponíveis para o Service Worker e para o cliente.
 */

const { join } = require('path');
const { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');

// Função principal
function copyPartytownFiles() {
  console.log('Criando pasta para os arquivos do Partytown...');
  
  // Caminho para os arquivos do Partytown
  const partytownPath = join(process.cwd(), 'node_modules', '@builder.io', 'partytown', 'lib');
  const destPath = join(process.cwd(), 'public', '~partytown');
  const debugPath = join(destPath, 'debug');
  
  // Criar pastas se não existirem
  if (!existsSync(destPath)) {
    mkdirSync(destPath, { recursive: true });
  }
  
  if (!existsSync(debugPath)) {
    mkdirSync(debugPath, { recursive: true });
  }
  
  // Lista de arquivos para copiar
  const filesToCopy = [
    'partytown.js',
    'partytown-sw.js',
    'partytown-media.js',
    'partytown-atomics.js'
  ];
  
  // Copiar arquivos principais
  filesToCopy.forEach(file => {
    try {
      const srcFile = join(partytownPath, file);
      const destFile = join(destPath, file);
      
      if (existsSync(srcFile)) {
        copyFileSync(srcFile, destFile);
        console.log(`Arquivo copiado com sucesso: ${file}`);
        
        // Otimizar o arquivo partytown.js para reduzir o tamanho
        if (file === 'partytown.js') {
          optimizePartytownFile(destFile);
        }
      } else {
        console.warn(`Arquivo não encontrado: ${srcFile}`);
      }
    } catch (error) {
      console.error(`Erro ao copiar ${file}:`, error);
    }
  });
  
  // Copiar arquivos de debug
  filesToCopy.forEach(file => {
    try {
      const srcFile = join(partytownPath, 'debug', file);
      const destFile = join(debugPath, file);
      
      if (existsSync(srcFile)) {
        copyFileSync(srcFile, destFile);
        console.log(`Arquivo copiado com sucesso para debug: ${file}`);
      } else {
        console.warn(`Arquivo de debug não encontrado: ${srcFile}`);
      }
    } catch (error) {
      console.error(`Erro ao copiar arquivo de debug ${file}:`, error);
    }
  });
  
  // Criar um arquivo de configuração otimizado para o Partytown
  createOptimizedConfig();
  
  console.log('Processo de cópia concluído!');
}

/**
 * Otimiza o arquivo partytown.js para reduzir o tamanho
 * @param {string} filePath Caminho para o arquivo partytown.js
 */
function optimizePartytownFile(filePath) {
  try {
    // Ler o conteúdo do arquivo
    let content = readFileSync(filePath, 'utf8');
    
    // Remover comentários e espaços em branco extras
    content = content
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remover comentários de bloco
      .replace(/\/\/.*$/gm, '') // Remover comentários de linha
      .replace(/^\s*\n/gm, '') // Remover linhas em branco
      .replace(/\s{2,}/g, ' ') // Reduzir múltiplos espaços para um
      .trim();
    
    // Escrever o conteúdo otimizado de volta para o arquivo
    writeFileSync(filePath, content, 'utf8');
    console.log('Arquivo partytown.js otimizado com sucesso!');
  } catch (error) {
    console.error('Erro ao otimizar o arquivo partytown.js:', error);
  }
}

/**
 * Cria um arquivo de configuração otimizado para o Partytown
 */
function createOptimizedConfig() {
  try {
    const configPath = join(process.cwd(), 'public', '~partytown', 'partytown-config.json');
    
    // Configuração otimizada
    const config = {
      resolveUrl: {
        'www.googletagmanager.com': '/api/gtm-proxy?url=',
        'connect.facebook.net': '/api/fb-proxy?url='
      },
      forward: ['dataLayer.push', 'fbq'],
      logCalls: false,
      logGetters: false,
      logSetters: false,
      logImageRequests: false,
      logScriptExecution: false,
      logSendBeaconRequests: false,
      logStackTraces: false,
      logMainAccess: false
    };
    
    // Escrever a configuração no arquivo
    writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    console.log('Arquivo de configuração do Partytown criado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar o arquivo de configuração do Partytown:', error);
  }
}

// Executar a função principal
copyPartytownFiles();
