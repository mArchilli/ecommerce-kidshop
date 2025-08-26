import React, { useEffect } from 'react';
import { Link, router, usePage, Head } from '@inertiajs/react';
import ProductFilter from './ProductFilters';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductList = ({ products, categories, colors, genders, sizes = [], filters = {} }) => {
  // products: objeto paginado de Laravel (data, links, meta)

  // Handler para filtros: envía los filtros al backend usando Inertia
  const handleFilter = (selectedFilters) => {
    // Eliminar filtros vacíos antes de enviarlos al backend
    const cleanFilters = Object.fromEntries(
      Object.entries(selectedFilters).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
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
    // Reinsertamos filtros activos que no están presentes
    Object.entries(filters).forEach(([key, value]) => {
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <EcommerceLayout>
      <Head title="Catálogo" />

      <div className="max-w-7xl mx-auto" data-aos="fade-up" data-aos-delay="400">
        <h1 className="hidden text-3xl font-extrabold text-gray-900 sm:text-4xl my-6 text-center md:text-left">Catalogo de prendas</h1>
        <ProductFilter
          categories={categories}
          colors={colors}
          genders={genders}
          sizes={sizes}
          onFilter={handleFilter}
          initialFilters={filters}
        />
        {products && products.data && products.data.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-7xl mx-auto"
              // data-aos="fade-up"
              // data-aos-delay="400"
            >
              {products.data.map((product, idx) => (
                <div 
                  key={product.id} 
                  className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:shadow-lg hover:scale-95 flex flex-col"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="w-full">
                    <img 
                      src={product.images && product.images.length > 0 ? getImageSrc(product.images[0]) : '/placeholder.svg'} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                    <p className="mt-2 text-black">
                      ${Number(product.price).toLocaleString('es-AR')}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {product.gender.name}
                      </span>
                      {product.categories.map((category, idx) => (
                        <span 
                          key={`${category.id}-${idx}`} 
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {category.name}
                        </span>
                      ))}
                      {product.colors.map((color, idx) => (
                        <span 
                          key={`${color.id}-${idx}`} 
                          className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {color.name}
                        </span>
                      ))}
                      {product.sizes && product.sizes.length > 0 && (() => {
                        const maxChips = 4;
                        const sizesShown = product.sizes.slice(0, maxChips);
                        const remaining = product.sizes.length - maxChips;
                        return (
                          <>
                            {sizesShown.map(size => (
                              <span
                                key={`size-${product.id}-${size.id}`}
                                className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold"
                              >
                                {size.name}
                              </span>
                            ))}
                            {remaining > 0 && (
                              <span
                                title={product.sizes.slice(maxChips).map(s => s.name).join(', ')}
                                className="bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold"
                              >
                                +{remaining}
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <Link 
                      href={`/products/${product.id}`} 
                      className="w-full sm:w-auto mt-4 text-center inline-block bg-black text-white px-4 py-2 rounded-md border border-black transition duration-300 hover:bg-white hover:text-black"
                    >
                      Ver Prenda
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* Paginación */}
            <div className="flex justify-center my-8">
              {products.links.map((link, idx) => {
                // Normalizamos etiquetas (Laravel incluye &laquo; &raquo;)
                const label = link.label
                  .replace('&laquo;', '«')
                  .replace('&raquo;', '»')
                  .replace(/&.*?;/g, (m) => m); // fallback
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={!link.url || link.active}
                    onClick={() => handlePagination(link.url)}
                    className={`mx-1 px-3 py-1 rounded border text-sm transition ${
                      link.active
                        ? 'bg-black text-white border-black'
                        : link.url
                          ? 'bg-white text-black border-gray-300 hover:bg-black hover:text-white'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
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