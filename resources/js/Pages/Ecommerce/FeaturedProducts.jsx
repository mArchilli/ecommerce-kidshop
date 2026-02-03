import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

const FeaturedProducts = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Manejar productos paginados o array directo
  const productsList = products?.data || products || [];
  
  // Filtrar productos destacados
  const featuredProducts = Array.isArray(productsList) 
    ? productsList.filter(product => product.is_featured) 
    : [];

  // Si no hay productos destacados, no mostrar nada
  if (featuredProducts.length === 0) {
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
  const showCarousel = featuredProducts.length > 5;

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? featuredProducts.length - productsPerView : prev - 1));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('next');
    setCurrentIndex((prev) => (prev >= featuredProducts.length - productsPerView ? 0 : prev + 1));
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
    if (!showCarousel) return featuredProducts;
    
    const visible = [];
    for (let i = -1; i <= productsPerView; i++) {
      const index = (currentIndex + i + featuredProducts.length) % featuredProducts.length;
      visible.push({ ...featuredProducts[index], position: i });
    }
    return visible;
  };

  const getCardStyle = (position) => {
    if (!showCarousel) return {};
    
    const baseTransition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
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

  return (
    <section className="w-full px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de la sección */}
        <div className="text-left mb-12 px-4" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Productos destacados
          </h2>
          <p className="text-lg text-gray-600">
            Descubri nuestra selección especial de prendas 
          </p>
        </div>

        {/* Grid de productos con carrusel */}
        <div className="relative">
          {/* Flechas de navegación (solo desktop) */}
          {showCarousel && !isMobile && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-0 top-1/3 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-3 md:p-4 shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 group border border-gray-100"
                style={{ marginLeft: window.innerWidth >= 768 ? '-20px' : '0' }}
                data-aos="fade-right"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 md:h-6 md:w-6 text-gray-800 group-hover:text-cyan-600 transition-colors duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-0 top-1/3 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-3 md:p-4 shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 group border border-gray-100"
                style={{ marginRight: window.innerWidth >= 768 ? '-20px' : '0' }}
                data-aos="fade-left"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 md:h-6 md:w-6 text-gray-800 group-hover:text-cyan-600 transition-colors duration-200" 
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
            className={`${showCarousel ? (isMobile ? 'overflow-x-auto scrollbar-hide px-4' : 'overflow-hidden px-4 md:px-12 pt-8 pb-16') : ''}`} 
            style={{ perspective: isMobile ? 'none' : '1500px' }}
          >
            <div className={`${
              showCarousel 
                ? (isMobile ? 'flex gap-4 snap-x snap-mandatory' : 'flex items-stretch justify-center gap-4 md:gap-6 relative')
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            }`} style={{ transformStyle: isMobile ? 'flat' : 'preserve-3d' }}>
              {showCarousel ? (
                (isMobile ? featuredProducts : getVisibleProducts()).map((product, index) => {
                  const cardStyle = isMobile ? {} : getCardStyle(product.position);
                  const isVisible = isMobile ? true : (product.position >= 0 && product.position < productsPerView);
                  
                  return (
                    <div
                      key={`${product.id}-${index}`}
                      className={`${isMobile ? 'snap-center flex-shrink-0' : ''} transition-all ease-out ${isTransitioning ? 'duration-300' : 'duration-200'}`}
                      style={{
                        flex: isMobile ? '0 0 85%' : (isVisible ? '0 0 calc(25% - 18px)' : '0 0 calc(25% - 18px)'),
                        position: 'relative',
                        transformStyle: isMobile ? 'flat' : 'preserve-3d',
                        ...cardStyle,
                      }}
                    >
                      <Link
                        href={route('products.show', product.id)}
                        className="group block h-full"
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-cyan-200 h-full flex flex-col">
                          <div className="w-full relative aspect-[4/3] md:aspect-square bg-gradient-to-br from-cyan-50 to-purple-50">
                          <img
                            src={product.images && product.images.length > 0 
                              ? getImageSrc(product.images[0]) 
                              : '/placeholder.svg'
                            }
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                          />
                          
                          {/* Badge de oferta con descuento */}
                          {product.active_offer && (
                            <div className="absolute top-2 md:top-3 right-2 md:right-3 z-10">
                              <div className="rounded-full px-2 md:px-3 py-1 md:py-2 shadow-lg font-bold text-white text-xs md:text-sm bg-gradient-to-r from-pink-500 to-rose-500">
                                -{Math.round(product.active_offer.discount_percentage)}% OFF
                              </div>
                            </div>
                          )}

                          {/* Badge de producto destacado */}
                          <div className="absolute top-2 md:top-3 left-2 md:left-3 z-10">
                            <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-xl border-2 md:border-4 border-white">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                className="w-4 h-4 md:w-6 md:h-6"
                                style={{ fill: '#FFB800' }}
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-3 md:p-5 flex-1 flex flex-col">
                          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                            {product.name}
                          </h3>

                          {/* Precios con oferta */}
                          <div className="flex items-center gap-2 mb-2 md:mb-3">
                            {product.active_offer ? (
                              <>
                                <span className="text-lg md:text-xl font-black text-cyan-600">
                                  ${Number(product.active_offer.discount_price).toLocaleString('es-AR')}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${Number(product.price).toLocaleString('es-AR')}
                                </span>
                              </>
                            ) : (
                              <span className="text-2xl font-black text-cyan-600">
                                ${Number(product.price).toLocaleString('es-AR')}
                              </span>
                            )}
                          </div>

                          {/* Etiquetas de categorías */}
                          {product.categories && product.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.categories.slice(0, 2).map((category) => (
                                <span
                                  key={category.id}
                                  className="text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold"
                                >
                                  {category.name}
                                </span>
                              ))}
                              {product.categories.length > 2 && (
                                <span className="text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold">
                                  +{product.categories.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {/* Etiquetas de colores y talles */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {/* Colores */}
                            {product.colors && product.colors.slice(0, 2).map((color) => (
                              <span
                                key={color.id}
                                className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold flex items-center gap-1"
                              >
                                <span
                                  className="w-2 h-2 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color.name }}
                                ></span>
                                {color.name}
                              </span>
                            ))}
                            {product.colors && product.colors.length > 2 && (
                              <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold">
                                +{product.colors.length - 2}
                              </span>
                            )}
                            
                            {/* Talles específicos */}
                            {product.sizes && product.sizes.slice(0, 3).map((size) => (
                              <span
                                key={size.id}
                                className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700 font-semibold"
                              >
                                {size.name}
                              </span>
                            ))}
                            {product.sizes && product.sizes.length > 3 && (
                              <span className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700 font-semibold">
                                +{product.sizes.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="mt-auto pt-4 border-t border-cyan-100">
                            <span className="text-sm font-bold text-gray-900 group-hover:text-cyan-600 transition-colors flex items-center gap-2">
                              Ver prenda
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
                featuredProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={route('products.show', product.id)}
                    className="group block h-full"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-2 border-cyan-200 h-full flex flex-col">
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
                        {product.active_offer && (
                          <div className="absolute top-3 right-3">
                            <div className="rounded-full px-3 py-2 shadow-lg font-bold text-white text-sm bg-gradient-to-r from-pink-500 to-rose-500">
                              -{Math.round(product.active_offer.discount_percentage)}% OFF
                            </div>
                          </div>
                        )}

                        {/* Badge de producto destacado */}
                        <div className="absolute top-3 left-3">
                          <div className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-2xl p-2 shadow-xl border-4 border-white">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              className="w-6 h-6"
                              style={{ fill: '#FFB800' }}
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Información del producto */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Precios con oferta */}
                        <div className="flex items-center gap-2 mb-3">
                          {product.active_offer ? (
                            <>
                              <span className="text-xl font-black text-cyan-600">
                                ${Number(product.active_offer.discount_price).toLocaleString('es-AR')}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${Number(product.price).toLocaleString('es-AR')}
                              </span>
                            </>
                          ) : (
                            <span className="text-2xl font-black text-cyan-600">
                              ${Number(product.price).toLocaleString('es-AR')}
                            </span>
                          )}
                        </div>

                        {/* Etiquetas de categorías */}
                        {product.categories && product.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.categories.slice(0, 2).map((category) => (
                              <span
                                key={category.id}
                                className="text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold"
                              >
                                {category.name}
                              </span>
                            ))}
                            {product.categories.length > 2 && (
                              <span className="text-xs px-2 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold">
                                +{product.categories.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Etiquetas de colores y talles */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {/* Colores */}
                          {product.colors && product.colors.slice(0, 2).map((color) => (
                            <span
                              key={color.id}
                              className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold flex items-center gap-1"
                            >
                              <span
                                className="w-2 h-2 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.name }}
                              ></span>
                              {color.name}
                            </span>
                          ))}
                          {product.colors && product.colors.length > 2 && (
                            <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold">
                              +{product.colors.length - 2}
                            </span>
                          )}
                          
                          {/* Talles específicos */}
                          {product.sizes && product.sizes.slice(0, 3).map((size) => (
                            <span
                              key={size.id}
                              className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700 font-semibold"
                            >
                              {size.name}
                            </span>
                          ))}
                          {product.sizes && product.sizes.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-lg bg-green-100 text-green-700 font-semibold">
                              +{product.sizes.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto pt-4 border-t border-cyan-100">
                          <span className="text-sm font-bold text-gray-900 hover:text-cyan-600 transition-colors flex items-center gap-2">
                            Ver prenda
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

        {/* Botón para ver todos los productos */}
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="400">
          <Link
            href={route('catalog.index')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 hover:scale-105 transform transition-all shadow-lg hover:shadow-xl"
          >
            Ver todo el catálogo
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
