import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UploadCard } from '@/components/UploadCard';

const pasos = [
  {
    n: '01',
    t: 'Subí tu plano',
    d: 'PDF, imagen o DXF. Vale también una foto sacada con el celular.',
  },
  {
    n: '02',
    t: 'Confirmá cuatro datos',
    d: 'Escala, altura libre, cantidad de plantas y localidad. Nada más.',
  },
  {
    n: '03',
    t: 'Recibí tu estimación',
    d: 'Materiales, costo estimado y plazo de montaje. En minutos, no en días.',
  },
];

const incluye = [
  {
    t: 'Listado de materiales',
    d: 'Paneles, mallas de refuerzo, hierros de anclaje y los insumos de obra, con cantidades y unidades comerciales.',
  },
  {
    t: 'Costo estimado con rango',
    d: 'Un rango honesto, no un número mágico: cada rubro indica si está computado con precisión o estimado.',
  },
  {
    t: 'Plazo de montaje',
    d: 'Horas hombre y días de obra estimados, comparados contra la construcción tradicional.',
  },
  {
    t: 'Ficha térmica',
    d: 'La transmitancia K del paquete elegido y qué significa para el consumo de tu casa.',
  },
  {
    t: 'Créditos LEED',
    d: 'Qué créditos de certificación puede aportar el sistema en tu proyecto según su ubicación.',
  },
  {
    t: 'Plan de obra',
    d: 'El checklist de las nueve etapas y el listado de herramientas y equipos que vas a necesitar.',
  },
];

const datos = [
  { v: '0,5', u: 'Hh/m²', d: 'de montaje, contra 1,5 de la mampostería tradicional' },
  { v: '0,35', u: 'W/m²K', d: 'de transmitancia con núcleo Neotech de 8 cm' },
  { v: 'F-180', u: '', d: 'de resistencia al fuego' },
  { v: '+60', u: 'años', d: 'de durabilidad con bajo mantenimiento estructural' },
];

const faqs = [
  {
    q: '¿Qué precisión tiene la estimación?',
    a: 'Los materiales Concrehaus —paneles, mallas y anclajes— se computan a partir de la geometría de tu plano con una precisión del orden del 5 %. Los insumos de obra, como el cemento, la arena y los aditivos, dependen del proveedor de cada zona y se estiman con valores de referencia. Por eso el resultado se presenta como un rango y cada rubro indica de qué tipo es.',
  },
  {
    q: '¿Reemplaza al presupuesto de un técnico?',
    a: 'No. Es una estimación preliminar, meramente indicativa y no vinculante, pensada para que sepas rápido en qué orden de magnitud estás parado. Cuando quieras avanzar, un técnico de Concrehaus revisa el cómputo y emite el presupuesto formal.',
  },
  {
    q: '¿Qué incluye y qué no?',
    a: 'Incluye el sistema constructivo: paneles, mallas, anclajes y los insumos del concreto proyectado. No incluye fundaciones, instalaciones sanitarias, eléctricas y de gas, carpinterías, movimiento de suelos ni honorarios profesionales. Todo eso queda listado aparte y lo podemos cotizar por separado.',
  },
  {
    q: '¿Quién me vende el material?',
    a: 'La venta y la facturación las realiza el distribuidor Concrehaus de tu zona. El precio que muestra el cotizador es un valor estimado de referencia; al derivar tu proyecto te ponemos en contacto con el distribuidor que corresponde.',
  },
  {
    q: '¿Qué pasa con mi plano?',
    a: 'Se guarda de forma privada y solo lo ven el equipo técnico y el comercial asignado a tu proyecto. No se publica ni se comparte con terceros.',
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ---------------------------------------------------------- HERO */}
        <section id="cotizar" className="relative overflow-hidden bg-ch-gray-soft/70">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-ch-green/10 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-ch-green px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Cotizador online
              </span>

              <h1 className="ch-dashes mt-6 font-display text-4xl font-extrabold leading-[1.1] text-ch-blue sm:text-5xl lg:text-[3.4rem]">
                Subí el plano de tu casa y sabé cuánto sale construirla
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ch-blue/75">
                El sistema Concrehaus resuelve mampostería, estructura y aislación
                térmica en un solo elemento. Ahora también podés saber, en minutos, qué
                materiales necesita tu proyecto y cuánto cuestan.
              </p>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-ch-blue/80">
                {['Sin registro', 'Resultado en minutos', 'Certificado CAT y Sismorresistente'].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-ch-green" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pl-4">
              <UploadCard />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- CÓMO FUNCIONA */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="ch-dashes font-display text-3xl font-extrabold text-ch-blue sm:text-4xl">
            Tres pasos y ya tenés tu número
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-ch-blue/70">
            Pensado para que lo resuelvas desde el celular, sin conocimientos técnicos.
          </p>

          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {pasos.map((p) => (
              <li
                key={p.n}
                className="rounded-2xl border border-ch-gray/70 bg-white p-7 transition hover:border-ch-green-light hover:shadow-lg hover:shadow-ch-green/10"
              >
                <span className="font-display text-4xl font-extrabold text-ch-green/25">{p.n}</span>
                <h3 className="mt-3 font-display text-xl font-bold text-ch-blue">{p.t}</h3>
                <p className="mt-2 leading-relaxed text-ch-blue/70">{p.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------- QUÉ INCLUYE */}
        <section id="que-incluye" className="bg-ch-blue-soft/60 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="ch-dashes font-display text-3xl font-extrabold text-ch-blue sm:text-4xl">
              No es solo un precio: es tu proyecto computado
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-ch-blue/70">
              Todo lo que recibís junto con la estimación, en un PDF que podés compartir
              con tu arquitecto o con tu constructor.
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {incluye.map((c) => (
                <article key={c.t} className="rounded-2xl bg-white p-7 ring-1 ring-ch-gray/60">
                  <div className="mb-4 h-1.5 w-10 rounded-full bg-ch-green" />
                  <h3 className="font-display text-lg font-bold text-ch-blue">{c.t}</h3>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-ch-blue/70">{c.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- SISTEMA */}
        <section id="sistema" className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="ch-dashes font-display text-3xl font-extrabold text-ch-blue sm:text-4xl">
                Por qué construir con Concrehaus
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ch-blue/75">
                Paneles con núcleo de EPS y mallas de acero de alta resistencia de
                550 MPa, vinculadas por conectores. En obra reciben concreto proyectado
                y se transforman en una estructura continua con gran capacidad portante,
                sin puentes térmicos.
              </p>
              <p className="mt-4 leading-relaxed text-ch-blue/70">
                Tres veces más rápido de montar que la mampostería tradicional, con
                aislación continua en muros y cubiertas que evita condensaciones
                interiores.
              </p>
              <a
                href="#cotizar"
                className="mt-8 inline-block rounded-full bg-ch-green px-7 py-3.5 font-display font-bold text-white transition hover:bg-ch-green-dark"
              >
                Cotizar mi proyecto
              </a>
            </div>

            <dl className="grid grid-cols-2 gap-4">
              {datos.map((d) => (
                <div key={d.v + d.u} className="rounded-2xl bg-ch-green-soft p-6">
                  <dt className="font-display text-3xl font-extrabold text-ch-green-dark">
                    {d.v}
                    {d.u && <span className="ml-1 text-lg font-bold">{d.u}</span>}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ch-blue/75">{d.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------------ PREGUNTAS */}
        <section id="preguntas" className="bg-ch-gray-soft/70 py-20">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="ch-dashes font-display text-3xl font-extrabold text-ch-blue sm:text-4xl">
              Preguntas frecuentes
            </h2>

            <div className="mt-10 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl bg-white px-6 py-5 ring-1 ring-ch-gray/60 open:ring-ch-green-light"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-ch-blue">
                    {f.q}
                    <svg
                      viewBox="0 0 20 20"
                      className="h-5 w-5 shrink-0 text-ch-green transition group-open:rotate-45"
                      fill="currentColor"
                    >
                      <path d="M9 3h2v14H9z" />
                      <path d="M3 9h14v2H3z" />
                    </svg>
                  </summary>
                  <p className="mt-3 leading-relaxed text-ch-blue/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- CTA FINAL */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="ch-bubble bg-ch-green px-8 py-14 text-center text-white sm:px-14">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              ¿Tenés el plano a mano?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
              Subilo ahora y en minutos sabés qué materiales necesita tu casa. Si
              preferís, un técnico lo revisa con vos.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#cotizar"
                className="rounded-full bg-white px-7 py-3.5 font-display font-bold text-ch-green-dark transition hover:bg-white/90"
              >
                Cotizar mi casa
              </a>
              <a
                href="mailto:info@concrehaus.com"
                className="rounded-full px-7 py-3.5 font-display font-bold text-white ring-2 ring-white/70 transition hover:bg-white/10"
              >
                Hablar con un técnico
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
