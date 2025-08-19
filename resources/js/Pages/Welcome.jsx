import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';
import Hero from '../Pages/Ecommerce/Hero';

const Welcome = ({ products, categories, colors, genders }) => {
  return (
    <EcommerceLayout>
      <Head title="Bienvenido" />
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-grow w-full ">
          <Hero />
        </main>
      </div>
    </EcommerceLayout>
  );
};

export default Welcome;