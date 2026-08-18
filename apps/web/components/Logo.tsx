/**
 * Marca de posición con la forma hexagonal de la identidad Concrehaus.
 * Reemplazar por el archivo oficial (SVG) cuando el cliente lo entregue:
 * basta con sustituir el contenido de este componente.
 */
export function Logo({ className = '', variant = 'color' }: { className?: string; variant?: 'color' | 'white' }) {
  const mark = variant === 'white' ? '#ffffff' : '#3eae49';
  const text = variant === 'white' ? '#ffffff' : '#1f50a3';
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 40 44" className="h-9 w-auto shrink-0" aria-hidden="true">
        <path d="M20 1 38 11v22L20 43 2 33V11z" fill={mark} />
        <path
          d="M25 16.5a8.5 8.5 0 1 0 0 11h-5.2v-3.4H29v2.1a11.9 11.9 0 1 1-1.1-8.2z"
          fill={variant === 'white' ? '#3eae49' : '#ffffff'}
        />
      </svg>
      <span className="font-display text-2xl font-extrabold tracking-tight" style={{ color: text }}>
        Concrehaus
      </span>
    </span>
  );
}
