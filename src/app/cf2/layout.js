export const metadata = {
  title: 'A Bomba-Relógio da Aposentadoria do Servidor',
  description: 'Descubra como proteger seu patrimônio antes que seja tarde demais',
  openGraph: {
    title: 'A Bomba-Relógio da Aposentadoria do Servidor',
    description: 'Descubra como proteger seu patrimônio antes que seja tarde demais',
    type: 'website',
    locale: 'pt_BR',
  },
};

// Configuração de viewport
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Configuração para geração estática
export const dynamic = 'force-static';
export const revalidate = false;
export const fetchCache = 'force-cache';
export const runtime = 'nodejs';
export const preferredRegion = 'auto';

export default function Layout({ children }) {
  return (
    <>
      <link rel="prerender" href="https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/embed.html" />
      <link rel="preload" href="https://scripts.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/player.js" as="script" />
      <link rel="preload" href="https://scripts.converteai.net/lib/js/smartplayer/v1/smartplayer.min.js" as="script" />
      <link rel="preload" href="https://images.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/players/67c39663c033d97a19fff443/thumbnail.jpg" as="image" />
      <link rel="preload" href="https://cdn.converteai.net/9f42948f-1e82-4960-b793-0f0c80350dc8/67c39619d101505792b6e188/main.m3u8" as="fetch" />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://api.vturb.com.br" />
      {children}
    </>
  );
}
