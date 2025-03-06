export const metadata = {
  title: 'Copy Cash - Transcrição Completa',
  description: 'Leia a transcrição completa do vídeo sobre o sistema Copy Cash e descubra como transformar sua vida financeira.',
  openGraph: {
    title: 'Copy Cash - Transcrição Completa',
    description: 'Leia a transcrição completa do vídeo sobre o sistema Copy Cash e descubra como transformar sua vida financeira.',
    url: 'https://copycash.com.br/cf1-escrito',
    siteName: 'Copy Cash',
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function Layout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
} 