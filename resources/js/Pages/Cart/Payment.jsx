import React, { useEffect, useState } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, router } from '@inertiajs/react';

const Payment = ({ cart, preferenceId, shippingInfo }) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // console.log('Cargando script de MercadoPago...');
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      // console.log('SDK cargada:', !!window.MercadoPago);
      setSdkLoaded(true); // Marca que el SDK está cargado
    };

    script.onerror = () => {
      // console.error('Error al cargar el SDK de MercadoPago');
    };

    document.body.appendChild(script);
  }, [preferenceId]);

  useEffect(() => {
    if (sdkLoaded && preferenceId && window.MercadoPago) {
      // Inicializa MP y crea Wallet Brick con tema dark (botón negro)
      const mp = new window.MercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
        locale: 'es-AR',
      });
      const bricksBuilder = mp.bricks();

      // Destruye instancias previas si existen para evitar duplicados
      const containerId = 'wallet_container';
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
        bricksBuilder.create('wallet', containerId, {
          initialization: {
            preferenceId,
          },
          customization: {
            visual: {
              style: {
                theme: 'dark', // Botón negro acorde al sitio
              },
            },
            texts: {
              valueProp: 'smart_option', // Mensaje bajo el botón (opcional)
            },
          },
        });
      }
    }
  }, [sdkLoaded, preferenceId]);

  const handleGoBack = () => {
    // Usar router.visit para obtener datos frescos del servidor (incluyendo shippingInfo guardado)
    router.visit(route('checkout.index'));
  };

  const total =
    cart?.items?.reduce((sum, item) => sum + item.unit_price * item.quantity, 0) || 0;

  // Link de WhatsApp (sin número, abre chat para elegir contacto)
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    'Hola! Quiero consultar por mi pedido y el envío.'
  )}`;

  // Función para asegurar el prefijo correcto en la ruta de la imagen
  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  return (
    <EcommerceLayout>
      <Head title="Pago" />
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Finalizar Pago
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Completa tu compra de forma segura con Mercado Pago
            </p>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          </div>

          {cart && cart.items && cart.items.length > 0 ? (
            <div className="flex flex-col gap-6 md:grid md:grid-cols-12">
              {/* MOBILE FIRST: Info de envío (primero en mobile, abajo en desktop) */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-pink-200 p-6 md:col-start-1 md:col-span-8 md:order-2">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">Datos del Comprador</h3>
                </div>
                <div className="bg-white/70 rounded-lg p-4 border border-pink-200 space-y-2 mb-4">
                  <p className="text-sm"><span className="font-semibold text-purple-600">Nombre:</span> <span className="text-gray-900">{shippingInfo?.first_name} {shippingInfo?.last_name}</span></p>
                  <p className="text-sm"><span className="font-semibold text-purple-600">Correo:</span> <span className="text-gray-900">{shippingInfo?.email}</span></p>
                  <p className="text-sm"><span className="font-semibold text-purple-600">DNI:</span> <span className="text-gray-900">{shippingInfo?.dni}</span></p>
                </div>

                <div className="flex items-center gap-2 mb-4 pt-3 border-t border-pink-200">
                  <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Información de Envío</h3>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200 mb-3">
                  <p className="text-sm font-bold text-cyan-700">{shippingInfo?.shipping_method}</p>
                </div>
                
                <div className="bg-white/70 rounded-lg p-4 border border-pink-200 space-y-2">
                  <p className="text-sm"><span className="font-semibold text-purple-600">Provincia:</span> <span className="text-gray-900">{shippingInfo?.province}</span></p>
                  <p className="text-sm"><span className="font-semibold text-purple-600">Localidad:</span> <span className="text-gray-900">{shippingInfo?.city}</span></p>
                  <p className="text-sm"><span className="font-semibold text-purple-600">Código Postal:</span> <span className="text-gray-900">{shippingInfo?.postal_code}</span></p>
                  
                  {shippingInfo?.shipping_method === 'Envio a Domicilio' && (
                    <>
                      {shippingInfo?.address && (
                        <p className="text-sm"><span className="font-semibold text-purple-600">Dirección:</span> <span className="text-gray-900">{shippingInfo?.address}</span></p>
                      )}
                      {shippingInfo?.phone && (
                        <p className="text-sm"><span className="font-semibold text-purple-600">Teléfono:</span> <span className="text-gray-900">{shippingInfo?.phone}</span></p>
                      )}
                      {shippingInfo?.observations && (
                        <p className="text-sm"><span className="font-semibold text-purple-600">Observaciones:</span> <span className="text-gray-900">{shippingInfo?.observations}</span></p>
                      )}
                    </>
                  )}
                  
                  {shippingInfo?.courier_company && (
                    <p className="text-sm"><span className="font-semibold text-purple-600">Empresa de Correo:</span> <span className="text-gray-900">{shippingInfo?.courier_company}</span></p>
                  )}
                </div>

                <div className="mt-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-blue-700 leading-relaxed">Nos comunicaremos contigo para coordinar el envío e informarte el costo.</p>
                  </div>
                </div>
              </div>

              {/* Items del pedido (segundo en mobile, primero en desktop) */}
              <section className="flex flex-col gap-4 md:col-start-1 md:col-span-8 md:order-1">
                <div className="flex flex-col gap-4">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      <img
                        src={
                          item.product.images && item.product.images.length > 0
                            ? getImageSrc(item.product.images[0])
                            : '/placeholder.svg'
                        }
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-xl border-2 border-pink-200 shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-bold text-gray-900">
                            {item.product.name}
                          </h3>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-purple-600">Precio</div>
                            {item.unit_price < item.product.price ? (
                              <div className="flex flex-col items-end">
                                <div className="text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                  ${Number(item.unit_price).toLocaleString('es-AR')}
                                </div>
                                <div className="text-xs text-gray-500 line-through">
                                  ${Number(item.product.price).toLocaleString('es-AR')}
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm font-bold text-gray-900">
                                ${Number(item.unit_price).toLocaleString('es-AR')}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-12 items-center gap-4">
                          <div className="col-span-4">
                            <div className="text-sm font-semibold text-purple-600">Talle</div>
                            <div className="text-sm font-bold text-gray-900">{item.size || 'N/A'}</div>
                          </div>
                          <div className="col-span-4">
                            <div className="text-sm font-semibold text-purple-600">Cantidad</div>
                            <div className="text-sm font-bold text-gray-900">{item.quantity}</div>
                          </div>
                          <div className="col-span-4 text-right">
                            <div className="text-sm font-semibold text-purple-600">Total</div>
                            <div className="text-base font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                              ${(item.unit_price * item.quantity).toLocaleString('es-AR')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Resumen (último en mobile, columna derecha en desktop) */}
              <aside className="md:col-start-9 md:col-span-4 md:row-start-1 md:row-span-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-pink-200 p-6 md:sticky md:top-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">Resumen de Compra</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between bg-white/70 px-4 py-3 rounded-lg border border-pink-200">
                      <span className="text-purple-600 font-semibold">Subtotal</span>
                      <span className="font-bold text-gray-900">${total.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="flex justify-between bg-white/70 px-4 py-3 rounded-lg border border-pink-200">
                      <span className="text-purple-600 font-semibold">Envío</span>
                      <span className="font-medium text-gray-700 text-xs">A coordinar</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-cyan-100 border-2 border-cyan-300 rounded-xl px-4 py-4 flex justify-between text-base">
                      <span className="font-bold text-purple-700">Total</span>
                      <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">${total.toLocaleString('es-AR')}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    {sdkLoaded && preferenceId ? (
                      <div id="wallet_container" className="rounded-lg overflow-hidden" />
                    ) : (
                      <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg p-4 text-center">
                        <div className="animate-pulse flex items-center justify-center gap-2">
                          <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-sm font-semibold text-purple-600">Cargando método de pago...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-12 max-w-2xl mx-auto">
                <svg
                  className="w-32 h-32 mx-auto text-purple-300 mb-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                  No hay productos en el carrito
                </h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Agrega productos a tu carrito para continuar con el pago
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default Payment;