# Prompt maestro — Cotizador Concrehaus

> Pegar íntegro en Claude Code (o el agente de desarrollo elegido) para arrancar el
> proyecto. Los coeficientes provienen de la documentación oficial de Concrehaus
> (Fichas LEED, Detalles Constructivos v2015, Instructivo de Colocación v1, Checklist
> de obra); el detalle con fuente por valor está en `03-parametros-tecnicos.md`.
> Lo que depende del mercado (arena, cemento, aditivos, elastómeros) se resuelve con
> **valores de referencia con banda declarada**, no con datos exactos: ver §13 de
> `03-parametros-tecnicos.md`. Nada bloquea el desarrollo.

---

## ROL

Actuás como equipo de producto full-stack: arquitectura, backend, frontend y UX.
Construís una aplicación web de producción, no un prototipo.

## CONTEXTO DE NEGOCIO

Concrehaus® (Grupo Estisol, Argentina — planta en Villa Rosa, Pilar, Bs. As.) fabrica
y comercializa un sistema constructivo de paneles estructurales: núcleo de EPS
(Isopor o Neotech) con mallas de acero de alta resistencia de 550 MPa vinculadas por
conectores, terminados con **concreto proyectado neumáticamente** en obra. Resuelve
mampostería, estructura y aislación térmica en un solo elemento. Cuenta con
Certificado de Aptitud Técnica (CAT) y Certificado Sismorresistente.

Hoy, cuando un cliente quiere saber cuánto cuesta construir su casa con Concrehaus,
tiene que enviar los planos por mail y esperar a que un técnico haga el cómputo a
mano. Eso demora días, consume horas de ingeniería y pierde leads calientes.

**Objetivo del producto:** una web app donde el cliente sube el plano de planta de su
vivienda y obtiene, en minutos, un listado de materiales computados y un presupuesto
estimado. El objetivo comercial es doble:

1. **Servicio:** dar una respuesta inmediata y creíble que hoy no existe.
2. **Captación:** convertir cada cotización en un lead calificado y estructurado que
   traccione la venta de todo el catálogo (paneles, mallas, accesorios, aditivos,
   aislaciones, terminaciones) y de los servicios asociados (asesoramiento,
   capacitación en obra, dirección técnica, derivación a distribuidor de zona).

**Regla de oro:** el cotizador NO reemplaza al técnico, lo alimenta. Toda cotización
es una **estimación preliminar, meramente indicativa y no vinculante**, y así debe
comunicarse. El cierre comercial siempre pasa por validación humana.

**Segunda regla, igual de importante: simple gana a exacto.** Un usuario que abandona
en el paso 3 vale cero, por preciso que fuera el número que iba a ver. El producto se
diseña para que alguien sin conocimientos técnicos, desde el celular, con una foto del
plano, llegue a un resultado en menos de 3 minutos. Toda decisión de diseño que agregue
fricción a cambio de precisión se resuelve a favor de la simplicidad, y la precisión
faltante se compensa mostrando un **rango honesto** en vez de un número falso.

---

## FILOSOFÍA DE PRECISIÓN — leer antes de escribir el motor

El objetivo NO es reproducir el cómputo de obra de un técnico. Es dar un número
**aproximado, lo más cercano a la realidad posible, y creíble**. Lo que depende de la
arena, el cemento y los aditivos disponibles en cada plaza no se puede determinar desde
un plano — y no hace falta.

Cada ítem del cómputo se clasifica en una de tres clases, y de ahí sale la banda:

| Clase | Qué incluye | Banda |
|---|---|---|
| **A — Exacto** | Paneles, mallas, hierros de espera. Derivados de la geometría y de reglas fijas de la documentación oficial. | ± 5 % |
| **B — Referencia** | Concreto proyectado y sus insumos: cemento, arena, agua, fibra, aditivos. | ± 15 % |
| **C — Indicativo** | Terminaciones, revestimientos elastoméricos, mano de obra, puntales. | ± 25 % |

La banda total del presupuesto es el promedio ponderado por el peso en $ de cada clase.

> **Esto es una ventaja comercial, no una limitación.** Los productos que Concrehaus
> vende son casi todos Clase A. El mensaje al usuario es:
> *"El material Concrehaus está computado con precisión. Los insumos de obra son
> estimativos y varían según el proveedor de tu zona."*
> Decirlo genera confianza; esconderlo la destruye en la primera comparación con un
> presupuesto real.

**Los valores de referencia y sus rangos están en `03-parametros-tecnicos.md` §13.**
Todos son editables desde el backoffice y se recalibran contra obras reales. Ninguno
bloquea el desarrollo: el motor arranca con los valores de referencia cargados.

**Insumos brand-agnostic:** el motor no cotiza marcas, cotiza **funciones**
(plastificante, hidrófugo, revestimiento elastomérico, sellador). Cada función tiene un
rendimiento de referencia y una lista de productos equivalentes; el backoffice o el
distribuidor eligen cuál se factura. Si en una zona se trabaja otra marca, se cambia el
producto sin tocar el cómputo.

---

## ALCANCE FUNCIONAL

### Flujo del usuario final — 3 pasos visibles

```
PASO 1 · Subí tu plano
    Un solo control grande. Arrastrar, elegir archivo o sacar una foto.
    PDF / JPG / PNG / DXF. Sin registro, sin formulario previo.

PASO 2 · Confirmá 4 cosas
    Solo lo que realmente mueve el número:
      · ¿La escala es correcta?   (precargada; se corrige trazando sobre una cota)
      · Altura libre               (default 2,60 m)
      · Cantidad de plantas
      · Localidad                  (flete, distribuidor y crédito LEED)
    El plano se muestra con los muros detectados resaltados. Si algo está mal,
    "Corregir" abre el editor. Si está bien, "Continuar" y listo.

PASO 3 · Tu estimación
    Arriba, grande y sin jerga:
      · superficie computada
      · RANGO de precio del material Concrehaus
      · plazo estimado de montaje
      · un botón: "Quiero que me lo revise un técnico"
    Abajo, plegado, "Ver el detalle completo" para quien quiera:
      · listado de materiales por rubro, con su clase (A/B/C) visible
      · panelización, cómputo métrico, insumos de obra
      · ficha térmica, ficha LEED, checklist de obra, herramientas necesarias
```

El email se pide **al final**, para enviar o descargar el PDF. Nunca antes.

**Modo experto (opcional, nunca obligatorio).** Un link discreto — "Ajustar el detalle" —
abre el editor completo: corregir muro por muro, cambiar espesores y núcleo por tipo de
muro, elegir sistema de losa y nivel de terminación. Es para el arquitecto y el
constructor. El particular nunca lo ve si no lo busca.

**Defaults que hacen posible el Paso 2.** Todo lo demás se asume y se muestra como
"podés cambiarlo": núcleo EPS Isopor, 8 cm en exteriores y 6 cm en interiores, losa con
capa de compresión de 5 cm, terminación estándar. Son los valores de la documentación
oficial, así que el default es también la respuesta correcta en la mayoría de los casos.

El checklist de obra, el listado de herramientas y la ficha LEED salen directamente de
la documentación oficial ya digitalizada: **cuestan casi nada de implementar y
convierten una cotización en un plan de obra**. Van en el detalle plegado y en el PDF,
nunca en la pantalla principal — son un premio para el que se interesa, no un obstáculo
para el que recién llega.

### Backoffice Concrehaus

- **Panel de precios:** ABM de productos, precios, unidades de venta, packs, vigencia,
  ajuste masivo por %, historial de versiones. Cada cotización queda congelada contra
  una versión de lista.
- **Panel de coeficientes:** TODAS las reglas de cómputo editables desde la UI, sin
  tocar código, versionadas.
- **Bandeja de leads:** cotizaciones entrantes con plano, cómputo, datos de contacto,
  estado (nuevo / contactado / validado / cotizado / vendido / perdido), asignación a
  distribuidor, exportación CSV y webhook al CRM.
- **Auditoría:** comparar cómputo automático vs. cómputo validado por el técnico, para
  calibrar los coeficientes con obras reales.

---

## MOTOR DE CÓMPUTO

### Datos del sistema (documentación oficial)

```yaml
panel:
  # ⚠️ GEOMETRÍA CRÍTICA — de la Ficha LEED
  ancho_nucleo_eps_m: 1.20      # el EPS
  ancho_malla_m: 1.24           # la malla vuela 2 cm por lado sobre el núcleo
  ancho_total_m: 1.28           # ancho físico de la pieza
  paso_modulacion_m: 1.20       # ← ESTE es el que divide, NO 1.28
  solape_malla_malla_m: 0.08    # el vuelo se solapa con el panel vecino
  altura_maxima_m: 6.00

  nucleos:
    PCE:  {material: EPS Isopor, lambda_W_mK: 0.037, K_ref_PCE08: 0.41}
    PCN:  {material: Neotech,    lambda_W_mK: 0.031, K_ref_PCE08: 0.35}

  espesores_frecuentes_cm:
    paredes_exteriores: 8
    paredes_interiores: [4, 6]

  acero_malla:
    tipo: alta resistencia, trafilado
    tension_proporcional_MPa: 550

  tipos:
    C:  # muros y cerramientos verticales — flexocompresión
      concreto_total_cm: 6      # núcleo 4 + 6 de concreto = muro de 10 cm
    F:  # losas y cubiertas — flexión
      concreto_inferior_cm: 3
      capa_compresion_cm: 4     # MÍNIMO, hormigón tradicional
    cerramiento:  # muros NO portantes (RapiWall)
      superficie_por_panel_m2: 2.8

mallas_accesorias:
  modulo_ancho_m: 1.23
  angular_M15: {mm: [185,185,1230], uso: encuentros en ángulo — ESTÁNDAR}
  angular_M25: {uso: reemplaza a M15 cuando espesor de pared > 10 cm}
  angular_M30: {mm: [300,300,1230], uso: refuerzo mayor}
  plana:       {mm: [[225,1230],[300,1230]], uso: juntas panel-panel, vértices de aberturas}
  malla_U:     {mm: [195,195,1230], uso: aleros, bordes de muro, parapetos}

  # Regla de conteo derivada de los Detalles Constructivos:
  # unión en L, unión en T y unión losa-pared llevan TODAS 2 mallas angulares
  angulares_por_ml_de_encuentro: 2

dosificacion_concreto_proyectado:
  cemento_arena_volumen: "1:4"      # llevar a 1:3 si la arena es fina al pastón
  agua_l_por_kg_cemento: 0.45       # incluyendo la humedad que aporta la arena
  fibra_polipropileno_media_pulgada_kg_m3: 0.6
  consistencia_cm: "7/8 sin caer ni fluir"
  espesor_max_acumulable_cm: 7
  pasadas: 2
  curado_horas_criticas: 48
  ejemplo_exteriores_tambor_200l: {agua_l: 180, sikacrete_kg: 3, sika1_l: 18}

fundacion:
  # 🔶 LAS FUENTES DISCREPAN — parametrizar y confirmar
  hierro_espera_diametro_mm: 6
  longitud_cm: 42                   # 30 sobresaliente + 12 anclados (Detalles 2015)
  separacion_cm: 40                 # Instructivo: 30/40 · Detalles: 50 · Ficha web: 40/50
  colocacion: un solo lado del panel
  alternativas: [lineal, intercalados]

losas:
  contraflecha_mm_por_m_al_apoyo: 7
  desapuntalamiento_dias_minimo: 14
  modos_montaje: [tabique_continuo, a_tope]   # "a tope" requiere quemar el panel

performance:
  montaje_Hh_m2: 0.5                # vs 1.5 Hh/m² en mampostería tradicional
  resistencia_fuego: F-180
  vida_util_anios: 60
```

### Cadena de cálculo

```
PLANO
  ↓ extracción (IA + validación humana)
GEOMETRÍA        muros (ml × altura × tipo), aberturas, losas (m²), niveles,
                 encuentros clasificados (L / T / cruz / losa-pared)
  ↓ PANELIZACIÓN (módulo 1.20 m)
DESPIECE         paneles enteros + paneles recortados por tramo de muro
  ↓ reglas paramétricas
CÓMPUTO MÉTRICO  m² de panel C/F/cerramiento, u. de malla por familia,
                 m³ de concreto, kg de cemento, m³ de arena, aditivos, hierros
  ↓ conversión a unidades comerciales
LISTA DE MATERIALES
  ↓ lista de precios vigente + flete por zona + IVA
PRESUPUESTO
```

### Fórmulas (parametrizables desde el backoffice)

```
# ═══ PANELIZACIÓN ═══
# El paso es 1.20 m (ancho del núcleo). La malla de 1.24/1.28 vuela y SE SOLAPA
# con el panel vecino: dividir por 1.28 sobreestima ~6.7% de los paneles.
por cada tramo de muro:
    paneles_enteros   = floor(longitud_tramo_m / 1.20)
    resto_m           = longitud_tramo_m − paneles_enteros × 1.20
    panel_recortado   = 1 si resto_m > 0
    # el recorte sobrante puede reutilizarse en otro tramo: aplicar
    # factor_reutilizacion_recortes (default 0.5) al desperdicio
paneles_C_total = Σ paneles por tramo, agrupados por altura y espesor

# ═══ SUPERFICIES ═══
m2_muro_bruto   = Σ(longitud_ml × altura_libre_m)   por tipo de muro
m2_aberturas    = Σ(ancho × alto)
m2_muro_neto    = m2_muro_bruto − m2_aberturas × factor_descuento_vanos  # ≈0.85
m2_losa         = Σ(superficie de cada paño)
paneles_F       = ceil(m2_losa × (1 + desperdicio_losa) / (1.20 × largo_panel))

# ═══ MALLAS (módulo 1.23 m) ═══
# 2 angulares por ml de encuentro, para L, T y losa-pared por igual
ml_encuentros   = ml_esquinas_L + ml_uniones_T + ml_cruces + ml_perimetro_losa
malla_angular_u = ceil(ml_encuentros / 1.23) × 2
tipo_angular    = "M15" si espesor_pared_cm <= 10 else "M25"

# solapa en cada junta vertical panel-panel + vértices de aberturas
juntas_verticales = (paneles_C_total − cantidad_de_tramos)
malla_plana_u   = ceil(juntas_verticales × altura_m / 1.23)
                + cantidad_aberturas × 4          # una por vértice

malla_U_u       = ceil((ml_bordes_libres + ml_parapetos + ml_aleros) / 1.23)

# ═══ CONCRETO PROYECTADO ═══
m3_concreto_muros = m2_muro_neto × espesor_concreto_total_m × (1 + rebote)
                    # rebote neto 0.15: la documentación indica recoger y REUTILIZAR
                    # el material caído, por eso es menor al 0.25 habitual
m3_concreto_losa  = m2_losa × (0.03 + esp_capa_compresion_m) × (1 + rebote)
m3_total          = m3_concreto_muros + m3_concreto_losa

# Insumos — CLASE B, valores de referencia (03-parametros-tecnicos.md §13.2)
cemento_kg      = m3_total × 340        # rango 300-380 kg/m3
arena_m3        = m3_total × 1.05       # rango 1.00-1.15 m3/m3
agua_l          = cemento_kg × 0.45     # oficial
fibra_pp_kg     = m3_total × 0.6        # oficial
plastificante_kg= m3_total × 2.5        # rango 2.0-3.5
hidrofugo_l     = m3_total × 15         # rango 12-20
bolsas_cemento  = ceil(cemento_kg / 50)
# Ancla de control: ~0.069 m3 de concreto y ~media bolsa de cemento por m2 de pared.
# Si el motor se aleja de eso, hay un error de escala en algún lado.

# Terminaciones y elastómeros — CLASE C, por FUNCIÓN, no por marca
revest_elastomerico_l = m2_fachada × 1.0    # dos manos; rango 0.7-1.4
sellador_juntas_l     = ml_juntas   × 0.15  # rango 0.10-0.25
imprimacion_l         = m2_fachada  × 0.15  # rango 0.10-0.25

# ═══ VINCULACIÓN A FUNDACIÓN ═══
hierros_espera_u  = ceil(ml_muro_total / (separacion_cm / 100))
hierro_kg         = hierros_espera_u × (longitud_cm/100) × 0.222   # kg/m del Ø6

# ═══ LOSA ═══
contraflecha_mm   = 7 × distancia_al_apoyo_m       # informativo por paño
puntales_u        = m2_losa × puntales_por_m2       # CLASE C, referencia editable
dias_apuntalamiento = max(14, plan_de_obra)

# ═══ MANO DE OBRA Y PLAZO ═══
Hh_montaje        = m2_panel_total × 0.5
Hh_tradicional_ref= m2_panel_total × 1.5           # para el comparativo
plazo_dias        = Hh_montaje / (personas_cuadrilla × horas_dia)
```

**Requisito:** ningún coeficiente hardcodeado. Todos viven en tabla
`coeficientes_computo` versionada, editable desde el backoffice, y cada cotización
guarda la versión con la que fue calculada. Sembrar la tabla desde
`03-parametros-tecnicos.md`, respetando la fuente documentada de cada valor.

---

## EXTRACCIÓN DEL PLANO

Usar la **API de Claude** con capacidad de visión (`claude-opus-5` para extracción,
`claude-sonnet-5` para tareas auxiliares). Consultar la skill `claude-api` antes de
escribir el código de integración.

**Pipeline:**

1. **Normalización:** PDF → imagen de alta resolución (300 dpi). DXF → parseo
   vectorial directo, que es la fuente más confiable y debe preferirse cuando exista.
2. **Detección de escala:** (a) indicación textual ("Esc. 1:50"), (b) cotas acotadas
   comparadas contra píxeles, (c) elementos de referencia conocidos (puerta de 0,80 m).
   Si la confianza es baja, **exigir al usuario que calibre trazando una línea sobre
   una cota conocida.** Nunca asumir escala en silencio: un error de escala arruina
   todo el presupuesto.
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

4. **Post-proceso geométrico determinístico** (no dejárselo al modelo): snapping de
   extremos, cierre de polígonos, **clasificación de encuentros en L / T / cruz**
   (necesaria para contar mallas angulares), cálculo de ml de encuentros, verificación
   de que los ambientes cierran contra el perímetro, y **panelización con paso de 1,20 m**.
5. **Umbrales de confianza:** todo elemento con confianza < 0,8 se marca en la UI y se
   pide confirmación explícita. Si la confianza global es < 0,6, no se muestra precio:
   se ofrece derivación directa a un técnico.

**La escala siempre se confirma; el resto solo si hace falta.** La escala es el único
dato cuyo error arruina todo el presupuesto, así que su confirmación es parte del Paso 2
y no se puede saltear. Los muros y aberturas, en cambio, se corrigen solo cuando la
confianza es baja: si el modelo está seguro, se sigue de largo y el usuario tiene la
opción — nunca la obligación — de entrar al modo experto. Pedir tres correcciones de más
cuesta más leads que los que salva.

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
Auth        magic link por email; roles admin / técnico / distribuidor
i18n        es-AR (formato de números y moneda argentina)
Deploy      Vercel o contenedor Docker; migraciones versionadas
```

### Modelo de datos (mínimo)

```
Usuario, Proyecto, ArchivoPlano, ExtraccionIA, GeometriaValidada, Panelizacion,
Computo, ItemComputo, Producto, ListaPrecios, PrecioProducto,
CoeficientesComputo, Cotizacion, ItemCotizacion, Lead, Distribuidor, ZonaFlete
```

Cotización inmutable una vez emitida: guarda snapshot de geometría, panelización,
coeficientes y precios. Reabrir = nueva versión.

---

## UX — CRITERIOS INNEGOCIABLES

El criterio rector es **simplicidad**. La app tiene que dar ganas de probarla, no
sensación de trámite.

1. **Tres pasos, contados a la vista.** El usuario siempre sabe en cuál está y cuánto
   falta. Nada de wizards de 8 pantallas.
2. **Sin registro para empezar.** El email se pide recién al final, para el PDF.
3. **Un solo control por pantalla.** El Paso 1 es un área de carga y nada más.
4. **Lenguaje de persona, no de ingeniero.** "Paredes" y "techos", no "flexocompresión"
   ni "tabiques portantes". La jerga vive en el detalle plegado y en el PDF.
5. **Defaults en todo.** Ningún campo obligatorio que se pueda asumir. Cada default
   visible y editable, nunca oculto.
6. **Progreso visible** durante el procesamiento (subiendo → leyendo escala → detectando
   paredes → calculando), con lenguaje humano. Nunca un spinner mudo.
7. **Rango, no número mágico.** "$X – $Y" con el ± explícito. Cada rubro del detalle
   muestra su clase (A exacto / B referencia / C indicativo). Es lo que hace creíble al
   número: el usuario ve dónde la app sabe y dónde estima.
8. **El detalle empieza plegado.** Quien quiere el número, lo tiene arriba. Quien quiere
   la lista de materiales, la despliega. Nadie tiene que scrollear la ingeniería para
   llegar al precio.
9. **Corregir es opcional, nunca obligatorio.** Si la extracción tiene buena confianza,
   se sigue de largo. Solo se fuerza la corrección cuando la confianza es baja, y se
   pide únicamente el dato flojo — no todo el plano de nuevo.
10. **Mobile-first de verdad.** El caso de uso más común es una foto del plano desde el
    celular. Se diseña primero para esa pantalla.
11. **Disclaimer legal** en pantalla y en el PDF, con el lenguaje de la documentación
    oficial: estimación preliminar, **meramente indicativa y no vinculante**, sujeta a
    verificación técnica, proyecto ejecutivo, cálculo estructural y disponibilidad de
    stock. Listar explícitamente lo NO incluido (fundaciones, instalaciones,
    carpinterías, honorarios) — ver `03-parametros-tecnicos.md` §13.4.
12. **Ruta de escape siempre visible:** "Prefiero que me cotice un técnico", en todas
    las etapas. Un usuario trabado es un lead perdido; ese botón lo convierte igual.
13. **Accesibilidad AA**; LCP < 2,5 s en la landing.

## MOTOR COMERCIAL (el objetivo real del producto)

- **Venta cruzada contextual:** al mostrar el cómputo, sugerir automáticamente
  productos complementarios con el m² ya calculado — aditivos (Sikacrete, Sika1),
  fibra de polipropileno, alambre, aislaciones, terminaciones, herramientas específicas
  (revocadora, compresor, mezcladora) que muchos clientes no tienen.
- **Comparativo persuasivo, honesto y verificable:** costo, plazo (0,5 vs 1,5 Hh/m²) y
  aislación térmica (K = 0,41 con Isopor / 0,35 con Neotech en PCE08) contra
  construcción tradicional, citando siempre la fuente del dato.
- **Upsell Neotech:** mostrar lado a lado el K de PCE vs PCN y el diferencial de costo.
  Es una decisión que hoy el cliente no puede tomar informado.
- **Ficha LEED automática.** La planta está en Villa Rosa, Pilar. Si el proyecto queda
  a menos de **800 km**, aplica **MRc5 (2 puntos)** — calculable con la ubicación que
  el usuario ya cargó. Sumar EAp2 (prerrequisito) y EAc1 (1–19 puntos). Argumento
  fuerte para desarrolladores y obra corporativa.
- **Plan de obra como gancho:** entregar junto al presupuesto el checklist de 9 etapas
  y el listado de herramientas y equipos. Es contenido que ya existe y que transforma
  una cotización en una guía de proyecto — con un CTA natural a la capacitación en obra.
- **Segmentación del lead:** particular / arquitecto / constructora / desarrollador, con
  recorridos y materiales de seguimiento distintos.
- **Ruteo automático al distribuidor** de la provincia/localidad del proyecto.
- **Analítica:** embudo completo (visita → carga de plano → validación completada →
  cotización → PDF descargado → contacto).

## ENTREGABLES

1. Repo con README, `.env.example`, migraciones y seeds de catálogo y coeficientes.
2. App funcionando end-to-end con 3 planos de prueba reales.
3. Backoffice completo de precios, coeficientes y leads.
4. Tests: unitarios sobre TODO el motor de cómputo (crítico — incluyendo casos borde de
   panelización: tramo de 1,19 m, de 2,41 m, muros con vanos que abarcan varios paneles),
   integración del pipeline de extracción, E2E del flujo principal.
5. Documentación del motor: cada fórmula, su origen y su fuente.
6. Guía de calibración: cómo ajustar coeficientes comparando contra obras reales.

## CRITERIOS DE ACEPTACIÓN

- [ ] Un plano de vivienda de ~100 m² se procesa en < 90 s.
- [ ] Del alta al resultado hay **3 pasos** y se completa en menos de 3 minutos, desde
      el celular, sin conocimientos técnicos. Probarlo con alguien ajeno al proyecto.
- [ ] Los **ítems Clase A** (paneles y mallas) quedan dentro de **±5 %** del cómputo
      manual de un técnico Concrehaus en al menos 8 de 10 planos de prueba.
- [ ] El total del presupuesto cae dentro de la banda declarada en 8 de 10 casos.
- [ ] Cada rubro del detalle muestra su clase (A/B/C) y la app explica qué significa.
- [ ] La panelización usa paso de 1,20 m y hay un test que lo prueba explícitamente.
- [ ] Ninguna cotización se emite sin que la escala haya sido confirmada.
- [ ] Los coeficientes y precios se cambian sin desplegar código.
- [ ] Cada cotización es reproducible: mismo input + misma versión = mismo output.
- [ ] Los planos subidos no son accesibles públicamente.
- [ ] El disclaimer aparece en pantalla y en el PDF.
- [ ] Todo lead queda registrado con su cómputo asociado.

## ORDEN DE TRABAJO

```
Fase 1  Motor de cómputo + panelización + backoffice, con carga MANUAL de geometría.
        (Entrega valor desde el día uno y permite calibrar sin depender de la IA.)
Fase 2  Pipeline de extracción IA + pantalla de validación interactiva.
Fase 3  PDF, LEED, checklist de obra, leads, CRM, distribuidores, venta cruzada.
        Auditoría: cargar obras reales y angostar las bandas de referencia.
Fase 4  Analítica, nurturing, calibración con obras reales.
```

Empezá por la Fase 1. Antes de escribir código, proponé el esquema de base de datos y
el catálogo de coeficientes, y esperá aprobación.

## DATOS PENDIENTES — NINGUNO BLOQUEA EL DESARROLLO

La documentación oficial ya resolvió lo esencial: geometría del panel, espesores
frecuentes, K y λ por núcleo, familias y conteo de mallas, dosificación, contraflecha,
desapuntalamiento, rendimientos de montaje, créditos LEED, herramientas y checklist.
Lo que falta se cubre con **valores de referencia** (`03-parametros-tecnicos.md` §13) y
se calibra sobre la marcha.

**Se arranca sin esperar nada.** Lo siguiente mejora la calibración cuando llegue:

| Dato | Cómo se resuelve mientras tanto |
|---|---|
| Consumo real de cemento y arena por m³ | Referencia 340 kg/m³ y 1,05 m³/m³, banda ± 15 % |
| Separación de hierros de espera (30/40 vs 50 cm) | Default 40 cm, parametrizable |
| Si M25 y M30 son la misma pieza | Se cargan como productos distintos; el backoffice unifica |
| Rendimientos reales de elastómeros y terminaciones | Valores de referencia por función, banda ± 25 % |
| Espesores y alturas efectivamente comercializados | Se cargan los frecuentes; el ABM permite el resto |
| Puntales y encofrado por m² de losa | Clase C, coeficiente de referencia editable |

**Sí se necesita antes de salir a producción:**

1. **Lista de precios vigente** con unidades de venta y packs. Sin esto no hay
   presupuesto, solo cómputo.
2. **Política de precios:** ¿públicos en la web o solo vía distribuidor? Define si el
   usuario ve pesos o ve "consultá con tu distribuidor" sobre el mismo cómputo.
3. **Mapa de distribuidores por zona** y costos de flete.
4. **Razón social** que emite los presupuestos (Grupo Estisol / Novapol S.A.).
5. **Manual de marca:** logo, paleta (verde institucional + azul de la documentación),
   tipografías.
6. **CRM** en uso y forma de integración.

**Para calibrar (idealmente antes del lanzamiento, obligatorio en los primeros meses):**

7. **Cómputos de 5-10 obras reales ya ejecutadas.** Es lo que convierte los valores de
   referencia en valores propios de Concrehaus. El backoffice ya trae la pantalla de
   auditoría para hacerlo: se carga el cómputo real, se compara contra el automático y
   se ajustan los coeficientes. Cada obra cargada angosta las bandas.
