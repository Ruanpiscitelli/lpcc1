/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const CompressionPlugin = require('compression-webpack-plugin');
const crypto = require('crypto');

const nextConfig = {
  // Desativar SSR/SSG para todos os componentes usando 'use client'
  reactStrictMode: true,
  
  // Configurar o servidor para usar a porta 3000
  serverOptions: {
    port: 3000
  },
  
  // Configurar CORS para recursos externos
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
  
  // Configurar redirecionamentos
  async redirects() {
    return []
  },

  // Otimizar carregamento de imagens remotas
  images: {
    domains: ['images.converteai.net', 'cdn.converteai.net', 'scripts.converteai.net'],
    formats: ['image/webp'],
  },
  
  // Webpack para resolver problemas de build
  webpack(config) {
    return config;
  },

  // Otimizações de Imagem
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Otimizações gerais
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  distDir: '.next',
  cleanDistDir: true,

  // Desabilitar indicadores de desenvolvimento
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
    staticPrerender: false,
    autoPrerender: false,
    indicator: false,
    showRemovedTargets: false,
  },

  // Otimizações de compilação
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Otimização de webpack
  webpack: (config, { dev, isServer }) => {
    // Otimizações apenas para produção
    if (!dev && !isServer) {
      // Otimizações de bundle
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
        },
      };

      // Adiciona Compression Plugin
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 11 },
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }

    return config;
  },
};

// Exporta com bundle analyzer
module.exports = withBundleAnalyzer(nextConfig); 