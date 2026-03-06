import React, { useEffect, useState } from 'react';
import { Link, router, usePage, Head } from '@inertiajs/react';
import ProductFilter from './ProductFilters';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductList = ({ products, categories, colors, genders, sizes = [], filters = {} }) => {
  // products: objeto paginado de Laravel (data, links, meta)

  // Estado para mostrar/ocultar filtros
  const [showFilters, setShowFilters] = useState(false);

  // Envía al backend los filtros activos (quickFilters + búsqueda + filtros del panel)
  const submitFilters = (currentQuickFilters, extraFilters = {}) => {
    const baseParams = Object.fromEntries(new URLSearchParams(window.location.search));
    const selectedGenders = currentQuickFilters
      .filter(f => f.startsWith('gender_'))
      .map(f => f.replace('gender_', ''));
    const merged = { ...baseParams, ...extraFilters, q: searchTerm };
    delete merged.gender;
    delete merged.sort;
    delete merged.genders;
    delete merged.has_offer;
    delete merged.is_featured;
    if (selectedGenders.length > 0) merged.genders = selectedGenders;
    if (currentQuickFilters.includes('has_offer')) merged.has_offer = 1;
    if (currentQuickFilters.includes('is_featured')) merged.is_featured = 1;
    const cleanFilters = Object.fromEntries(
      Object.entries(merged).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
    router.get(route('catalog.index'), cleanFilters, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  // Handler para filtros del panel lateral
  const handleFilter = (selectedFilters) => submitFilters(quickFilters, selectedFilters);

  // Handler para filtros rápidos (multi-selección, aplica inmediatamente)
  const handleQuickFilter = (key) => {
    const updated = quickFilters.includes(key)
      ? quickFilters.filter(k => k !== key)
      : [...quickFilters, key];
    setQuickFilters(updated);
    submitFilters(updated);
  };

  // Handler para paginación: mantiene los filtros en la URL
  const handlePagination = (url) => {
    if (!url) return;
    const target = new URL(url, window.location.origin);
    const page = target.searchParams.get('page');
    const selectedGenders = quickFilters
      .filter(f => f.startsWith('gender_'))
      .map(f => f.replace('gender_', ''));
    const params = {
      q: searchTerm || undefined,
      min_price: filters.min_price || undefined,
      max_price: filters.max_price || undefined,
      category: filters.category || undefined,
      color: filters.color || undefined,
      size: filters.size || undefined,
      page: page || undefined,
      genders: selectedGenders.length > 0 ? selectedGenders : undefined,
      has_offer: quickFilters.includes('has_offer') ? 1 : undefined,
      is_featured: quickFilters.includes('is_featured') ? 1 : undefined,
    };
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
    );
    router.get(route('catalog.index'), cleanParams, {
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
  const [quickFilters, setQuickFilters] = useState(() => {
    const initial = [];
    if (filters.genders) {
      const g = Array.isArray(filters.genders) ? filters.genders : [filters.genders];
      g.forEach(name => initial.push(`gender_${name}`));
    }
    if (filters.has_offer) initial.push('has_offer');
    if (filters.is_featured) initial.push('is_featured');
    return initial;
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <EcommerceLayout>
      <Head title="Catálogo" />

      <div className="max-w-7xl mx-auto px-4 " >
        <h1 className="hidden text-3xl font-extrabold text-gray-900 sm:text-4xl my-6 text-center md:text-left">Catalogo de prendas</h1>
        
        {/* Barra de búsqueda y orden (responsive) */}
        <div className="w-full my-6 space-y-4">
          {/* Fila con búsqueda y orden */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Barra de búsqueda - más pequeña en desktop */}
            <div className="flex gap-2 md:w-auto w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleFilter({}); }}
                placeholder="Busca por nombre o descripción..."
                className="flex-1 md:w-96 rounded-xl border-2 border-cyan-300 px-4 py-3 text-sm sm:text-base font-semibold focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => handleFilter({})}
                className="text-white px-4 sm:px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 font-bold hover:shadow-lg transition-all duration-200 text-sm whitespace-nowrap"
              >
                Buscar
              </button>
            </div>

            {/* Botones de filtros rápidos en desktop */}
            <div className="hidden md:flex gap-2 flex-wrap items-center">
              {[
                { key: 'gender_Niños', label: 'Niños' },
                { key: 'gender_Niñas', label: 'Niñas' },
                { key: 'has_offer', label: '🏷️ Ofertas' },
                { key: 'is_featured', label: '⭐ Destacados' },
              ].map(filter => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => handleQuickFilter(filter.key)}
                  className={`px-4 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                    quickFilters.includes(filter.key)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
              {/* Botón mostrar filtros en desktop */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Mas filtros
              </button>
            </div>
          </div>

          {/* Botones de filtros rápidos en mobile */}
          <div className="grid grid-cols-2 gap-2 md:hidden">
            {[
              { key: 'gender_Niños', label: 'Niños' },
              { key: 'gender_Niñas', label: 'Niñas' },
              { key: 'has_offer', label: '🏷️ Ofertas' },
              { key: 'is_featured', label: '⭐ Destacados' },
            ].map(filter => (
              <button
                key={filter.key}
                type="button"
                onClick={() => handleQuickFilter(filter.key)}
                className={`px-4 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                  quickFilters.includes(filter.key)
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Botón mostrar filtros en mobile (ancho completo) */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Mostrar filtros
            </button>
          </div>
        </div>
        
        {/* Menú de filtros detallado (desplegable, no modal) */}
        {showFilters && (
          <ProductFilter
            categories={categories}
            colors={colors}
            genders={genders}
            sizes={sizes}
            onFilter={(selectedFilters) => {
              handleFilter(selectedFilters);
              setShowFilters(false);
            }}
            initialFilters={filters}
            compact={false}
            onClose={() => setShowFilters(false)}
          />
        )}
        {products && products.data && products.data.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-7xl mx-auto"
            >
              {products.data.map((product, idx) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col border border-gray-100"
                >
                  {/* Imagen */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={product.images && product.images.length > 0 ? getImageSrc(product.images[0]) : '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badge oferta */}
                    {product.active_offer && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-rose-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg tracking-wide">
                          -{Math.round(product.active_offer.discount_percentage)}% OFF
                        </span>
                      </div>
                    )}

                    {/* Badge destacado */}
                    {product.is_featured && (
                      <div className="absolute top-3 left-3">
                        <div className="bg-amber-400 rounded-full p-2 shadow-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-5 flex flex-col flex-1">

                    {/* Título */}
                    <h3 className="text-2xl font-extrabold text-gray-900 leading-tight mb-3 tracking-tight">
                      {product.name}
                    </h3>

                    {/* Tags: género, categorías, colores */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.genders && product.genders.map((gender) => (
                        <span key={gender.id} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 border border-violet-200">
                          {gender.name}
                        </span>
                      ))}
                      {product.categories && product.categories.map((category, idx) => (
                        <span key={`${category.id}-${idx}`} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                          {category.name}
                        </span>
                      ))}
                      {product.colors && product.colors.map((color, idx) => (
                        <span key={`${color.id}-${idx}`} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 border border-sky-200">
                          {color.name}
                        </span>
                      ))}
                    </div>

                    {/* Talles */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Talles</p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.sizes.slice(0, 6).map((size) => (
                            <span
                              key={`size-${product.id}-${size.id}`}
                              className="min-w-[2.25rem] h-9 flex items-center justify-center px-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"
                            >
                              {size.name}
                            </span>
                          ))}
                          {product.sizes.length > 6 && (
                            <span
                              title={product.sizes.slice(6).map(s => s.name).join(', ')}
                              className="min-w-[2.25rem] h-9 flex items-center justify-center px-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-500 border border-amber-200 cursor-help"
                            >
                              +{product.sizes.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Precio y CTA */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      {product.active_offer ? (
                        <div className="flex items-end justify-between mb-3">
                          <p className="text-sm text-gray-400 line-through">
                            ${Number(product.price).toLocaleString('es-AR')} ARS
                          </p>
                          <p className="text-3xl font-extrabold text-rose-500">
                            ${Number(product.active_offer.discount_price).toLocaleString('es-AR')} ARS
                          </p>
                        </div>
                      ) : (
                        <p className="text-3xl font-extrabold text-gray-900 mb-3">
                          ${Number(product.price).toLocaleString('es-AR')} ARS
                        </p>
                      )}

                      <Link
                        href={`/products/${product.id}`}
                        className="w-full block text-center text-white px-6 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 hover:shadow-lg bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600"
                      >
                        Ver Prenda →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Paginación */}
            <div className="flex flex-wrap justify-center items-center gap-2 my-10">
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