import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-ch-blue-dark text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Logo variant="white" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Tecnología constructiva de paneles estructurales de EPS y acero de alta
            resistencia, terminados con concreto proyectado. Resuelve mampostería,
            estructura y aislación térmica en un solo elemento.
          </p>
          <p className="mt-5 text-xs leading-relaxed text-white/55">
            Certificado de Aptitud Técnica (CAT) y Certificado Sismorresistente.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>M. L. Anido 1941 (Ruta 25 Km 9)</li>
            <li>Villa Rosa, Pilar, Bs. As.</li>
            <li>
              <a className="hover:text-white" href="tel:08103332475">
                0810 333 24752
              </a>
            </li>
            <li>
              <a className="hover:text-white" href="mailto:info@concrehaus.com">
                info@concrehaus.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Accesos
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="hover:text-white" href="#cotizar">
                Cotizar mi proyecto
              </a>
            </li>
            <li>
              <Link className="hover:text-white" href="/comercial">
                Portal comercial
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/distribuidores">
                Acceso distribuidores
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs leading-relaxed text-white/45">
          Las cotizaciones generadas por esta herramienta son estimaciones preliminares,
          meramente indicativas y no vinculantes. Están sujetas a verificación técnica,
          proyecto ejecutivo, cálculo estructural y disponibilidad de stock. La venta y la
          facturación las realiza el distribuidor de cada zona.
        </div>
      </div>
    </footer>
  );
}
