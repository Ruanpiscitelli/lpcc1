/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const CompressionPlugin = require('compression-webpack-plugin');
const crypto = require('crypto');

const nextConfig = {
  // Desativar SSR/SSG para todos os componentes usando 'use client'
  reactStrictMode: true,
  
  // Configurar CORS para recursos externos
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: '*'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval' https://scripts.converteai.net https://cdn.converteai.net https://*.converteai.net; connect-src * 'unsafe-inline' https: wss:; img-src * data: blob: https:; style-src * 'unsafe-inline' https:; font-src * data: https:; frame-src * https: blob:; media-src * https: blob:; object-src 'none';"
          }
        ]
      }
    ];
  },
  
  // Configurar redirecionamentos
  async redirects() {
    return []
  },

  // Otimizar carregamento de imagens remotas
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
        hostname: '**.converteai.net',
        port: '',
        pathname: '/**'
      }
    ],
    domains: ['scripts.converteai.net', 'cdn.converteai.net', 'images.converteai.net'],
  },
  
  // Webpack para resolver problemas de build
  webpack(config, { isServer, dev }) {
    // Adicionar suporte para scripts externos
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
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

  // Otimizações de segurança
  poweredByHeader: false,
  generateEtags: true,
  distDir: '.next',
  cleanDistDir: true,

  // Compressão para produção
  compress: true,
  
  // Otimização para produção
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Desabilitar indicadores de desenvolvimento
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
    staticPrerender: false,
    autoPrerender: false,
    indicator: false,
    showRemovedTargets: false,
  },
};

// Exporta com bundle analyzer
module.exports = withBundleAnalyzer(nextConfig); 