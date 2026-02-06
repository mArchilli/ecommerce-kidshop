import React from 'react';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faComments } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  const scrollToWhatsApp = () => {
    const whatsappSection = document.getElementById('whatsapp-section');
    if (whatsappSection) {
      whatsappSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center bg-gradient-to-b from-yellow-50 via-amber-50 to-pink-50 relative z-0 overflow-hidden"
      data-aos="fade-in"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          
          {/* Logo - Izquierda */}
          <div className="flex-shrink-0 flex items-center justify-center lg:w-2/5" data-aos="fade-right" data-aos-delay="100">
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-br from-purple-300/20 via-pink-300/20 to-cyan-300/20 rounded-full blur-2xl group-hover:from-purple-300/30 group-hover:via-pink-300/30 group-hover:to-cyan-300/30 transition-all duration-700"></div>
              <img 
                src="/images/logo.png" 
                alt="La Tienda de los Niños" 
                className="relative max-h-80 md:max-h-96 lg:max-h-[500px] w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Línea divisoria */}
          <div className="flex-shrink-0 flex items-center justify-center" data-aos="fade-up" data-aos-delay="200">
            {/* Horizontal en mobile */}
            <div className="lg:hidden w-48 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            {/* Vertical en desktop */}
            <div className="hidden lg:block w-0.5 h-96 bg-gradient-to-b from-transparent via-pink-400 to-transparent mx-10"></div>
          </div>

          {/* Contenido - Derecha */}
          <div className="flex-1 text-center lg:text-left" data-aos="fade-left" data-aos-delay="300">
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
              style={{ fontFamily: 'Baloo 2, Poppins, Nunito, Rubik, system-ui, sans-serif' }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500">
                Vestimos
              </span>
              <br />
              <span className="text-gray-800">
                infancias felices
              </span>
            </h1>

            <div className="mb-8">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                En <span className="font-semibold text-pink-600">la Tienda de los Niños</span> nos especializamos en ropa cómoda y de calidad para niños y niñas, diseñada para acompañar cada aventura.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/catalog"
                className="group relative px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-cyan-500 rounded-full shadow-lg hover:shadow-2xl hover:shadow-pink-300/40 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center justify-center gap-3">
                  Ver catálogo de ropa
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <button
                onClick={scrollToWhatsApp}
                className="group px-8 py-4 text-lg font-bold text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-full hover:border-pink-400 hover:bg-white hover:text-pink-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  Contacta con nosotros
                  <FontAwesomeIcon icon={faComments} className="group-hover:scale-110 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;