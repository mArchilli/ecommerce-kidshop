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
            

            {/* <a
              href="https://wa.me/5491133973222?text=Hola,%20quiero%20hacer%20una%20consulta%20sobre%20sus%20productos."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-md transition"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.1 1.6 5.89L0 24l6.3-1.65A11.95 11.95 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22.03a10 10 0 01-5.1-1.4l-.36-.21-3.74.98.99-3.65-.24-.37A10 10 0 1122.03 12 10.03 10.03 0 0112 22.03zm5.6-7.53c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.08-.8.38-.27.3-1.05 1.02-1.05 2.5 0 1.48 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35z" />
              </svg>
              Contactar por WhatsApp
            </a> */}

            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Horario de Atención</h4>
              <ul className="space-y-1 text-gray-700">
                <li>
                  <strong>Lunes a Viernes:</strong> 09:00 - 13:00 / 16:00 - 19:30
                </li>
                <li>
                  <strong>Sábado:</strong> 09:00 - 13:00 / 16:00 - 19:30
                </li>
                <li>
                  <strong>Domingo:</strong> Cerrado
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