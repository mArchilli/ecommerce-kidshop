import React from 'react';

const Map = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Nuestra Ubicación</h2>
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
          <h3 className="text-2xl font-bold mb-4">Teléfono</h3>
          <p className="text-gray-700 mb-4">+54 9 11 5956-5176</p>
          <h3 className="text-2xl font-bold mb-4">Horario de Atención</h3>
          <p className="text-gray-700 mb-4"><strong>Lunes a Viernes:</strong> 09:00 - 13:00 / 16:00 - 19:30 </p>
          <p className="text-gray-700 mb-4"><strong>Sábado:</strong> 09:00 - 13:00 / 16:00 - 19:30</p>
          <p className="text-gray-700"><strong>Domingo:</strong> Cerrado</p>
        </div>
      </div>
    </div>
  );
};

export default Map;