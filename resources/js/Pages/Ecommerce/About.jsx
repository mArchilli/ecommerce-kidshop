export default function AboutUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow border overflow-hidden">
        {/* Encabezado coherente con Map/Contact */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-4 flex items-center gap-3">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7H7v10h10V9m-4-2l4 4" />
          </svg>
          <h2 className="text-xl font-semibold">Sobre Nosotros</h2>
        </div>

        {/* Contenido */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
            {/* Columna texto */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Calidad, cercanía y buen servicio
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Somos un emprendimiento comprometido con ofrecer productos de alta calidad a precios competitivos.
                Nuestra misión es brindar la mejor experiencia de compra online a nuestros clientes.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Fundada en 2025, buscamos crecer gracias a la confianza de nuestros clientes y a nuestro compromiso con la excelencia en el servicio.
              </p>

              {/* Features en grid */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-black text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Calidad garantizada</h4>
                    <p className="text-sm text-gray-600 mt-1">Cada prenda pasa por un control de calidad antes de enviarse.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg border">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-black text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Atención cercana</h4>
                    <p className="text-sm text-gray-600 mt-1">Soporte personalizado para ayudarte en todo momento.</p>
                  </div>
                </div>
              </div>

              {/* Badges informativos */}
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 border">Pagos seguros</span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 border">Cambios y devoluciones</span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 border">Atención rápida</span>
              </div>
            </div>

            {/* Columna imagen */}
            <div className="mt-8 xl:mt-0">
              <div className="relative">
                <img
                  className="w-full h-auto rounded-xl shadow-xl ring-1 ring-black/10 object-cover"
                  src="/images/Landing/tienda-los-ninios-3.jpg"
                  alt="Equipo de trabajo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}