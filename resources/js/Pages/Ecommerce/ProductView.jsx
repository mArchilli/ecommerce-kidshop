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
  const [addedToCart, setAddedToCart] = useState(false);
  const imgRef = useRef(null);
  const mainImgRef = useRef(null);

  const handleSizeClick = (size) => {
    setData('size', size.name);
    setData('quantity', 1);
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

  const sizeStock = () => {
    const selected = product.sizes.find((s) => s.name === data.size);
    return selected ? selected.pivot.stock : 0;
  };

  const handleAddToCart = () => {
    if (!data.size) {
      alert("🎈 ¡Por favor selecciona un talle!");
      return;
    }

    post(route('cart.add', product.id), data, {
      preserveScroll: true,
      onSuccess: () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
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

  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  const handleModalClick = (e) => {
    if (window.innerWidth >= 768 && e.target.classList.contains('modal-bg')) {
      setIsPreviewOpen(false);
    }
  };

  // Animaciones CSS
  const floatingAnimation = `
    @keyframes floating {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes bounce-in {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
    .animate-floating {
      animation: floating 3s ease-in-out infinite;
    }
    .animate-bounce-in {
      animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .animate-wiggle:hover {
      animation: wiggle 0.5s ease-in-out;
    }
  `;

  return (
    <EcommerceLayout>
      <Head title={product.name} />
      <style>{floatingAnimation}</style>
      
      {/* Fondo con gradiente infantil */}
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-sky-50 relative overflow-hidden">
        {/* Elementos decorativos flotantes */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-floating pointer-events-none hidden md:block">⭐</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-floating pointer-events-none hidden md:block" style={{ animationDelay: '1s' }}>🎈</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-floating pointer-events-none hidden md:block" style={{ animationDelay: '0.5s' }}>☁️</div>
        <div className="absolute bottom-40 right-1/3 text-5xl opacity-20 animate-floating pointer-events-none hidden md:block" style={{ animationDelay: '1.5s' }}>🌟</div>

        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 lg:px-8 relative z-10">
          {/* Botón para volver atrás - Rediseñado */}
          <div className="mb-6">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center px-5 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 border-3"
              style={{ 
                backgroundColor: '#29C9F4',
                color: 'white',
                borderWidth: '3px',
                borderColor: 'white'
              }}
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
               Volver al Catálogo
            </button>
          </div>

          {/* Notificación de añadido al carrito */}
          {addedToCart && (
            <div className="fixed top-20 right-4 z-50 animate-bounce-in">
              <div className="rounded-2xl border-4 border-white shadow-2xl px-6 py-4 flex items-center gap-3"
                style={{ backgroundColor: '#65DA4D' }}>
                <span className="text-3xl">✅</span>
                <div className="text-white font-bold">
                  ¡Añadido al carrito!
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Sección de imágenes - Rediseñada */}
            <div className="space-y-4">
              {/* Imagen principal con marco divertido */}
              <div
                className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white p-2 transform hover:scale-[1.02] transition-transform duration-300"
                style={{ aspectRatio: '1/1' }}
              >
                <div className="rounded-2xl overflow-hidden h-full">
                  <img
                    ref={mainImgRef}
                    src={orderedImages.length > 0 ? getImageSrc(orderedImages[activeImage]) : '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-full object-cover object-center cursor-zoom-in"
                    onClick={handleImageClick}
                    draggable={false}
                  />
                </div>
                {/* Badge de zoom */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border-2 border-pink-300">
                  <span className="text-sm font-bold" style={{ color: '#FF6B9D' }}>🔍 Click para ampliar</span>
                </div>
              </div>

              {/* Miniaturas con estilo infantil */}
              <div className="grid grid-cols-3 gap-3">
                {orderedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-2xl overflow-hidden border-4 transition-all duration-300 transform hover:scale-105 ${
                      activeImage === index 
                        ? "border-pink-400 shadow-lg scale-105" 
                        : "border-white shadow-md hover:border-cyan-300"
                    }`}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <img
                      src={getImageSrc(image)}
                      alt={`${product.name} - Vista ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                    {activeImage === index && (
                      <div className="absolute inset-0 bg-pink-400/20 flex items-center justify-center">
                        <span className="text-3xl animate-bounce">✨</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Información del producto - Rediseñada */}
            <div className="space-y-5">
              {/* Card principal del producto */}
              <div className="rounded-3xl border-4 border-white bg-white/80 backdrop-blur-sm p-6 shadow-2xl">
                {/* Título y badge de oferta */}
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                    {product.name}
                  </h1>
                  
                  {product.active_offer && (
                    <div className="inline-block animate-wiggle">
                      <span 
                        className="rounded-full px-5 py-2.5 shadow-lg font-black text-white text-base border-4 border-white inline-flex items-center gap-2"
                        style={{ backgroundColor: '#FF6B9D' }}
                      >
                        <span className="text-2xl">🔥</span>
                        ¡{Math.round(product.active_offer.discount_percentage)}% OFF!
                      </span>
                    </div>
                  )}

                  {/* Precios con diseño llamativo */}
                  {product.active_offer ? (
                    <div className="flex flex-wrap items-baseline gap-3">
                      <p className="text-5xl font-black" style={{ color: '#FF6B9D' }}>
                        ${Number(product.active_offer.discount_price).toLocaleString('es-AR')}
                      </p>
                      <p className="text-2xl text-gray-400 line-through font-bold">
                        ${Number(product.price).toLocaleString('es-AR')}
                      </p>
                      <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        ¡Ahorrás ${(Number(product.price) - Number(product.active_offer.discount_price)).toLocaleString('es-AR')}!
                      </span>
                    </div>
                  ) : (
                    <p className="text-4xl sm:text-5xl font-black" style={{ color: '#29C9F4' }}>
                      ${Number(product.price).toLocaleString('es-AR')}
                    </p>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="rounded-2xl border-4 border-white bg-white/60 backdrop-blur-sm p-5 shadow-lg">
                <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Etiquetas de categorías, género y colores */}
              <div className="rounded-2xl border-4 border-white bg-white/60 backdrop-blur-sm p-5 shadow-lg">
                <h3 className="text-sm font-black mb-3 flex items-center gap-2" style={{ color: '#65DA4D' }}>
                  <span className="text-xl">🏷️</span>
                  ETIQUETAS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/* Género */}
                  <span 
                    className="px-4 py-2 rounded-full text-sm font-bold text-white border-2 border-white shadow-md"
                    style={{ backgroundColor: '#9B59B6' }}
                  >
                    👤 {product.gender.name}
                  </span>

                  {/* Categorías */}
                  {product.categories && product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="px-4 py-2 rounded-full text-sm font-bold text-white border-2 border-white shadow-md"
                      style={{ backgroundColor: '#29C9F4' }}
                    >
                      📂 {category.name}
                    </span>
                  ))}

                  {/* Colores */}
                  {product.colors && product.colors.map((color) => (
                    <span
                      key={color.id}
                      className="px-4 py-2 rounded-full text-sm font-bold border-2 border-white shadow-md flex items-center gap-2"
                      style={{ 
                        backgroundColor: color.name,
                        color: ['white', 'yellow', 'cyan', 'pink', 'lightgray'].includes(color.name.toLowerCase()) ? '#000' : '#fff'
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white"
                        style={{ backgroundColor: color.name }}
                      ></span>
                      {color.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selección de talle - Rediseñada */}
              <div className="rounded-2xl border-4 border-white bg-white/80 backdrop-blur-sm p-5 shadow-lg">
                <h3 className="text-base font-black mb-4 flex items-center gap-2" style={{ color: '#FFB800' }}>
                  <span className="text-2xl">📏</span>
                  ELEGÍ TU TALLE
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeClick(size)}
                      className={`py-4 rounded-xl text-center text-lg font-black border-4 transition-all duration-300 transform hover:scale-110 ${
                        data.size === size.name
                          ? "text-white shadow-2xl scale-110"
                          : "bg-white text-gray-700 border-pink-200 hover:border-pink-400 shadow-md"
                      }`}
                      style={data.size === size.name ? { 
                        backgroundColor: '#FF6B9D',
                        borderColor: 'white'
                      } : {}}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cantidad - Solo aparece después de seleccionar talle */}
              {data.size && (
                <div
                  className={`rounded-2xl border-4 border-white bg-white/80 backdrop-blur-sm p-5 shadow-lg transition-all duration-500 ${
                    showQuantity ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
                  }`}
                >
                  <h3 className="text-base font-black mb-4 flex items-center gap-2" style={{ color: '#65DA4D' }}>
                    <span className="text-2xl">🔢</span>
                    CANTIDAD
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => data.quantity > 1 && setData('quantity', data.quantity - 1)}
                      className="w-14 h-14 rounded-full font-black text-2xl text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 border-4 border-white"
                      style={{ backgroundColor: '#FC1C1D' }}
                      disabled={data.quantity <= 1}
                    >
                      −
                    </button>
                    <div className="bg-white rounded-2xl border-4 px-8 py-3 shadow-lg" style={{ borderColor: '#29C9F4' }}>
                      <span className="text-3xl font-black" style={{ color: '#29C9F4' }}>
                        {data.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => data.quantity < sizeStock() && setData('quantity', data.quantity + 1)}
                      className="w-14 h-14 rounded-full font-black text-2xl text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 border-4 border-white"
                      style={{ backgroundColor: '#65DA4D' }}
                      disabled={data.quantity >= sizeStock()}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center mt-3 text-sm font-bold text-gray-600">
                    Stock disponible: <span style={{ color: '#65DA4D' }}>{sizeStock()} unidades</span>
                  </p>
                </div>
              )}

              {/* Botón de agregar al carrito - Rediseñado */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-5 rounded-2xl font-black text-xl text-white border-4 border-white shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                  style={{ backgroundColor: '#65DA4D' }}
                  disabled={!data.size || data.quantity < 1 || processing}
                >
                  <span className="text-3xl">🛒</span>
                  {processing ? '¡Agregando...' : '¡AGREGAR AL CARRITO!'}
                </button>

                {!data.size && (
                  <p className="text-center text-sm font-bold animate-bounce" style={{ color: '#FF6B9D' }}>
                    ⬆️ ¡Primero elegí un talle!
                  </p>
                )}
              </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Modal de previsualización - Rediseñado */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm modal-bg z-[9999]"
          onClick={handleModalClick}
        >
          <div className="relative flex items-center justify-center w-full h-full p-4">
            {/* Botón de cerrar con estilo infantil */}
            <button
              onClick={handleClosePreview}
              className="fixed top-4 right-4 sm:top-8 sm:right-8 text-white font-black rounded-full p-3 z-[10001] shadow-2xl transform hover:scale-110 hover:rotate-90 transition-all duration-300 border-4 border-white"
              style={{ 
                backgroundColor: '#FC1C1D',
                fontSize: '2rem',
                width: '4rem',
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Cerrar"
            >
              ✕
            </button>

            {/* Controles de navegación entre imágenes */}
            {orderedImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev > 0 ? prev - 1 : orderedImages.length - 1));
                  }}
                  className="fixed left-4 sm:left-8 text-white font-black rounded-full p-4 z-[10001] shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-white"
                  style={{ backgroundColor: '#29C9F4' }}
                  aria-label="Anterior"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev < orderedImages.length - 1 ? prev + 1 : 0));
                  }}
                  className="fixed right-4 sm:right-8 text-white font-black rounded-full p-4 z-[10001] shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-white"
                  style={{ backgroundColor: '#29C9F4' }}
                  aria-label="Siguiente"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Imagen con marco decorativo */}
            <div className="relative max-w-[90vw] max-h-[80vh]">
              <div className="rounded-3xl border-8 border-white shadow-2xl overflow-hidden bg-white p-2">
                <img
                  ref={imgRef}
                  src={orderedImages.length > 0 ? getImageSrc(orderedImages[activeImage]) : '/placeholder.svg'}
                  alt={product.name}
                  className="rounded-2xl w-auto h-auto max-w-full max-h-[70vh] object-contain"
                  draggable={false}
                  style={{ userSelect: 'none' }}
                />
              </div>
              
              {/* Indicador de imagen actual */}
              {orderedImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {orderedImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage(index);
                      }}
                      className={`w-3 h-3 rounded-full border-2 border-white transition-all ${
                        activeImage === index ? 'scale-125' : 'opacity-50'
                      }`}
                      style={{ 
                        backgroundColor: activeImage === index ? '#FF6B9D' : '#fff'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </EcommerceLayout>
  );
};

export default ProductView;