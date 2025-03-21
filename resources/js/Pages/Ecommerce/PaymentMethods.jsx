export default function PaymentMethods() {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Métodos de Pago</h2>
          <p className="mt-4 text-lg text-gray-500">
            Trabajamos con MercadoPago para ofrecerte múltiples opciones de pago seguras y confiables.
          </p>
        </div>

        <div className="mt-12">
          <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-16 w-auto" src="/images/Landing/MercadoPago-1.png?height=64&width=200" alt="MercadoPago logo" />
                </div>
                <div className="ml-5">
                  <h3 className="text-2xl font-bold text-gray-900">MercadoPago</h3>
                  <p className="text-gray-500">Plataforma de pagos líder en Latinoamérica</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900">Aceptamos:</h4>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  <div className="col-span-1 flex justify-center py-4 px-6 bg-white rounded-lg border border-gray-200">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <p className="mt-2 text-sm font-medium text-gray-900">Visa</p>
                      <p className="text-xs text-gray-500">Crédito y Débito</p>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center py-4 px-6 bg-white rounded-lg border border-gray-200">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <p className="mt-2 text-sm font-medium text-gray-900">Mastercard</p>
                      <p className="text-xs text-gray-500">Crédito y Débito</p>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center py-4 px-6 bg-white rounded-lg border border-gray-200">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      <p className="mt-2 text-sm font-medium text-gray-900">American Express</p>
                      <p className="text-xs text-gray-500">Crédito</p>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center py-4 px-6 bg-white rounded-lg border border-gray-200">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-2 text-sm font-medium text-gray-900">Transferencia</p>
                      <p className="text-xs text-gray-500">Bancaria</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-8 bg-gray-100 sm:p-10">
              <div className="text-sm text-gray-500">
                <p>
                  MercadoPago procesa tus pagos de forma segura utilizando la tecnología de encriptación más avanzada.
                  Tus datos financieros nunca se comparten con nosotros y están protegidos por los más altos estándares
                  de seguridad.
                </p>
                <p className="mt-4">
                  Todas las transacciones son procesadas en tiempo real y recibirás una confirmación inmediata de tu
                  compra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

