import React, { useState } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const ProductView = ({ product }) => {
  const { data, setData, post, processing, errors } = useForm({
    quantity: 1,
    size: ''
  });

  const [selectedColor, setSelectedColor] = useState("black");
  const [activeImage, setActiveImage] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);

  const handleSizeClick = (size) => {
    setData('size', size.name);
    setData('quantity', 1); // Reinicia la cantidad al seleccionar tamaño

    // Use setTimeout to create a fade-in effect without custom CSS
    setShowQuantity(false);
    setTimeout(() => {
      setShowQuantity(true);
    }, 10);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
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
    if (!data.size) {
      alert("Por favor selecciona un talle");
      return;
    }

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

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <EcommerceLayout>
      <Head title={product.name} />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Botón para volver atrás */}
          <div className="mb-6">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imágenes del producto */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={product.images && product.images.length > 0 ? `/storage/${product.images[activeImage]}` : '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images && product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border ${
                      activeImage === index ? "border-black" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={`/storage/${image}`}
                      alt={`${product.name} - Vista ${index + 1}`}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="mt-3 text-3xl text-gray-900">${product.price}</p>
              </div>

              {/* Categorías y Colores como etiquetas */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías y Colores</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Categorías */}
                  {product.categories && product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {category.name}
                    </span>
                  ))}

                  {/* Colores como etiquetas */}
                  {product.colors && product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color.name)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                        selectedColor === color.name
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full mr-1.5"
                        style={{
                          backgroundColor: color.name,
                          border: color.name === "white" ? "1px solid #ddd" : "none",
                        }}
                      ></span>
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="text-base text-gray-700">{product.description}</p>
              </div>

              {/* Selección de talle */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Talle</h3>
                <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeClick(size)}
                      className={`
                        py-3 px-4 border rounded-md text-center text-sm font-medium
                        ${
                          data.size === size.name
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                        }
                        transition-colors duration-200
                      `}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cantidad - Solo aparece después de seleccionar talle */}
              {data.size && (
                <div
                  className={`mt-6 transition-opacity duration-300 ease-in-out ${
                    showQuantity ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
                  }`}
                >
                  <h3 className="text-sm font-medium text-gray-900">Cantidad</h3>
                  <div className="mt-2 flex items-center space-x-3">
                    <button
                      onClick={() => data.quantity > 1 && setData('quantity', data.quantity - 1)}
                      className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Disminuir cantidad</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={sizeStock()}
                      value={data.quantity}
                      onChange={handleQuantityChange}
                      className="w-16 h-10 border border-gray-300 rounded-md text-center focus:ring-black focus:border-black"
                    />
                    <button
                      onClick={() => data.quantity < sizeStock() && setData('quantity', data.quantity + 1)}
                      className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Aumentar cantidad</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Botón de agregar al carrito */}
              <div className="mt-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-black hover:bg-white text-white hover:text-black border border-black font-medium py-3 px-6 rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  disabled={!data.size || data.quantity < 1 || processing}
                >
                  Agregar al carrito
                </button>
              </div>

              {/* Información adicional */}
              <div className="mt-6 text-sm text-gray-500 space-y-3">
                <p className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Pago seguro garantizado
                </p>
                <p className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Envío gratis en compras superiores a $50
                </p>
                <p className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Devoluciones sin cargo por 30 días
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default ProductView;