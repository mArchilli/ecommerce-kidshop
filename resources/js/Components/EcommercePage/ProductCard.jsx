import React from 'react';
import { Link } from '@inertiajs/react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
      <div>
        <img src={`/storage/${product.image}`} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        <h3 className="text-xl font-bold mt-4">{product.name}</h3>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-gray-900 font-bold mt-2">${product.price}</p>
        <div className="mt-4">
          <h4 className="font-bold">Categorías:</h4>
          <div className="flex flex-wrap">
            {product.categories.map((category) => (
              <span key={category.id} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-bold">Talles:</h4>
          <div className="flex flex-wrap">
            {product.sizes.map((size) => (
              <span key={size.id} className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
                {size.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-bold">Colores:</h4>
          <div className="flex flex-wrap">
            {product.colors.map((color) => (
              <span key={color.id} className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
                {color.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col space-y-2">
        <Link href={`/products/${product.id}`} className="bg-blue-500 text-white w-full px-4 py-2 rounded-md hover:bg-blue-700 text-center">
          Ver Producto
        </Link>
        <button className="bg-green-500 text-white w-full px-4 py-2 rounded-md hover:bg-green-700 text-center">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;