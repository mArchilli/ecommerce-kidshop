import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';
import Hero from '../Components/EcommercePage/Hero';
import ProductList from '../Components/EcommercePage/ProductList';

const Welcome = ({ products }) => {
  return (
    <EcommerceLayout>
      <Head title="Bienvenido" />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Hero />
          <ProductList products={products} />
        </main>
      </div>
    </EcommerceLayout>
  );
};

export default Welcome;