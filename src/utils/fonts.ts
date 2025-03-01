import { Inter, Roboto } from 'next/font/google';

export const combineClassNames = (...classNames: (string | boolean | undefined | null)[]) => {
  return classNames.filter(Boolean).join(' ');
};

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
});

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-roboto',
}); 