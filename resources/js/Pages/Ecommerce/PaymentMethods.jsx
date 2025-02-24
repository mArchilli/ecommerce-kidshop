import React from 'react';

const PaymentMethods = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Métodos de Pago</h2>
      <p className="text-center text-gray-700 mb-6">Aceptamos todas las tarjetas de crédito y débito, PayPal y transferencias bancarias.</p>
      <div className="flex justify-center space-x-4">
        <img src="/path/to/visa.svg" alt="Visa" className="h-12" />
        <img src="/path/to/mastercard.svg" alt="MasterCard" className="h-12" />
        <img src="/path/to/paypal.svg" alt="PayPal" className="h-12" />
        <img src="/path/to/mercadopago.svg" alt="MercadoPago" className="h-12" />
      </div>
    </div>
  );
};

export default PaymentMethods;