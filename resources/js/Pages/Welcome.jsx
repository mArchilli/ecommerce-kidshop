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
      <div className="flex flex-col min-h-screen font-sans">
        <main className="flex-grow w-full bg-gradient-to-br from-white via-pink-50 to-cyan-50">
          {/* Hero Section */}
          <Hero />

          {/* Featured Products Section */}
          <FeaturedProducts products={products} />

          {/* Category Explorer Section */}
          <CategoryExplorer />

          {/* Products Offers Section */}
          <ProductsOffers products={products} />

          {/* About & Payment Methods - Unified Section */}
          <div className="w-full">
            {/* About Section */}
            <div data-aos="fade-up">
              <About />
            </div>
            
            {/* Payment Methods Section */}
            <div data-aos="fade-up" data-aos-delay="200">
              <PaymentMethods />
            </div>
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