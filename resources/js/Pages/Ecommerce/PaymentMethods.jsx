export default function PaymentMethods() {
  return (
    <section className="w-full px-4 pt-8 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-left mb-10 px-4" data-aos="fade-up">
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
            <div className="bg-gradient-to-br from-blue-200 via-cyan-100 to-white rounded-3xl p-8 shadow-lg h-full">
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
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center min-h-[180px]" data-aos="zoom-in" data-aos-delay="100">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white mb-5 shadow-lg">
                      <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mb-2">Visa</p>
                    <p className="text-sm text-gray-600">Crédito y Débito</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center min-h-[180px]" data-aos="zoom-in" data-aos-delay="200">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white mb-5 shadow-lg">
                      <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mb-2">Mastercard</p>
                    <p className="text-sm text-gray-600">Crédito y Débito</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center min-h-[180px]" data-aos="zoom-in" data-aos-delay="300">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mb-5 shadow-lg">
                      <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mb-2">Amex</p>
                    <p className="text-sm text-gray-600">Crédito</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center min-h-[180px]" data-aos="zoom-in" data-aos-delay="400">
                  <div className="text-center">
                    <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-5 shadow-lg">
                      <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mb-2">Transferencia</p>
                    <p className="text-sm text-gray-600">Bancaria</p>
                  </div>
                </div>
              </div>

              {/* Texto y botón de WhatsApp */}
              <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="500">
                <p className="text-gray-700 text-lg font-semibold mb-4">
                  ¿Tenés dudas con los pagos? Mandanos un mensaje
                </p>
                <a
                  href="https://wa.me/5491172397202?text=Hola!%20tengo%20una%20duda%20con%20el%20tema%20de%20los%20pagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Escribinos por WhatsApp
                </a>
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

