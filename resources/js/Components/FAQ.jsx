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
          1. Dale click en <a href="/register" className="text-cyan-600 hover:text-cyan-700 underline font-semibold">registrarse</a> o si ya tenés una cuenta <a href="/login" className="text-cyan-600 hover:text-cyan-700 underline font-semibold">iniciá sesión</a><br />
          2. Completá tus datos de registro<br />
          3. Ya podés añadir productos al carrito, una vez que elijas todo lo que vas a comprar clickeá en finalizar compra<br />
          4. Vas a poder pagar con cualquier método de pago. <strong className="underline">Las compras dentro del sitio están protegidas por Mercado Pago</strong><br />
          5. ¡Listo! Ya compraste en la tienda de los niños. Te vamos a contactar para realizar el envío.
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Preguntas frecuentes
          </h2>
          <p className="text-gray-600 text-lg">
            Encontrá respuestas a las consultas más comunes
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border-2 border-pink-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-2xl transition-all"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </span>
                <FontAwesomeIcon
                  icon={openIndex === index ? faChevronUp : faChevronDown}
                  className={`text-cyan-600 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-0' : 'rotate-0'
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <div className="w-full h-px bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 mb-4"></div>
                  <div className="text-gray-700 leading-relaxed">
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
