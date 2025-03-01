# Otimizações de Performance para PageSpeed Insights

Este documento descreve as otimizações implementadas para melhorar a pontuação no Google PageSpeed Insights, visando alcançar uma pontuação superior a 90.

## Otimizações Implementadas

### 1. Configuração do Next.js

- **Output Standalone**: Configurado `output: 'standalone'` no `next.config.mjs` para otimizar o build para produção.
- **Otimizações Experimentais**: Habilitadas configurações experimentais como `nextScriptWorkers`, `optimizeCss`, e `webVitalsAttribution`.
- **Compressão Avançada**: Implementada compressão Brotli e Gzip para todos os assets estáticos.
- **Otimização de Chunks**: Configurado `splitChunks` para dividir o código em chunks menores e mais eficientes.
- **Cache Otimizado**: Configurados headers de cache para recursos estáticos com TTL de 1 ano.

### 2. Otimização de Componentes

- **Memoização**: Todos os componentes principais foram memoizados com `React.memo` para evitar re-renderizações desnecessárias.
- **Lazy Loading**: Componentes não críticos para o LCP foram carregados com `lazy` e `Suspense`.
- **Componentes Estáticos**: Componentes que não mudam foram extraídos e memoizados para reduzir o trabalho de renderização.
- **Carregamento Assíncrono**: Scripts de terceiros são carregados de forma assíncrona e adiada.

### 3. Otimização do Main Thread

- **RequestIdleCallback**: Utilizado para carregar scripts não críticos apenas quando o navegador estiver ocioso.
- **Carregamento Escalonado**: Scripts são carregados em sequência com prioridades diferentes para não sobrecarregar o main thread.
- **Redução de Trabalho Síncrono**: Minimizado o trabalho síncrono no main thread durante o carregamento inicial.
- **Web Workers**: Configurado `nextScriptWorkers` para mover scripts para web workers quando possível.

### 4. Otimização de Recursos

- **Preconnect e DNS-Prefetch**: Adicionados para domínios críticos como `scripts.converteai.net`.
- **Preload**: Recursos críticos para o LCP são pré-carregados com alta prioridade.
- **Otimização de Imagens**: Configurado o componente `Image` do Next.js para otimização automática.
- **Formatos Modernos**: Habilitado suporte para formatos modernos como AVIF e WebP.

### 5. Otimização do App Router

- **Geração Estática**: Configurado `dynamic: 'force-static'` para gerar páginas estáticas.
- **Suspense e Loading**: Implementados componentes de loading e error para melhorar a UX durante o carregamento.
- **Metadados Otimizados**: Configurados metadados estáticos para melhorar o SEO e a performance.
- **Revalidação**: Desabilitada revalidação automática para páginas estáticas.

### 6. Otimização do VideoPlayer

- **Carregamento Lazy**: O iframe do vídeo é carregado com `loading="lazy"`.
- **NoSSR**: O componente é renderizado apenas no cliente para evitar problemas de hidratação.
- **Carregamento Otimizado**: O script do player é carregado apenas quando o navegador está ocioso.
- **Fallback Visual**: Implementado um fallback visual durante o carregamento do player.

### 7. Otimização de Scripts de Terceiros

- **Partytown**: Configurado para mover scripts de terceiros para web workers.
- **Carregamento Adiado**: Scripts de analytics são carregados apenas após o conteúdo principal.
- **Tratamento de Erros**: Implementado tratamento de erros para scripts de terceiros.
- **Priorização**: Scripts são carregados com prioridades diferentes baseadas na importância.

## Resultados Esperados

Com estas otimizações, esperamos alcançar:

- **Pontuação > 90** no PageSpeed Insights para dispositivos móveis e desktop
- **LCP < 2.5s**: Largest Contentful Paint abaixo de 2.5 segundos
- **FID < 100ms**: First Input Delay abaixo de 100 milissegundos
- **CLS < 0.1**: Cumulative Layout Shift abaixo de 0.1
- **TTI < 3.8s**: Time to Interactive abaixo de 3.8 segundos

## Próximos Passos

- Monitorar a performance em produção
- Otimizar ainda mais o carregamento de fontes
- Implementar estratégias de cache mais avançadas
- Explorar o uso de streaming SSR para conteúdo dinâmico

## Referências

- [Next.js Performance Optimization](https://nextjs.org/docs/advanced-features/performance)
- [Web Vitals](https://web.dev/vitals/)
- [Minimize Main Thread Work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
