const { chromium } = require('playwright');

async function testPlayer() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Configurar listener para erros de console
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Erro no console: ${msg.text()}`);
    } else {
      console.log(`Log do console: ${msg.text()}`);
    }
  });
  
  // Configurar listener para erros de página
  page.on('pageerror', error => {
    console.error(`Erro na página: ${error.message}`);
  });
  
  try {
    // Navegar para a página na porta 3002
    await page.goto('http://localhost:3002/cf1', { waitUntil: 'networkidle' });
    console.log('Página carregada com sucesso');
    
    // Verificar se o iframe do player existe
    const playerIframe = await page.$('#ifr_6759dd77d07a5ff5c7ca43f4');
    if (playerIframe) {
      console.log('Iframe do player encontrado');
      
      // Verificar dimensões do iframe
      const boundingBox = await playerIframe.boundingBox();
      if (boundingBox) {
        console.log(`Dimensões do iframe: ${boundingBox.width}x${boundingBox.height}`);
        if (boundingBox.width === 0 || boundingBox.height === 0) {
          console.error('Iframe com dimensões zero');
        }
      } else {
        console.error('Não foi possível obter as dimensões do iframe');
      }
    } else {
      console.error('Iframe do player NÃO encontrado');
    }
    
    // Verificar se há mensagens de erro no console relacionadas ao player
    console.log('Verificando erros no console relacionados ao player...');
    
    // Tirar screenshot da página
    await page.screenshot({ path: 'player-updated.png' });
    console.log('Screenshot salvo como player-updated.png');
    
    // Aguardar para ver o resultado
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error(`Erro durante o teste: ${error}`);
  } finally {
    // Fechar o navegador
    await browser.close();
  }
}

testPlayer().catch(console.error);