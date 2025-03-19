import React, { useState } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';
import Hero from '../Pages/Ecommerce/Hero';
import ProductList from '../Pages/Ecommerce/ProductList';

const Welcome = ({ products, categories, colors, genders }) => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'products':
        return (
          <ProductList
            products={products}
            categories={categories}
            colors={colors}
            genders={genders}
          />
        );
      default:
        return <Hero />;
    }
  };

  return (
    <EcommerceLayout>
      <Head title="Bienvenido" />
      <div className="flex flex-col min-h-screen">
        <nav className="bg-black p-4">
          <div className="w-full">
            <ul className="flex space-x-4 justify-center">
              <li>
                <button
                  onClick={() => setActiveSection('home')}
                  className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                    activeSection === 'home'
                      ? 'bg-black text-white'
                      : 'text-white hover:bg-black hover:text-white hover:border-white'
                  }`}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('products')}
                  className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                    activeSection === 'products'
                      ? 'bg-black text-white'
                      : 'text-white hover:bg-black hover:text-white hover:border-white'
                  }`}
                >
                  Productos
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <main className="flex-grow p-4 max-w-screen-2xl min-w-xl mx-auto">
          {renderSection()}
        </main>
      </div>
    </EcommerceLayout>
  );
};

export default Welcome;