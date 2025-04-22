import React, { useEffect, useState } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

const Payment = ({ cart, preferenceId, shippingInfo }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    console.log('Cargando script de MercadoPago...');
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
        <h1 className="text-3xl font-bold mb-6">Verificar Información y Realizar Pago</h1>
        {cart && cart.items && cart.items.length > 0 ? (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
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

            {/* Información de envío (solo lectura) */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Provincia</label>
                    <input
                      type="text"
                      value={shippingInfo.province}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Localidad</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                    <input
                      type="text"
                      value={shippingInfo.postal_code}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono de Contacto</label>
                    <input
                      type="text"
                      value={shippingInfo.phone}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Método de Envío</h3>
                  <input
                    type="text"
                    value={shippingInfo.shipping_method}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                  />
                </div>
              </form>
            </div>

            {/* Botón de MercadoPago */}
            <div className="mt-6 text-center">
              {sdkLoaded && preferenceId ? (
                <div className="cho-container"></div>
              ) : (
                <p>Cargando botón de pago...</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-700 mt-8">
            No hay productos en el carrito.
          </p>
        )}
      </div>
    </EcommerceLayout>
  );
};

export default Payment;