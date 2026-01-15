import React from 'react';
import { Link } from '@inertiajs/react';

const ProductCard = ({ product }) => {
  const hasOffer = product.active_offer && product.active_offer.is_active;
  const offerPrice = hasOffer ? product.active_offer.discount_price : null;
  const discountPercentage = hasOffer ? product.active_offer.discount_percentage : null;

  const getImageSrc = (images) => {
    if (!images || !images[0]) return '/placeholder.svg';
    const imgPath = images[0];
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full relative">
      {/* Badge de oferta */}
      {hasOffer && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg">
            -{discountPercentage}% OFF
          </span>
        </div>
      )}
      
      <div>
        <img src={getImageSrc(product.images)} alt={product.name} className="w-full h-48 object-cover rounded-md" />
        <h3 className="text-xl font-bold mt-4">{product.name}</h3>
        <p className="text-gray-700 mt-2">{product.description}</p>
        
        {/* Precio con oferta */}
        <div className="mt-2">
          {hasOffer ? (
            <div className="flex items-center gap-2">
              <p className="text-gray-500 line-through text-sm font-medium">${product.price}</p>
              <p className="text-red-600 font-bold text-xl">${offerPrice}</p>
            </div>
          ) : (
            <p className="text-gray-900 font-bold mt-2">${product.price}</p>
          )}
        </div>
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
        <div className="mt-4">
          <h4 className="font-bold">Género:</h4>
          <div className="flex flex-wrap">
            <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
              {product.gender.name}
            </span>
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