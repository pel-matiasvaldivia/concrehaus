import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export const metadata: Metadata = {
  title: 'Acceso distribuidores | Concrehaus',
  robots: { index: false, follow: false },
};

export default function DistribuidoresPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ch-gray-soft/70 px-5 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-ch-blue/10 ring-1 ring-ch-gray/60">
        <Link href="/" aria-label="Concrehaus — inicio">
          <Logo />
        </Link>

        <h1 className="ch-dashes mt-8 font-display text-2xl font-extrabold text-ch-blue">
          Acceso distribuidores
        </h1>
        <p className="mt-3 leading-relaxed text-ch-blue/70">
          El acceso para distribuidores está en preparación. Desde acá vas a poder
          ver los proyectos derivados a tu zona, con el cómputo y los precios a tu
          nivel de lista, y confirmar la facturación.
        </p>

        <p className="mt-8 rounded-xl bg-ch-green-soft px-5 py-4 text-sm leading-relaxed text-ch-blue/75">
          ¿Sos distribuidor Concrehaus y querés que te avisemos cuando esté
          disponible? Escribinos a{' '}
          <a className="font-semibold text-ch-green-dark" href="mailto:info@concrehaus.com">
            info@concrehaus.com
          </a>
          .
        </p>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-semibold text-ch-green hover:text-ch-green-dark">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </main>
  );
}
