import React, { useState, useRef } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

const ProductView = ({ product }) => {
  const { data, setData, post, processing, errors } = useForm({
    quantity: 1,
    size: ''
  });

  // Ordenar imágenes: image_1, image_2, image_3
  const orderedImages = product.images && Array.isArray(product.images)
    ? [product.images[0], product.images[1], product.images[2]].filter(Boolean)
    : [];
  const [activeImage, setActiveImage] = useState(0);
  const [showQuantity, setShowQuantity] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [magnifier, setMagnifier] = useState({ visible: false, x: 0, y: 0, target: 'main' });
  const imgRef = useRef(null);
  const mainImgRef = useRef(null);

  const handleSizeClick = (size) => {
    setData('size', size.name);
    setData('quantity', 1); // Reinicia la cantidad al seleccionar tamaño

    // Use setTimeout to create a fade-in effect without custom CSS
    setShowQuantity(false);
    setTimeout(() => {
      setShowQuantity(true);
    }, 10);
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
    router.visit(route('catalog.index'));
  };

  const handleImageClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  // Función para asegurar el prefijo correcto en la ruta de la imagen
  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  // Cierra el modal si se hace click fuera de la imagen (solo desktop)
  const handleModalClick = (e) => {
    if (window.innerWidth >= 768 && e.target.classList.contains('modal-bg')) {
      setIsPreviewOpen(false);
      setIsZoomed(false);
      setZoomPos({ x: 0, y: 0 });
    }
  };

  // Zoom y desplazamiento
  const getZoomScale = () => (window.innerWidth < 768 ? 1.3 : 2);

  const handleMagnifierMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMagnifier({ visible: true, x, y, target: 'main' });
  };

  const handleMagnifierLeave = () => {
    setMagnifier({ ...magnifier, visible: false });
  };

  // Magnifier para imagen principal (miniatura)
  const handleMainMagnifierMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = mainImgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMagnifier({ visible: true, x, y, target: 'main' });
  };

  const handleMainMagnifierLeave = () => {
    setMagnifier({ ...magnifier, visible: false });
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
              <div
                className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border border-gray-200 relative"
                style={{ position: 'relative' }}
              >
                <img
                  ref={mainImgRef}
                  src={orderedImages.length > 0 ? getImageSrc(orderedImages[activeImage]) : '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-auto object-center object-cover cursor-pointer"
                  onClick={handleImageClick}
                  onMouseMove={window.innerWidth >= 768 ? handleMainMagnifierMove : undefined}
                  onMouseLeave={window.innerWidth >= 768 ? handleMainMagnifierLeave : undefined}
                  draggable={false}
                  style={{ userSelect: 'none', cursor: window.innerWidth >= 768 ? 'none' : 'pointer' }}
                />
                {/* Lupa solo en desktop sobre la miniatura */}
                {window.innerWidth >= 768 && magnifier.visible && magnifier.target === 'main' && (
                  <div
                    style={{
                      position: 'absolute',
                      pointerEvents: 'none',
                      left: magnifier.x - 75,
                      top: magnifier.y - 75,
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      background: `url('${orderedImages.length > 0 ? getImageSrc(orderedImages[activeImage]) : '/placeholder.svg'}') no-repeat`,
                      backgroundSize: `${mainImgRef.current ? mainImgRef.current.width * 2 : 0}px ${mainImgRef.current ? mainImgRef.current.height * 2 : 0}px`,
                      backgroundPosition: `${-magnifier.x * 2 + 75}px ${-magnifier.y * 2 + 75}px`,
                      zIndex: 10002,
                    }}
                  />
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {orderedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border ${
                      activeImage === index ? "border-black" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={getImageSrc(image)}
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
                <p className="mt-3 text-3xl text-gray-900">
                  ${Number(product.price).toLocaleString('es-AR')}
                </p>
              </div>

              {/* Categorías, Colores y Género como etiquetas */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categorías y Colores</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Género */}
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {product.gender.name}
                  </span>

                  {/* Categorías */}
                  {product.categories && product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      {category.name}
                    </span>
                  ))}

                  {/* Colores como etiquetas */}
                  {product.colors && product.colors.map((color) => (
                    <span
                      key={color.id}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold"
                    >
                      <span
                        className="w-3 h-3 rounded-full mr-1.5"
                        style={{
                          backgroundColor: color.name,
                          border: color.name === "white" ? "1px solid #ddd" : "none",
                        }}
                      ></span>
                      {color.name}
                    </span>
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
                      className={`py-3 px-4 border rounded-md text-center text-sm font-medium ${
                        data.size === size.name
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                      } transition-colors duration-200`}
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

      {/* Modal de previsualización */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 modal-bg"
          style={{ zIndex: 9999 }}
          onClick={handleModalClick}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Botón de cerrar */}
            <button
              onClick={handleClosePreview}
              className="fixed top-4 right-4 md:top-8 md:right-8 text-white bg-black bg-opacity-70 rounded-full p-2 md:p-3 z-[10001] hover:bg-opacity-90 transition"
              style={{
                fontSize: '2.5rem',
                lineHeight: '2.5rem',
                width: '3rem',
                height: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Cerrar"
            >
              &times;
            </button>
            {/* Imagen sin lupa en el modal */}
            <div
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '80vh',
                overflow: window.innerWidth < 768 ? 'auto' : 'hidden',
                touchAction: window.innerWidth < 768 ? 'none' : 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <img
                ref={imgRef}
                src={orderedImages.length > 0 ? getImageSrc(orderedImages[activeImage]) : '/placeholder.svg'}
                alt={product.name}
                className="rounded-lg shadow-lg select-none"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  cursor: window.innerWidth >= 768 ? 'auto' : 'auto',
                  userSelect: 'none',
                  touchAction: window.innerWidth < 768 ? 'none' : 'auto',
                }}
                draggable={false}
                // No magnifier handlers en el modal
              />
              {/* Lupa solo en desktop - ELIMINADA EN EL MODAL */}
            </div>
          </div>
        </div>
      )}
    </EcommerceLayout>
  );
};

export default ProductView;