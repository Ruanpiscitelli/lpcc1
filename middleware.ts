import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Tipos de arquivos e suas configurações de cache
const staticFilesConfig = {
  images: {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    patterns: ['\\.(?:jpg|jpeg|gif|png|svg|webp)$'],
  },
  fonts: {
    maxAge: 60 * 60 * 24 * 365, // 1 ano
    patterns: ['\\.(?:woff|woff2|eot|ttf|otf)$'],
  },
  static: {
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    patterns: ['\\.(?:js|css)$'],
  },
};

export function middleware(request: NextRequest) {
  // Configuração de headers de segurança
  const response = NextResponse.next();
  
  // Headers de segurança padrão
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
  };

  // Adiciona headers de segurança
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Configuração de CORS para o visitorapi e converteai
  if (request.nextUrl.pathname.startsWith('/api/') || 
      request.nextUrl.pathname.includes('converteai.net')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  // Cache-Control para recursos estáticos
  if (
    request.nextUrl.pathname.includes('/images/') ||
    request.nextUrl.pathname.includes('/fonts/') ||
    request.nextUrl.pathname.includes('/_next/static/')
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

// Configura os caminhos que o middleware deve processar
export const config = {
  matcher: [
    '/((?!api/|_next/static|_next/image|favicon.ico).*)',
    '/api/:path*'
  ],
}; 