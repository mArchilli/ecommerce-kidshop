import React, { useState } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, useForm } from '@inertiajs/react';

const Checkout = ({ cart }) => {
  const { data, setData, post, processing, errors } = useForm({
    province: '',
    city: '',
    postal_code: '',
    address: '',
    phone: '',
    shipping_method: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route('checkout.payment')); 
  };

  return (
    <EcommerceLayout>
      <Head title="Resumen de Compra" />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Resumen de Compra</h1>
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
                      Talle
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
                        <div className="text-sm text-gray-900">
                          {item.size || 'N/A'} 
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
                      (total, item) => total + item.product.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </h3>
              </div>
            </div>

            {/* Formulario de información de envío */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
              <form onSubmit={handleSubmit} method0="POST">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Provincia</label>
                    <input
                      type="text"
                      value={data.province}
                      onChange={(e) => setData('province', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.province && <span className="text-red-500 text-sm">{errors.province}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Localidad</label>
                    <input
                      type="text"
                      value={data.city}
                      onChange={(e) => setData('city', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                    <input
                      type="text"
                      value={data.postal_code}
                      onChange={(e) => setData('postal_code', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.postal_code && <span className="text-red-500 text-sm">{errors.postal_code}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                      type="text"
                      value={data.address}
                      onChange={(e) => setData('address', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono de Contacto</label>
                    <input
                      type="text"
                      value={data.phone}
                      onChange={(e) => setData('phone', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                  </div>
                </div>

                {/* Selección del método de envío */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Método de Envío (A cargo del comprador)</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    En caso de seleccionar envío, nos contactaremos con usted luego de finalizada la compra para informar el importe. Una vez abonado, el paquete será despachado.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="Correo Argentino"
                        checked={data.shipping_method === 'Correo Argentino'}
                        onChange={(e) => setData('shipping_method', e.target.value)}
                        className="mr-2"
                      />
                      Correo Argentino
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="Andreani"
                        checked={data.shipping_method === 'Andreani'}
                        onChange={(e) => setData('shipping_method', e.target.value)}
                        className="mr-2"
                      />
                      Andreani
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="Vía Cargo"
                        checked={data.shipping_method === 'Vía Cargo'}
                        onChange={(e) => setData('shipping_method', e.target.value)}
                        className="mr-2"
                      />
                      Vía Cargo
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shipping_method"
                        value="Retirar en el local"
                        checked={data.shipping_method === 'Retirar en el local'}
                        onChange={(e) => setData('shipping_method', e.target.value)}
                        className="mr-2"
                      />
                      Retirar en el local (Varela 505, Mariano Acosta)
                    </label>
                  </div>
                  {errors.shipping_method && (
                    <span className="text-red-500 text-sm">{errors.shipping_method}</span>
                  )}
                </div>

                <div className="mt-6 text-right">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    disabled={processing}
                  >
                    Proceder al Pago
                  </button>
                </div>
              </form>
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

export default Checkout;