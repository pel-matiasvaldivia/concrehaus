/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  // La app corre detrás de Nginx Proxy Manager: confiar en los headers X-Forwarded-*
  // Detrás de un reverse proxy (NPM) el Host difiere del origen interno.
  // Se declaran los dominios habilitados para Server Actions vía env.
  experimental: {
    serverActions: {
      allowedOrigins: (process.env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean),
    },
  },
};
export default nextConfig;
