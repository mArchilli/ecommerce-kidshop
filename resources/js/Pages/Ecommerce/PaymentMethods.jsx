export default function PaymentMethods() {
  return (
    <section className="w-full px-4 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-left mb-10 px-4" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-green-500"></div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-8 h-8 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Métodos de pago
          </h2>
          <p className="text-lg text-gray-600">
            Trabajamos con MercadoPago para ofrecerte múltiples opciones de pago seguras y confiables
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MercadoPago destacado */}
          <div className="lg:col-span-2" data-aos="fade-right">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg h-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="bg-white rounded-2xl p-4 shadow-md">
                  <img className="h-12 w-auto" src="/images/Landing/MercadoPago-1.png?height=64&width=200" alt="MercadoPago logo" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">MercadoPago</h3>
                  <p className="text-gray-600 mt-1">Plataforma de pagos líder en Latinoamérica</p>
                </div>
              </div>

              {/* Grid de métodos de pago */}
              <h4 className="text-xl font-bold text-gray-900 mb-6">Aceptamos:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="100">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Visa</p>
                    <p className="text-xs text-gray-500 mt-1">Crédito y Débito</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="200">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white mb-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Mastercard</p>
                    <p className="text-xs text-gray-500 mt-1">Crédito y Débito</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="300">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mb-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Amex</p>
                    <p className="text-xs text-gray-500 mt-1">Crédito</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105" data-aos="zoom-in" data-aos-delay="400">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-gray-900">Transferencia</p>
                    <p className="text-xs text-gray-500 mt-1">Bancaria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compra protegida por Mercado Pago */}
          <div className="lg:col-span-1" data-aos="fade-left">
            <div className="bg-gradient-to-br from-sky-500 via-blue-500 to-blue-600 rounded-3xl p-8 shadow-xl h-full flex flex-col relative overflow-hidden group">
              {/* Decoración de fondo */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
              
              {/* Header */}
              <div className="relative z-10 text-center mb-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm text-white shadow-lg border border-white/30 mb-4">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Compra protegida</h3>
                <p className="text-white/90 text-sm">Tu dinero está seguro con Mercado Pago</p>
              </div>

              {/* Beneficios principales */}
              <div className="relative z-10 space-y-3 flex-grow">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-white/20 text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium">Pagás sin compartir tus datos</p>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-white/20 text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium">Confirmación al instante</p>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-white/20 text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium">Pago en cuotas brindadas por Mercado Pago</p>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-white/20 text-white">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <p className="text-white text-sm font-medium">Devolución si hay problemas</p>
                  </div>
                </div>
              </div>

              {/* Footer con sello de confianza */}
              <div className="relative z-10 mt-6 pt-5 border-t border-white/20">
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-white rounded-lg px-3 py-2 shadow-md">
                    <img className="h-6 w-auto" src="/images/Landing/MercadoPago-1.png" alt="MercadoPago" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/90 text-xs">Protegido por</p>
                    <p className="text-white font-bold text-sm">Mercado Pago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

