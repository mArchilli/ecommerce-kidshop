import React from 'react';

const Hero = () => {
  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative z-0"
      style={{
        backgroundImage: "url('/images/Landing/tienda-los-ninios-banner.jpg')",
      }}
      data-aos="fade-in"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

      {/* Text Content */}
      <div className="text-center px-4 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-patrick" data-aos="fade-up">
          La Tienda de los Niños
        </h1>
        <p
          className="text-2xl text-white mb-8 leading-relaxed font-patrick"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Descubre los mejores productos con diseños increíbles y calidad insuperable. Explora nuestro catálogo y encontra lo que buscas.
        </p>
      </div>
    </div>
  );
};

export default Hero;