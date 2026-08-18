import type { Metadata } from 'next';
import { Bitter, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const bitter = Bitter({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-bitter',
  display: 'swap',
});

const source = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cotizador Concrehaus | Calculá los materiales de tu casa desde el plano',
  description:
    'Subí el plano de tu vivienda y obtené en minutos el listado de materiales y el costo estimado para construir con el sistema Concrehaus.',
  openGraph: {
    title: 'Cotizador Concrehaus',
    description:
      'Subí el plano de tu vivienda y obtené en minutos el listado de materiales y el costo estimado.',
    type: 'website',
    locale: 'es_AR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${bitter.variable} ${source.variable}`}>
      <body>{children}</body>
    </html>
  );
}
