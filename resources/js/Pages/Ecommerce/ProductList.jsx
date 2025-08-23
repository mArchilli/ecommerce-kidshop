import React, { useEffect } from 'react';
import { Link, router, usePage, Head } from '@inertiajs/react';
import ProductFilter from './ProductFilters';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductList = ({ products, categories, colors, genders, filters = {} }) => {
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
    router.get(url, filters, {
      preserveState: true,
      preserveScroll: true,
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

      <div className="max-w-7xl mx-auto">
        <h1 className="hidden text-3xl font-extrabold text-gray-900 sm:text-4xl my-6 text-center md:text-left">Catalogo de prendas</h1>
        <ProductFilter
          categories={categories}
          colors={colors}
          genders={genders}
          onFilter={handleFilter}
          initialFilters={filters}
        />
        {products && products.data && products.data.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-6xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {products.data.map((product, idx) => (
                <div 
                  key={product.id} 
                  className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:shadow-lg hover:scale-95"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <img 
                    src={product.images && product.images.length > 0 ? getImageSrc(product.images[0]) : '/placeholder.svg'} 
                    alt={product.name} 
                    className="w-full h-64 object-cover" 
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                    <p className="mt-2 text-black">${Number(product.price).toFixed(2)}</p>
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
                    </div>
                    <Link 
                      href={`/products/${product.id}`} 
                      className="w-full sm:w-auto mt-4 text-center inline-block bg-black text-white px-4 py-2 rounded-md border border-black transition duration-300 hover:bg-white hover:text-black"
                    >
                      Ver Producto
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {/* Paginación */}
            <div className="flex justify-center my-8">
              {products.links.map((link, idx) => (
                <button
                  key={idx}
                  disabled={!link.url}
                  onClick={() => link.url && handlePagination(link.url)}
                  className={`mx-1 px-3 py-1 rounded ${link.active ? 'bg-black text-white' : 'bg-gray-200 text-black'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-black mt-8">
            No hay productos para los filtros seleccionados.
          </p>
        )}
      </div>
    </EcommerceLayout>
  );
};

export default ProductList;