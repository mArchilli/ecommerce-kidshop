import React, { useEffect } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../Pages/Ecommerce/Hero';
import FeaturedProducts from '../Pages/Ecommerce/FeaturedProducts';
import About from '../Pages/Ecommerce/About';
import PaymentMethods from '../Pages/Ecommerce/PaymentMethods';
import Map from '../Pages/Ecommerce/Map';
import Contact from '../Pages/Ecommerce/Contact';

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

          {/* About Section */}
          <div className="w-full px-4 py-8 bg-gray-100" data-aos="fade-up">
            <About />
          </div>
          
          {/* Payment Methods Section */}
          <div className="w-full px-4 py-8" data-aos="fade-up" data-aos-delay="200">
            <PaymentMethods />
          </div>

          {/* Map and Contact Section */}
          <section className="w-full px-4 py-12 bg-gray-100" data-aos="fade-up" data-aos-delay="400">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
              <div className="order-1 lg:order-none h-full" data-aos="fade-right" data-aos-delay="600">
                <Map />
              </div>
              <div className="order-2 lg:order-none h-full" data-aos="fade-left" data-aos-delay="600">
                <Contact />
              </div>
            </div>
          </section>
        </main>
      </div>
    </EcommerceLayout>
  );
};

export default Welcome;