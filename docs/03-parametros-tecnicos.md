# Parámetros técnicos Concrehaus — fuente de verdad para el motor de cómputo

> Extraído de documentación oficial provista por el cliente:
> **[FL]** Fichas LEED (EPS Isopor y Neotech) · **[DC]** Detalles Constructivos, Versión 2015 ·
> **[IC]** Instructivo de Colocación v1 · **[CL]** Checklist de obra
> Complementado con **[WEB]** fichas públicas de concrehaus.com.
>
> Este archivo es el que se usa para **seedear la tabla `coeficientes_computo`**.
> Cada valor lleva su fuente. Los marcados 🔶 son derivados o discrepantes y deben
> confirmarse con el equipo técnico antes de producción.

## 0. Identidad

- Marca: **Concrehaus®** — "La solución constructiva eficiente".
- Grupo: **Grupo Estisol / Estisol Construcción** (marca comercial). 🔶 La documentación
  legal del checklist responsabiliza a **Novapol S.A.** — confirmar qué razón social
  debe figurar en los presupuestos emitidos por la app. [CL]
- Planta / domicilio: M. L. Anido 1941 (Ruta 25 Km 9), Villa Rosa, Pilar, Bs. As. [DC]
- Contacto: info@concrehaus.com · 0810 333 24752 · www.concrehaus.com [DC]
- Respaldo normativo: **Certificado de Aptitud Técnica (CAT)** y **Certificado
  Sismorresistente**. [CL]

## 1. Geometría del panel — CRÍTICO para la panelización

| Parámetro | Valor | Fuente |
|---|---|---|
| Ancho del **núcleo EPS** | **1,20 m** | [FL] |
| Ancho de **cada malla** | **1,24 m** | [FL] |
| **Ancho total del panel** | **1,28 m** | [FL] |
| Altura | variable según proyecto, hasta 6 m | [WEB] |
| Paso de modulación efectivo | **1,20 m** | derivado |
| Solape malla-malla entre paneles | **0,08 m** (4 cm por lado) | derivado de 1,28 − 1,20 |

> ⚠️ **Consecuencia para el cómputo:** los paneles NO se cuentan con 1,28 m.
> La malla vuela 4 cm de cada lado del núcleo y ese vuelo **se solapa con el panel
> vecino**. El paso de repetición en la pared es de **1,20 m**.
> `paneles = ceil(longitud_pared_ml / 1.20)`, no `/1.28` ni `/1.24`.
> Confundir esto sobreestima ~6,7 % de los paneles.

## 2. Núcleo, espesores y desempeño térmico

| Parámetro | EPS Isopor | Neotech (con grafito) | Fuente |
|---|---|---|---|
| Nomenclatura | PCE | PCN | [FL] |
| Conductividad λ | 0,037 W/m·K | 0,031 W/m·K | [FL] |
| K panel de referencia **PCE08** | **0,41 W/m²K** | **0,35 W/m²K** | [FL] |
| Densidad | Standard | Alta densidad | [FL] |

**Espesores frecuentes de núcleo** [FL]:
- Paredes **exteriores: 8 cm**
- Paredes **interiores: 4–6 cm**

**Acero de las mallas:** alta resistencia, trafilado, **tensión proporcional 550 MPa**. [FL]

## 3. Espesores de concreto proyectado

| Elemento | Espesor | Fuente |
|---|---|---|
| Muro tipo C, núcleo 4 cm | 6 cm de concreto → muro terminado 10 cm | [WEB] |
| Losa tipo F — capa inferior proyectada | ~3 cm | [WEB] |
| Losa tipo F — **capa de compresión** | **≥ 4 cm**, hormigón tradicional, espesor final por verificación de deformaciones | [IC], [WEB] |
| Espesor máximo acumulable por proyección | 7 cm (aunque la 1ª capa sea de 2 cm) | [IC] |

Secuencia de proyección de paredes [IC]:
1. **Primera pasada:** lenta, cargando material, de abajo hacia arriba, a la menor
   distancia posible. Espesor: *hasta esconder la malla*.
2. **Segunda pasada:** apenas la primera "tiró". Espesor: *hasta lo previsto por las fajas*.
3. Terminadas las paredes exteriores → retirar puntales y reglas interiores, colocar
   fajas y repetir del lado interior.
4. Los recintos deben estar limpios **para recoger y reutilizar el material que cae**
   (afecta directamente al coeficiente de rebote).

## 4. Dosificación del concreto proyectado [IC]

> "La dosificación es el aspecto más importante de la proyección y bajo ningún
> concepto debe descuidarse."

| Parámetro | Valor |
|---|---|
| Relación cemento : arena | **1 : 4 en volumen** (llevar a **1 : 3** si la arena es fina al pastón de prueba) |
| Agua | **0,45 l por kg de cemento**, incluyendo la que aporta la arena |
| Fibra de polipropileno ½" | **0,6 kg por m³** |
| Consistencia | debe acumularse **7/8 cm sin caer ni fluir** |
| Curado | evitar el secado; **las primeras 48 h son críticas** |

**Ejemplo oficial, superficies exteriores, tambor de 200 litros:**
agua 180 l · **Sikacrete 3 kg** (plastificante y acelerante) · **Sika1 18 l** (hidrófugo).

🔶 **Derivación pendiente:** de la relación 1:4 en volumen se puede estimar el
consumo de cemento por m³ de concreto proyectado (orden de 300–350 kg/m³), pero el
valor exacto depende del peso específico de la arena disponible. **Pedir a Concrehaus
el consumo real de cemento, arena y aditivos por m² de pared proyectada** — es el
dato que más pesa en el presupuesto de materiales de obra.

## 5. Mallas de refuerzo

| Tipo | Medidas | Uso | Fuente |
|---|---|---|---|
| Angular **M15** | 185×185×1230 mm | Encuentros en ángulo — **uso estándar** | [DC], [WEB] |
| Angular **M25** | — | **Reemplaza a M15 cuando el espesor de pared > 10 cm** | [DC] |
| Angular M30 | 300×300×1230 mm | Refuerzo mayor | [WEB] |
| Plana ("solapa") | 225×1230 y 300×1230 mm | Juntas entre paneles, aberturas, discontinuidades | [IC], [WEB] |
| Malla U | 195×195×1230 mm | Aleros, bordes de muro, parapetos | [WEB] |

**Regla de conteo que surge de los detalles constructivos** [DC]:

| Encuentro | Mallas angulares |
|---|---|
| Unión pared-pared en **L** | **2 M15** (una por cara del ángulo) |
| Unión pared-pared en **T** | **2 M15** (una a cada lado del alma) |
| Unión **losa-pared** | **2 M15** (superior e inferior del panel de losa) |

→ Regla general: **2 mallas angulares por metro lineal de encuentro**, sea L, T o losa-pared.
Con módulo de 1,23 m: `unidades = ceil(ml_encuentro / 1.23) × 2`.

Otras reglas de montaje [IC]:
- Colocar malla angular en **todos** los encuentros de paneles.
- **Malla solapa** en cada junta panel-panel.
- **Mallas planas en los vértices de las aberturas** — 4 por abertura (una por esquina).
- Atado o grapado: **un campo de cada cuatro**.

## 6. Vinculación con la fundación

🔶 **Las tres fuentes discrepan.** Debe resolverse antes de producción — impacta
directamente en el conteo de hierros:

| Fuente | Diámetro | Longitud | Separación |
|---|---|---|---|
| Instructivo de Colocación v1 [IC] | Ø 6 | sobresale 30 cm | **cada 30/40 cm** |
| Detalles Constructivos 2015 [DC] | — | **L = 30 + 12 cm** | **SEP = 50 cm** |
| Ficha Panel de Cerramiento [WEB] | Ø 6 | anclaje 10–12 cm, sobresale 30 cm | cada 40/50 cm |

Otros criterios [IC]:
- Colocarlos **de un solo lado del panel**.
- Alternativas de colocación: **lineal** o **intercalados**.
- Excepto cuando la documentación estructural indique otra cosa.

**Default propuesto para el motor:** Ø6, L = 42 cm (30 sobresaliente + 12 anclados),
separación 40 cm, un solo lado — como parámetro editable, no hardcodeado.

## 7. Losas y cubiertas

| Parámetro | Valor | Fuente |
|---|---|---|
| **Contraflecha** | **7 mm por cada metro de distancia al apoyo** | [IC] |
| Capa de compresión | hormigón tradicional, mínimo 4 cm | [IC] |
| **Desapuntalamiento** | **mínimo 14 días**, según plan | [IC] |
| Previo a desapuntalar | completar la capa de concreto inferior | [IC] |
| Primera pasada inferior | apenas cubriendo la malla, **rigidizadora** (vincula malla y panel) | [IC] |
| Mallas angulares inferiores de borde | colocar con hilo y nivel | [IC] |

**Modos de montaje de losa** [IC]:
- **Tabique continuo** — verificar el correcto llenado de continuidad.
- **A tope** — requiere luego "quemar" el panel para dar continuidad a la proyección interior.

Detalles resueltos en la documentación [IC], [DC]: unión losa de entrepiso con muro
interior pasante, con muro exterior, y unión losa de cubierta inclinada con tabique exterior.

## 8. Montaje de paredes — alternativas [IC]

| Método | Descripción |
|---|---|
| **Panel a panel** | Comenzar por una esquina, continuar en los dos sentidos, completar recintos cerrados sucesivamente para minimizar puntales |
| **Pared guía** | Iniciar en una pared larga; al llegar a cada perpendicular colocar el primer panel para sostenerla |
| **Armado en el piso** | Armar sobre superficie plana → unir paneles → cortar vanos → colocar reglas → dar vuelta → uniones y fajas del otro lado → izar, aplomar y fijar |

Constante en los tres: **Línea + Plomo + Escuadra** siempre bajo control.
Se combinan paneles enteros con **paneles recortados**, lo que confirma que el
desperdicio por recorte es real y debe modelarse.

**Aberturas** [IC]: llenar bien los marcos, mallas planas en los vértices, fijar los
marcos con una cucharada de concreto por fijación o atando con alambre, asegurar
estanqueidad, escuadra y verticalidad. Los marcos de chapa de puertas interiores
conviene colocarlos antes de proyectar y usarlos **como fajas**.

## 9. Herramientas y equipos de obra [CL]

Insumo directo para una salida adicional de la app ("qué necesito tener en obra"):

**Indispensables:** tenazas de armador, cortapernos, escaleras, plomadas de 1 kg,
tanza de color, sierra zapallera, cintas métricas, alambre, carretillas, palas anchas,
baldes, cucharas, fratachos, fieltros, andamios, tablones, tirantes, puntales
telescópicos o de madera 3×3, tablas, martillos, clavos, mazas, cepillos de alambre,
niveles de mano y de manguera, chalk-lines, tambores de 200 litros, caballetes,
tablero eléctrico de obra con protecciones, cables de prolongación.

**Específicas:** pistolas de aire caliente, amoladora con discos, rotopercutora con
mechas, revocadora manual o bomba continua con mangueras y acoples probados,
compresor de aire, máquinas mezcladoras, pistolas grapadoras con cartuchos.

**Auxiliares:** tubos estructurales metálicos 20×40, reglas de corte de 2 m para regleado.

## 10. Checklist de obra — 9 etapas [CL]

Estructura reutilizable como entregable de la app:

1. Antes del inicio — Generales (permisos, seguros, ART, higiene y seguridad, reglamentos locales)
2. Antes del inicio — Específicos (equipos, documentación técnica, puntos fijos de nivelación,
   **análisis de planos de montaje y panelización**, programa de obra, visado estructural)
3. Trabajos preliminares (movimiento de suelos, acopio, obrador, cerco, agua, electricidad, desagües)
4. Antes de armar la platea / Después de armar / Después de colar
5. Antes del montaje (cuadrillas, **paneles contados e identificados**, plano de panelización,
   plano de refuerzos, marcos/premarcos)
6. Durante el montaje (replanteo, líneas, plomos, fajas, apuntalamiento, ataduras, mallas)
7. Después del montaje (instalaciones bajo revoques, pases, chequeos finales)
8. Antes / durante la proyección (calidad de arena, dosificación, **control de avance vs. consumos**,
   curado, recaudos por sol, viento seco, frío o heladas)
9. Antes / durante / después del montaje y colado de losa (contraflechas, refuerzos, deflexiones,
   desapuntalamiento)

## 11. Créditos LEED v3 2009 [FL]

| Crédito | Puntos | Requisito |
|---|---|---|
| **EAp2** — Desempeño Energético Mínimo | Prerrequisito | Mejora ≥ 10 % sobre Apéndice G ASHRAE 90.1-2007 |
| **EAc1** — Desempeño Energético Mejorado | **1–19 puntos** | Mejora sobre el prerrequisito EAp2 |
| **MRc5** — Materiales Regionales | **2 puntos** | Materiales extraídos y fabricados **hasta 800 km de la obra** |

Aplicables a N+C, C+S, Schools, C+I, Healthcare & Retail, O+M.

> 💡 **MRc5 es computable automáticamente:** la app ya conoce la ubicación del proyecto
> y la planta está en Villa Rosa, Pilar. Distancia < 800 km → el crédito aplica.
> Es un argumento de venta fuerte para desarrolladores y obra corporativa.

## 12. Lenguaje legal de la documentación oficial [DC]

Modelo para el disclaimer del presupuesto:

> "Todas las indicaciones suministradas deben considerarse meramente indicativas y no
> vinculantes en términos legales. […] El instalador deberá asegurarse siempre de que
> el producto sea el apropiado para su uso específico y asumir toda la responsabilidad
> que derive de su utilización; además deberá atenerse a todos los modos de empleo y a
> las normas de utilización reconducibles en general a la 'regla del arte'."

Y del checklist [CL]: los listados "no constituyen la asunción de responsabilidad
alguna en cada obra en particular, más allá de las contenidas en el Certificado de
Aptitud Técnica", quedando "a criterio y responsabilidad de cada constructor".

---

# 13. Valores de referencia para insumos de mercado

> **Criterio adoptado:** el cotizador es una herramienta comercial, no un cómputo de
> obra. Los insumos que dependen de la arena, el cemento y los aditivos disponibles en
> cada plaza **no se pueden determinar con exactitud desde un plano** — y no hace falta.
> Se usan **valores de referencia con banda declarada**, calibrables desde el backoffice.
>
> Los valores de esta sección son **derivados**, no oficiales. Están calculados a partir
> de la dosificación oficial (1:4 en volumen, agua 0,45 l/kg de cemento) con densidades
> aparentes de mercado. Sirven para arrancar; se recalibran contra obras reales.

## 13.1 Las tres clases de dato

El motor clasifica cada ítem del cómputo y de ahí sale la banda del presupuesto:

| Clase | Qué incluye | Precisión | Banda |
|---|---|---|---|
| **A — Exacto** | Paneles, mallas angulares / planas / U, hierros de espera. Se derivan de la geometría y de reglas fijas de la documentación oficial. | Alta | **± 5 %** |
| **B — Referencia** | Concreto proyectado y sus insumos: cemento, arena, agua, fibra, aditivos. Dependen del material de cada plaza. | Media | **± 15 %** |
| **C — Indicativo** | Terminaciones, revestimientos elastoméricos, mano de obra, puntales y encofrados. Dependen del proyecto y del equipo. | Baja | **± 25 %** |

**Banda total del presupuesto** = promedio ponderado por el peso en $ de cada clase.
Se muestra al usuario como un rango, y el desglose indica de qué clase es cada rubro.

> Los productos Concrehaus (lo que la empresa efectivamente vende) son casi todos
> **Clase A**. Eso permite decir con honestidad: *"el material Concrehaus está computado
> con precisión; los insumos de obra son estimativos y varían según el proveedor de tu zona"*.
> Es un mensaje que genera confianza en vez de restarla.

## 13.2 Concreto proyectado — rendimientos de referencia

Base: dosificación oficial **1:4 en volumen**, agua **0,45 l/kg de cemento**.
Densidades aparentes usadas: cemento suelto ~1.200 kg/m³, arena suelta ~1.500 kg/m³.

| Insumo | Valor de referencia | Rango esperable | Nota |
|---|---|---|---|
| Cemento | **340 kg / m³** de concreto | 300 – 380 | ≈ 7 bolsas de 50 kg por m³ |
| Arena | **1,05 m³ / m³** de concreto | 1,00 – 1,15 | la arena aporta casi todo el volumen |
| Agua | **155 l / m³** | 140 – 175 | = cemento × 0,45; descontar humedad de la arena |
| Fibra de polipropileno ½" | **0,6 kg / m³** | — | 🟢 valor **oficial**, no de referencia |
| Plastificante/acelerante (tipo Sikacrete) | **2,5 kg / m³** | 2,0 – 3,5 | derivado del ejemplo oficial: 3 kg / 200 l de mezcla |
| Hidrófugo (tipo Sika1) | **15 l / m³** | 12 – 20 | derivado del ejemplo oficial: 18 l / 200 l ≈ 10 % del agua |
| Rebote neto | **15 %** | 10 – 25 | la documentación indica **recoger y reutilizar** el material caído; por eso es menor al 25 % habitual en proyección |

### Anclas por m² de pared (para sanity-check y para mostrar al usuario)

Con 6 cm de concreto total (≈ 3 cm por cara) y 15 % de rebote:

| Por m² de pared proyectada (dos caras) | Referencia |
|---|---|
| Concreto | **0,069 m³** |
| Cemento | **≈ 23,5 kg** → *aproximadamente media bolsa de 50 kg por m²* |
| Arena | **≈ 0,072 m³** |
| Agua | **≈ 10,6 l** |

> "Media bolsa de cemento por metro cuadrado de pared" es una regla mental fácil de
> comunicar y de verificar con cualquier constructor. Sirve como control de que el
> motor no se fue de escala.

## 13.3 Aditivos y elastómeros — criterio brand-agnostic

El mercado ofrece muchas marcas equivalentes. El motor **no cotiza una marca**: cotiza
una **función** y toma el precio de referencia del producto que Concrehaus o el
distribuidor tengan cargado en la lista.

| Función | Unidad de cómputo | Rendimiento de referencia | Rango |
|---|---|---|---|
| Plastificante / acelerante | kg por m³ de concreto | 2,5 | 2,0 – 3,5 |
| Hidrófugo de masa | l por m³ de concreto | 15 | 12 – 20 |
| **Revestimiento elastomérico** de terminación exterior | l por m² de fachada | **1,0** (dos manos) | 0,7 – 1,4 |
| Sellador elastomérico de juntas y encuentros | l por ml de junta | 0,15 | 0,10 – 0,25 |
| Fijador / imprimación previa | l por m² | 0,15 | 0,10 – 0,25 |

**Implementación:** cada función es un `TipoInsumo` con rendimiento editable y una lista
de productos equivalentes asociados. El usuario ve "revestimiento elastomérico exterior:
~85 litros"; el backoffice decide qué producto y qué precio se usa. Si el distribuidor
de la zona trabaja otra marca, se cambia el producto sin tocar el cómputo.

## 13.4 Qué NO se estima

Se declara explícitamente fuera de alcance, para no inflar falsas expectativas:

- Fundaciones y platea (dependen del estudio de suelos).
- Instalaciones sanitarias, eléctricas y de gas.
- Carpinterías y vidrios.
- Movimiento de suelos y trabajos preliminares.
- Honorarios profesionales, dirección técnica y trámites municipales.

Se listan en el presupuesto como **"no incluido"** con un CTA para cotizarlos aparte:
es una oportunidad de venta, no un vacío.
