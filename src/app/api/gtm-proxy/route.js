/**
 * API Route para proxy do Google Tag Manager
 * Isso permite que o Partytown carregue scripts do GTM sem bloqueio
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // Obter a URL do GTM da query
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    
    if (!url || !url.includes('googletagmanager.com')) {
      return new NextResponse('URL inválida ou não permitida', { status: 400 });
    }
    
    // Buscar o conteúdo do GTM
    const response = await fetch(url, {
      headers: {
        'User-Agent': request.headers.get('user-agent') || 'Next.js Proxy',
      },
    });
    
    if (!response.ok) {
      return new NextResponse('Erro ao buscar o script', { status: response.status });
    }
    
    // Obter o conteúdo do script
    const content = await response.text();
    
    // Configurar os headers para cache e segurança
    const headers = new Headers();
    headers.set('Content-Type', 'application/javascript');
    headers.set('Cache-Control', 'public, max-age=3600'); // Cache por 1 hora
    headers.set('X-Content-Type-Options', 'nosniff');
    
    // Retornar o conteúdo com os headers apropriados
    return new NextResponse(content, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Erro no proxy do GTM:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
}
