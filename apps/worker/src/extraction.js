/**
 * Extracción de geometría del plano con la API de Claude (visión).
 *
 * Toma la imagen normalizada de un plano de planta y devuelve la geometría
 * estructurada (muros, aberturas, losas, escala) siguiendo el schema descrito
 * en docs/02-parametros-tecnicos.md y docs/02-prompt-cotizador.md.
 *
 * El resultado NO se muestra al cliente sin pasar por la pantalla de validación:
 * este módulo solo produce el borrador que el usuario confirma o corrige.
 */
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { z } from 'zod';

// El cliente resuelve la credencial de ANTHROPIC_API_KEY del entorno.
const client = new Anthropic();

// Modelo configurable; por defecto el más capaz para lectura de planos.
const MODEL = process.env.EXTRACTION_MODEL ?? 'claude-opus-5';

// --- Schema de salida (espejo del JSON tipado de la spec) --------------------
const Punto = z.tuple([z.number(), z.number()]);

const Muro = z.object({
  id: z.string(),
  tipo: z.enum(['exterior', 'interior', 'divisorio']),
  p1: Punto,
  p2: Punto,
  longitud_m: z.number(),
  espesor_cm: z.number(),
  confianza: z.number(),
});

const Abertura = z.object({
  id: z.string(),
  tipo: z.enum(['puerta', 'ventana', 'paso']),
  muro_id: z.string(),
  ancho_m: z.number(),
  alto_m: z.number(),
  confianza: z.number(),
});

const Losa = z.object({
  id: z.string(),
  superficie_m2: z.number(),
  tipo: z.enum(['entrepiso', 'cubierta']),
});

const Nivel = z.object({
  nombre: z.string(),
  altura_libre_m: z.number(),
  muros: z.array(Muro),
  aberturas: z.array(Abertura),
  ambientes: z.array(z.object({ nombre: z.string(), superficie_m2: z.number() })),
  losas: z.array(Losa),
});

export const GeometriaSchema = z.object({
  confianza_global: z.number(),
  escala: z.object({
    valor: z.string(),
    px_por_metro: z.number(),
    confianza: z.number(),
    metodo: z.enum(['texto', 'cota', 'referencia', 'desconocido']),
  }),
  niveles: z.array(Nivel),
  totales: z.object({
    superficie_cubierta_m2: z.number(),
    ml_muro_exterior: z.number(),
    ml_muro_interior: z.number(),
  }),
  advertencias: z.array(z.string()),
});

const SYSTEM = `Sos un asistente técnico que lee planos de planta de viviendas para
el sistema constructivo Concrehaus (paneles de EPS y hormigón proyectado).

Tu tarea es extraer la geometría del plano en JSON estructurado. Reglas:
- Detectá la escala primero (indicación textual "Esc. 1:50", cotas acotadas o
  elementos de referencia como una puerta de 0,80 m). Si no podés determinarla con
  confianza, poné escala.confianza baja y agregá una advertencia — NUNCA inventes
  una escala en silencio: un error de escala arruina todo el presupuesto.
- Clasificá cada muro como exterior, interior o divisorio.
- Estimá el espesor de cada muro en cm a partir del dibujo.
- Registrá aberturas (puertas, ventanas, pasos) con su ancho y alto.
- Para cada elemento, poné un valor de confianza entre 0 y 1.
- Si algo es ilegible o dudoso, bajá la confianza y sumá una advertencia en lugar
  de adivinar. Es preferible una corrección humana a un dato falso.
- No completes campos que el plano no permita determinar: usá 0 y confianza baja.`;

/**
 * @param {Buffer} imageBuffer  imagen del plano ya normalizada (PNG/JPEG).
 * @param {object} contexto     datos del proyecto que ayudan a la lectura.
 * @param {string} [contexto.mediaType='image/png']
 * @param {number} [contexto.alturaLibreM]  altura libre declarada por el usuario.
 * @returns {Promise<z.infer<typeof GeometriaSchema>>}
 */
export async function extraerGeometria(imageBuffer, contexto = {}) {
  const mediaType = contexto.mediaType ?? 'image/png';
  const pista = contexto.alturaLibreM
    ? `El usuario declaró una altura libre de ${contexto.alturaLibreM} m.`
    : 'El usuario no declaró altura libre; usá 2,60 m como referencia.';

  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    system: SYSTEM,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: imageBuffer.toString('base64'),
            },
          },
          {
            type: 'text',
            text: `Extraé la geometría de este plano de planta. ${pista}`,
          },
        ],
      },
    ],
    output_config: {
      format: zodOutputFormat(GeometriaSchema, 'geometria_plano'),
    },
  });

  if (!response.parsed_output) {
    throw new Error('La extracción no devolvió una geometría válida');
  }
  return response.parsed_output;
}
