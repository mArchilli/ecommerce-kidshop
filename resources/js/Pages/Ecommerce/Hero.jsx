import React from 'react';
import About from './About';
import Map from './Map';
import PaymentMethods from './PaymentMethods';
import Contact from './Contact';

const Hero = () => {
  return (
    <div className="">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-black mb-6">
            La Tienda de los Niños
          </h1>
          <p className="text-xl text-black mb-8 leading-relaxed">
            Descubre los mejores productos con diseños increíbles y calidad insuperable. Explora nuestro catálogo y encontra lo que buscas.
          </p>
          <a 
            href="#products" 
            className="inline-block bg-black text-white px-8 py-4 rounded-md text-lg hover:bg-white hover:text-black hover:border-black border border-black transition-colors duration-300"
          >
            Ver Productos
          </a>
        </div>
      </div>
      {/* Sección adicional (opcional) */}
      <div className="w-full px-4 py-8">
        <About />
      </div>
      <div className="w-full px-4 py-8">
        <Map />
      </div>
      <div className="w-full px-4 py-8">
        <PaymentMethods />
      </div>
      <div className="w-full px-4 py-8">
        <Contact />
      </div>
    </div>
  );
};

export default Hero;