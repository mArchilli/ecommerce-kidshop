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
                className="text-white px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 font-bold hover:shadow-lg transition-all duration-200 text-sm"
              >
                Buscar
              </button>
            </div>

            {/* Botones de orden */}
          <div className="mt-4 sm:mt-0">
            <div className="hidden sm:flex gap-2 flex-wrap">
              {[
                { value: '', label: 'Por defecto' },
                { value: 'price_asc', label: 'Precio ↑' },
                { value: 'price_desc', label: 'Precio ↓' },
                { value: 'newest', label: 'Nuevos' },
                { value: 'oldest', label: 'Antiguos' },
              ].map(opt => (
                <button
                  key={opt.value || 'default'}
                  type="button"
                  onClick={() => { setSort(opt.value); handleFilter({}); }}
                  className={`px-4 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                    sort === opt.value
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              >
                <option value="">Ordenar por...</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="newest">Más nuevos</option>
                <option value="oldest">Más antiguos</option>
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
                  className="bg-white shadow-md rounded-2xl overflow-hidden transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 flex flex-col border border-gray-100"
                  data-aos="fade-up"
                  data-aos-delay="200"
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
                        <div className="rounded-lg px-3 py-1.5 shadow-lg font-bold text-white text-sm bg-gradient-to-r from-pink-500 to-rose-500"
                        >
                          -{Math.round(product.active_offer.discount_percentage)}% OFF
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
                    <h3 className="text-xl text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    
                    {/* Género */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                        {product.gender.name}
                      </span>
                    </div>

                    {/* Categorías */}
                    {product.categories && product.categories.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-1 mb-2">
                          <span className="text-xs font-semibold text-gray-500 uppercase">Categorías</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {product.categories.map((category, idx) => (
                            <span 
                              key={`${category.id}-${idx}`} 
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700"
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
                          <span className="text-xs font-semibold text-gray-500 uppercase">Colores</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {product.colors.map((color, idx) => (
                            <span 
                              key={`${color.id}-${idx}`} 
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700"
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
                          <span className="text-xs font-semibold text-gray-500 uppercase">Talles</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {product.sizes.slice(0, 6).map((size, idx) => (
                            <span
                              key={`size-${product.id}-${size.id}`}
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700"
                            >
                              {size.name}
                            </span>
                          ))}
                          {product.sizes.length > 6 && (
                            <span
                              title={product.sizes.slice(6).map(s => s.name).join(', ')}
                              className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700 cursor-help"
                            >
                              +{product.sizes.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Precios */}
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      {product.active_offer ? (
                        <div className="flex items-end justify-between mb-3">
                          <div className="flex flex-col">
                            <p className="text-xs text-gray-500 mb-0.5">Antes:</p>
                            <p className="text-base text-gray-400 line-through font-medium">
                              ${Number(product.price).toLocaleString('es-AR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-pink-600">
                              ${Number(product.active_offer.discount_price).toLocaleString('es-AR')}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <p className="text-2xl font-bold text-gray-900">
                            ${Number(product.price).toLocaleString('es-AR')}
                          </p>
                        </div>
                      )}
                      
                      <Link 
                        href={`/products/${product.id}`} 
                        className="w-full block text-center text-white px-6 py-3 rounded-full font-semibold text-base transition-all duration-200 hover:shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        Ver Producto
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
                
                // Mantener etiquetas simples
                if (idx === 0) label = '← Anterior';
                if (idx === products.links.length - 1) label = 'Siguiente →';
                
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!link.url || link.active}
                    onClick={() => handlePagination(link.url)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all border ${
                      link.active
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md'
                        : link.url
                          ? 'bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                    }`}
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