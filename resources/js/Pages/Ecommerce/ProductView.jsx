import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const ProductView = ({ product }) => {
  const { data, setData, post, processing, errors } = useForm({
    quantity: 1,
    size: ''
  });

  const handleSizeClick = (size) => {
    setData('size', size.name);
    setData('quantity', 1); // Reinicia la cantidad al seleccionar tamaño
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= sizeStock()) {
      setData('quantity', value);
    }
  };

  // Función auxiliar para obtener el stock del tamaño seleccionado
  const sizeStock = () => {
    const selected = product.sizes.find((s) => s.name === data.size);
    return selected ? selected.pivot.stock : 0;
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', data);
    post(route('cart.add', product.id), data, {
      preserveScroll: true,
      onSuccess: () => {
        console.log('Product added to cart successfully');
      },
      onError: (errors) => {
        console.error('Error adding product to cart:', errors);
      },
    });
  };

  return (
    <EcommerceLayout>
      <Head title={product.name} />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-4">
          <Link
            href={route('welcome')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Volver
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img
              src={`/storage/${product.image}`}
              alt={product.name}
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-16 mt-8 lg:mt-0">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <p className="text-gray-900 font-bold mt-4 text-2xl">${product.price}</p>
            <div className="mt-6">
              <h4 className="font-bold text-gray-900">Talles:</h4>
              <div className="flex flex-wrap mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={`${size.id}-${size.name}`}
                    onClick={() => handleSizeClick(size)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 ${
                      data.size === size.name ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
              {data.size && (
                <div className="mt-4">
                  <p className="text-gray-700">
                    Stock disponible para {data.size}: {sizeStock()}
                  </p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Cantidad:
                    </label>
                    <input
                      type="number"
                      value={data.quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={sizeStock()}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                disabled={!data.size || data.quantity < 1 || processing}
              >
                Agregar al Carrito
              </button>
            </div>
            {/* Sección para Categorías, Colores y Género */}
            <div className="mt-8">
              {/* Categorías */}
              <div className="mt-4">
                <h4 className="font-bold text-gray-900">Categorías:</h4>
                <div className="flex flex-wrap mt-2">
                  {product.categories && product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
              {/* Colores */}
              <div className="mt-4">
                <h4 className="font-bold text-gray-900">Colores:</h4>
                <div className="flex flex-wrap mt-2">
                  {product.colors && product.colors.map((color) => (
                    <span
                      key={color.id}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
                    >
                      {color.name}
                    </span>
                  ))}
                </div>
              </div>
              {/* Género */}
              <div className="mt-4">
                <h4 className="font-bold text-gray-900">Género:</h4>
                <div className="flex flex-wrap mt-2">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2">
                    {typeof product.gender === 'object' ? product.gender.name : product.gender}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default ProductView;