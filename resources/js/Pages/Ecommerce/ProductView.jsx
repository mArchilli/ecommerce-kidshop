import React, { useState, useRef } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { toast } from 'react-toastify';

const ProductView = ({ product, relatedProducts = [], offersProducts = [] }) => {
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
        toast.success('¡Producto agregado al carrito!');
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
      
      {/* Fondo con gradiente suave */}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-10 lg:px-8 relative z-10">
          {/* Botón para volver atrás */}
          <div className="mb-6">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center px-5 py-2.5 rounded-full font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al Catálogo
            </button>
          </div>

          {/* Notificación de añadido al carrito eliminada: ahora se usa toast */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Selección de imágenes */}
            <div className="space-y-4">
              {/* Imagen principal */}
              <div
                className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                style={{ aspectRatio: '1/1' }}
              >
                <img
                  ref={mainImgRef}
                  src={orderedImages.length > 0 ? getImageSrc(orderedImages[activeImage]) : '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover object-center cursor-zoom-in"
                  onClick={handleImageClick}
                  draggable={false}
                />
                {/* Badge de zoom */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
                  <span className="text-xs font-semibold text-gray-700">Click para ampliar</span>
                </div>
              </div>

              {/* Miniaturas */}
              <div className="grid grid-cols-3 gap-3">
                {orderedImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === index 
                        ? "border-purple-500 shadow-md ring-2 ring-purple-200" 
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                    style={{ aspectRatio: '1/1' }}
                  >
                    <img
                      src={getImageSrc(image)}
                      alt={`${product.name} - Vista ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Información del producto */}
            <div className="space-y-5">
              {/* Card principal del producto */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6">
                {/* Título y badge de oferta */}
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                  
                  {product.active_offer && (
                    <div className="inline-block">
                      <span 
                        className="rounded-lg px-4 py-2 shadow-md font-bold text-white text-sm bg-gradient-to-r from-pink-500 to-rose-500"
                      >
                        {Math.round(product.active_offer.discount_percentage)}% OFF
                      </span>
                    </div>
                  )}

                  {/* Precios */}
                  {product.active_offer ? (
                    <div className="flex flex-wrap items-baseline gap-3">
                      <p className="text-4xl font-bold text-pink-600">
                        ${Number(product.active_offer.discount_price).toLocaleString('es-AR')}
                      </p>
                      <p className="text-xl text-gray-400 line-through font-medium">
                        ${Number(product.price).toLocaleString('es-AR')}
                      </p>
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full">
                        Ahorrás ${(Number(product.price) - Number(product.active_offer.discount_price)).toLocaleString('es-AR')}
                      </span>
                    </div>
                  ) : (
                    <p className="text-4xl font-bold text-gray-900">
                      ${Number(product.price).toLocaleString('es-AR')}
                    </p>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-5">
                <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Etiquetas de categorías, género y colores */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-5">
                <h3 className="text-xs font-semibold mb-3 text-gray-500 uppercase">
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/* Género */}
                  <span 
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700"
                  >
                    {product.gender.name}
                  </span>

                  {/* Categorías */}
                  {product.categories && product.categories.map((category) => (
                    <span
                      key={category.id}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700"
                    >
                      {category.name}
                    </span>
                  ))}

                  {/* Colores */}
                  {product.colors && product.colors.map((color) => (
                    <span
                      key={color.id}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1.5"
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.name }}
                      ></span>
                      {color.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Selección de talle */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-5">
                <h3 className="text-sm font-semibold mb-4 text-gray-700">
                  Elegí tu talle
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => handleSizeClick(size)}
                      className={`py-3 rounded-full text-center text-sm font-semibold border-2 transition-all ${
                        data.size === size.name
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md"
                          : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cantidad */}
              {data.size && (
                <div
                  className={`rounded-2xl border border-gray-200 bg-white shadow-md p-5 transition-all duration-500 ${
                    showQuantity ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
                  }`}
                >
                  <h3 className="text-sm font-semibold mb-4 text-gray-700">
                    Cantidad
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => data.quantity > 1 && setData('quantity', data.quantity - 1)}
                      className="w-10 h-10 rounded-full font-semibold text-lg bg-gradient-to-r from-red-500 to-rose-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                      disabled={data.quantity <= 1}
                    >
                      −
                    </button>
                    <div className="bg-gray-100 rounded-lg border-2 border-purple-300 px-6 py-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {data.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => data.quantity < sizeStock() && setData('quantity', data.quantity + 1)}
                      className="w-10 h-10 rounded-full font-semibold text-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                      disabled={data.quantity >= sizeStock()}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-center mt-3 text-xs text-gray-600">
                    Stock disponible: <span className="font-semibold text-green-600">{sizeStock()} unidades</span>
                  </p>
                </div>
              )}

              {/* Botón de agregar al carrito */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-full font-semibold text-base text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!data.size || data.quantity < 1 || processing}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {processing ? 'Agregando...' : 'Agregar al carrito'}
                </button>

                {!data.size && (
                  <p className="text-center text-xs font-semibold text-pink-600">
                    Primero elegí un talle
                  </p>
                )}
              </div>

              
            </div>
          </div>

          {/* Sección de Productos Relacionados */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-16 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Te puede interesar
                </h2>
                <p className="text-sm text-gray-600">Otros productos que te encantarán</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-pink-50">
                        <img
                          src={getImageSrc(relatedProduct.images?.[0])}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                        />
                        {relatedProduct.active_offer && (
                          <div className="absolute top-2 right-2">
                            <span className="rounded-lg px-2.5 py-1 shadow-md font-bold text-white text-xs bg-gradient-to-r from-pink-500 to-rose-500">
                              -{Math.round(relatedProduct.active_offer.discount_percentage)}%
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        
                        {/* Etiquetas */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {/* Género */}
                          {relatedProduct.gender && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-700">
                              {relatedProduct.gender.name}
                            </span>
                          )}
                          
                          {/* Categorías */}
                          {relatedProduct.categories && relatedProduct.categories.slice(0, 2).map((category) => (
                            <span
                              key={category.id}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700"
                            >
                              {category.name}
                            </span>
                          ))}
                          
                          {/* Colores */}
                          {relatedProduct.colors && relatedProduct.colors.slice(0, 2).map((color) => (
                            <span
                              key={color.id}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700 flex items-center gap-1"
                            >
                              <span
                                className="w-2 h-2 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.name }}
                              ></span>
                              {color.name}
                            </span>
                          ))}
                          
                          {/* Talles disponibles */}
                          {relatedProduct.sizes && relatedProduct.sizes.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">
                              {relatedProduct.sizes.length} {relatedProduct.sizes.length === 1 ? 'talle' : 'talles'}
                            </span>
                          )}
                        </div>
                        
                        {relatedProduct.active_offer ? (
                          <div className="flex items-baseline gap-2">
                            <p className="text-xl font-bold text-pink-600">
                              ${Number(relatedProduct.active_offer.discount_price).toLocaleString('es-AR')}
                            </p>
                            <p className="text-sm text-gray-400 line-through">
                              ${Number(relatedProduct.price).toLocaleString('es-AR')}
                            </p>
                          </div>
                        ) : (
                          <p className="text-xl font-bold text-gray-900">
                            ${Number(relatedProduct.price).toLocaleString('es-AR')}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sección de Productos en Oferta */}
          {offersProducts && offersProducts.length > 0 && (
            <div className="mt-16 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Súper Ofertas
                </h2>
                <p className="text-sm text-gray-600">Aprovechá estos descuentos increíbles</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {offersProducts.slice(0, 4).map((offerProduct) => (
                  <Link
                    key={offerProduct.id}
                    href={`/products/${offerProduct.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl border-2 border-pink-200 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="relative aspect-square bg-gradient-to-br from-pink-50 to-rose-50">
                        <img
                          src={getImageSrc(offerProduct.images?.[0])}
                          alt={offerProduct.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className="rounded-lg px-3 py-1.5 shadow-lg font-bold text-white text-sm bg-gradient-to-r from-pink-500 to-rose-500">
                            -{Math.round(offerProduct.active_offer.discount_percentage)}% OFF
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-semibold text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                          {offerProduct.name}
                        </h3>
                        
                        {/* Etiquetas */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {/* Género */}
                          {offerProduct.gender && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-700">
                              {offerProduct.gender.name}
                            </span>
                          )}
                          
                          {/* Categorías */}
                          {offerProduct.categories && offerProduct.categories.slice(0, 2).map((category) => (
                            <span
                              key={category.id}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700"
                            >
                              {category.name}
                            </span>
                          ))}
                          
                          {/* Colores */}
                          {offerProduct.colors && offerProduct.colors.slice(0, 2).map((color) => (
                            <span
                              key={color.id}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700 flex items-center gap-1"
                            >
                              <span
                                className="w-2 h-2 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.name }}
                              ></span>
                              {color.name}
                            </span>
                          ))}
                          
                          {/* Talles disponibles */}
                          {offerProduct.sizes && offerProduct.sizes.length > 0 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">
                              {offerProduct.sizes.length} {offerProduct.sizes.length === 1 ? 'talle' : 'talles'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-1">
                          <p className="text-xl font-bold text-pink-600">
                            ${Number(offerProduct.active_offer.discount_price).toLocaleString('es-AR')}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-400 line-through">
                              ${Number(offerProduct.price).toLocaleString('es-AR')}
                            </p>
                            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                              Ahorrás ${(Number(offerProduct.price) - Number(offerProduct.active_offer.discount_price)).toLocaleString('es-AR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de previsualización */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm modal-bg z-[9999]"
          onClick={handleModalClick}
        >
          <div className="relative flex items-center justify-center w-full h-full p-4">
            {/* Botón de cerrar */}
            <button
              onClick={handleClosePreview}
              className="fixed top-4 right-4 sm:top-8 sm:right-8 text-white font-bold rounded-full p-2 z-[10001] shadow-2xl hover:bg-white/10 transition-all bg-black/30"
              aria-label="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Controles de navegación entre imágenes */}
            {orderedImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev > 0 ? prev - 1 : orderedImages.length - 1));
                  }}
                  className="fixed left-4 sm:left-8 text-white font-bold rounded-full p-3 z-[10001] shadow-2xl hover:bg-white/10 transition-all bg-black/30"
                  aria-label="Anterior"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev < orderedImages.length - 1 ? prev + 1 : 0));
                  }}
                  className="fixed right-4 sm:right-8 text-white font-bold rounded-full p-3 z-[10001] shadow-2xl hover:bg-white/10 transition-all bg-black/30"
                  aria-label="Siguiente"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Imagen */}
            <div className="relative max-w-[90vw] max-h-[80vh]">
              <div className="rounded-2xl border-4 border-white shadow-2xl overflow-hidden bg-white">
                <img
                  ref={imgRef}
                  src={orderedImages.length > 0 ? getImageSrc(orderedImages[activeImage]) : '/placeholder.svg'}
                  alt={product.name}
                  className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
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
                      className={`w-2.5 h-2.5 rounded-full border-2 border-white transition-all ${
                        activeImage === index ? 'scale-125 bg-white' : 'opacity-50 bg-gray-400'
                      }`}
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