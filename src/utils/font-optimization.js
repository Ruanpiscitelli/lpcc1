import { Inter, Roboto } from 'next/font/google';

// Configuração otimizada para a fonte Inter
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Configuração otimizada para a fonte Roboto
export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Função para combinar múltiplas variáveis de fontes
export function combineClassNames(...classes) {
  return classes.filter(Boolean).join(' ');
} 