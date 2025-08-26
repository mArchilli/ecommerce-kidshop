import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

const Pending = ({ cart, user }) => {
  const whatsappNumber = '5491172397202';
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Mi pago en KidShop está pendiente. Mi nombre es ${user?.name || ''}. ¿Podrían ayudarme a verificar el estado?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <EcommerceLayout>
      <Head title="Pago Pendiente" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 bg-gray-50">
        {/* Icono de pendiente */}
        <div className="bg-yellow-100 rounded-full p-6 mb-6 flex items-center justify-center">
          <svg className="w-16 h-16 text-yellow-500" fill="none" viewBox="0 0 48 48" stroke="currentColor">
            <circle cx="24" cy="24" r="22" strokeWidth="3" className="text-yellow-200" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M24 14v10l7 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-700 mb-4 text-center">¡Pago pendiente!</h1>
        <p className="text-lg text-gray-700 mb-2 text-center">
          Tu pago está siendo procesado.
        </p>
        <p className="text-base text-gray-600 mb-8 text-center">
          Te notificaremos tan pronto como se confirme.<br />
          Si necesitas ayuda, puedes contactarnos por WhatsApp.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs md:max-w-none md:w-auto justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md shadow transition duration-200"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.11 2.37 7.14L4 29l7.14-2.37A11.93 11.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.87-.52-5.5-1.5l-.39-.23-4.23 1.41 1.41-4.23-.23-.39A9.96 9.96 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.21 3.05.15.19 2.09 3.19 5.07 4.34.71.25 1.26.4 1.69.51.71.18 1.36.16 1.87.1.57-.07 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.13-.26-.21-.55-.36z"/>
            </svg>
            Contactar por WhatsApp
          </a>
          <a
            href="/"
            className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-md border border-black transition duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l7-7m-7 7l7 7" />
            </svg>
            Volver al inicio
          </a>
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default Pending;