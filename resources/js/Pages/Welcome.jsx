import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';
import Hero from '../Pages/Ecommerce/Hero';

const Welcome = ({ products, categories, colors, genders }) => {
  return (
    <EcommerceLayout>
      <Head title="Bienvenido" />
      <div className="flex flex-col min-h-screen">
        <nav className="bg-black p-4">
          <div className="w-full">
            <ul className="flex space-x-4 justify-center">
              <li>
                <Link
                  href={route('welcome')}
                  className={`px-2 py-1 rounded-md transition-colors duration-300 ${
                    route().current('welcome')
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-black hover:text-white hover:border-white'
                  }`}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href={route('catalog.index')}
                  className={`px-2 py-1 rounded-md transition-colors duration-300 ${
                    route().current('catalog.index')
                      ? 'bg-white text-black'
                      : 'text-white hover:bg-black hover:text-white hover:border-white'
                  }`}
                >
                  Catalogo
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="flex-grow w-full">
          <Hero />
        </main>
      </div>
    </EcommerceLayout>
  );
};

export default Welcome;