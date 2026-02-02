export default function AboutUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-purple-50 via-white to-cyan-50 rounded-3xl">
      {/* Encabezado de sección */}
      <div className="text-left mb-10 px-4" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Sobre nosotros
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
              Somos una tienda especializada en indumentaria de niños y niñas, ofreciendo productos de alta calidad en todos los talles. 
              Trabajamos tanto por menor como por mayor, con los mejores precios del mercado.
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Pioneros en la venta por live de TikTok, revolucionamos la forma de comprar ropa infantil. 
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
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Envíos a todo el país</h4>
                <p className="text-sm text-gray-600">Llegamos a cualquier parte del país de forma rápida y segura.</p>
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
            <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 rounded-3xl shadow-xl flex-1 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
              {/* Decoración de fondo animada */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              
              {/* Header con icono grande */}
              <div className="relative z-10 flex items-center gap-5 p-6 pb-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg border border-white/20">
                  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">TikTok Lives</h3>
                  <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-white/20 text-white/95 text-xs font-semibold backdrop-blur-sm">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                    Compra en vivo
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="relative z-10 p-6 pt-5">
                <p className="text-white/95 text-base leading-relaxed mb-5">
                  Únete a nuestros lives en TikTok para ver productos en vivo, ofertas exclusivas y hacer tus compras directamente.
                </p>

                {/* Info de horarios con diseño mejorado */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/20 text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Horario de los lives</p>
                      <p className="text-white/90 text-sm">Lunes a sábado de 10 a 13hs y de 16 a 20hs</p>
                    </div>
                  </div>
                </div>
                
                <a
                  href="https://www.tiktok.com/@la.tienda.de.los_ninios"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-600 font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl group-hover:shadow-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                  Ir a TikTok
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Tienda Web */}
            <div className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-3xl shadow-xl flex-1 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
              {/* Decoración de fondo animada */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              
              {/* Header con icono grande */}
              <div className="relative z-10 flex items-center gap-5 p-6 pb-0">
                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm text-white shadow-lg border border-white/20">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">Tienda Online</h3>
                  <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-white/20 text-white/95 text-xs font-semibold backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Disponible 24/7
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="relative z-10 p-6 pt-5">
                <p className="text-white/95 text-base leading-relaxed mb-5">
                  Navega nuestro catálogo completo, agrega productos al carrito y compra cuando quieras, desde donde quieras.
                </p>

                {/* Card de celular mejorada */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/20 text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Compra desde tu celular</p>
                      <p className="text-white/90 text-sm">Fácil, rápido y seguro</p>
                    </div>
                  </div>
                </div>

                <a
                  href="/catalog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-cyan-600 font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl group-hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Ver productos
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}