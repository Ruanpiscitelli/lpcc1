import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientScripts from "../components/ClientScripts";
import { SafeApplyPolyfill } from './path/to/SafeApplyPolyfill';

// Otimização de fontes - Usar display swap para evitar FOIT
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'sans-serif'], // Fallback para fontes do sistema
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Não precarregar a fonte mono, pois é menos crítica
  fallback: ['monospace'], // Fallback para fontes do sistema
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
  // Otimizações para dispositivos móveis
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata = {
  title: "A Bomba-Relógio da Aposentadoria do Servidor | Safe Money Report",
  description: "Descubra como proteger seu patrimônio com nosso sistema de três cliques antes que seja tarde demais.",
  keywords: "aposentadoria, servidor, patrimônio, investimentos, proteção financeira",
  robots: "index, follow",
  openGraph: {
    title: "A Bomba-Relógio da Aposentadoria do Servidor | Safe Money Report",
    description: "Descubra como proteger seu patrimônio com nosso sistema de três cliques antes que seja tarde demais.",
    type: "website",
    locale: "pt_BR",
  },
  // Estratégia de cache consistente para conteúdo dinâmico
  'cache-control': 'no-cache, no-store, must-revalidate',
  // Adicionar outras meta tags para otimização
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'format-detection': 'telephone=no',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preconnect apenas para domínios críticos */}
        <link rel="preconnect" href="https://images.converteai.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.converteai.net" />
        
        <link rel="preconnect" href="https://scripts.converteai.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        
        {/* Preload apenas para o recurso mais crítico do LCP */}
        <link 
          rel="preload" 
          href="https://images.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/6759dd77d07a5ff5c7ca43f4/thumbnail.jpg" 
          as="image" 
          fetchPriority="high" 
          type="image/jpeg"
        />
        
        {/* Meta tags para otimização de cache - consistente com a configuração de metadata */}
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* Meta tag para otimização de renderização */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Manifesto para PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Safe Money Report" />
        <link rel="apple-touch-icon" href="/images/placeholder.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ 
        margin: 0, 
        padding: 0, 
        minHeight: '100vh',
        textRendering: 'optimizeSpeed', // Otimizar velocidade de renderização de texto
        WebkitFontSmoothing: 'antialiased', // Melhorar a renderização de fontes
        MozOsxFontSmoothing: 'grayscale',
      }}>
        <SafeApplyPolyfill />
        {/* Componente de scripts do cliente */}
        <ClientScripts />
        
        {children}
      </body>
    </html>
  );
}

'use client';

import { useEffect } from 'react';

export function SafeApplyPolyfill() {
  useEffect(() => {
    // Proteção contra erros de "apply" em undefined
    const originalApply = Function.prototype.apply;
    Function.prototype.apply = function(thisArg, argsArray) {
      try {
        if (this === undefined || this === null) {
          console.warn('Tentativa de chamar apply em função undefined/null');
          return undefined;
        }
        return originalApply.call(this, thisArg, argsArray);
      } catch (error) {
        console.error('Erro na chamada apply:', error);
        return undefined;
      }
    };
    
    return () => {
      // Restaurar o comportamento original ao desmontar
      Function.prototype.apply = originalApply;
    };
  }, []);
  
  return null;
}
