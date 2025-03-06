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
        return <ProductList products={products} categories={categories} colors={colors} genders={genders} />;
      default:
        return <Hero />;
    }
  };

  return (
    <EcommerceLayout>
      <Head title="Bienvenido" />
      <div className="flex flex-col min-h-screen">
        <nav className="bg-gray-800 text-white p-4">
          <div className="max-w-screen-xl mx-auto">
            <ul className="flex space-x-4">
              <li>
                <button onClick={() => setActiveSection('home')} className={`px-3 py-2 rounded-md ${activeSection === 'home' ? 'bg-gray-700' : ''}`}>
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveSection('products')} className={`px-3 py-2 rounded-md ${activeSection === 'products' ? 'bg-gray-700' : ''}`}>
                  Productos
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <main className="flex-grow p-4 max-w-screen-xl mx-auto">
          {renderSection()}
        </main>
      </div>
    </EcommerceLayout>
  );
};

export default Welcome;