import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

const Pending = () => {
  return (
    <EcommerceLayout>
      <Head title="Pago Pendiente" />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-6">¡Pago Pendiente!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Tu pago está siendo procesado. Te notificaremos tan pronto como se confirme. Gracias por tu paciencia.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default Pending;