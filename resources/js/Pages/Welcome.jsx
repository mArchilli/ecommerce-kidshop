import React, { useEffect } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../Pages/Ecommerce/Hero';
import FeaturedProducts from '../Pages/Ecommerce/FeaturedProducts';
import CategoryExplorer from '../Pages/Ecommerce/CategoryExplorer';
import ProductsOffers from '../Pages/Ecommerce/ProductsOffers';
import About from '../Pages/Ecommerce/About';
import PaymentMethods from '../Pages/Ecommerce/PaymentMethods';
import FAQ from '@/Components/FAQ';
import WhatsAppCTA from '../Pages/Ecommerce/WhatsAppCTA';

const Welcome = ({ products, categories, colors, genders }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <EcommerceLayout>
      <Head title="Bienvenido" />
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-grow w-full">
          {/* Hero Section */}
          <Hero />

          {/* Featured Products Section */}
          <FeaturedProducts products={products} />

          {/* Category Explorer Section */}
          <CategoryExplorer />

          {/* Products Offers Section */}
          <ProductsOffers products={products} />

          {/* About Section */}
          <div className="w-full px-4 py-8 bg-gray-100" data-aos="fade-up">
            <About />
          </div>
          
          {/* Payment Methods Section */}
          <div className="w-full px-4 py-8" data-aos="fade-up" data-aos-delay="200">
            <PaymentMethods />
          </div>

          {/* FAQ Section */}
          <FAQ />

          {/* WhatsApp Contact Section */}
          <WhatsAppCTA />
        </main>
      </div>
    </EcommerceLayout>
  );
};

export default Welcome;