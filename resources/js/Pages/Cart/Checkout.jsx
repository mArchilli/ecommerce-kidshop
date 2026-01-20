import React, { useState } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, useForm, router } from '@inertiajs/react';

const Checkout = ({ cart }) => {
  const { data, setData, post, processing, errors } = useForm({
    province: '',
    city: '',
    postal_code: '',
    address: '',
    phone: '',
    shipping_method: '',
    dni: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('checkout.payment')); 
  };

  const proceedToPayment = () => {
    if (!data.shipping_method || !data.dni.trim()) return; // guard simple
    post(route('checkout.payment'));
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.visit(route('catalog.index'));
    }
  };

  const total =
    cart?.items?.reduce((sum, item) => sum + item.unit_price * item.quantity, 0) || 0;

  // Función para asegurar el prefijo correcto en la ruta de la imagen
  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  return (
    <EcommerceLayout>
      <Head title="Resumen de Compra" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header responsive: botón izq + título centrado (mobile),
           y título izq + botón der (desktop) */}
        <div className="mb-6 relative h-12 md:h-auto md:flex md:items-center md:justify-between">
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-center md:static md:translate-x-0 md:translate-y-0 md:text-left">
            Resumen
          </h1>
          <button
            onClick={handleGoBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 md:static md:translate-y-0 md:ml-auto"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>

        {cart && cart.items && cart.items.length > 0 ? (
          <div className="grid md:grid-cols-12 gap-6">
            {/* Columna izquierda: Envío + Lista de productos */}
            <section className="md:col-span-8 flex flex-col gap-6">
              {/* Información de envío (se mantiene el formulario condicional) */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Método de Envío (A cargo del comprador)</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    En caso de seleccionar Envío a Domicilio, nos contactaremos con usted luego de finalizada la compra para informar el importe.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      aria-pressed={data.shipping_method === 'Envio a Domicilio'}
                      onClick={() => setData('shipping_method', 'Envio a Domicilio')}
                      className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 border transition
                        ${data.shipping_method === 'Envio a Domicilio'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
                        focus:outline-none focus:ring-2 focus:ring-black`}
                    >
                      {/* ícono camión */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h11v8H3zM14 10h3l4 3v2h-7V10zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      <span>Envío a Domicilio</span>
                    </button>

                    <button
                      type="button"
                      aria-pressed={data.shipping_method === 'Retirar en el local'}
                      onClick={() => setData('shipping_method', 'Retirar en el local')}
                      className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 border transition
                        ${data.shipping_method === 'Retirar en el local'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
                        focus:outline-none focus:ring-2 focus:ring-black`}
                    >
                      {/* ícono tienda */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10l1-4h14l1 4M5 10h14v9H5zM9 19v-5h6v5" />
                      </svg>
                      <span>Retirar en el local</span>
                    </button>
                  </div>

                  {errors.shipping_method && (
                    <span className="text-red-500 text-sm mt-2 block">{errors.shipping_method}</span>
                  )}
                </div>

                {/* Mensajes en vez de formulario */}

                {data.shipping_method === 'Envio a Domicilio' && (
                  <>
                    <div className="mt-2 p-3 rounded-md bg-gray-50 text-sm text-gray-700">
                      Te contactaremos luego de la compra para coordinar el envío y su costo.
                    </div>
                    {/* Formulario visible nuevamente si es Envío a Domicilio */}
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Provincia</label>
                          <input
                            type="text"
                            value={data.province}
                            onChange={(e) => setData('province', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.province && <span className="text-red-500 text-sm">{errors.province}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Localidad</label>
                          <input
                            type="text"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                          <input
                            type="text"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.postal_code && <span className="text-red-500 text-sm">{errors.postal_code}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Dirección</label>
                          <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Teléfono de Contacto</label>
                          <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">DNI</label>
                          <input
                            type="text"
                            value={data.dni}
                            onChange={(e) => setData('dni', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
                        </div>
                      </div>
                      {/* Sin botón aquí; se usa el de la card de resumen o Enter en inputs */}
                    </form>
                  </>
                )}

                {data.shipping_method === 'Retirar en el local' && (
                  <>
                    <div className="mt-2 p-3 rounded-md bg-gray-50 text-sm text-gray-700">
                      Podrás retirar tu pedido en: Varela 505, Mariano Acosta, Buenos Aires.
                    </div>
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">DNI</label>
                          <input
                            type="text"
                            value={data.dni}
                            onChange={(e) => setData('dni', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Lista de productos (estilo similar a Index) */}
              <div className="bg-white border rounded-lg">
                <h2 className="text-lg font-semibold p-4">Productos</h2>
                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4">
                      <img
                        src={
                          item.product.images && item.product.images.length > 0
                            ? getImageSrc(item.product.images[0])
                            : '/placeholder.svg'
                        }
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{item.product.name}</h3>
                            <p className="text-xs text-gray-500">Talle: {item.size || 'N/A'}</p>
                            <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-900">
                              {item.unit_price < item.product.price ? (
                                <div className="flex flex-col items-end">
                                  <div className="text-sm font-bold" style={{ color: '#FF6B9D' }}>
                                    Precio: ${Number(item.unit_price).toLocaleString('es-AR')}
                                  </div>
                                  <div className="text-xs text-gray-500 line-through">
                                    ${Number(item.product.price).toLocaleString('es-AR')}
                                  </div>
                                </div>
                              ) : (
                                <div>Precio: ${Number(item.unit_price).toLocaleString('es-AR')}</div>
                              )}
                            </div>
                            <div className="text-sm font-semibold text-gray-900 mt-1">
                              Total: ${(item.unit_price * item.quantity).toLocaleString('es-AR')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Columna derecha: Resumen sticky + botón de pago */}
            <aside className="md:col-span-4">
              <div className="bg-white rounded-lg shadow p-6 md:sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">
                      {data.shipping_method === 'Retirar en el local' ? 'Sin costo' : 'A confirmar'}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={proceedToPayment}
                    className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={processing || !data.shipping_method || !data.dni.trim()}
                  >
                    {processing ? 'Procesando...' : 'Proceder al Pago'}
                  </button>
                </div>
              </div>
            </aside>
          </div>
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