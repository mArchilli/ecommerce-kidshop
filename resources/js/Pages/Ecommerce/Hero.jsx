import React from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center relative z-0 overflow-hidden"
      data-aos="fade-in"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 left-10 w-72 h-72 xl:w-96 xl:h-96 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 xl:w-[28rem] xl:h-[28rem] bg-pink-200/30 rounded-full blur-3xl pointer-events-none"></div>
      

      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full px-6 lg:px-12 xl:px-16 py-10 md:py-16 xl:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* Logo - Izquierda */}
          <div className="flex-shrink-0 flex items-center justify-center lg:w-2/5 pt-8 md:pt-14" data-aos="fade-right" data-aos-delay="100">
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-br from-purple-300/20 via-pink-300/20 to-cyan-300/20 rounded-full blur-2xl md:group-hover:from-purple-300/30 md:group-hover:via-pink-300/30 md:group-hover:to-cyan-300/30 transition-all duration-700"></div>
              <img
                src="/images/logo.png"
                alt="La Tienda de los Niños"
                className="relative max-h-72 sm:max-h-80 md:max-h-96 lg:max-h-[460px] xl:max-h-[560px] 2xl:max-h-[640px] w-auto object-contain drop-shadow-2xl md:group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="flex-shrink-0 flex items-center justify-center" data-aos="fade-up" data-aos-delay="200">
            {/* Horizontal en mobile */}
            <div className="lg:hidden w-48 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            {/* Vertical en desktop */}
            <div className="hidden lg:block w-0.5 h-96 xl:h-[28rem] 2xl:h-[32rem] bg-gradient-to-b from-transparent via-pink-400 to-transparent mx-8 xl:mx-12"></div>
          </div>

          {/* Contenido - Derecha */}
          <div className="flex-1 text-center lg:text-left" data-aos="fade-left" data-aos-delay="300">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold mb-4 md:mb-6 leading-tight"
              style={{ fontFamily: 'Baloo 2, Poppins, Nunito, Rubik, system-ui, sans-serif' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500">
                Ropa de niños
              </span>
              <br />
              <span className="text-gray-800">
                y combos con descuento
              </span>
            </h1>

            <div className="mb-6 md:mb-8">
              <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-gray-600 leading-relaxed max-w-xl xl:max-w-2xl mx-auto lg:mx-0 text-left">
                <span className="font-semibold text-pink-600 underline decoration-pink-400 underline-offset-2">La Tienda de los Niños</span> es tu tienda online de ropa infantil para niños y niñas: prendas cómodas y de calidad, y <strong className="font-semibold text-purple-600">combos armables al mejor precio</strong> para ahorrar en cada compra. Envíos a todo el país.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="group relative px-6 md:px-8 xl:px-10 py-3 md:py-4 xl:py-5 text-base md:text-lg xl:text-xl font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full shadow-lg hover:shadow-2xl hover:shadow-pink-300/40 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-3">
                  Registrate ya mismo!
                  <FontAwesomeIcon icon={faUserPlus} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                href="/catalog"
                className="group px-6 md:px-8 xl:px-10 py-3 md:py-4 xl:py-5 text-base md:text-lg xl:text-xl font-bold text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-full hover:border-pink-400 hover:bg-white hover:text-pink-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  Ver catálogo de ropa
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;