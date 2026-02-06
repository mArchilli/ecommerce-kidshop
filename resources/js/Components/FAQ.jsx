import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: '¿Cómo comprar?',
      answer: (
        <>
          1. Dale click en <a href="/register" className="text-cyan-600 hover:text-cyan-700 underline font-semibold">registrarse</a> y completa con tus datos o bien si ya tenés una cuenta <a href="/login" className="text-cyan-600 hover:text-cyan-700 underline font-semibold">iniciá sesión</a><br />
          2. Una vez registrado, ya podés añadir productos a tu carrito, visita el <a href="/catalog" className="text-cyan-600 hover:text-cyan-700 underline font-semibold">catálogo</a> y una vez que elijas todo lo que vas a comprar clickeá en finalizar compra<br />
          3. Vas a poder pagar con cualquier método de pago. <strong className="underline">Las compras dentro del sitio están protegidas por Mercado Pago</strong><br />
          4. ¡Listo! Cuando impacte la compra en el sistema te vamos a contactar para poder coordinar detalles y envios
        </>
      )
    },
    {
      question: '¿Realizan envíos al interior y a la provincia de Buenos Aires?',
      answer: 'Sí realizamos envíos al interior, a PBA y a todo el país a través de vía cargo, correo argentino y Andreani.'
    },
    {
      question: '¿Cuándo despachan los pedidos?',
      answer: 'Si realizás la compra por la mañana te lo despachamos el mismo día. Si comprás por la tarde al otro día a primera hora.'
    },
    {
      question: '¿Qué talles trabajan?',
      answer: 'Trabajamos del talle recién nacido al talle 16.'
    },
    {
      question: '¿Venden por mayor o menor?',
      answer: 'Sí, realizamos ventas por mayor y por menor. Para compras mayoristas, los mínimos y condiciones se informan a través de nuestro canal de atención por WhatsApp.'
    },
    {
      question: '¿Cuánto demora el envío?',
      answer: 'Los plazos de entrega dependen del transporte seleccionado y de la localidad de destino. Una vez despachado el pedido, se envía al cliente el comprobante correspondiente para su seguimiento.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos pagos mediante Mercado Pago y transferencia bancaria. Todas las operaciones se realizan de forma segura y el pedido se confirma una vez acreditado el pago.'
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Preguntas frecuentes
          </h2>
          <p className="text-gray-600 text-lg">
            Encontrá respuestas a las consultas más comunes
          </p>
        </div>

        <div className="w-full space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-r from-white via-pink-50/30 to-cyan-50/30 backdrop-blur-sm rounded-2xl shadow-lg border-2 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${
                openIndex === index 
                  ? 'border-cyan-400 shadow-cyan-200/50' 
                  : 'border-pink-200 hover:border-pink-300'
              }`}
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <button
                onClick={() => toggleQuestion(index)}
                className={`relative w-full px-8 py-6 flex justify-between items-center text-left focus:outline-none focus:ring-4 focus:ring-cyan-300/50 transition-all duration-300 ${
                  openIndex === index ? 'bg-gradient-to-r from-cyan-50/50 to-pink-50/50' : ''
                }`}
                aria-expanded={openIndex === index}
              >
                <span className={`text-xl font-bold pr-6 transition-colors duration-300 ${
                  openIndex === index 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-pink-600' 
                    : 'text-gray-800 group-hover:text-gray-900'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-gradient-to-br from-cyan-500 to-pink-500 shadow-lg scale-110' 
                    : 'bg-gradient-to-br from-pink-200 to-cyan-200 group-hover:from-pink-300 group-hover:to-cyan-300 group-hover:shadow-md'
                }`}>
                  <FontAwesomeIcon
                    icon={openIndex === index ? faChevronUp : faChevronDown}
                    className={`text-white transition-all duration-300 ${
                      openIndex === index ? 'text-base' : 'text-sm'
                    }`}
                  />
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <div className="w-full h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-5 rounded-full shadow-sm"></div>
                  <div className="text-gray-700 leading-relaxed text-base bg-white/50 p-5 rounded-xl border border-pink-100/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
