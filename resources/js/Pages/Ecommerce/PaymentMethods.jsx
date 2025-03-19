import React from 'react';

const PaymentMethods = () => {
  return (
    <div className="bg-black p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Métodos de Pago</h2>
      <p className="text-center text-white mb-6">Aceptamos todas las tarjetas de crédito y débito, PayPal, MercadoPago y transferencias bancarias.</p>
      <div className="flex justify-center space-x-4 mb-6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-12" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-12" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Arcticons-black_mercado_pago.svg/640px-Arcticons-black_mercado_pago.svg.png" alt="MercadoPago" className="h-12" />
      </div>
      <div className="text-white">
        <h3 className="text-2xl font-bold mb-4">MercadoPago</h3>
        <p className="mb-4">Puedes pagar a través de MercadoPago utilizando tarjetas de débito o fondos en tu cuenta de MercadoPago.</p>
        <h3 className="text-2xl font-bold mb-4">Transferencias Bancarias</h3>
        <p className="mb-4">Realiza transferencias bancarias directamente a nuestra cuenta.</p>
        <h3 className="text-2xl font-bold mb-4">Efectivo</h3>
        <p>Puedes pagar en efectivo al momento de la entrega.</p>
      </div>
    </div>
  );
};

export default PaymentMethods;