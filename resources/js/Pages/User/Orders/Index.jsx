import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';

const OrdersIndex = ({ orders }) => {
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'dispatched':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <EcommerceLayout>
      <Head title="Mis Compras" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Mis Compras</h1>
          <Link
            href={route('catalog.index')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Seguir comprando
          </Link>
        </div>

        {orders.data && orders.data.length > 0 ? (
          <div className="space-y-6">
            {orders.data.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Header de la orden */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                      <div>
                        <span className="text-sm text-gray-500">Orden #</span>
                        <span className="font-semibold text-gray-900 ml-1">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Fecha:</span>
                        <span className="text-sm text-gray-700 ml-1">{formatDate(order.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.shipping_status
                        )}`}
                      >
                        {order.shipping_status === 'pending' && (
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {order.shipping_status === 'dispatched' && (
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                          </svg>
                        )}
                        {order.shipping_status === 'delivered' && (
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {getStatusText(order.shipping_status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Productos de la orden */}
                <div className="px-6 py-4">
                  <div className="space-y-3">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={
                            item.product?.images && item.product.images.length > 0
                              ? item.product.images[0].startsWith('images/')
                                ? `/${item.product.images[0]}`
                                : `/images/${item.product.images[0]}`
                              : '/placeholder.svg'
                          }
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded-md border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.product?.name}</p>
                          <p className="text-xs text-gray-500">
                            Talle: {item.size || 'N/A'} | Cantidad: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${Number(item.price * item.quantity).toLocaleString('es-AR')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-500 italic">
                        +{order.items.length - 3} producto(s) más
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer de la orden */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Método de envío:</span>
                        <span className="font-medium text-gray-900 ml-1">{order.shipping_method}</span>
                      </div>
                      {order.courier_company && (
                        <div>
                          <span className="text-gray-500">Correo:</span>
                          <span className="font-medium text-gray-900 ml-1">{order.courier_company}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Total:</span>
                        <span className="text-lg font-bold text-gray-900 ml-2">
                          ${Number(order.total).toLocaleString('es-AR')}
                        </span>
                      </div>
                      <Link
                        href={route('user.orders.show', order.id)}
                        className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors duration-200"
                      >
                        Ver detalle
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Paginación */}
            {orders.last_page > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-2">
                  {orders.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url || '#'}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        link.active
                          ? 'bg-black text-white'
                          : link.url
                          ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ))}
                </nav>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
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
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No tienes compras aún</h2>
            <p className="text-gray-500 mb-6">
              Cuando realices tu primera compra, aparecerá aquí para que puedas ver su estado.
            </p>
            <Link
              href={route('catalog.index')}
              className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Explorar productos
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </EcommerceLayout>
  );
};

export default OrdersIndex;
