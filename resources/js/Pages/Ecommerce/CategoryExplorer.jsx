import React from 'react';
import { Link } from '@inertiajs/react';

const CategoryExplorer = () => {
  const categories = [
    {
      name: 'Remeras',
      slug: 'remeras',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <path d="M50 14l-8-8h-4v6c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4V6h-4l-8 8v8h36v-8z"/>
          <path d="M14 24v32h36V24H14zm18 24c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
        </svg>
      ),
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      name: 'Pantalones',
      slug: 'pantalones',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <path d="M18 8h28v8H18z"/>
          <path d="M20 18h10v38h-8l-4-38z"/>
          <path d="M34 18h10l-4 38h-8V18z"/>
        </svg>
      ),
      gradient: 'from-indigo-400 to-purple-400'
    },
    {
      name: 'Buzo',
      slug: 'buzo',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <path d="M48 14l-6-6h-4v4c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4V8h-4l-6 6v6h32v-6z"/>
          <rect x="16" y="22" width="32" height="34" rx="2"/>
          <path d="M16 22v12l-6 4v-8z"/>
          <path d="M48 22v12l6 4v-8z"/>
        </svg>
      ),
      gradient: 'from-pink-400 to-rose-400'
    },
    {
      name: 'Conjunto',
      slug: 'conjunto',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <path d="M38 8l-4-4h-4v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V4h-4l-4 4v4h22v-4z"/>
          <rect x="14" y="18" width="22" height="16" rx="1"/>
          <path d="M24 36h10v20h-6l-2-20z"/>
          <path d="M28 36h10l-2 20h-6V36z"/>
        </svg>
      ),
      gradient: 'from-orange-400 to-amber-400'
    },
    {
      name: 'Shorts',
      slug: 'shorts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <rect x="18" y="12" width="28" height="6" rx="1"/>
          <path d="M20 20h10v20h-8l-2-20z"/>
          <path d="M34 20h10l-2 20h-8V20z"/>
        </svg>
      ),
      gradient: 'from-green-400 to-emerald-400'
    },
    {
      name: 'Polleras',
      slug: 'polleras',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <rect x="24" y="12" width="16" height="6" rx="1"/>
          <path d="M20 20c0-2 4-2 12-2s12 0 12 2v2H20v-2z"/>
          <path d="M18 24h28l-4 28H22l-4-28z"/>
        </svg>
      ),
      gradient: 'from-purple-400 to-fuchsia-400'
    },
    {
      name: 'Camperas',
      slug: 'camperas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <path d="M46 14l-6-6h-3v3c0 2.2-1.8 4-4 4h-2c-2.2 0-4-1.8-4-4V8h-3l-6 6v6h28v-6z"/>
          <path d="M18 22v30c0 2 1 4 2 4h4V22h-6z"/>
          <path d="M40 22v34h4c1 0 2-2 2-4V22h-6z"/>
          <rect x="26" y="22" width="12" height="34" rx="1"/>
          <line x1="32" y1="28" x2="32" y2="50" strokeWidth="2" stroke="currentColor"/>
        </svg>
      ),
      gradient: 'from-red-400 to-pink-400'
    },
    {
      name: 'Enterito',
      slug: 'enterito',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <path d="M44 10l-5-5h-3v3c0 1.7-1.3 3-3 3h-2c-1.7 0-3-1.3-3-3V5h-3l-5 5v5h24v-5z"/>
          <rect x="20" y="18" width="24" height="20" rx="2"/>
          <path d="M24 40h7v16h-6l-1-16z"/>
          <path d="M33 40h7l-1 16h-6V40z"/>
        </svg>
      ),
      gradient: 'from-teal-400 to-cyan-400'
    },
    {
      name: 'Vestidos',
      slug: 'vestidos',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" viewBox="0 0 64 64" fill="currentColor">
          <path d="M44 12l-5-5h-2v2c0 1.7-1.3 3-3 3h-4c-1.7 0-3-1.3-3-3V7h-2l-5 5v4h24v-4z"/>
          <path d="M20 18v4h24v-4H20z"/>
          <path d="M18 24h28l-6 32H24l-6-32z"/>
        </svg>
      ),
      gradient: 'from-yellow-400 to-orange-400'
    }
  ];

  return (
    <section className="w-full px-4 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-left mb-10 px-4" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Explora por Categoría
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra fácilmente lo que buscas
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={route('catalog.index', { category: category.slug })}
              className="group"
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${category.gradient} p-6 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden`}>
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                
                {/* Icono */}
                <div className="text-white mb-3 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {category.icon}
                </div>
                
                {/* Nombre de categoría */}
                <h3 className="text-white font-bold text-base md:text-lg text-center relative z-10 drop-shadow-lg">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryExplorer;
