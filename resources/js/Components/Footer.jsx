import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  const year = new Date().getFullYear();

  const preventSubmit = (e) => e.preventDefault();

  return (
    <footer className="bg-neutral-900 text-neutral-100 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">La Tienda de los Niños</span>
            </div>
            <p className="mt-4 text-sm text-neutral-300">
              Diseño, calidad y confort para los más chicos. Comprá fácil y seguro.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white/90">Navegación</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={route('welcome')} className="text-neutral-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href={route('catalog.index')} className="text-neutral-300 hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <a href={route('welcome')} className="text-neutral-300 hover:text-white transition-colors">
                  Ubicacion
                </a>
              </li>
              <li>
                <a href={route('welcome')} className="text-neutral-300 hover:text-white transition-colors">
                  Correo
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white/90">Contacto</h4>
            <ul className="mt-4 space-y-2 text-sm text-neutral-300">
              <li>
                <a href="mailto:latiendadelosninios@gmail.com" className="hover:text-white transition-colors">
                  latiendadelosninios@gmail.com
                </a>
              </li>
              <li className="text-neutral-400">
                Lun a Sab 9:00 a 20:00
              </li>
              <li className="text-neutral-400">
                Varela 505, Mariano Acosta, Buenos Aires.
              </li>
              <li className="flex items-center gap-3 pt-2">
                {/* Redes sociales (SVG inline para evitar dependencias) */}
                <a href="https://www.instagram.com/la.tienda.de.los_ninios/" aria-label="Instagram" className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors" target="_blank">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            © {year} La Tienda de los Niños. Todos los derechos reservados.
          </p>
          <p className="text-xs text-neutral-400">
            Sitio desarrollado por{' '}
            <a
              href="https://www.archillimatias.dev"
              className="underline hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              Archilli Matias
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
