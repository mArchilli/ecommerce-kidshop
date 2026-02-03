import React, { useEffect } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OrderShow = ({ order }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-gradient-to-r from-green-400 to-green-500 text-white border-green-200';
      case 'dispatched':
        return 'bg-gradient-to-r from-cyan-400 to-cyan-500 text-white border-cyan-200';
      default:
        return 'bg-gradient-to-r from-green-400 to-green-500 text-white border-green-200';
    }
  };

  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '⏳ Pendiente';
      case 'dispatched':
        return '🚚 Despachado';
      default:
        return '⏳ Pendiente';
    }
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Función para obtener imagen
  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  // Calcular subtotal
  const subtotal = order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <EcommerceLayout>
      <Head title={`Orden #${order.id}`} />
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-cyan-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8" data-aos="fade-down">
            <Link
              href={route('user.orders.index')}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-purple-600 mb-4 transition-colors hover:scale-105 transform"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a mis compras
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-2xl shadow-lg p-6 border-4 border-white">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-4xl">📝</span>
                  Orden #{order.id}
                </h1>
                <p className="text-gray-600 mt-1 font-semibold">📅 Realizada el {formatDate(order.created_at)}</p>
              </div>
              <div
                className={`inline-flex items-center px-6 py-3 rounded-xl text-base font-bold shadow-lg ${getStatusColor(
                  order.shipping_status
                )}`}
              >
                {getStatusText(order.shipping_status)}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            {/* Columna izquierda: Productos */}
            <div className="md:col-span-8 space-y-6">
              {/* Lista de productos */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-white" data-aos="fade-up">
                <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="text-2xl">📦</span>
                    Productos
                  </h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {order.items?.map((item) => (
                    <div key={item.id} className="p-6 flex items-center gap-4 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-purple-50 transition-colors">
                      <img
                        src={
                          item.product?.images && item.product.images.length > 0
                            ? getImageSrc(item.product.images[0])
                            : '/placeholder.svg'
                        }
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-xl border-2 border-white shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900">{item.product?.name}</h3>
                        <div className="mt-1 flex flex-wrap gap-2 text-sm">
                          <span className="bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 rounded-lg font-bold text-blue-700">
                            📏 Talle: {item.size || 'N/A'}
                          </span>
                          <span className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-lg font-bold text-purple-700">
                            📦 Cantidad: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 font-semibold">Precio unit.</p>
                        <p className="text-sm font-bold text-gray-700">
                          ${Number(item.price).toLocaleString('es-AR')}
                        </p>
                        <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-1">
                          ${Number(item.price * item.quantity).toLocaleString('es-AR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline del estado (visual) */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-white" data-aos="fade-up" data-aos-delay="100">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Estado del Pedido
                </h2>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {/* Paso 1: Pedido Confirmado - Siempre verde */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-green-400 to-green-500 text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs text-green-600 font-bold mt-2 text-center">Pedido<br />Confirmado</span>
                    </div>

                    {/* Línea 1 - Siempre verde */}
                    <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500" />

                    {/* Paso 2: Pendiente - Verde por defecto */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-green-400 to-green-500 text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs text-green-600 font-bold mt-2 text-center">Pendiente</span>
                    </div>

                    {/* Línea 2 - Verde solo si despachado */}
                    <div
                      className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                        order.shipping_status === 'dispatched'
                          ? 'bg-gradient-to-r from-green-400 to-cyan-400'
                          : 'bg-gray-200'
                      }`}
                    />

                    {/* Paso 3: Despachado */}
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                          order.shipping_status === 'dispatched'
                            ? 'bg-gradient-to-br from-cyan-400 to-cyan-500 text-white scale-110'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                        </svg>
                      </div>
                      <span className={`text-xs font-bold mt-2 text-center ${
                        order.shipping_status === 'dispatched' ? 'text-cyan-600' : 'text-gray-500'
                      }`}>Despachado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: Resumen y Envío */}
            <div className="md:col-span-4 space-y-6">
              {/* Resumen de pago */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-white" data-aos="fade-left">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Resumen
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between p-3 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Subtotal</span>
                    <span className="font-bold text-gray-900">${subtotal.toLocaleString('es-AR')}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Envío</span>
                    <span className="font-bold text-gray-900">Coordinado</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-md">
                    <span className="font-bold text-white text-lg">Total</span>
                    <span className="font-black text-white text-2xl">${Number(order.total).toLocaleString('es-AR')}</span>
                  </div>
                </div>
              </div>

              {/* Información de envío */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-white" data-aos="fade-left" data-aos-delay="100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  Información de Envío
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg">
                    <span className="text-gray-600 font-semibold">Método:</span>
                    <p className="font-bold text-gray-900">{order.shipping_method}</p>
                  </div>
                  {order.courier_company && (
                    <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-3 rounded-lg">
                      <span className="text-gray-600 font-semibold">Empresa de Correo:</span>
                      <p className="font-bold text-gray-900">{order.courier_company}</p>
                    </div>
                  )}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg">
                    <span className="text-gray-600 font-semibold">Destinatario:</span>
                    <p className="font-bold text-gray-900">{order.first_name} {order.last_name}</p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-3 rounded-lg">
                    <span className="text-gray-600 font-semibold">DNI:</span>
                    <p className="font-bold text-gray-900">{order.dni}</p>
                  </div>
                  {order.email && (
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg">
                      <span className="text-gray-600 font-semibold">📧 Email:</span>
                      <p className="font-bold text-gray-900 text-xs break-all">{order.email}</p>
                    </div>
                  )}
                  {order.phone && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
                      <span className="text-gray-600 font-semibold">📞 Teléfono:</span>
                      <p className="font-bold text-gray-900">{order.phone}</p>
                    </div>
                  )}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg">
                    <span className="text-gray-600 font-semibold">📍 Ubicación:</span>
                    <p className="font-bold text-gray-900">
                      {order.city}, {order.province}
                    </p>
                    <p className="text-gray-700 font-semibold">CP: {order.postal_code}</p>
                  </div>
                  {order.address && (
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-3 rounded-lg">
                      <span className="text-gray-600 font-semibold">🏠 Dirección:</span>
                      <p className="font-bold text-gray-900">{order.address}</p>
                    </div>
                  )}
                  {order.observations && (
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg">
                      <span className="text-gray-600 font-semibold">📝 Observaciones:</span>
                      <p className="font-bold text-gray-900">{order.observations}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contacto */}
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl shadow-xl p-6 border-4 border-white" data-aos="fade-left" data-aos-delay="200">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">💬</span>
                  ¿Necesitas ayuda?
                </h2>
                <p className="text-sm text-green-50 mb-4 font-semibold">
                  Si tienes alguna consulta sobre tu pedido, contáctanos por WhatsApp.
                </p>
                <a
                  href={`https://wa.me/541133973222?text=${encodeURIComponent(
                    `Hola! Tengo una consulta sobre mi orden #${order.id}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-green-50 text-green-600 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.11 2.37 7.14L4 29l7.14-2.37A11.93 11.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3z" />
                  </svg>
                  Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default OrderShow;
