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
    if (window.history.length > 1) window.history.back();
    else router.visit(route('catalog.index'));
  };

  const total =
    cart?.items?.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;

  // Link de WhatsApp (sin número, abre chat para elegir contacto)
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(
    'Hola! Quiero consultar por mi pedido y el envío.'
  )}`;

  return (
    <EcommerceLayout>
      <Head title="Pago" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header responsive como en Index: botón izq en mobile, der en desktop */}
        <div className="mb-6 relative h-12 md:h-auto md:flex md:items-center md:justify-between">
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-center md:static md:translate-x-0 md:translate-y-0 md:text-left">
            Pago
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
            {/* Columna izquierda: Ítems en tarjetas */}
            <section className="md:col-span-8 flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition"
                  >
                    <img
                      src={
                        item.product.images && item.product.images.length > 0
                          ? `/storage/${item.product.images[0]}`
                          : '/placeholder.svg'
                      }
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Precio</div>
                          <div className="text-sm font-medium text-gray-900">
                            ${Number(item.product.price).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-12 items-center gap-4">
                        <div className="col-span-4">
                          <div className="text-sm text-gray-600">Talle</div>
                          <div className="text-sm text-gray-900">{item.size || 'N/A'}</div>
                        </div>
                        <div className="col-span-4">
                          <div className="text-sm text-gray-600">Cantidad</div>
                          <div className="text-sm text-gray-900">{item.quantity}</div>
                        </div>
                        <div className="col-span-4 text-right">
                          <div className="text-sm text-gray-600">Total</div>
                          <div className="text-base font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Columna derecha: Resumen + Envío + Pago */}
            <aside className="md:col-span-4 flex flex-col gap-6">
              {/* Resumen */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h2>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                {/* Puedes agregar descuentos/envío estimado si aplica */}
                <div className="border-t pt-3 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>

                <div className="mt-6">
                  {sdkLoaded && preferenceId ? (
                    <div id="wallet_container" />
                  ) : (
                    <p className="text-sm text-gray-600">Cargando botón de pago...</p>
                  )}
                </div>
              </div>

              {/* Info de envío seleccionada */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-3">Método de Envío</h3>
                <p className="text-sm text-gray-800 mb-2">{shippingInfo?.shipping_method}</p>

                {shippingInfo?.shipping_method === 'Envio a Domicilio' ? (
                  <>
                    <div className="text-sm text-gray-700 space-y-1 mb-4">
                      <p>Nos contactaremos luego de la compra para coordinar el envío y su costo.</p>
                      <p>
                        Dirección del local: Varela 505, Mariano Acosta, Buenos Aires
                      </p>
                      <p>Horarios de atención: Lunes a Sábado</p>
                    </div>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.46 0 .16 5.3.16 11.88a11.77 11.77 0 001.56 5.94L0 24l6.36-1.67a11.92 11.92 0 005.7 1.46h.01c6.58 0 11.88-5.3 11.88-11.86a11.77 11.77 0 00-3.43-8.45zM12.07 21.2h-.01a9.32 9.32 0 01-4.75-1.3l-.34-.2-3.77 1 1.01-3.67-.22-.38a9.35 9.35 0 01-1.42-4.96c0-5.16 4.2-9.35 9.37-9.35a9.3 9.3 0 016.61 2.73 9.3 9.3 0 012.74 6.6c0 5.16-4.2 9.35-9.33 9.35zm5.34-7.01c-.29-.14-1.7-.84-1.96-.93-.26-.09-.45-.14-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.14-1.22-.45-2.33-1.43-.86-.76-1.44-1.7-1.61-1.98-.17-.29-.02-.44.13-.58.14-.14.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.49-.64-.5h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 2.01 3.08 4.87 4.32.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33z" />
                      </svg>
                      Contactar por WhatsApp
                    </a>
                  </>
                ) : (
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>Podrás retirar tu pedido en el local.</p>
                    <p>Dirección: Varela 505, Mariano Acosta, Buenos Aires</p>
                    <p>Horarios: Lunes a Sábado</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-8">No hay productos en el carrito.</p>
        )}
      </div>
    </EcommerceLayout>
  );
};

export default Payment;