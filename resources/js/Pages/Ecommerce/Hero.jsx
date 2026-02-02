import React from 'react';
import { Link } from '@inertiajs/react';

const Hero = () => {
  const scrollToWhatsApp = () => {
    const whatsappSection = document.getElementById('whatsapp-section');
    if (whatsappSection) {
      whatsappSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative z-0 px-8"
      style={{
        backgroundImage: "url('/images/fondo-hero.png')",
      }}
      data-aos="fade-in"
    >
      {/* Contenido centrado hacia la derecha */}
      <div className="max-w-2xl mx-auto md:ml-auto md:mr-[260px] md:mt-32 text-center md:text-left" data-aos="fade-left" data-aos-delay="200">
        {/* Logo solo en mobile */}
        <div className="mb-6 md:hidden flex justify-center">
          <img 
            src="/images/logo.png" 
            alt="La Tienda de los Niños" 
            className="h-24 w-auto"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}
          />
        </div>
        
        <h1 
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight"
          style={{ 
            textShadow: '0 4px 8px rgba(0,0,0,0.6)',
            fontFamily: 'Baloo 2, Poppins, Nunito, Rubik, system-ui, sans-serif'
          }}
        >
          Vestimos infancias felices
        </h1>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <p 
            className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            En la Tienda de los Niños nos especializamos en ropa cómoda y de calidad para niños y niñas, diseñada para acompañar cada aventura.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/catalog"
            className="px-8 py-4 text-lg md:text-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg hover:shadow-xl"
          >
            Ver catálogo de ropa
          </Link>
          <button
            onClick={scrollToWhatsApp}
            className="px-8 py-4 text-lg md:text-xl bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            Contacta con nosotros
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;