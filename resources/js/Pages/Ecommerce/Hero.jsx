import React from 'react';
import About from '../Ecommerce/About';
import Contact from '../Ecommerce/Contact';
import Map from '../Ecommerce/Map';
import PaymentMethods from '../Ecommerce/PaymentMethods';

const Hero = () => {
  return (
    <div>
      <div className="relative bg-gray-800 text-white py-20 w-full">
        <div className="absolute inset-0 w-full">
          <img
            src="https://via.placeholder.com/1920x1080" // Reemplaza esta URL con la URL de tu imagen de fondo
            alt="Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative w-full px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-4">Bienvenido a Nuestra Tienda</h1>
            <p className="text-xl mb-8">Encuentra los mejores productos a los mejores precios</p>
            <a href="#products" className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition duration-300">
              Ver Productos
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <section id="about" className="mb-16">
          <About />
        </section>

        <section id="payment-methods" className="mb-16">
          <PaymentMethods />
        </section>

        <section id="location" className="mb-16">
          <Map />
        </section>

        <section id="contact" className="mb-16">
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default Hero;