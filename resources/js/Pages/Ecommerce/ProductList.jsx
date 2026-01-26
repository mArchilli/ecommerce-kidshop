import React, { useEffect, useState } from 'react';
import { Link, router, usePage, Head } from '@inertiajs/react';
import ProductFilter from './ProductFilters';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductList = ({ products, categories, colors, genders, sizes = [], filters = {} }) => {
  // products: objeto paginado de Laravel (data, links, meta)

  // Handler para filtros: envía los filtros al backend usando Inertia
  const handleFilter = (selectedFilters) => {
    // Merge con parámetros actuales para no perder filtros cuando se aplica búsqueda/orden
    const baseParams = Object.fromEntries(new URLSearchParams(window.location.search));
    const merged = { ...baseParams, ...selectedFilters, q: searchTerm, sort };
    const cleanFilters = Object.fromEntries(
      Object.entries(merged).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
    router.get(route('catalog.index'), cleanFilters, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Handler para paginación: mantiene los filtros en la URL
  const handlePagination = (url) => {
    if (!url) return;
    // Extraemos query actual de la URL destino y fusionamos con filtros vigentes
    const target = new URL(url, window.location.origin);
    const params = new URLSearchParams(target.search);
    // Reinsertamos filtros activos que no están presentes (incluye búsqueda y orden actuales)
    Object.entries({ ...filters, q: searchTerm, sort }).forEach(([key, value]) => {
      if (value && !params.has(key)) params.set(key, value);
    });
    router.get(`${route('catalog.index')}?${params.toString()}`, {}, {
      preserveScroll: true,
      replace: false,
    });
  };

  // Función para asegurar el prefijo correcto en la ruta de la imagen
  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  const [searchTerm, setSearchTerm] = useState(filters.q || '');
  const [sort, setSort] = useState(filters.sort || '');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <EcommerceLayout>
      <Head title="Catálogo" />

      <div className="max-w-7xl mx-auto px-4" data-aos="fade-up" data-aos-delay="400">
        <h1 className="hidden text-3xl font-extrabold text-gray-900 sm:text-4xl my-6 text-center md:text-left">Catalogo de prendas</h1>
        
        {/* Barra de búsqueda y orden (responsive) */}
        <div className="w-full my-6 space-y-4">
          {/* Fila con búsqueda y orden */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Barra de búsqueda */}
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleFilter({}); }}
                placeholder="Busca por nombre o descripción..."
                className="flex-1 rounded-xl border-2 border-cyan-300 px-4 py-3 text-sm sm:text-base font-semibold focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => handleFilter({})}
                className="text-white px-4 sm:px-6 py-3 rounded-xl bg-cyan-500 font-bold hover:opacity-90 text-lg"
              >
                🔍
              </button>
            </div>

            {/* Botones de orden */}
          <div className="mt-4 sm:mt-0">
            <div className="hidden sm:flex gap-2 flex-wrap">
              {[
                { value: '', label: 'Por defecto' },
                { value: 'price_asc', label: '💵 Precio ↑' },
                { value: 'price_desc', label: '💰 Precio ↓' },
                { value: 'newest', label: '✨ Nuevos' },
                { value: 'oldest', label: '📅 Antiguos' },
              ].map(opt => (
                <button
                  key={opt.value || 'default'}
                  type="button"
                  onClick={() => { setSort(opt.value); handleFilter({}); }}
                  className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all hover:scale-105 ${
                    sort === opt.value
                      ? 'text-white border-white shadow-lg scale-105 bg-cyan-500'
                      : 'bg-white text-black border-cyan-300 hover:bg-cyan-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex sm:hidden w-full">
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); handleFilter({}); }}
                className="w-full rounded-xl border-2 border-cyan-300 px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
              >
                <option value="">↕️ Ordenar por...</option>
                <option value="price_asc">💵 Precio: menor a mayor</option>
                <option value="price_desc">💰 Precio: mayor a menor</option>
                <option value="newest">✨ Más nuevos</option>
                <option value="oldest">📅 Más antiguos</option>
              </select>
            </div>
          </div>
          </div>
        </div>
        
        {/* Menú de filtros detallado (desplegable, no modal) */}
        <ProductFilter
          categories={categories}
          colors={colors}
          genders={genders}
          sizes={sizes}
          onFilter={handleFilter}
          initialFilters={filters}
          compact={false}
        />
        {products && products.data && products.data.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-7xl mx-auto"
            >
              {products.data.map((product, idx) => (
                <div 
                  key={product.id} 
                  className="bg-gradient-to-br from-white to-neutral-50 shadow-lg rounded-3xl overflow-hidden transition-all duration-300 transform hover:shadow-2xl hover:scale-105 flex flex-col border-4 border-white"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
                >
                  <div className="w-full relative aspect-square bg-gradient-to-br from-cyan-50 to-purple-50">
                    <img 
                      src={product.images && product.images.length > 0 ? getImageSrc(product.images[0]) : '/placeholder.svg'} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Badge de oferta con descuento - más grande y llamativo */}
                    {product.active_offer && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="rounded-2xl px-4 py-2 shadow-xl font-black text-white text-base animate-pulse border-4 border-white"
                          style={{ backgroundColor: '#FF6B9D' }}>
                          🎉 -{Math.round(product.active_offer.discount_percentage)}%
                        </div>
                      </div>
                    )}

                    {/* Badge de producto destacado */}
                    {product.is_featured && (
                      <div className="absolute top-3 left-3 z-10">
                        <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl p-2 shadow-xl border-4 border-white">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            className="w-6 h-6"
                            style={{ fill: '#FFB800' }}
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1 justify-between" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                    {/* Título del producto */}
                    <h3 className="text-xl font-black text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    
                    {/* Género con icono */}
                    <div className="mb-3">
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-purple-200 shadow-md"
                        style={{ backgroundColor: '#f3e8ff' }}>
                        <span className="text-lg">👶</span>
                        <span className="font-bold text-sm" style={{ color: '#9B59B6' }}>
                          {product.gender.name}
                        </span>
                      </div>
                    </div>

                    {/* Categorías con iconos */}
                    {product.categories && product.categories.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-sm font-bold text-gray-600">📂 Categorías:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.categories.map((category, idx) => (
                            <span 
                              key={`${category.id}-${idx}`} 
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md border-2 border-green-200"
                              style={{ backgroundColor: '#65DA4D' }}
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Colores disponibles */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-sm font-bold text-gray-600">🎨 Colores:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map((color, idx) => (
                            <span 
                              key={`${color.id}-${idx}`} 
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md border-2 border-red-200"
                              style={{ backgroundColor: '#FC1C1D' }}
                            >
                              {color.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Talles disponibles */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-sm font-bold text-gray-600">📏 Talles:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.slice(0, 6).map((size, idx) => (
                            <span
                              key={`size-${product.id}-${size.id}`}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md border-2 border-yellow-200"
                              style={{ backgroundColor: '#FFB800' }}
                            >
                              {size.name}
                            </span>
                          ))}
                          {product.sizes.length > 6 && (
                            <span
                              title={product.sizes.slice(6).map(s => s.name).join(', ')}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-md border-2 border-yellow-200 cursor-help"
                              style={{ backgroundColor: '#FFB800' }}
                            >
                              +{product.sizes.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Precios con diseño mejorado */}
                    <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-200">
                      {product.active_offer ? (
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex flex-col">
                            <p className="text-sm text-gray-500 font-semibold mb-1">Precio anterior:</p>
                            <p className="text-lg text-gray-400 line-through font-bold">
                              ${Number(product.price).toLocaleString('es-AR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold mb-1" style={{ color: '#FF6B9D' }}>¡OFERTA!</p>
                            <p className="text-3xl font-black" style={{ color: '#FF6B9D' }}>
                              ${Number(product.active_offer.discount_price).toLocaleString('es-AR')}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 font-semibold mb-1">Precio:</p>
                          <p className="text-3xl font-black text-gray-900">
                            ${Number(product.price).toLocaleString('es-AR')}
                          </p>
                        </div>
                      )}
                      
                      <Link 
                        href={`/products/${product.id}`} 
                        className="w-full block text-center text-white px-6 py-4 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-105 shadow-lg border-4 border-white"
                        style={{ backgroundColor: '#65DA4D' }}
                      >
                        👀 Ver Producto
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Paginación */}
            <div className="flex flex-wrap justify-center items-center gap-2 my-10" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
              {products.links.map((link, idx) => {
                // Normalizamos etiquetas (Laravel incluye &laquo; &raquo;)
                let label = link.label
                  .replace('&laquo;', '←')
                  .replace('&raquo;', '→')
                  .replace(/&.*?;/g, (m) => m);
                
                // Reemplazar flechas por emojis en primer y último botón
                if (idx === 0) label = '⬅️ Anterior';
                if (idx === products.links.length - 1) label = 'Siguiente ➡️';
                
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!link.url || link.active}
                    onClick={() => handlePagination(link.url)}
                    className={`px-4 py-3 rounded-2xl font-bold text-base transition-all duration-300 shadow-md border-3 ${
                      link.active
                        ? 'text-white border-white shadow-xl scale-110 transform'
                        : link.url
                          ? 'bg-white text-gray-700 border-purple-200 hover:border-purple-400 hover:scale-105 hover:shadow-lg'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                    }`}
                    style={link.active ? { backgroundColor: '#65DA4D' } : {}}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className='m-4 sm:m-1'>
            <p className="text-center text-xl text-black mt-8 h-96">
              No hay prendas para los filtros seleccionados.
            </p>
          </div>
        )}
      </div>
    </EcommerceLayout>
  );
};

export default ProductList;