import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';

const OrderShow = ({ order }) => {
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'dispatched':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'dispatched':
        return 'Despachado';
      case 'delivered':
        return 'Entregado';
      default:
        return status;
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href={route('user.orders.index')}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a mis compras
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Orden #{order.id}</h1>
            <p className="text-gray-500 mt-1">Realizada el {formatDate(order.created_at)}</p>
          </div>
          <div
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
              order.shipping_status
            )}`}
          >
            {order.shipping_status === 'pending' && (
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {order.shipping_status === 'dispatched' && (
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            )}
            {order.shipping_status === 'delivered' && (
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
            Estado: {getStatusText(order.shipping_status)}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Columna izquierda: Productos */}
          <div className="md:col-span-8 space-y-6">
            {/* Lista de productos */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {order.items?.map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-4">
                    <img
                      src={
                        item.product?.images && item.product.images.length > 0
                          ? getImageSrc(item.product.images[0])
                          : '/placeholder.svg'
                      }
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900">{item.product?.name}</h3>
                      <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded">Talle: {item.size || 'N/A'}</span>
                        <span className="bg-gray-100 px-2 py-0.5 rounded">Cantidad: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Precio unit.</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${Number(item.price).toLocaleString('es-AR')}
                      </p>
                      <p className="text-base font-bold text-gray-900 mt-1">
                        ${Number(item.price * item.quantity).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline del estado (visual) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado del Pedido</h2>
              <div className="relative">
                <div className="flex items-center justify-between">
                  {/* Paso 1: Pendiente */}
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        ['pending', 'dispatched', 'delivered'].includes(order.shipping_status)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 mt-2 text-center">Pedido<br />Confirmado</span>
                  </div>

                  {/* Línea */}
                  <div
                    className={`flex-1 h-1 ${
                      ['dispatched', 'delivered'].includes(order.shipping_status)
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />

                  {/* Paso 2: Despachado */}
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        ['dispatched', 'delivered'].includes(order.shipping_status)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 mt-2 text-center">En<br />Camino</span>
                  </div>

                  {/* Línea */}
                  <div
                    className={`flex-1 h-1 ${
                      order.shipping_status === 'delivered' ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />

                  {/* Paso 3: Entregado */}
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        order.shipping_status === 'delivered'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600 mt-2 text-center">Entregado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Resumen y Envío */}
          <div className="md:col-span-4 space-y-6">
            {/* Resumen de pago */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">Coordinado</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">${Number(order.total).toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>

            {/* Información de envío */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Información de Envío</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Método:</span>
                  <p className="font-medium text-gray-900">{order.shipping_method}</p>
                </div>
                {order.courier_company && (
                  <div>
                    <span className="text-gray-500">Empresa de Correo:</span>
                    <p className="font-medium text-gray-900">{order.courier_company}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Destinatario:</span>
                  <p className="font-medium text-gray-900">{order.first_name} {order.last_name}</p>
                </div>
                <div>
                  <span className="text-gray-500">DNI:</span>
                  <p className="font-medium text-gray-900">{order.dni}</p>
                </div>
                {order.email && (
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium text-gray-900">{order.email}</p>
                  </div>
                )}
                {order.phone && (
                  <div>
                    <span className="text-gray-500">Teléfono:</span>
                    <p className="font-medium text-gray-900">{order.phone}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-500">Ubicación:</span>
                  <p className="font-medium text-gray-900">
                    {order.city}, {order.province}
                  </p>
                  <p className="text-gray-600">CP: {order.postal_code}</p>
                </div>
                {order.address && (
                  <div>
                    <span className="text-gray-500">Dirección:</span>
                    <p className="font-medium text-gray-900">{order.address}</p>
                  </div>
                )}
                {order.observations && (
                  <div>
                    <span className="text-gray-500">Observaciones:</span>
                    <p className="font-medium text-gray-900">{order.observations}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contacto */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">¿Necesitas ayuda?</h2>
              <p className="text-sm text-gray-600 mb-4">
                Si tienes alguna consulta sobre tu pedido, contáctanos por WhatsApp.
              </p>
              <a
                href={`https://wa.me/541133973222?text=${encodeURIComponent(
                  `Hola! Tengo una consulta sobre mi orden #${order.id}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.11 2.37 7.14L4 29l7.14-2.37A11.93 11.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3z" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default OrderShow;
