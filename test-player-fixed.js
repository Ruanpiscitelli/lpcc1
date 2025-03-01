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
    // Navegar para a página
    await page.goto('http://localhost:3001/cf1', { waitUntil: 'networkidle' });
    console.log('Página carregada com sucesso');
    
    // Verificar se o container do player existe
    const playerContainer = await page.$('#vid_6759dd77d07a5ff5c7ca43f4');
    if (playerContainer) {
      console.log('Container do player encontrado');
    } else {
      console.error('Container do player NÃO encontrado');
    }
    
    // Verificar se o script do player foi carregado
    const playerScript = await page.$('#scr_6759dd77d07a5ff5c7ca43f4');
    if (playerScript) {
      console.log('Script do player encontrado');
    } else {
      console.error('Script do player NÃO encontrado');
    }
    
    // Tirar screenshot da página
    await page.screenshot({ path: 'player-fixed.png' });
    console.log('Screenshot salvo como player-fixed.png');
    
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