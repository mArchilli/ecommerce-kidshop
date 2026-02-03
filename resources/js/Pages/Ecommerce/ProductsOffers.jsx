import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const ProductsOffers = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Manejar productos paginados o array directo
  const productsList = products?.data || products || [];
  
  // Filtrar productos con ofertas activas (puede venir como active_offer o activeOffer)
  const offeredProducts = Array.isArray(productsList) 
    ? productsList.filter(product => product.active_offer || product.activeOffer) 
    : [];

  // Si no hay productos en oferta, no mostrar nada
  if (offeredProducts.length === 0) {
    return null;
  }

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const productsPerView = isMobile ? 1 : 4;
  const showCarousel = offeredProducts.length > 5;

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? offeredProducts.length - productsPerView : prev - 1));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('next');
    setCurrentIndex((prev) => (prev >= offeredProducts.length - productsPerView ? 0 : prev + 1));
  };

  // Manejar swipe en mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getVisibleProducts = () => {
    if (!showCarousel) return offeredProducts;
    
    const visible = [];
    for (let i = -1; i <= productsPerView; i++) {
      const index = (currentIndex + i + offeredProducts.length) % offeredProducts.length;
      visible.push({ ...offeredProducts[index], position: i });
    }
    return visible;
  };

  const getCardStyle = (position) => {
    if (!showCarousel) return {};
    
    const baseTransition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    
    if (position === -1) {
      // Producto anterior (izquierda, detrás)
      return {
        transform: isMobile ? 'translateX(-100%)' : 'translateX(-80%) scale(0.7) rotateY(15deg)',
        opacity: isMobile ? 0 : 0.3,
        zIndex: 1,
        pointerEvents: 'none',
        transition: baseTransition,
        filter: isMobile ? 'blur(0px)' : 'blur(1px)',
      };
    } else if (position === productsPerView) {
      // Producto siguiente (derecha, detrás)
      return {
        transform: isMobile ? 'translateX(100%)' : 'translateX(80%) scale(0.7) rotateY(-15deg)',
        opacity: isMobile ? 0 : 0.3,
        zIndex: 1,
        pointerEvents: 'none',
        transition: baseTransition,
        filter: isMobile ? 'blur(0px)' : 'blur(1px)',
      };
    } else if (position >= 0 && position < productsPerView) {
      // Productos visibles en el centro
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 10,
        transition: baseTransition,
        filter: 'blur(0px)',
      };
    }
    return {};
  };

  const getImageSrc = (imagePath) => {
    if (!imagePath) return '/placeholder.svg';
    if (imagePath.startsWith('http')) return imagePath;
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  };

  // Helper para obtener la oferta activa (soporta ambos formatos)
  const getActiveOffer = (product) => {
    return product.active_offer || product.activeOffer;
  };

  return (
    <section className="w-full px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de la sección */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Ofertas Especiales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¡No te pierdas estas increíbles promociones por tiempo limitado!
          </p>
        </div>

        {/* Grid de productos con carrusel */}
        <div className="relative">
          {/* Flechas de navegación (solo desktop) */}
          {showCarousel && (
            <>
              <button
                onClick={handlePrev}
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full p-4 shadow-xl hover:scale-110 transition-all duration-300 group"
                style={{ backgroundColor: '#FF6B9D', marginLeft: '-20px' }}
                data-aos="fade-right"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-white transition-colors" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNext}
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full p-4 shadow-xl hover:scale-110 transition-all duration-300 group"
                style={{ backgroundColor: '#FF6B9D', marginRight: '-20px' }}
                data-aos="fade-left"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-white transition-colors" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Contenedor del carrusel */}
          <div 
            className={`${showCarousel ? (isMobile ? 'overflow-x-auto scrollbar-hide px-4' : 'overflow-hidden px-4 md:px-12') : ''}`} 
            style={{ perspective: isMobile ? 'none' : '1500px' }}
          >
            <div className={`${
              showCarousel 
                ? (isMobile ? 'flex gap-4 snap-x snap-mandatory' : 'flex items-center justify-center gap-4 md:gap-6 relative')
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            }`} style={{ transformStyle: isMobile ? 'flat' : 'preserve-3d' }}>
              {showCarousel ? (
                (isMobile ? productsWithOffers : getVisibleProducts()).map((product, index) => {
                  const cardStyle = isMobile ? {} : getCardStyle(product.position);
                  const isVisible = isMobile ? true : (product.position >= 0 && product.position < productsPerView);
                  
                  return (
                    <div
                      key={`${product.id}-${index}`}
                      className={`${isMobile ? 'snap-center flex-shrink-0' : ''} transition-all ease-out ${isTransitioning ? 'duration-600' : 'duration-300'}`}
                      style={{
                        flex: isMobile ? '0 0 85%' : (isVisible ? '0 0 calc(25% - 18px)' : '0 0 calc(25% - 18px)'),
                        position: 'relative',
                        transformStyle: isMobile ? 'flat' : 'preserve-3d',
                        ...cardStyle,
                      }}
                    >
                      <Link
                        href={isVisible ? route('products.show', product.id) : '#'}
                        className={`block ${isVisible ? 'group' : ''}`}
                        onClick={(e) => !isVisible && e.preventDefault()}
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-pink-200">
                          {/* Imagen del producto */}
                          <div className="relative aspect-[4/3] md:aspect-square overflow-hidden bg-gray-100">
                            <img
                              src={product.images && product.images.length > 0 
                                ? getImageSrc(product.images[0]) 
                                : '/placeholder.svg'
                              }
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                            />
                            
                            {/* Badge de oferta con descuento */}
                            {getActiveOffer(product) && (
                              <div className="absolute top-2 md:top-3 right-2 md:right-3">
                                <div className="rounded-full px-2 md:px-3 py-1 md:py-2 shadow-lg font-bold text-white text-xs md:text-sm"
                                  style={{ backgroundColor: '#FF6B9D' }}>
                                  -{Math.round(getActiveOffer(product).discount_percentage)}% OFF
                                </div>
                              </div>
                            )}

                            {/* Badge de género */}
                            {product.gender && (
                              <div className="absolute top-2 md:top-3 left-2 md:left-3">
                                <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-bold text-white shadow-md"
                                  style={{ backgroundColor: '#9B59B6' }}>
                                  {product.gender.name}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Información del producto */}
                          <div className="p-3 md:p-5">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                              {product.name}
                            </h3>

                            {/* Precios con oferta */}
                            <div className="flex items-center gap-2 mb-2 md:mb-3">
                              {getActiveOffer(product) ? (
                                <>
                                  <span className="text-lg md:text-xl font-black" style={{ color: '#FF6B9D' }}>
                                    ${Number(getActiveOffer(product).discount_price).toLocaleString('es-AR')}
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    ${Number(product.price).toLocaleString('es-AR')}
                                  </span>
                                </>
                              ) : (
                                <span className="text-2xl font-black" style={{ color: '#FF6B9D' }}>
                                  ${Number(product.price).toLocaleString('es-AR')}
                                </span>
                              )}
                            </div>

                            {product.categories && product.categories.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {product.categories.slice(0, 2).map((category) => (
                                  <span
                                    key={category.id}
                                    className="text-xs px-2 py-1 rounded-lg bg-pink-50 text-pink-700 font-medium"
                                  >
                                    {category.name}
                                  </span>
                                ))}
                                {product.categories.length > 2 && (
                                  <span className="text-xs px-2 py-1 rounded-lg bg-pink-50 text-pink-700 font-medium">
                                    +{product.categories.length - 2}
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-pink-100">
                              <span className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors flex items-center gap-2">
                                Ver oferta
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  className="h-4 w-4 group-hover:translate-x-1 transition-transform" 
                                  fill="none" 
                                  viewBox="0 0 24 24" 
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                offeredProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={route('products.show', product.id)}
                    className="group"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-pink-200">
                      {/* Imagen del producto */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.images && product.images.length > 0 
                            ? getImageSrc(product.images[0]) 
                            : '/placeholder.svg'
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badge de oferta con descuento */}
                        {getActiveOffer(product) && (
                          <div className="absolute top-3 right-3">
                            <div className="rounded-full px-3 py-2 shadow-lg font-bold text-white text-sm"
                              style={{ backgroundColor: '#FF6B9D' }}>
                              -{Math.round(getActiveOffer(product).discount_percentage)}% OFF
                            </div>
                          </div>
                        )}

                        {/* Badge de género */}
                        {product.gender && (
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                              style={{ backgroundColor: '#9B59B6' }}>
                              {product.gender.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Información del producto */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Precios con oferta */}
                        <div className="flex items-center gap-2 mb-3">
                          {getActiveOffer(product) ? (
                            <>
                              <span className="text-xl font-black" style={{ color: '#FF6B9D' }}>
                                ${Number(getActiveOffer(product).discount_price).toLocaleString('es-AR')}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${Number(product.price).toLocaleString('es-AR')}
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-black" style={{ color: '#FF6B9D' }}>
                              ${Number(product.price).toLocaleString('es-AR')}
                            </span>
                          )}
                        </div>

                        {product.categories && product.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {product.categories.slice(0, 2).map((category) => (
                              <span
                                key={category.id}
                                className="text-xs px-2 py-1 rounded-lg bg-pink-50 text-pink-700 font-medium"
                              >
                                {category.name}
                              </span>
                            ))}
                            {product.categories.length > 2 && (
                              <span className="text-xs px-2 py-1 rounded-lg bg-pink-50 text-pink-700 font-medium">
                                +{product.categories.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-pink-100">
                          <span className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors flex items-center gap-2">
                            Ver oferta
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 group-hover:translate-x-1 transition-transform" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsOffers;
