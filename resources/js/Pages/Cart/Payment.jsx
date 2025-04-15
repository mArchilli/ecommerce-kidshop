import React, { useEffect } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

const Payment = ({ cart, preferenceId }) => {
  useEffect(() => {
    // Cargar el SDK de MercadoPago
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // Inicializar MercadoPago con la Public Key
      const mp = new window.MercadoPago(process.env.MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-AR', // Idioma
      });

      // Renderizar el botón de pago
      mp.checkout({
        preference: {
          id: preferenceId, // ID de la preferencia generada en el backend
        },
        render: {
          container: '.cho-container', // Clase del contenedor donde se renderiza el botón
          label: 'Pagar', // Texto del botón
        },
      });
    };
    document.body.appendChild(script);
  }, [preferenceId]);

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
                  .reduce(
                    (total, item) =>
                      total + item.product.price * item.quantity,
                    0
                  )
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
          {/* Contenedor del botón de MercadoPago */}
          <div className="cho-container"></div>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default Payment;