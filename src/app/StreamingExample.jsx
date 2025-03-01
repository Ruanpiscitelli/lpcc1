/**
 * StreamingExample - Exemplo de implementação de Streaming SSR
 * 
 * Este componente demonstra como implementar streaming SSR no Next.js,
 * permitindo que partes da página sejam enviadas ao cliente assim que
 * estiverem prontas, melhorando o TTFB e a percepção de velocidade.
 */

import { Suspense } from 'react';

// Componente que simula um carregamento lento
async function SlowComponent({ label, delay = 2000 }) {
  // Simular uma operação assíncrona lenta (como busca de dados)
  await new Promise(resolve => setTimeout(resolve, delay));
  
  return (
    <div className="slow-component">
      <h3>{label}</h3>
      <p>Este componente demorou {delay}ms para carregar.</p>
    </div>
  );
}

// Componente de fallback durante o carregamento
function LoadingFallback({ label }) {
  return (
    <div className="loading-fallback">
      <div className="loading-spinner"></div>
      <p>Carregando {label}...</p>
    </div>
  );
}

// Componente principal que implementa streaming
export default function StreamingExample() {
  return (
    <div className="streaming-container">
      <h2>Exemplo de Streaming SSR</h2>
      <p>
        Esta página demonstra como o Next.js pode transmitir partes da página
        assim que estiverem prontas, sem esperar que todo o conteúdo seja gerado.
      </p>
      
      {/* Conteúdo principal com streaming - carrega em 2s */}
      <Suspense fallback={<LoadingFallback label="conteúdo principal" />}>
        <SlowComponent label="Conteúdo Principal" delay={2000} />
      </Suspense>
      
      {/* Seção secundária com streaming - carrega em 4s */}
      <Suspense fallback={<LoadingFallback label="seção secundária" />}>
        <SlowComponent label="Seção Secundária" delay={4000} />
      </Suspense>
      
      {/* Seção terciária com streaming - carrega em 6s */}
      <Suspense fallback={<LoadingFallback label="seção terciária" />}>
        <SlowComponent label="Seção Terciária" delay={6000} />
      </Suspense>
    </div>
  );
}

/**
 * Para usar este componente em uma página:
 * 
 * // Em um arquivo de página
 * import StreamingExample from './StreamingExample';
 * 
 * export default function Page() {
 *   return (
 *     <div>
 *       <h1>Página com Streaming</h1>
 *       <StreamingExample />
 *     </div>
 *   );
 * }
 */ 