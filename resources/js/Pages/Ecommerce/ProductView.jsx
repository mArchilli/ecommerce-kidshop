import React, { useState } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';

const ProductView = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size.name);
    setSelectedStock(size.pivot.stock);
  };

  return (
    <EcommerceLayout>
      <Head title={product.name} />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-4">
          <Link href={route('welcome')} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Volver
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-auto rounded-md" />
          </div>
          <div className="lg:w-1/2 lg:pl-16 mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <p className="text-gray-900 font-bold mt-4">${product.price}</p>
            <div className="mt-4">
              <h4 className="font-bold text-gray-900">Categorías:</h4>
              <div className="flex flex-wrap mt-2">
                {product.categories.map((category) => (
                  <span key={category.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-gray-900">Talles:</h4>
              <div className="flex flex-wrap mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSizeClick(size)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 ${
                      selectedSize === size.name ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <div className="mt-2">
                  <p className="text-gray-700">Stock disponible para {selectedSize}: {selectedStock}</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-gray-900">Colores:</h4>
              <div className="flex flex-wrap mt-2">
                {product.colors.map((color) => (
                  <span key={color.id} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
                    {color.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-gray-900">Género:</h4>
              <div className="flex flex-wrap mt-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
                  {product.gender.name}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default ProductView;