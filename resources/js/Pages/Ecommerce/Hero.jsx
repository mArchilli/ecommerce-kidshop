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
      duration: 1000, 
      once: true, 
    });
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div
        className="h-screen w-full flex items-center justify-center bg-cover bg-center relative z-0"
        style={{
          backgroundImage: "url('/images/landing/tienda-los-ninios-banner.jpg')",
        }}
        data-aos="fade-in"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        {/* Text Content */}
        <div className="text-center px-4 relative z-10">
          <h1 className="text-6xl font-bold text-white mb-6" data-aos="fade-up">
            La Tienda de los Niños
          </h1>
          <p
            className="text-xl text-white mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Descubre los mejores productos con diseños increíbles y calidad insuperable. Explora nuestro catálogo y encuentra lo que buscas.
          </p>
        </div>
      </div>

      {/* Other Sections */}
      <div className="w-full px-4 py-8" data-aos="fade-up">
        <About />
      </div>
      
      <div className="w-full px-4 py-8" data-aos="fade-up" data-aos-delay="400">
        <PaymentMethods />
      </div>

      {/* Nuevo layout con fondo suave y más respiro */}
      <section className="w-full px-4 py-12 bg-gray-50" data-aos="fade-up" data-aos-delay="600">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          <div className="order-1 lg:order-none h-full">
            <Map />
          </div>
          <div className="order-2 lg:order-none h-full" data-aos="fade-up" data-aos-delay="400">
            <Contact />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;