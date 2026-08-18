# Cotizador Concrehaus

Aplicación web para cotizar los materiales de una vivienda construida con el
sistema Concrehaus a partir del plano de planta. Ver la especificación completa
en [`docs/`](docs/):

- [`docs/01-analisis-concrehaus.md`](docs/01-analisis-concrehaus.md) — análisis del sitio y del sistema
- [`docs/02-prompt-cotizador.md`](docs/02-prompt-cotizador.md) — especificación funcional del cotizador y del portal comercial
- [`docs/03-parametros-tecnicos.md`](docs/03-parametros-tecnicos.md) — coeficientes de cómputo con su fuente oficial

## Arquitectura del stack

Pensado para correr en un **VPS propio detrás de Nginx Proxy Manager (NPM)**.

```
Internet ──▶ Nginx Proxy Manager (TLS)
                     │  red docker externa "npm"
                     ▼
              ┌──────────────┐
              │  web (Next)  │  landing + cotizador + portal comercial
              └──────┬───────┘
                     │  red interna
   ┌─────────────────┼─────────────────┬────────────┐
   ▼                 ▼                 ▼            ▼
postgres           redis            minio       worker
(datos)         (cola jobs)     (planos S3)   (extracción IA)
```

| Servicio | Imagen | Rol |
|---|---|---|
| `web` | `ghcr.io/.../web` (Next.js 16, standalone) | Landing, cotizador y portal comercial |
| `worker` | `ghcr.io/.../worker` (Node + BullMQ) | Procesa la extracción de geometría de los planos |
| `postgres` | `postgres:17-alpine` | Base de datos |
| `redis` | `redis:7-alpine` | Cola de trabajos |
| `minio` | `minio/minio` | Storage S3 de planos (privados) |

Solo `web` (y opcionalmente la consola de MinIO) se enlazan a la red `npm`;
el resto queda en la red interna, sin exposición a Internet.

## Puesta en marcha en el VPS

Las imágenes las publica GitHub Actions en GHCR: en el servidor no se compila
nada, solo se tira `pull` y se levanta.

```bash
# 1. Red externa que comparte con Nginx Proxy Manager (una sola vez)
docker network create npm    # si NPM ya la creó, omitir

# 2. Configurar secretos
cp .env.example .env
nano .env                     # completar passwords, dominio y ANTHROPIC_API_KEY

# 3. Autenticarse en GHCR
#    Los paquetes de GHCR son PRIVADOS por defecto, aun en repos públicos.
#    Opción A (recomendada): en GitHub → repo → Packages → cada paquete
#      (web y worker) → Package settings → Change visibility → Public.
#      Así el `docker compose pull` funciona sin login.
#    Opción B: mantenerlos privados y autenticarse con un PAT (read:packages):
echo $GHCR_TOKEN | docker login ghcr.io -u <usuario> --password-stdin

# 4. Levantar
docker compose pull
docker compose up -d
```

> **Tag por defecto (`latest`).** El workflow publica `latest` desde `main`
> y desde la rama de despliegue activa. Si desplegás otra rama o un tag `vX`,
> fijá `TAG=` en el `.env` con el nombre exacto de la imagen publicada
> (p. ej. `TAG=claude-concrehaus-material-quoter-js4pqx` o `TAG=v1.0.0`).
> Un `manifest unknown` casi siempre significa que ese `TAG` no existe en GHCR
> o que el paquete es privado y falta el `docker login`.

Luego, en **Nginx Proxy Manager**, crear un Proxy Host apuntando a
`web:3000` (Scheme `http`), dentro de la red `npm`, con el certificado del
dominio elegido. Activar *Websockets Support* y *Block Common Exploits*.

### Actualizar a una versión nueva

```bash
docker compose pull && docker compose up -d
```

### Buildear localmente (sin GHCR)

```bash
docker network create npm || true
cp .env.example .env
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

## Health checks

| Servicio | Endpoint |
|---|---|
| `web` | `GET /api/health` |
| `worker` | `GET :3001/health` (solo red interna) |

Todos los contenedores declaran `HEALTHCHECK`, de modo que `docker compose ps`
muestra el estado real de cada uno.

## CI/CD

- **`.github/workflows/ci.yml`** — en cada push/PR: compila el frontend, chequea
  tipos y valida el `docker-compose`.
- **`.github/workflows/build-images.yml`** — en push a `main`, ramas `claude/**`
  y tags `v*`: construye las imágenes de `web` y `worker` y las publica en GHCR
  con caché de capas. Las etiqueta con `latest` (solo `main`), el nombre de rama,
  el tag y el SHA corto.

## Desarrollo local del frontend

```bash
cd apps/web
npm install
npm run dev        # http://localhost:3000
```

## Estado

Este repositorio contiene la **landing + el scaffolding del stack** listo para
desplegar. El motor de cómputo, la extracción de planos con la API de Claude y
el portal comercial se implementan sobre esta base siguiendo las fases descritas
en `docs/02-prompt-cotizador.md`. Los puntos de enganche están marcados con
`TODO` en `apps/worker/src/index.js`.
