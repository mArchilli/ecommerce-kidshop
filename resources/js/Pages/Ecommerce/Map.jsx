import React from 'react';

const Map = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Nuestra Ubicación</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086509374878!2d144.9630583153167!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b6f3b1b1b1!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611816751234!5m2!1sen!2sau"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">Dirección</h3>
          <p className="text-gray-700 mb-4">Federation Square, Melbourne VIC 3000, Australia</p>
          <h3 className="text-2xl font-bold mb-4">Teléfono</h3>
          <p className="text-gray-700">+61 3 9655 1900</p>
        </div>
      </div>
    </div>
  );
};

export default Map;