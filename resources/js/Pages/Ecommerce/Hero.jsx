import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from './About';
import Map from './Map';
import PaymentMethods from './PaymentMethods';
import Contact from './Contact';

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación en milisegundos
      once: true, // Si la animación debe ocurrir solo una vez
    });
  }, []);

  return (
    <div className="">
      <div className="h-screen flex items-center justify-center" data-aos="fade-in">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-black mb-6" data-aos="fade-up">
            La Tienda de los Niños
          </h1>
          <p className="text-xl text-black mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Descubre los mejores productos con diseños increíbles y calidad insuperable. Explora nuestro catálogo y encontra lo que buscas.
          </p>
          <a 
            href="#products" 
            className="inline-block bg-black text-white px-8 py-4 rounded-md text-lg hover:bg-white hover:text-black hover:border-black border border-black transition-colors duration-300"
            data-aos="fade-up" data-aos-delay="400"
          >
            Ver Productos
          </a>
        </div>
      </div>
      {/* Sección adicional (opcional) */}
      <div className="w-full px-4 py-8" data-aos="fade-up">
        <About />
      </div>
      <div className="w-full px-4 py-8" data-aos="fade-up" data-aos-delay="200">
        <Map />
      </div>
      <div className="w-full px-4 py-8" data-aos="fade-up" data-aos-delay="400">
        <PaymentMethods />
      </div>
      <div className="w-full px-4 py-8" data-aos="fade-up" data-aos-delay="600">
        <Contact />
      </div>
    </div>
  );
};

export default Hero;