import React from 'react';

const About = () => {
  return (
    <div className="bg-black p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Sobre Nosotros</h2>
      <p className="text-white mb-4">
        Somos una tienda de ecommerce dedicada a ofrecer los mejores productos a nuestros clientes. Nuestro objetivo es proporcionar una experiencia de compra excepcional y satisfacer las necesidades de nuestros clientes con productos de alta calidad.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">Nuestra Misión</h3>
          <p className="text-white">
            Nuestra misión es brindar productos de alta calidad a precios competitivos, asegurando la satisfacción de nuestros clientes a través de un excelente servicio al cliente.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">Nuestros Valores</h3>
          <ul className="list-disc list-inside text-white">
            <li>Calidad</li>
            <li>Compromiso</li>
            <li>Innovación</li>
            <li>Satisfacción del Cliente</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-4 text-white">Nuestro Equipo</h3>
        <p className="text-white">
          Contamos con un equipo de profesionales dedicados y apasionados por ofrecer el mejor servicio y productos a nuestros clientes. Cada miembro de nuestro equipo aporta su experiencia y conocimientos para garantizar una experiencia de compra inigualable.
        </p>
      </div>
    </div>
  );
};

export default About;