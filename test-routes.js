/**
 * Este script testa as rotas da aplicação para garantir que todas estejam funcionando corretamente.
 * Execute com: node test-routes.js
 */

const http = require('http');

const routes = [
  '/',
  '/cf1',
  '/cf1/privacy',
  '/cf1/terms',
  '/cf2',
  '/cf2/privacy',
  '/cf2/terms'
];

const baseUrl = 'http://localhost:3000';

async function testRoute(route) {
  return new Promise((resolve) => {
    http.get(`${baseUrl}${route}`, (res) => {
      console.log(`Rota ${route}: ${res.statusCode} ${res.statusMessage}`);
      
      // Coletar dados da resposta
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          message: res.statusMessage,
          headers: res.headers,
          size: data.length
        });
      });
    }).on('error', (err) => {
      console.error(`Erro ao acessar ${route}: ${err.message}`);
      resolve({
        route,
        error: err.message
      });
    });
  });
}

async function runTests() {
  console.log('Iniciando testes de rotas...');
  console.log('Certifique-se de que o servidor está rodando na porta 3000');
  console.log('------------------------------------------------------');
  
  for (const route of routes) {
    await testRoute(route);
  }
  
  console.log('------------------------------------------------------');
  console.log('Testes concluídos!');
}

runTests(); 