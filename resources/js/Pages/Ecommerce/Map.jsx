import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow border overflow-hidden h-full flex flex-col">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-4 flex items-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 8c0 7-7.5 12-7.5 12S4.5 15 4.5 8a7.5 7.5 0 1115 0z" />
          </svg>
          <h2 className="text-xl font-semibold">Ubicación</h2>
        </div>

        {/* Contenido simplificado a una columna */}
        <div className="p-6 space-y-6">
          {/* Mapa */}
          <div className="rounded-xl overflow-hidden ring-1 ring-gray-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.3260661711174!2d-58.793128125205726!3d-34.72217456376213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bceb1b0c421815%3A0xa8a92bf5409faca!2sVarela%20505%2C%20B1723%20Mariano%20Acosta%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1742302263118!5m2!1ses-419!2sar"
              className="w-full h-64 sm:h-80 lg:h-[420px]"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>

          {/* Info y CTA */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-gray-900">Visítanos</h3>
            <p className="text-gray-700 mb-4">
              Acércate a nuestro local para conocer todas nuestras prendas.
            </p>

              <div>
                <span className="text-lg font-semibold mb-2 text-gray-900"><strong>Dirección</strong></span>
                <p className="text-gray-800 font-medium">Varela 505, Mariano Acosta, Buenos Aires</p>
              </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Horario de Atención</h4>
              <ul className="space-y-1 text-gray-700">
                <li>
                  <strong>Lunes a Sabados:</strong> 09:00 hs - 20:00 hs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;