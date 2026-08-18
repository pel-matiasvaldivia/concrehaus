import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Portal comercial | Concrehaus',
  robots: { index: false, follow: false },
};

export default function ComercialPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ch-gray-soft/70 px-5 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-ch-blue/10 ring-1 ring-ch-gray/60">
        <Link href="/" aria-label="Concrehaus — inicio">
          <Logo />
        </Link>

        <h1 className="ch-dashes mt-8 font-display text-2xl font-extrabold text-ch-blue">
          Portal comercial
        </h1>
        <p className="mt-3 leading-relaxed text-ch-blue/70">
          El acceso para el equipo comercial y de gerencia está en preparación.
          Desde acá vas a poder ver tu cartera de proyectos, hacer seguimiento y
          emitir presupuestos.
        </p>

        <form className="mt-8 space-y-4" action="/comercial" method="get">
          <div>
            <label className="block text-sm font-semibold text-ch-blue/80" htmlFor="email">
              Correo corporativo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              disabled
              placeholder="nombre@concrehaus.com"
              className="mt-1 w-full rounded-xl border border-ch-gray bg-ch-gray-soft/60 px-4 py-3 text-ch-blue/50"
            />
          </div>
          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-full bg-ch-gray px-6 py-3 font-display font-bold text-white/80"
          >
            Ingresar (próximamente)
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-semibold text-ch-green hover:text-ch-green-dark">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </main>
  );
}
