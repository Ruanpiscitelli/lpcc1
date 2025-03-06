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
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Configuração de CSP mais permissiva
          { 
            key: 'Content-Security-Policy', 
            value: "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://scripts.converteai.net https://cdn.converteai.net https://*.googleapis.com https://*.googletagmanager.com https://*.google-analytics.com https://*.facebook.net https://connect.facebook.net; connect-src 'self' https: wss:; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https: blob:; media-src 'self' https: blob:; object-src 'none';" 
          }
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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.converteai.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.converteai.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scripts.converteai.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googletagmanager.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.google-analytics.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.facebook.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
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