import Link from 'next/link';
import { Logo } from './Logo';

const links = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#que-incluye', label: 'Qué incluye' },
  { href: '#sistema', label: 'El sistema' },
  { href: '#preguntas', label: 'Preguntas' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ch-gray/60 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" aria-label="Concrehaus — inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.94rem] font-semibold text-ch-blue/80 transition hover:text-ch-green"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/comercial"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ch-blue/70 transition hover:bg-ch-blue-soft hover:text-ch-blue sm:inline-block"
          >
            Ingresar
          </Link>
          <a
            href="#cotizar"
            className="rounded-full bg-ch-green px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-ch-green-dark"
          >
            Cotizar mi casa
          </a>
        </div>
      </div>
    </header>
  );
}
