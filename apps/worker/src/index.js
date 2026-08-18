/**
 * Worker de procesamiento asíncrono del cotizador Concrehaus.
 *
 * Consume la cola `plano-extraccion` (BullMQ sobre Redis) y, para cada plano
 * subido, corre el pipeline de extracción de geometría descrito en
 * docs/02-prompt-cotizador.md (normalización → escala → extracción con la API
 * de Claude → post-proceso geométrico → panelización).
 *
 * Este archivo es el ESQUELETO del servicio: deja la cola conectada, el health
 * check en pie y el punto de enganche del pipeline marcado con TODO. La lógica
 * de cómputo real (Fase 1 del prompt) se implementa sobre esta base.
 */
import http from 'node:http';
import { Worker, Queue } from 'bullmq';
import IORedis from 'ioredis';
import pg from 'pg';
import { extraerGeometria } from './extraction.js';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://redis:6379';
const DATABASE_URL =
  process.env.DATABASE_URL ??
  'postgres://concrehaus:concrehaus@postgres:5432/concrehaus';
const QUEUE_NAME = 'plano-extraccion';
const HEALTH_PORT = Number(process.env.HEALTH_PORT ?? 3001);

const connection = new IORedis(REDIS_URL, { maxRetriesPerRequest: null });
const pool = new pg.Pool({ connectionString: DATABASE_URL });

// Cola expuesta para que la API encole trabajos (import desde otros módulos).
export const extraccionQueue = new Queue(QUEUE_NAME, { connection });

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    console.log(`[worker] procesando job ${job.id} proyecto=${job.data.proyectoId}`);

    // Pipeline de extracción. Los pasos 1-2 y 5-6 son puntos de enganche que se
    // completan al integrar el storage y el motor de cómputo; el paso 4 (lectura
    // del plano con la API de Claude) ya está implementado en extraction.js.
    //
    //   1. TODO: descargar el plano del storage (S3/MinIO) con URL firmada.
    //   2. TODO: normalizar: PDF → imagen 300dpi | DXF → parseo vectorial.
    //   3-4. Extracción estructurada con la API de Claude (visión) → JSON tipado.
    //   5. TODO: post-proceso geométrico determinístico + panelización (paso 1,20 m).
    //   6. TODO: persistir GeometriaValidada / ExtraccionIA y marcar el proyecto listo.
    const { imageBase64, mediaType, alturaLibreM } = job.data;
    if (!imageBase64) {
      // Sin imagen aún (encolado de prueba): no llamamos a la API.
      return { ok: true, proyectoId: job.data.proyectoId, skipped: 'sin imagen' };
    }

    const geometria = await extraerGeometria(Buffer.from(imageBase64, 'base64'), {
      mediaType,
      alturaLibreM,
    });

    return {
      ok: true,
      proyectoId: job.data.proyectoId,
      geometria,
      procesadoEn: new Date().toISOString(),
    };
  },
  { connection, concurrency: Number(process.env.WORKER_CONCURRENCY ?? 2) }
);

worker.on('completed', (job) => console.log(`[worker] job ${job.id} completado`));
worker.on('failed', (job, err) => console.error(`[worker] job ${job?.id} falló:`, err.message));

// Health endpoint para el HEALTHCHECK de Docker y para NPM.
const server = http.createServer(async (req, res) => {
  if (req.url === '/health') {
    try {
      await connection.ping();
      await pool.query('SELECT 1');
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', service: 'worker' }));
    } catch (e) {
      res.writeHead(503, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ status: 'degraded', error: String(e) }));
    }
    return;
  }
  res.writeHead(404);
  res.end();
});
server.listen(HEALTH_PORT, () => console.log(`[worker] health en :${HEALTH_PORT}`));

async function shutdown(signal) {
  console.log(`[worker] ${signal} recibido, cerrando…`);
  await worker.close();
  await extraccionQueue.close();
  await connection.quit();
  await pool.end();
  server.close(() => process.exit(0));
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
