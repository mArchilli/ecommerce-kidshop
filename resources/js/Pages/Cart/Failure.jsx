import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

const Failure = () => {
  return (
    <EcommerceLayout>
      <Head title="Pago Fallido" />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-6">¡El pago ha fallado!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Lamentamos informarte que tu pago no se pudo completar. Por favor, intenta nuevamente o contáctanos si el problema persiste.
        </p>
        <div className="mt-6">
          <a
            href="/checkout"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
          >
            Intentar Nuevamente
          </a>
          <a
            href="/"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default Failure;