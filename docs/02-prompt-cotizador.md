# Prompt maestro — Cotizador Concrehaus

> Pegar íntegro en Claude Code (o el agente de desarrollo elegido) para arrancar el
> proyecto. Los bloques marcados `⚠️ COMPLETAR` deben llenarse con datos oficiales
> de Concrehaus antes de pasar a producción.

---

## ROL

Actuás como equipo de producto full-stack: arquitectura, backend, frontend y UX.
Construís una aplicación web de producción, no un prototipo.

## CONTEXTO DE NEGOCIO

Concrehaus® (Grupo Estisol, Argentina) fabrica y comercializa un sistema
constructivo de paneles estructurales de EPS con mallas de acero de alta
resistencia, terminados con hormigón proyectado en obra. Resuelve
mampostería, estructura y aislación térmica en un solo elemento. Cuenta con
Certificado de Aptitud Técnica (CAT).

Hoy, cuando un cliente quiere saber cuánto cuesta construir su casa con
Concrehaus, tiene que enviar los planos por mail y esperar a que un técnico
haga el cómputo a mano. Eso demora días, consume horas de ingeniería y pierde
leads calientes.

**Objetivo del producto:** una web app donde el cliente sube el plano de planta
de su vivienda y obtiene, en minutos, un listado de materiales computados y un
presupuesto estimado. El objetivo comercial es doble:

1. **Servicio:** dar una respuesta inmediata y creíble que hoy no existe.
2. **Captación:** convertir cada cotización en un lead calificado y estructurado
   que traccione la venta de todo el catálogo (paneles, mallas, accesorios,
   aislaciones, terminaciones) y de los servicios asociados (asesoramiento,
   capacitación, dirección técnica, derivación a distribuidor de zona).

**Regla de oro:** el cotizador NO reemplaza al técnico, lo alimenta. Toda
cotización es una **estimación preliminar** y así debe comunicarse. El cierre
comercial siempre pasa por una validación humana.

---

## ALCANCE FUNCIONAL

### Flujo del usuario final

```
1. Landing → propuesta de valor + ejemplo de cotización + CTA
2. Carga del plano (PDF / JPG / PNG / DXF; hasta 25 MB; multi-página, multi-nivel)
3. Datos del proyecto (formulario corto)
      · tipo de obra: vivienda nueva | ampliación | cerramiento de estructura
      · localidad/provincia (define flete y distribuidor)
      · nivel de terminación deseado
      · cantidad de plantas y altura libre
      · plazo estimado de inicio
4. Procesamiento IA → extracción de geometría del plano
5. ★ VALIDACIÓN INTERACTIVA (pantalla crítica del producto)
      · el plano se muestra con la geometría detectada superpuesta
      · el usuario confirma/corrige: escala, muros, espesores, aberturas, losas
      · métricas en vivo: m² cubiertos, ml de muro, m² de losa
6. Selección de configuración
      · espesor de panel por tipo de muro (exterior / interior / divisorio)
      · sistema de losa
      · nivel de terminación
7. Resultado
      · cómputo métrico detallado por rubro
      · listado de materiales con cantidades y unidades comerciales
      · precio estimado con rango de confianza (± %)
      · estimación de mano de obra en Hh y plazo de montaje
      · comparativo vs. construcción tradicional (costo, plazo, K térmico)
8. Descarga de PDF (requiere email) → lead al CRM
9. CTA: "Validar con un técnico Concrehaus" / "Contactar distribuidor de mi zona"
```

### Backoffice Concrehaus

- **Panel de precios:** ABM de productos, precios, unidades de venta, packs,
  vigencia, ajuste masivo por %, historial de versiones. Cada cotización queda
  congelada contra una versión de lista.
- **Panel de coeficientes:** TODAS las reglas de cómputo (consumos, desperdicios,
  solapes, refuerzos) editables desde la UI, sin tocar código.
- **Bandeja de leads:** cotizaciones entrantes con plano, cómputo, datos de
  contacto, estado (nuevo / contactado / validado / cotizado / vendido / perdido),
  asignación a distribuidor, exportación CSV y webhook al CRM.
- **Auditoría:** comparar cómputo automático vs. cómputo validado por el técnico,
  para calibrar los coeficientes con obras reales.

---

## MOTOR DE CÓMPUTO

### Datos del sistema (verificados en documentación pública)

```yaml
panel:
  ancho_util_m: 1.20
  altura_maxima_m: 6.00
  tipos:
    C:  # muros y cerramientos verticales — flexocompresión
      nucleo_eps_cm: [4, ...]        # ⚠️ COMPLETAR con espesores comercializados
      hormigon_total_cm: 6           # núcleo 4 + 6 de hormigón = muro de 10 cm
    F:  # losas y cubiertas — flexión
      nucleo_eps_cm: [4, ...]        # ⚠️ COMPLETAR
      hormigon_inferior_cm: 3        # promedio
      capa_compresion_cm: 4          # mínimo, hormigón convencional
    cerramiento:  # muros NO portantes / cierre de estructuras (RapiWall)
      superficie_por_panel_m2: 2.8
      terminacion: revoque proyectado

mallas_accesorias:
  modulo_ancho_mm: 1230
  angular_M15: {mm: [185, 185, 1230], uso: encuentros en ángulo entre paneles}
  angular_M30: {mm: [300, 300, 1230], uso: encuentros en ángulo, refuerzo mayor}
  plana_225:   {mm: [225, 1230],      uso: aberturas, empalmes, discontinuidades}
  plana_300:   {mm: [300, 1230],      uso: ídem, refuerzo mayor}
  malla_U:     {mm: [195, 195, 1230], uso: aleros, bordes de muro, parapetos}

performance:
  montaje_Hh_m2: 0.5              # vs 1.5 Hh/m² en mampostería tradicional
  transmitancia_K_W_m2K: 0.5      # con 8 cm de núcleo
  resistencia_fuego: F-180
  vida_util_anios: 60
```

### Cadena de cálculo

```
PLANO
  ↓ extracción (IA + validación humana)
GEOMETRÍA        muros (ml × altura × tipo), aberturas (ancho × alto),
                 losas (m²), niveles, encuentros (esquinas, T, cruces)
  ↓ reglas paramétricas
CÓMPUTO MÉTRICO  m² de panel C / F / cerramiento, ml de encuentros,
                 ml de perímetro de aberturas, m³ de hormigón
  ↓ conversión a unidades comerciales
LISTA DE MATERIALES
  ↓ lista de precios vigente + flete por zona + IVA
PRESUPUESTO
```

### Fórmulas base (parametrizables desde el backoffice)

```
# --- Paneles ---
m2_muro_bruto        = Σ(longitud_muro_ml × altura_libre_m)  por tipo de muro
m2_aberturas         = Σ(ancho × alto de cada abertura)
m2_muro_neto         = m2_muro_bruto − (m2_aberturas × factor_descuento_vanos)
                       # factor_descuento_vanos ≈ 0.85: el vano no se descuenta
                       # al 100% porque el panel se corta y se pierde recorte
paneles_C            = ceil(m2_muro_neto × (1 + desperdicio_muro) / (1.20 × altura_panel))
m2_losa              = Σ(superficie de cada paño de losa)
paneles_F            = ceil(m2_losa × (1 + desperdicio_losa) / (1.20 × largo_panel))
# desperdicio_muro ≈ 8% · desperdicio_losa ≈ 10%   ⚠️ CALIBRAR con obras reales

# --- Mallas accesorias (módulo de 1.23 m) ---
malla_angular_u      = ceil(ml_encuentros_en_angulo × altura_m / 1.23)
                       # encuentros = esquinas + uniones en T + cruces
malla_plana_u        = ceil((ml_empalmes_verticales + ml_perimetro_aberturas)
                            × factor_solape / 1.23)
malla_U_u            = ceil((ml_bordes_libres + ml_parapetos + ml_aleros) / 1.23)

# --- Hormigón proyectado ---
m3_hormigon_muros    = m2_muro_neto × espesor_hormigon_total_m × (1 + rebote)
                       # rebote/desperdicio de proyección ≈ 20-25%
m3_hormigon_losa     = m2_losa × (esp_inferior + esp_compresion) × (1 + rebote)
volquete_aridos      = derivado de la dosificación  ⚠️ COMPLETAR del Manual

# --- Complementos ---
pelos_de_anclaje_u   = ceil(ml_apoyo_sobre_estructura / separacion_m)
                       # Ø 6 mm, anclados 10-12 cm en vigas/columnas,
                       # separación 40-50 cm, sobresaliendo 30 cm
alambre_atar_kg      = m2_panel_total × coef_alambre
puntales_y_encofrado = f(m2_losa)                     ⚠️ COMPLETAR
terminaciones        = f(m2_muro, nivel_elegido)      ⚠️ COMPLETAR

# --- Mano de obra ---
Hh_montaje           = m2_panel_total × 0.5
Hh_tradicional_ref   = m2_panel_total × 1.5           # para el comparativo
plazo_dias_estimado  = Hh_montaje / (personas_cuadrilla × horas_dia)
```

**Requisito:** ningún coeficiente hardcodeado. Todos viven en tabla
`coeficientes_computo` versionada, editable desde el backoffice, y cada
cotización guarda la versión con la que fue calculada.

---

## EXTRACCIÓN DEL PLANO

Usar la **API de Claude** con capacidad de visión (modelo `claude-opus-5` para
extracción, `claude-sonnet-5` para tareas auxiliares). Consultar la skill
`claude-api` antes de escribir el código de integración.

**Pipeline:**

1. **Normalización:** PDF → imagen de alta resolución (300 dpi, pdftoppm/pdfium).
   DXF → parseo vectorial directo (dxf-parser), que es la fuente más confiable y
   debe preferirse cuando existe.
2. **Detección de escala:** buscar en el plano (a) la indicación textual de escala
   ("Esc. 1:50"), (b) cotas acotadas comparables contra píxeles, (c) elementos de
   referencia conocidos (puerta de 0,80 m). Si la confianza es baja, **exigir al
   usuario que calibre trazando una línea sobre una cota conocida.** Nunca asumir
   escala en silencio: un error de escala arruina todo el presupuesto.
3. **Extracción estructurada** con salida JSON tipada:

```jsonc
{
  "confianza_global": 0.0,
  "escala": {"valor": "1:50", "px_por_metro": 0, "confianza": 0.0, "metodo": "texto|cota|referencia"},
  "niveles": [{
    "nombre": "Planta Baja",
    "altura_libre_m": 2.6,
    "muros": [{
      "id": "M1", "tipo": "exterior|interior|divisorio",
      "p1": [x, y], "p2": [x, y],
      "longitud_m": 0.0, "espesor_cm": 0, "confianza": 0.0
    }],
    "aberturas": [{
      "id": "V1", "tipo": "puerta|ventana|paso",
      "muro_id": "M1", "ancho_m": 0.0, "alto_m": 0.0, "confianza": 0.0
    }],
    "ambientes": [{"nombre": "Estar", "superficie_m2": 0.0}],
    "losas": [{"id": "L1", "superficie_m2": 0.0, "tipo": "entrepiso|cubierta"}]
  }],
  "totales": {"superficie_cubierta_m2": 0.0, "ml_muro_exterior": 0.0, "ml_muro_interior": 0.0},
  "advertencias": ["texto ilegible en sector norte", "no se detectó escala explícita"]
}
```

4. **Post-proceso geométrico determinístico** (no dejárselo al modelo):
   snapping de extremos, cierre de polígonos, detección de esquinas / encuentros
   en T / cruces, cálculo de ml de encuentros, verificación de que los ambientes
   cierran contra el perímetro.
5. **Umbrales de confianza:** cualquier elemento con confianza < 0,8 se marca en
   la UI de validación y se pide confirmación explícita. Si la confianza global
   es < 0,6, no se muestra precio: se ofrece derivación directa a un técnico.

**Nunca** presentar un número al usuario sin que haya pasado por la pantalla de
validación. Es preferible pedir tres correcciones que entregar un presupuesto
equivocado.

---

## STACK Y ARQUITECTURA

```
Frontend    Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui
Canvas      Konva / Fabric.js para la pantalla de validación interactiva
Backend     Next.js API routes + jobs asíncronos (BullMQ + Redis)
DB          PostgreSQL + Prisma
Storage     S3 compatible, planos privados con URLs firmadas
IA          API de Claude (visión) con reintentos, timeout y fallback a revisión manual
PDF         generación server-side con la identidad visual de Concrehaus
Auth        magic link por email para el usuario; roles admin/técnico/distribuidor
i18n        es-AR (formato de números y moneda argentina)
Deploy      Vercel o contenedor Docker; migraciones versionadas
```

### Modelo de datos (mínimo)

```
Usuario, Proyecto, ArchivoPlano, ExtraccionIA, GeometriaValidada,
Computo, ItemComputo, Producto, ListaPrecios, PrecioProducto,
CoeficientesComputo, Cotizacion, ItemCotizacion, Lead, Distribuidor, ZonaFlete
```

Cotización inmutable una vez emitida: guarda snapshot de geometría, coeficientes
y precios. Reabrir = nueva versión.

---

## UX — CRITERIOS INNEGOCIABLES

1. **Sin registro para empezar.** Se pide email recién para descargar el PDF.
   Eso maximiza el volumen de leads.
2. **Progreso visible** durante el procesamiento (subiendo → leyendo escala →
   detectando muros → computando), nunca un spinner mudo.
3. **La pantalla de validación es el producto.** Zoom, pan, arrastrar extremos de
   muro, agregar/borrar muros y aberturas, editar espesores, deshacer/rehacer.
   Métricas actualizadas en vivo.
4. **Rango, no número mágico.** Mostrar "$X – $Y" con el ± % explícito y un
   desglose por rubro abierto, no una caja negra.
5. **Disclaimer legal presente y claro** en pantalla y en el PDF: estimación
   preliminar orientativa, no vinculante, sujeta a verificación técnica,
   proyecto ejecutivo, cálculo estructural y disponibilidad de stock; no incluye
   fundaciones, instalaciones, aberturas, ni honorarios profesionales salvo
   indicación expresa.
6. **Mobile-first.** Muchos usuarios llegan desde el celular con una foto del plano.
7. **Accesibilidad AA** y performance: LCP < 2,5 s en la landing.
8. **Ruta de escape siempre visible:** "Prefiero que me cotice un técnico" en
   todas las etapas. Un usuario trabado es un lead perdido.

## MOTOR COMERCIAL (el objetivo real del producto)

- **Venta cruzada contextual:** al mostrar el cómputo, sugerir automáticamente
  productos complementarios del catálogo Estisol (aislaciones, terminaciones,
  accesorios de montaje) con el m² ya calculado.
- **Comparativo persuasivo, honesto y verificable:** costo, plazo (0,5 vs
  1,5 Hh/m²) y aislación térmica (K ≈ 0,5 W/m²·K) contra construcción
  tradicional, citando siempre la fuente del dato.
- **Segmentación del lead:** particular / arquitecto / constructora / desarrollador,
  con recorridos y materiales de seguimiento distintos.
- **Ruteo automático al distribuidor** de la provincia/localidad del proyecto.
- **Nurturing:** email de seguimiento con la cotización, documentación técnica,
  obras de referencia e invitación a la capacitación para constructores.
- **Analítica:** embudo completo (visita → carga de plano → validación completada →
  cotización → PDF descargado → contacto). Medir dónde se cae la gente.

## ENTREGABLES

1. Repo con README, `.env.example`, migraciones y seeds de catálogo y coeficientes.
2. App funcionando end-to-end con 3 planos de prueba reales.
3. Backoffice completo de precios, coeficientes y leads.
4. Tests: unitarios sobre TODO el motor de cómputo (crítico), integración del
   pipeline de extracción, E2E del flujo principal.
5. Documentación del motor: cada fórmula, su origen y su fuente.
6. Guía de calibración: cómo ajustar coeficientes comparando contra obras reales.

## CRITERIOS DE ACEPTACIÓN

- [ ] Un plano de vivienda de ~100 m² se procesa en < 90 s.
- [ ] El cómputo automático queda dentro de ±10 % del cómputo manual de un técnico
      Concrehaus en al menos 8 de 10 planos de prueba.
- [ ] Ninguna cotización se emite sin pasar por la pantalla de validación.
- [ ] Los coeficientes y precios se cambian sin desplegar código.
- [ ] Cada cotización es reproducible: mismo input + misma versión = mismo output.
- [ ] Los planos subidos no son accesibles públicamente.
- [ ] El disclaimer aparece en pantalla y en el PDF.
- [ ] Todo lead queda registrado con su cómputo asociado.

## ORDEN DE TRABAJO

```
Fase 1  Motor de cómputo + backoffice, con carga MANUAL de geometría.
        (Entrega valor desde el día uno y permite calibrar sin depender de la IA.)
Fase 2  Pipeline de extracción IA + pantalla de validación interactiva.
Fase 3  PDF, leads, CRM, ruteo a distribuidores, venta cruzada.
Fase 4  Analítica, nurturing, calibración con obras reales.
```

Empezá por la Fase 1. Antes de escribir código, proponé el esquema de base de
datos y el catálogo de coeficientes, y esperá aprobación.

## DATOS QUE FALTAN — PEDIR ANTES DE AVANZAR

1. Espesores de núcleo comercializados por tipo de panel y alturas de stock.
2. Manual de Ejecución: consumos de hormigón por m², dosificación, criterios de
   solape de mallas y refuerzos por abertura.
3. Lista de precios vigente con unidades de venta y packs.
4. Política de precios: ¿públicos en la web o solo vía distribuidor?
5. Mapa de distribuidores por zona y costos de flete.
6. Manual de marca: logo, paleta, tipografías.
7. CRM en uso y forma de integración.
8. Cómputos de 5-10 obras reales ya ejecutadas, para calibrar y validar el motor.
