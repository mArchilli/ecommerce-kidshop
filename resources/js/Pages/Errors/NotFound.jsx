import React from 'react';

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden selection:bg-sky-600/20 selection:text-sky-700"
      role="main"
      aria-labelledby="notfound-title"
    >
      {/* Fondo con degradado y textura */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-sky-950" />
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_25%_25%,rgba(14,165,233,.18),transparent_60%),radial-gradient(circle_at_75%_75%,rgba(236,72,153,.16),transparent_55%)]" />
      {/* Ajuste leve del grid para combinar */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,rgba(0,0,0,.05)_1px,transparent_1px),linear-gradient(rgba(0,0,0,.05)_1px,transparent_1px)] bg-[size:54px_54px]" />

      {/* Contenido */}
      <div className="relative mx-auto w-full max-w-xl px-6">
        <div className="group rounded-2xl border border-white/50 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl shadow-[0_8px_30px_rgb(0_0_0/0.06)] p-10 text-center">
          <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-sky-500 to-pink-500 text-white shadow-lg shadow-sky-500/25 ring-8 ring-white/50 dark:ring-white/10">
            <span className="text-4xl font-bold tracking-tight animate-pulse">404</span>
          </div>

          <h1
            id="notfound-title"
            className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-pink-600 to-sky-600"
          >
            Página no encontrada
          </h1>

            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              La ruta que intentas abrir no existe, fue movida o temporalmente no está disponible.
            </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow transition
              hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 focus-visible:ring-offset-2 active:scale-[.97]"
            >
              Volver al inicio
            </a>
            <a
              href="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 focus-visible:ring-offset-2 active:scale-[.97]"
            >
              Contacto
            </a>
          </div>

          <div className="mt-8 text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Código de error: 404_NOT_FOUND
          </div>
        </div>

        {/* Decoración inferior */}
        <div className="mt-10 flex justify-center">
          <div className="h-2 w-40 rounded-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent blur-md" />
        </div>
      </div>
    </div>
  );
}
