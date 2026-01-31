import React from 'react';
import { Link } from '@inertiajs/react';

const Hero = () => {
  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative z-0 px-8"
      style={{
        backgroundImage: "url('/images/fondo-hero.png')",
      }}
      data-aos="fade-in"
    >
      {/* Contenido centrado hacia la derecha */}
      <div className="max-w-2xl ml-auto text-left" style={{ marginRight: '260px' }} data-aos="fade-left" data-aos-delay="200">
        <h1 
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight"
          style={{ 
            textShadow: '0 4px 8px rgba(0,0,0,0.6)',
            fontFamily: 'Baloo 2, Poppins, Nunito, Rubik, system-ui, sans-serif'
          }}
        >
          <span className="text-cyan-400">Vestimos</span> infancias felices
        </h1>
        <p 
          className="text-lg md:text-xl mb-8 text-white leading-relaxed"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
        >
          En la Tienda de los Niños nos especializamos en ropa cómoda y de calidad para niños y niñas, diseñada para acompañar cada aventura.
        </p>
        <div className="flex gap-4">
          <Link
            href="/catalogo"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all shadow-lg hover:shadow-xl"
          >
            Ver catálogo de ropa
          </Link>
          <Link
            href="/contacto"
            className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            Contacta con nosotros
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;