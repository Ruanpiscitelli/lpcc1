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
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Adiciona output standalone para melhor compatibilidade
  output: 'standalone',
  
  i18n: {
    locales: ['pt-BR'],
    defaultLocale: 'pt-BR',
  },
  
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
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.visitorapi.com',
        pathname: '/api/**',
      },
    ],
  },
  
  webpack: (config, { isServer }) => {
    // Ignora warnings do OpenTelemetry em ambiente client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@opentelemetry/api': false,
        '@opentelemetry/core': false,
        '@opentelemetry/instrumentation': false,
      };
    }
    
    // Otimização básica de chunks
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
    };
    
    return config;
  },
  
  experimental: {
    // Mantém apenas as experimentais que estão funcionando
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://api.visitorapi.com',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
