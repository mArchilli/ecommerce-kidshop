export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Sobre Nosotros</h2>
          <p className="mt-4 text-lg text-gray-500">
            Somos una emprendimiento comprometido con ofrecer productos de alta calidad a precios competitivos. Nuestra misión
            es brindar la mejor experiencia de compra online a nuestros clientes.
          </p>
          <p className="mt-4 text-lg text-gray-500">
            Fundada en 2025, buscamos crececer gracias a la confianza de nuestros clientes y a nuestro
            compromiso con la excelencia en el servicio.
          </p>
          <div className="mt-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Calidad garantizada</h3>
                <p className="mt-2 text-base text-gray-500">
                  Todos nuestros productos pasan por un riguroso control de calidad.
                </p>
              </div>
            </div>
            <div className="flex items-center mt-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8 4-8-4V5l8 4 8-4v2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Atención personalizada</h3>
                <p className="mt-2 text-base text-gray-500">
                  Nuestro equipo de atención al cliente está disponible para ayudarte.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-0">
          <div className="relative lg:h-full">
            <img
              className="w-full h-auto rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
              src="/images/Landing/tienda-los-ninios-3.jpg"
              alt="Equipo de trabajo"
            />
          </div>
        </div>
      </div>
    </div>
  )
}