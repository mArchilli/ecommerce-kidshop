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
            Métodos de Pago
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

          {/* Información de seguridad */}
          <div className="lg:col-span-1" data-aos="fade-left">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">100% Seguro</h3>
              </div>

              <div className="space-y-4 flex-grow">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700">Encriptación avanzada para proteger tus datos</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700">Procesamiento en tiempo real</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700">Confirmación inmediata de compra</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-700">Tus datos nunca se comparten</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-green-200">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-md">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Certificado SSL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

