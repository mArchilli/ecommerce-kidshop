import React, { useEffect, useState } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

const Payment = ({ cart, preferenceId }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    console.log('Cargando script de MercadoPago...');
    console.log('Preference ID:', preferenceId);
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      console.log('SDK cargada:', !!window.MercadoPago);
      setSdkLoaded(true); // Marca que el SDK está cargado
    };

    script.onerror = () => {
      console.error('Error al cargar el SDK de MercadoPago');
    };

    document.body.appendChild(script);
  }, [preferenceId]);

  useEffect(() => {
    if (sdkLoaded && preferenceId) {
      console.log('Inicializando MercadoPago...');
      const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-AR',
      });

      mp.checkout({
        preference: {
          id: preferenceId,
        },
        render: {
          container: '.cho-container', // Selector del contenedor donde se renderiza el botón
          label: 'Pagar', // Texto del botón
        },
      });
    }
  }, [sdkLoaded, preferenceId]);

  return (
    <EcommerceLayout>
      <Head title="Pago" />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Realizar Pago</h1>
        {cart && cart.items && cart.items.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {item.product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${Number(item.product.price).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 text-right">
              <h3 className="text-xl font-bold">
                Total: $
                {cart.items
                  .reduce((total, item) => total + item.product.price * item.quantity, 0)
                  .toFixed(2)}
              </h3>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-8">
            No hay productos en el carrito.
          </p>
        )}
        <div className="mt-6 text-center">
          {/* Botón de MercadoPago */}
          {sdkLoaded && preferenceId ? (
            <div className="cho-container"></div>
          ) : (
            <p>Cargando botón de pago...</p>
          )}
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default Payment;