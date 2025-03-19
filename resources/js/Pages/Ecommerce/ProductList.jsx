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
      <h2 className="text-2xl font-bold mb-4 text-black">Nuestros Productos</h2>
      <ProductFilter
        categories={categories}
        colors={colors}
        genders={genders}
        onFilter={handleFilter}
      />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden k">
              <img 
                src={`/storage/${product.image}`} 
                alt={product.name} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                <p className="mt-2 text-black">${Number(product.price).toFixed(2)}</p>
                <div className="mt-2">
                  <h4 className="font-bold text-black">Género:</h4>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
                    {product.gender.name}
                  </span>
                </div>
                <div className="mt-2">
                  <h4 className="font-bold text-black">Categorías:</h4>
                  <div className="flex flex-wrap mt-2">
                    {product.categories.map((category, idx) => (
                      <span 
                        key={`${category.id}-${idx}`} 
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="font-bold text-black">Colores:</h4>
                  <div className="flex flex-wrap mt-2">
                    {product.colors.map((color, idx) => (
                      <span 
                        key={`${color.id}-${idx}`} 
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
                      >
                        {color.name}
                      </span>
                    ))}
                  </div>
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