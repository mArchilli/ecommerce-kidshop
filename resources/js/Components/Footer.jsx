import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  const year = new Date().getFullYear();

  const preventSubmit = (e) => e.preventDefault();

  return (
    <footer className="bg-cyan-50 border-t-4 border-gradient-to-r from-cyan-400 to-pink-400">
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Marca con Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo.png" 
                alt="La Tienda de los Niños" 
                className="h-16 w-auto rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent">
                La Tienda de los Niños
              </h3>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                Venta mayorista y minorista para niños.
              </p>
            </div>
          </div>

          {/* Navegación */}
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border-2 border-pink-300">
            <h4 className="text-sm font-bold tracking-wide text-cyan-600 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-cyan-500 to-pink-500 rounded-full"></span>
              Navegación
            </h4>
            <ul className="space-y-3 text-base">
              <li>
                <Link 
                  href={route('welcome')} 
                  className="text-gray-700 hover:text-pink-600 transition-all duration-200 font-semibold hover:translate-x-1 inline-block py-1"
                >
                  🏠 Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href={route('catalog.index')} 
                  className="text-gray-700 hover:text-pink-600 transition-all duration-200 font-semibold hover:translate-x-1 inline-block py-1"
                >
                  👕 Catálogo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border-2 border-pink-300">
            <h4 className="text-sm font-bold tracking-wide text-pink-600 mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-pink-500 to-cyan-500 rounded-full"></span>
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="mailto:latiendadelosninios@gmail.com" 
                  className="text-gray-700 hover:text-cyan-600 transition-colors font-medium break-all"
                >
                  📧 latiendadelosninios@gmail.com
                </a>
              </li>
              <li className="text-gray-600 flex items-start gap-2">
                <span>🕐</span>
                <span>Lun a Sab 9:00 a 20:00</span>
              </li>
              <li className="pt-3 flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://www.instagram.com/la.tienda.de.los_ninios/" 
                  aria-label="Instagram" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-300 transform hover:scale-105 shadow-md"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                  <span className="text-sm font-semibold">Seguinos</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@la.tienda.de.los_ninios" 
                  aria-label="TikTok" 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white transition-all duration-300 transform hover:scale-105 shadow-md"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  <span className="text-sm font-semibold">TikTok</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t-2 border-white/50 bg-cyan-50">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600 font-medium">
            © {year} La Tienda de los Niños. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-600">
            Sitio desarrollado por{' '}
            <a
              href="https://www.archillimatias.dev"
              className="font-semibold text-cyan-600 hover:text-pink-600 transition-colors underline decoration-dotted"
              target="_blank"
              rel="noreferrer"
            >
              Archilli Matias
            </a>
            {' y '}
            <a
              href="https://leoncomolli.github.io/portfolio/"
              className="font-semibold text-pink-600 hover:text-cyan-600 transition-colors underline decoration-dotted"
              target="_blank"
              rel="noreferrer"
            >
              Leon Comolli
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
