import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import ProductFilter from './ProductFilters';

const ProductList = ({ products, categories, colors, genders }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilter = (filters) => {
    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(product =>
        product.categories.some(category => category.name === filters.category)
      );
    }

    if (filters.color) {
      filtered = filtered.filter(product =>
        product.colors.some(color => color.name === filters.color)
      );
    }

    if (filters.gender) {
      filtered = filtered.filter(product => product.gender.name === filters.gender);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center m-4">Catalogo</h2>
      <ProductFilter
        categories={categories}
        colors={colors}
        genders={genders}
        onFilter={handleFilter}
      />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 transform hover:shadow-lg hover:scale-95"
            >
              <img 
                src={product.images && product.images.length > 0 ? `/storage/${product.images[0]}` : '/placeholder.svg'} 
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
                  className="mt-4 inline-block bg-black text-white px-4 py-2 rounded-md border border-black transition duration-300 hover:bg-white hover:text-black"
                >
                  Ver Producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-black mt-8">
          No hay productos para los filtros seleccionados.
        </p>
      )}
    </div>
  );
};

export default ProductList;