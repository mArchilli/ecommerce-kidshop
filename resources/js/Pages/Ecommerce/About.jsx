export default function AboutUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Encabezado de sección */}
      <div className="text-left mb-10 px-4" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Sobre Nosotros
        </h2>
        <p className="text-lg text-gray-600">
          Calidad, cercanía y buen servicio
        </p>
      </div>

      {/* Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna izquierda - Descripción */}
        <div data-aos="fade-right">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg h-full">
            <p className="text-lg text-gray-700 leading-relaxed">
              Somos una tienda especializada en indumentaria de niños y niñas, ofreciendo productos de alta calidad para todas las edades. 
              Trabajamos tanto por menor como por mayor, adaptándonos a las necesidades de cada cliente con los mejores precios del mercado.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Pioneros en la venta por live de TikTok desde 2025, revolucionamos la forma de comprar ropa infantil. 
              Combinamos la experiencia interactiva de nuestros lives con la comodidad de nuestra tienda online, 
              brindando múltiples canales para que encuentres todo lo que buscas.
            </p>

            {/* Features en grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="100">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 text-white mb-4 shadow-lg">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Calidad garantizada</h4>
                <p className="text-sm text-gray-600">Cada prenda pasa por un control de calidad antes de enviarse.</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="200">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-pink-400 to-rose-400 text-white mb-4 shadow-lg">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Atención cercana</h4>
                <p className="text-sm text-gray-600">Soporte personalizado para ayudarte en todo momento.</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="300">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 text-white mb-4 shadow-lg">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Pagos seguros</h4>
                <p className="text-sm text-gray-600">Transacciones protegidas con tecnología de encriptación.</p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300" data-aos="zoom-in" data-aos-delay="400">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 text-white mb-4 shadow-lg">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Disponible 24/7</h4>
                <p className="text-sm text-gray-600">Compra cuando quieras, desde donde quieras, siempre abierto.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha - Canales de venta */}
        <div data-aos="fade-left">
          <div className="space-y-6 h-full flex flex-col">
            {/* TikTok Lives */}
            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-3xl p-8 shadow-xl flex-1 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
                    <svg className="h-9 w-9" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">TikTok Lives</h3>
                    <p className="text-white/90 text-sm">Compra en vivo</p>
                  </div>
                </div>

                <p className="text-white/95 text-base mb-6 leading-relaxed">
                  Únete a nuestros lives en TikTok para ver productos en vivo, ofertas exclusivas y hacer tus compras directamente.
                </p>

                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 border border-white/30">
                  <div className="flex items-center gap-3 mb-4">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-lg font-bold text-white">Horarios de Lives</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-white/95">
                      <span className="font-semibold">Lunes - Sábado</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-white font-semibold text-sm">
                        10:00 - 13:00
                      </span>
                      <span className="px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-white font-semibold text-sm">
                        16:00 - 20:00
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tienda Web */}
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl p-8 shadow-xl flex-1 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg">
                    <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Tienda Online</h3>
                    <p className="text-white/90 text-sm">Disponible 24/7</p>
                  </div>
                </div>

                <p className="text-white/95 text-base leading-relaxed">
                  Navega nuestro catálogo completo, agrega productos al carrito y compra cuando quieras, desde donde quieras.
                </p>

                <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-5 border border-white/30">
                  <div className="flex items-center gap-3">
                    <svg className="h-8 w-8 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-white font-bold">Compra desde tu celular</p>
                      <p className="text-white/80 text-sm">Fácil, rápido y seguro</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges informativos */}
            <div className="flex flex-wrap gap-3 px-2">
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md">
                Envíos a todo el país
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-md">
                Atención inmediata
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md">
                Productos certificados
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}