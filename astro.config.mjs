// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://ai-landing-page.vercel.app',
  integrations: [
    // Habilitar componentes React interativos
    react(),
    
    // Gerar sitemap automaticamente
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'pt-BR',
        locales: {
          'pt-BR': 'pt-BR',
        },
      },
    }),
    
    // Comprimir assets para melhorar a performance
    compress({
      CSS: {
        cssLevel: 2,
        logLevel: 0,
      },
      HTML: {
        removeAttributeQuotes: false,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        sortClassName: true,
      },
      Image: {
        quality: 80,
        avif: {
          quality: 75,
        },
        webp: {
          quality: 80,
        },
        png: {
          quality: 80,
        },
        jpeg: {
          quality: 80,
          progressive: true,
        },
      },
      JavaScript: {
        compress: {
          arrows: true,
          booleans: true,
          collapse_vars: true,
          comparisons: true,
          computed_props: true,
          conditionals: true,
          dead_code: true,
          drop_console: false,
          drop_debugger: true,
          ecma: 2020,
          evaluate: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: false,
          if_return: true,
          inline: true,
          join_vars: true,
          keep_fargs: true,
          keep_infinity: true,
          loops: true,
          negate_iife: true,
          properties: true,
          reduce_vars: true,
          sequences: true,
          side_effects: true,
          switches: true,
          toplevel: false,
          typeofs: true,
          unused: true,
        },
        mangle: true,
      },
      SVG: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
          'removeDimensions',
        ],
      },
    }),
    
    // Carregar scripts de terceiros em um worker thread
    partytown({
      config: {
        debug: process.env.NODE_ENV === 'development',
        forward: ['dataLayer.push', 'fbq', 'ga', 'gtag', 'fbq.queue.push', 'ttq.load', 'ttq.page', 'ttq.track'],
      },
    }),
    
    // Prefetch de links para melhorar a navegação
    prefetch({
      throttle: 3,
    }),
    
    // Gerar robots.txt automaticamente
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin/', '/api/', '/private/'],
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
          crawlDelay: 2,
        },
      ],
      sitemap: true,
    }),
  ],
  
  // Configurações de build
  build: {
    format: 'file',
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  
  // Configurações de imagem
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: ['images.unsplash.com', 'images.converteai.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.converteai.net',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
    ],
  },
  
  // Configurações do servidor
  server: {
    host: true,
  },
  
  // Configurações do Vite
  vite: {
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            utils: ['lodash-es', 'date-fns'],
          },
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    css: {
      devSourcemap: true,
    },
    ssr: {
      noExternal: ['@fontsource/*'],
    },
    optimizeDeps: {
      exclude: ['@fontsource/*'],
    },
    plugins: [],
  },
  
  // Configurações de compressão
  compressHTML: true,
  
  // Configurações de output
  output: 'static',
}); 