'use client';

import { useCallback, useRef, useState } from 'react';

const ACCEPT = '.pdf,.jpg,.jpeg,.png,.dxf';
const MAX_MB = 25;

export function UploadCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const take = useCallback((f: File | undefined) => {
    if (!f) return;
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`El archivo supera los ${MAX_MB} MB.`);
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
  }, []);

  return (
    <div className="rounded-3xl bg-white p-2 shadow-xl shadow-ch-blue/10 ring-1 ring-ch-gray/70">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          take(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
        }}
        className={`cursor-pointer rounded-[1.35rem] border-2 border-dashed px-6 py-12 text-center transition ${
          drag ? 'border-ch-green bg-ch-green-soft' : 'border-ch-gray bg-ch-gray-soft/60 hover:border-ch-green-light'
        }`}
      >
        <svg viewBox="0 0 24 24" className="mx-auto h-12 w-12 text-ch-green" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 16V4m0 0L8 8m4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" />
        </svg>

        {file ? (
          <>
            <p className="mt-4 font-display text-lg font-bold text-ch-blue">{file.name}</p>
            <p className="mt-1 text-sm text-ch-blue/60">
              {(file.size / 1024 / 1024).toFixed(1)} MB · listo para procesar
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 font-display text-lg font-bold text-ch-blue">
              Arrastrá el plano acá
            </p>
            <p className="mt-1 text-sm text-ch-blue/60">
              o tocá para elegirlo · sacá una foto desde el celular
            </p>
          </>
        )}

        <p className="mt-4 text-xs text-ch-blue/45">
          PDF, JPG, PNG o DXF · hasta {MAX_MB} MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => take(e.target.files?.[0] ?? undefined)}
        />
      </div>

      {error && (
        <p role="alert" className="px-4 pt-3 text-center text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      <div className="px-4 pb-3 pt-4">
        <button
          type="button"
          disabled={!file}
          className="w-full rounded-full bg-ch-green px-6 py-3.5 font-display text-base font-bold text-white shadow-sm transition hover:bg-ch-green-dark disabled:cursor-not-allowed disabled:bg-ch-gray disabled:text-white/80"
        >
          Calcular mis materiales
        </button>
        <p className="mt-3 text-center text-xs text-ch-blue/50">
          Sin registro. El correo se pide recién al final, para enviarte el detalle.
        </p>
      </div>
    </div>
  );
}
