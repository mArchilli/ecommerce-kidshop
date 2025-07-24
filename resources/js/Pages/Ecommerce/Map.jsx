import React from 'react';

const Map = () => {
  return (
    <div className="p-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center py-6">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Ubicación</h2>
          <p className="mt-4 text-lg text-gray-500">
            Acércate a nuestro local para conocer todas nuestras prendas.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.3260661711174!2d-58.793128125205726!3d-34.72217456376213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bceb1b0c421815%3A0xa8a92bf5409faca!2sVarela%20505%2C%20B1723%20Mariano%20Acosta%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1742302263118!5m2!1ses-419!2sar"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">Dirección</h3>
            <p className="text-gray-700 mb-4">Varela 505, Mariano Acosta, Buenos Aires</p>
            <h3 className="text-2xl font-bold">Teléfono</h3>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mb-4">
              <div>
                
                <p className="text-gray-700">+54 9 11 5956-5176</p>
              </div>
              <a
                href="https://wa.me/5491133973222?text=Hola,%20quiero%20hacer%20una%20consulta%20sobre%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 lg:mt-0 lg:w-auto w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 text-center"
              >
                Contactar por WhatsApp
              </a>
            </div>
            <h3 className="text-2xl font-bold mb-4">Horario de Atención</h3>
            <p className="text-gray-700 mb-4">
              <strong>Lunes a Viernes:</strong> 09:00 - 13:00 / 16:00 - 19:30
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Sábado:</strong> 09:00 - 13:00 / 16:00 - 19:30
            </p>
            <p className="text-gray-700">
              <strong>Domingo:</strong> Cerrado
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;