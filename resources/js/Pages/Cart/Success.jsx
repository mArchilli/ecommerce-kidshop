import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

const Success = ({ cart, user }) => {
  return (
    <EcommerceLayout>
      <Head title="Pago Exitoso" />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-green-600 mb-6">¡Pago Exitoso!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Gracias por tu compra, <span className="font-bold">{user.name}</span>. Nos pondremos en contacto contigo pronto para coordinar la entrega de tus productos.
        </p>

        <div className="mt-6 text-center">
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

export default Success;