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
      }, 600);
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

  return (
    <section className="w-full px-4 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de la sección */}
        <div className="text-left mb-12 px-4" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-yellow-400"></div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-8 h-8"
              style={{ fill: '#FFB800' }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600">
            Descubre nuestra selección especial de productos favoritos
          </p>
        </div>

        {/* Grid de productos con carrusel */}
        <div className="relative">
          {/* Flechas de navegación (solo desktop) */}
          {showCarousel && (
            <>
              <button
                onClick={handlePrev}
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-4 shadow-xl hover:scale-110 transition-all duration-300 group"
                style={{ marginLeft: '-20px' }}
                data-aos="fade-right"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-gray-800 group-hover:text-yellow-600 transition-colors" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNext}
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-4 shadow-xl hover:scale-110 transition-all duration-300 group"
                style={{ marginRight: '-20px' }}
                data-aos="fade-left"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-gray-800 group-hover:text-yellow-600 transition-colors" 
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
            className={`${showCarousel ? 'overflow-hidden px-4 md:px-12' : ''}`} 
            style={{ perspective: isMobile ? 'none' : '1500px' }}
            onTouchStart={showCarousel ? handleTouchStart : undefined}
            onTouchMove={showCarousel ? handleTouchMove : undefined}
            onTouchEnd={showCarousel ? handleTouchEnd : undefined}
          >
            <div className={`${
              showCarousel 
                ? 'flex items-center justify-center gap-4 md:gap-6 relative' 
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            }`} style={{ transformStyle: isMobile ? 'flat' : 'preserve-3d' }}>
              {showCarousel ? (
                getVisibleProducts().map((product, index) => {
                  const cardStyle = getCardStyle(product.position);
                  const isVisible = product.position >= 0 && product.position < productsPerView;
                  
                  return (
                    <div
                      key={`${product.id}-${index}`}
                      className={`transition-all ease-out ${isTransitioning ? 'duration-600' : 'duration-300'}`}
                      style={{
                        flex: isVisible ? (isMobile ? '0 0 100%' : '0 0 calc(25% - 18px)') : (isMobile ? '0 0 100%' : '0 0 calc(25% - 18px)'),
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        ...cardStyle,
                      }}
                    >
                      <Link
                        href={isVisible ? route('products.show', product.id) : '#'}
                        className={`block ${isVisible ? 'group' : ''}`}
                        onClick={(e) => !isVisible && e.preventDefault()}
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105">
                          {/* Imagen del producto */}
                          <div className="relative aspect-square overflow-hidden bg-gray-100">
                            <img
                              src={product.images && product.images.length > 0 
                                ? getImageSrc(product.images[0]) 
                                : '/placeholder.svg'
                              }
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                            />
                            
                            {/* Badge de destacado */}
                            <div className="absolute top-3 right-3">
                              <div className="bg-white rounded-full p-2 shadow-lg">
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  className="w-5 h-5"
                                  style={{ fill: '#FFB800' }}
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              </div>
                            </div>

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
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                              {product.name}
                            </h3>

                            <div className="flex items-center justify-between mb-3">
                              <span className="text-2xl font-black" style={{ color: '#FFB800' }}>
                                ${Number(product.price).toLocaleString('es-AR')}
                              </span>
                            </div>

                            {product.categories && product.categories.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {product.categories.slice(0, 2).map((category) => (
                                  <span
                                    key={category.id}
                                    className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium"
                                  >
                                    {category.name}
                                  </span>
                                ))}
                                {product.categories.length > 2 && (
                                  <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
                                    +{product.categories.length - 2}
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <span className="text-sm font-bold text-gray-900 group-hover:text-yellow-600 transition-colors flex items-center gap-2">
                                Ver detalles
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
                    className="group"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
                        
                        {/* Badge de destacado */}
                        <div className="absolute top-3 right-3">
                          <div className="bg-white rounded-full p-2 shadow-lg">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              className="w-5 h-5"
                              style={{ fill: '#FFB800' }}
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                        </div>

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
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-black" style={{ color: '#FFB800' }}>
                            ${Number(product.price).toLocaleString('es-AR')}
                          </span>
                        </div>

                        {product.categories && product.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {product.categories.slice(0, 2).map((category) => (
                              <span
                                key={category.id}
                                className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium"
                              >
                                {category.name}
                              </span>
                            ))}
                            {product.categories.length > 2 && (
                              <span className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
                                +{product.categories.length - 2}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm font-bold text-gray-900 group-hover:text-yellow-600 transition-colors flex items-center gap-2">
                            Ver detalles
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white hover:scale-105 transform transition-all shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#FFB800' }}
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
