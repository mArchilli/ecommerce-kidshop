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

  // Función para asegurar el prefijo correcto en la ruta de la imagen
  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

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
                          ? getImageSrc(item.product.images[0])
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
                  </>
                ) : (
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Dirección:</strong> Varela 505, Mariano Acosta, Buenos Aires</p>
                    <p><strong>Horarios:</strong> Lunes a Sábado - 09:00 a 20:00</p>
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