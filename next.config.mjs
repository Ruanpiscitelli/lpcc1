import { withSentryConfig } from '@sentry/nextjs';
import CompressionPlugin from 'compression-webpack-plugin';
import bundleAnalyzerImport from '@next/bundle-analyzer';
import { createRequire } from 'module';
import crypto from 'crypto';

const require = createRequire(import.meta.url);

// Configurar o bundle analyzer
const bundleAnalyzer = process.env.ANALYZE === 'true' 
  ? bundleAnalyzerImport({ enabled: true })
  : (config) => config;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração de output para otimizar a produção
  // output: 'standalone', // Otimiza o build para produção - REMOVIDO
  
  // Otimizações de compilação
  reactStrictMode: true, // Recommended for the new React runtime
  poweredByHeader: false, // Remover header X-Powered-By para segurança
  
  // Configuração de i18n
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  
  // Otimizações de imagem
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.converteai.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.googletagmanager.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.google-analytics.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.facebook.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
        pathname: '/**',
      }
    ],
    // Otimizações de imagem
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 horas
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [],
    path: '/_next/image',
    loader: 'default',
    disableStaticImages: false,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Configurações de cache para recursos estáticos
  headers: async () => [
    {
      source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
    {
      source: '/:all*(js|css)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
  ],
  
  // Otimizações de webpack
  webpack: (config, { dev, isServer }) => {
    // Adicionar plugins de compressão para reduzir o tamanho dos arquivos
    if (!dev && !isServer) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 11 },
          threshold: 10240,
          minRatio: 0.8,
        })
      );
      
      // Otimizar chunks para melhorar o carregamento inicial
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return (
                module.size() > 80000 &&
                /node_modules[/\\]/.test(module.identifier())
              );
            },
            name(module) {
              // Criar um hash baseado no identificador do módulo
              const rawRequest = module.rawRequest || '';
              const identifier = module.identifier() || '';
              
              // Função de hash simples
              const hash = (str) => {
                let h = 0;
                for (let i = 0; i < str.length; i++) {
                  h = ((h << 5) - h) + str.charCodeAt(i);
                  h = h & h;
                }
                return Math.abs(h).toString(36).substring(0, 8);
              };
              
              const hashId = hash(identifier);
              
              // Extrair o nome do pacote
              const packageName = rawRequest
                ? rawRequest.replace(/^@(\w+)[/\\]/, '$1-')
                : identifier.split('/').find(part => !part.includes('node_modules')) || '';
              
              return `lib-${packageName.replace(/[^a-z0-9]/gi, '-')}-${hashId}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name(module, chunks) {
              return `shared-${chunks.map(c => c.name).join('~')}`;
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Otimizar minimização de JavaScript
      config.optimization.minimize = true;
      
      // Otimizar carregamento de módulos
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
      
      // Otimizar remoção de código não utilizado
      config.optimization.usedExports = true;
      
      // Otimizar concatenação de módulos
      config.optimization.concatenateModules = true;
      
      // Otimizar tamanho do bundle
      config.optimization.sideEffects = true;
    }
    
    // Otimizações para desenvolvimento
    if (dev) {
      // Desativar algumas otimizações em desenvolvimento para melhorar a velocidade de build
      config.optimization.removeAvailableModules = false;
      config.optimization.removeEmptyChunks = false;
      config.optimization.splitChunks = false;
    }
    
    return config;
  },
  
  // Otimizações experimentais
  experimental: {
    // Restauração de scroll
    scrollRestoration: true,
    serverActions: {
      bodySizeLimit: '2mb', // Limite para Server Actions
    },
    optimizeCss: true, // Otimização CSS
    optimisticClientCache: true, // Cache otimista no cliente
    serverExternalPackages: [
      // Pacotes grandes que devem permanecer no servidor
      'sharp',
    ],
  },
  
  // Configurações de compilação
  compiler: {
    // Remover console.log em produção
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Configurações de transpilação
  transpilePackages: [
    // Adicionar pacotes que precisam ser transpilados
  ],
};

// Aplicar plugins (sem vanilla-extract)
const configWithPlugins = bundleAnalyzer(nextConfig);

// Exportar configuração final sem o Sentry
export default configWithPlugins;
