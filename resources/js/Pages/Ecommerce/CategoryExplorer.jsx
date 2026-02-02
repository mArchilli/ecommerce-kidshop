import React from 'react';
import { Link } from '@inertiajs/react';

const CategoryExplorer = () => {
  const genders = [
    {
      name: 'Nene',
      slug: 'Niños',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 64 64" fill="currentColor">
          <circle cx="32" cy="18" r="10"/>
          <path d="M32 30c-8 0-14 4-14 10v16h28V40c0-6-6-10-14-10z"/>
          <path d="M50 8l-8 8m0-8l8 8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      hoverGradient: 'hover:from-blue-600 hover:to-cyan-600',
      description: 'Ropa para niños'
    },
    {
      name: 'Nena',
      slug: 'Niñas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24" viewBox="0 0 64 64" fill="currentColor">
          <circle cx="32" cy="18" r="10"/>
          <path d="M32 30c-8 0-14 4-14 10v16h28V40c0-6-6-10-14-10z"/>
          <circle cx="50" cy="14" r="6" stroke="currentColor" strokeWidth="3" fill="none"/>
          <path d="M50 20v8m-4-4h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
      gradient: 'from-pink-500 to-rose-500',
      hoverGradient: 'hover:from-pink-600 hover:to-rose-600',
      description: 'Ropa para niñas'
    }
  ];

  return (
    <section className="w-full px-4 py-16 bg-gradient-to-br from-cyan-100 to-pink-100">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Explora por género
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra la ropa perfecta para cada uno
          </p>
        </div>

        {/* Grid de géneros - 2 cards centradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {genders.map((gender, index) => (
            <Link
              key={gender.slug}
              href={route('catalog.index', { gender: gender.slug })}
              className="group"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className={`relative rounded-3xl bg-gradient-to-br ${gender.gradient} ${gender.hoverGradient} p-8 md:p-12 flex flex-col items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden min-h-[320px] md:min-h-[400px]`}>
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                {/* Patrón decorativo de fondo */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
                
                {/* Icono */}
                <div className="text-white mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 drop-shadow-2xl">
                  {gender.icon}
                </div>
                
                {/* Nombre del género */}
                <h3 className="text-white font-black text-3xl md:text-4xl text-center relative z-10 drop-shadow-lg mb-3">
                  {gender.name}
                </h3>

                {/* Descripción */}
                <p className="text-white/90 font-semibold text-base md:text-lg text-center relative z-10 drop-shadow-md">
                  {gender.description}
                </p>

                {/* Flecha indicadora */}
                <div className="mt-6 text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 relative z-10">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryExplorer;
