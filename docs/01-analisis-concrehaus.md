# Análisis del sitio concrehaus.com

> Relevamiento realizado desde fuentes públicas indexadas del sitio (home, `/faq/`,
> `/informacion-tecnica/`, `/novedades/`, `/categoria/*`, `/imagenes/*`, fichas PDF en
> `/wp-content/themes/concrehaus/documentos/`) y notas de prensa sectoriales.
> Los datos técnicos deben validarse contra la Memoria Descriptiva y el Manual de
> Ejecución oficiales antes de usarlos como coeficientes de cómputo.

## 1. Quién es

- **Marca:** Concrehaus® — "La solución constructiva eficiente".
- **Empresa:** Grupo Estisol / Estisol Construcción (fabricante de EPS Isopor desde
  1964 en Argentina). 7 plantas industriales en el país, 2 de ellas dedicadas a
  Concrehaus. La documentación legal del Checklist de obra responsabiliza a
  **Novapol S.A.** — confirmar qué razón social emite los presupuestos.
- **Domicilio / planta:** M. L. Anido 1941 (Ruta 25 Km 9), Villa Rosa, Pilar, Bs. As.
  info@concrehaus.com · 0810 333 24752.
- **Ecosistema comercial:** tienda online de Estisol Construcción y red de
  distribuidores (Tecnopor, Xcons, Punto Seco, Novopor, Telpor, etc.).
- **Respaldo:** Certificado de Aptitud Técnica (CAT) de la Dirección de Tecnología
  e Industrialización de la Subsecretaría de Desarrollo Urbano y Vivienda, y
  Certificado Sismorresistente.

## 2. Qué vende

Sistema constructivo de **paneles monolíticos estructurales**: núcleo de EPS
(Isopor / Neopor / Neotech) + mallas de acero electrosoldado de alta resistencia
vinculadas por conectores, que reciben **hormigón proyectado** en obra y se
transforman en una estructura continua portante.

| Línea | Uso | Datos técnicos publicados |
|---|---|---|
| **Panel tipo C** | Muros y cerramientos verticales (interiores y exteriores), flexocompresión con compresión predominante | Núcleo desde 4 cm; con 6 cm de hormigón total genera muro de 10 cm |
| **Panel tipo F** | Losas y cubiertas, esfuerzos de flexión | Núcleo desde 4 cm + ~3 cm de hormigón inferior + capa de compresión de hormigón convencional ≥ 4 cm |
| **Panel de Cerramiento / RapiWall** | Muros no portantes, cierre de estructuras de H°A° o steel | Núcleo EPS + malla galvanizada ambas caras; recibe revoque proyectado. ~2,8 m² de superficie lista por panel |
| **Mallas de refuerzo** (accesorios) | Continuidad estructural | Angular M15 185×185×1230 mm y M30 300×300×1230 mm (encuentros en ángulo); Plana 225×1230 y 300×1230 mm (aberturas, empalmes, discontinuidades); U 195×195×1230 mm (aleros, bordes de muro, parapetos) |

**Geometría base:** ancho del **núcleo EPS 1,20 m**, ancho de **cada malla 1,24 m**,
**ancho total de la pieza 1,28 m** — la malla vuela 4 cm y se solapa con el panel
vecino, por lo que el **paso de modulación real es de 1,20 m**. Altura variable según
proyecto, hasta 6 m. Las mallas accesorias vienen en módulos de **1,23 m**.

**Núcleos disponibles:** EPS Isopor (PCE, λ = 0,037 W/m·K) y Neotech con grafito
(PCN, λ = 0,031 W/m·K). Espesores frecuentes: **8 cm en exteriores, 4-6 cm en
interiores**. Mallas de acero trafilado de **550 MPa** de tensión proporcional.

**Performance publicada:**
- Montaje: **0,5 Hh/m²** vs. **1,5 Hh/m²** de mampostería tradicional (3× productividad).
- Aislación: panel de referencia **PCE08 → K = 0,41 W/m²K** con Isopor y
  **0,35 W/m²K** con Neotech.
- Durabilidad > 60 años, resistencia al fuego F-180, bajo mantenimiento estructural.

## 3. Estructura del sitio

Sitio WordPress con tema propio. Secciones detectadas:

- `/` — home con propuesta de valor y beneficios.
- `/informacion-tecnica/` — Memoria Descriptiva, Manual de Ejecución, fichas
  técnicas por producto (PDFs descargables).
- `/faq/` — preguntas frecuentes sobre la tecnología.
- `/novedades/` — blog (ej. "Concrehaus + Encofrados: una combinación potente",
  "Sistema Concrehaus: versatilidad y rapidez").
- `/categoria/losas/`, `/categoria/terminaciones/` — contenidos por temática.
- `/imagenes/*` — galerías de obra: arquitectura comercial, cerramientos de
  estructuras, con encofrados, capacitación en obra para constructores.

## 4. Servicios declarados (clave para el cotizador)

El sitio y la comunicación de Estisol ya ofrecen, **de forma manual**:

1. **Cómputo y presupuesto por proyecto.**
2. Asesoramiento técnico en etapa de diseño y de ejecución.
3. Documentación técnica descargable.
4. Capacitación a constructores en obra.
5. Cálculo y apoyo de diseño para profesionales.

## 5. Diagnóstico y oportunidad

**Modelo de negocio actual:** venta de material (paneles + mallas + accesorios)
a través de distribuidores, con la demanda traccionada por arquitectos,
constructoras y particulares que descubren el sistema.

**Fricción principal:** el visitante que ya está convencido del sistema no
puede saber cuánto le cuesta *su* casa sin mandar planos por mail y esperar a
que un técnico haga el cómputo. Ese cuello de botella:
- pierde leads calientes por demora,
- consume horas de ingeniería en consultas que no cierran,
- no deja ningún dato estructurado de la demanda.

**Dónde ataca el cotizador:**

| Fricción | Qué resuelve la app |
|---|---|
| Espera de días por un presupuesto | Estimación en minutos desde el plano |
| Lead sin datos | Captura estructurada: m², ubicación, tipología, plazo, rol del usuario |
| Cómputo manual repetido | Cómputo automatizado; el técnico solo valida |
| Venta acotada al panel | Venta cruzada: accesorios, aislaciones, terminaciones, capacitación, dirección técnica |
| Distribuidores sin herramienta | Derivación del lead al distribuidor de la zona |

**Ventajas del sistema que juegan a favor del cómputo automático:** geometría
altamente modular (ancho fijo 1,20 m, accesorios de 1,23 m), catálogo acotado
(C / F / cerramiento + 3 familias de malla) y espesores normalizados. Es un
sistema mucho más computable que la mampostería tradicional.

## 6. Documentación oficial ya incorporada

El cliente aportó cuatro documentos que resolvieron la mayor parte de los coeficientes
del motor de cómputo. El detalle con fuente por valor está en `03-parametros-tecnicos.md`.

| Documento | Qué aporta al cotizador |
|---|---|
| **Fichas LEED** (Isopor y Neotech) | Geometría exacta del panel (1,20 / 1,24 / 1,28 m), λ y K por núcleo, espesores frecuentes, acero 550 MPa, créditos LEED EAp2 / EAc1 / MRc5 |
| **Detalles Constructivos v2015** | Conteo de mallas angulares por encuentro (2 M15 en L, T y losa-pared), regla M25 para pared > 10 cm, hierro de anclaje L=30+12 / SEP=50, lenguaje legal del disclaimer |
| **Instructivo de Colocación v1** | Dosificación completa del concreto proyectado, secuencia de proyección en 2 pasadas, contraflecha 7 mm/m, desapuntalamiento ≥14 días, métodos de montaje, tratamiento de aberturas |
| **Checklist de obra** | Listado de herramientas y equipos, checklist de 9 etapas — insumo directo para dos entregables adicionales de la app |

Tres hallazgos con impacto directo:

1. **El paso de panelización es 1,20 m, no 1,28 m.** La malla vuela y se solapa. Dividir
   por el ancho total sobreestima ~6,7 % de los paneles.
2. **La dosificación oficial permite computar insumos de obra**, no solo paneles:
   cemento, arena, agua, fibra de polipropileno y aditivos (Sikacrete, Sika1). Amplía
   el alcance de la venta cruzada de forma significativa.
3. **El crédito LEED MRc5 es calculable automáticamente**: exige materiales fabricados a
   menos de 800 km de la obra, y la app ya conoce la ubicación del proyecto y la planta.

## 7. A verificar con el sitio a la vista

- [ ] Menú de navegación exacto y existencia de `/contacto/`, `/obras/`, `/distribuidores/`.
- [ ] Listado completo de espesores de núcleo comercializados por tipo de panel.
- [ ] Alturas estándar de stock vs. corte a medida.
- [ ] Consumo oficial de cemento y arena por m² de pared proyectada (lo único que la
      documentación aportada no permite derivar).
- [ ] Identidad visual: paleta (verde institucional + azul), tipografías, logo.
- [ ] Política de precios: ¿precio público o solo a través de distribuidor?
- [ ] Formularios/CRM ya en uso y herramientas de analítica instaladas.
