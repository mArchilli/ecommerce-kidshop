import React, { useState, useEffect } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link, router } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OrdersIndex = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

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
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 'dispatched':
        return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white';
      case 'delivered':
        return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  // Función para obtener el texto del estado
  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '⏳ Pendiente';
      case 'dispatched':
        return '🚚 Despachado';
      case 'delivered':
        return '✅ Entregado';
      default:
        return status;
    }
  };

  // Función para manejar búsqueda y filtros
  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedMonth) params.month = selectedMonth;
    if (selectedYear) params.year = selectedYear;
    
    router.get(route('user.orders.index'), params, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMonth('');
    setSelectedYear('');
    router.get(route('user.orders.index'));
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
      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-cyan-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center" data-aos="fade-down">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
              <span className="text-5xl">🛍️</span>
              Mis Compras
            </h1>
            <p className="text-lg text-gray-600">
              Seguí el estado de tus pedidos en tiempo real
            </p>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="mb-8" data-aos="fade-up">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-white">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Búsqueda */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-700">
                      <span className="text-lg">🔍</span>
                      Buscar orden
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por número de orden..."
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400 hover:border-cyan-300 transition-all"
                    />
                  </div>

                  {/* Filtro de Mes */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-700">
                      <span className="text-lg">📅</span>
                      Mes
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400 hover:border-cyan-300 transition-all"
                    >
                      <option value="">Todos</option>
                      <option value="1">Enero</option>
                      <option value="2">Febrero</option>
                      <option value="3">Marzo</option>
                      <option value="4">Abril</option>
                      <option value="5">Mayo</option>
                      <option value="6">Junio</option>
                      <option value="7">Julio</option>
                      <option value="8">Agosto</option>
                      <option value="9">Septiembre</option>
                      <option value="10">Octubre</option>
                      <option value="11">Noviembre</option>
                      <option value="12">Diciembre</option>
                    </select>
                  </div>

                  {/* Filtro de Año */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-700">
                      <span className="text-lg">📆</span>
                      Año
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400 hover:border-cyan-300 transition-all"
                    >
                      <option value="">Todos</option>
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    🔍 Buscar
                  </button>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-gray-700 hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl bg-gray-200 hover:bg-gray-300"
                  >
                    🔄 Limpiar filtros
                  </button>
                  <Link
                    href={route('catalog.index')}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    🛒 Seguir comprando
                  </Link>
                </div>
              </form>
            </div>
          </div>

        {orders.data && orders.data.length > 0 ? (
          <div className="space-y-6">
            {orders.data.map((order, index) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-4 border-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Header de la orden */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                      <div>
                        <span className="text-sm text-purple-100">Orden #</span>
                        <span className="font-bold text-white ml-1 text-lg">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-sm text-purple-100">📅</span>
                        <span className="text-sm text-white ml-1 font-semibold">{formatDate(order.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold shadow-md ${getStatusColor(
                          order.shipping_status
                        )}`}
                      >
                        {getStatusText(order.shipping_status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Productos de la orden */}
                <div className="px-6 py-4">
                  <div className="space-y-3">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-4 bg-gradient-to-r from-cyan-50 to-purple-50 p-3 rounded-xl">
                        <img
                          src={
                            item.product?.images && item.product.images.length > 0
                              ? item.product.images[0].startsWith('images/')
                                ? `/${item.product.images[0]}`
                                : `/images/${item.product.images[0]}`
                              : '/placeholder.svg'
                          }
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{item.product?.name}</p>
                          <p className="text-xs text-gray-600 font-semibold">
                            📏 Talle: {item.size || 'N/A'} | 📦 Cantidad: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                            ${Number(item.price * item.quantity).toLocaleString('es-AR')}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-600 italic font-semibold bg-yellow-50 p-2 rounded-lg text-center">
                        +{order.items.length - 3} producto(s) más
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer de la orden */}
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 px-6 py-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">📦</span>
                        <span className="text-gray-600">Envío:</span>
                        <span className="font-bold text-gray-900">{order.shipping_method}</span>
                      </div>
                      {order.courier_company && (
                        <div className="flex items-center gap-1">
                          <span className="text-lg">🚚</span>
                          <span className="text-gray-600">Correo:</span>
                          <span className="font-bold text-gray-900">{order.courier_company}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right bg-white rounded-xl px-4 py-2 shadow-md">
                        <span className="text-sm text-gray-600 font-semibold">💰 Total:</span>
                        <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2">
                          ${Number(order.total).toLocaleString('es-AR')}
                        </span>
                      </div>
                      <Link
                        href={route('user.orders.show', order.id)}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      >
                        👁️ Ver detalle
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
              <div className="flex justify-center mt-8" data-aos="fade-up">
                <nav className="flex items-center gap-2">
                  {orders.links.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url || '#'}
                      className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                        link.active
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : link.url
                          ? 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400 hover:shadow-md'
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
          <div className="text-center py-16" data-aos="fade-up">
            <div className="bg-white rounded-3xl shadow-xl p-12 border-4 border-white max-w-2xl mx-auto">
              <div className="text-8xl mb-6">🛍️</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">No tienes compras aún</h2>
              <p className="text-lg text-gray-600 mb-8">
                Cuando realices tu primera compra, aparecerá aquí para que puedas ver su estado.
              </p>
              <Link
                href={route('catalog.index')}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg"
              >
                🎨 Explorar productos
                <svg className="w-6 h-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default OrdersIndex;
