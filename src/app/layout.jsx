import ClientScripts from '../components/ClientScripts';
import CriticalResourcesOptimizer from '../components/CriticalResourcesOptimizer';
import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export const metadata = {
  title: 'AI Landing Page',
  description: 'Landing page otimizada com inteligência artificial',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://scripts.converteai.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="preconnect" href="https://cdn.converteai.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      </head>
      <body suppressHydrationWarning={true}>
        <CriticalResourcesOptimizer />
        {children}
        <ClientScripts />
      </body>
    </html>
  );
} 