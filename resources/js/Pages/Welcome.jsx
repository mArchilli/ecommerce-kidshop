import React, { useEffect } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../Pages/Ecommerce/Hero';
import FeaturedProducts from '../Pages/Ecommerce/FeaturedProducts';
import CategoryExplorer from '../Pages/Ecommerce/CategoryExplorer';
import CombosList from '../Pages/Ecommerce/CombosList';
import ProductsOffers from '../Pages/Ecommerce/ProductsOffers';
import About from '../Pages/Ecommerce/About';
import FAQ from '@/Components/FAQ';
import WhatsAppCTA from '../Pages/Ecommerce/WhatsAppCTA';

const Welcome = ({ products, categories, colors, genders, offersProducts, featuredProducts, activeCombos }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <EcommerceLayout>
      <Head>
        <title>La Tienda de los Niños | Ropa infantil y combos para niños y niñas</title>
        <meta
          name="description"
          content="Tienda online de ropa para niños y niñas. Comprá prendas de calidad y combos armables con descuento. Envíos a todo el país."
        />
        <meta
          name="keywords"
          content="ropa para niños, ropa para niñas, ropa infantil, combos de ropa para niños, tienda de ropa infantil, ropa niños online, indumentaria infantil, combos con descuento, ropa para bebés"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="La Tienda de los Niños" />
        <meta name="language" content="es-AR" />
        <meta name="theme-color" content="#ec4899" />
        <link rel="canonical" href="/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="La Tienda de los Niños" />
        <meta property="og:locale" content="es_AR" />
        <meta
          property="og:title"
          content="La Tienda de los Niños | Ropa infantil y combos para niños y niñas"
        />
        <meta
          property="og:description"
          content="Ropa cómoda y de calidad para niños y niñas, con combos armables al mejor precio. Comprá online y recibí en todo el país."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:image:alt" content="Logo La Tienda de los Niños" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="La Tienda de los Niños | Ropa infantil y combos"
        />
        <meta
          name="twitter:description"
          content="Ropa para niños y niñas y combos armables con descuento. Envíos a todo el país."
        />
        <meta name="twitter:image" content="/images/logo.png" />

        {/* Datos estructurados Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ClothingStore',
            name: 'La Tienda de los Niños',
            description:
              'Tienda online de ropa para niños y niñas con combos armables al mejor precio.',
            image: '/images/logo.png',
            url: typeof window !== 'undefined' ? window.location.origin : '/',
            areaServed: 'AR',
            currenciesAccepted: 'ARS',
          })}
        </script>
      </Head>
      <div className="flex flex-col min-h-screen font-sans">
        <main className="flex-grow w-full bg-gradient-to-br from-white via-pink-50 to-cyan-50">
          {/* Hero Section */}
          <Hero />

          {/* Combos Section */}
          <CombosList combos={activeCombos} />
          <div className="flex justify-center -mt-4 pb-12">
            <Link
              href={route('catalog.index')}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Ver todos los combos →
            </Link>
          </div>

          {/* <FeaturedProducts products={featuredProducts} /> */}

          {/* Products Offers Section */}
          <ProductsOffers products={offersProducts} />

          {/* Category Explorer Section */}
          <CategoryExplorer />

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