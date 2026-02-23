import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';

const Success = ({ shippingInfo, user, cart, order, message, payment_id }) => {
  const whatsappNumber = '5491172397202';
  
  // Usar datos de la orden si están disponibles, sino del carrito
  const orderItems = order?.items || cart?.items || [];
  const orderData = order || {};
  
  // Construir el texto de los items
  const itemsText = orderItems.map(item => {
    const unit = Number(item.price || item.unit_price || item.product?.price || 0).toLocaleString('es-AR');
    const subtotal = (Number(item.price || item.unit_price || item.product?.price || 0) * item.quantity).toLocaleString('es-AR');
    const size = item.size || '—';
    return `• ${item.product?.name}\n  Talle: ${size} | Cantidad: ${item.quantity}\n  Precio unit.: $${unit} | Subtotal: $${subtotal}`;
  }).join('\n\n') || '';

  // Calcular total
  const total = order?.total || cart?.items?.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0) || 0;
  const totalFormatted = Number(total).toLocaleString('es-AR');

  // Información del comprador - priorizar datos de la orden
  const firstName = orderData.first_name || shippingInfo?.first_name || '';
  const lastName = orderData.last_name || shippingInfo?.last_name || '';
  const email = orderData.email || shippingInfo?.email || '';
  const dni = orderData.dni || shippingInfo?.dni || '—';
  const phone = orderData.phone || shippingInfo?.phone || '—';
  const shippingMethod = orderData.shipping_method || shippingInfo?.shipping_method || '—';
  const province = orderData.province || shippingInfo?.province || '';
  const city = orderData.city || shippingInfo?.city || '';
  const postalCode = orderData.postal_code || shippingInfo?.postal_code || '';
  const address = orderData.address || shippingInfo?.address || '';
  const observations = orderData.observations || shippingInfo?.observations || '';
  const courierCompany = orderData.courier_company || shippingInfo?.courier_company || '';

  // Dirección completa según método de envío
  const direccionCompleta = shippingMethod === 'Envio a Domicilio'
    ? [address, city, province, `CP: ${postalCode}`].filter(Boolean).join(', ')
    : `${city}, ${province}, CP: ${postalCode}`;

  // Construir mensaje de WhatsApp completo
  const whatsappMessageParts = [
    '*LA TIENDA DE LOS NIÑOS*',
    'Nos pondremos en contacto con vos en cuanto podamos para coordinar el envio de tu pedido.',
    'Nuestros horarios de atencion son de lunes a sabados de 9:00 a 20:00.',
    '═══════════════════════',
    '',
    '*DATOS DEL COMPRADOR*',
    `Nombre: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `DNI: ${dni}`,
    phone !== '—' ? `Teléfono: ${phone}` : null,
    '',
    '*INFORMACIÓN DE ENVÍO*',
    `Método: ${shippingMethod}`,
    `Provincia: ${province}`,
    `Localidad: ${city}`,
    `Código Postal: ${postalCode}`,
  ];

  // Agregar campos específicos según método de envío
  if (shippingMethod === 'Envio a Domicilio') {
    if (address) whatsappMessageParts.push(`Dirección: ${address}`);
    if (courierCompany) whatsappMessageParts.push(`Empresa de Correo: ${courierCompany}`);
    if (observations) whatsappMessageParts.push(`Observaciones: ${observations}`);
  } else if (shippingMethod === 'Envio a Sucursal') {
    if (courierCompany) whatsappMessageParts.push(`Empresa de Correo: ${courierCompany}`);
  }

  whatsappMessageParts.push(
    '',
    '*DETALLE DEL PEDIDO*',
    '───────────────────────',
    itemsText,
    '───────────────────────',
    '',
    `*TOTAL: $${totalFormatted}*`,
    '',
    '═══════════════════════'
  );

  const whatsappMessage = encodeURIComponent(whatsappMessageParts.filter(Boolean).join('\n'));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <EcommerceLayout>
      <Head title="Pago Exitoso" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 bg-gradient-to-br from-white via-pink-50 to-cyan-50">
        {/* Icono de éxito */}
        <div className="bg-gradient-to-br from-pink-100 to-fuchsia-100 rounded-full p-6 mb-6 flex items-center justify-center shadow-lg">
          <svg className="w-16 h-16 text-fuchsia-600" fill="none" viewBox="0 0 48 48" stroke="currentColor">
            <circle cx="24" cy="24" r="22" strokeWidth="3" className="text-pink-300" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M16 24l7 7 9-13" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-4 text-center">¡Pago realizado con éxito!</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Gracias por tu compra, <span className="font-bold">{firstName} {lastName}</span>.
        </p>
        
        {/* Alerta importante */}
        <div className="w-full max-w-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-4 mb-6 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-800 mb-1">⚠️ ¡PASO IMPORTANTE!</h3>
              <p className="text-sm text-green-700 font-medium">
                <strong className="text-base">Es NECESARIO que envíes el pedido por WhatsApp</strong> para que podamos procesar tu orden y coordinar la entrega. 
                Sin este paso, tu pedido no será procesado.
              </p>
            </div>
          </div>
        </div>

        {/* Resumen de datos del comprador */}
        <div className="w-full max-w-xl bg-white rounded-lg border border-pink-200 p-4 mb-4 text-sm text-gray-700 shadow-md">
          <h2 className="font-semibold text-fuchsia-700 mb-3">Datos del Comprador</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div><span className="font-medium">Nombre:</span> {firstName} {lastName}</div>
            <div><span className="font-medium">Email:</span> {email}</div>
            <div><span className="font-medium">DNI:</span> {dni}</div>
            {phone !== '—' && <div><span className="font-medium">Teléfono:</span> {phone}</div>}
          </div>
        </div>

        {/* Información de envío */}
        <div className="w-full max-w-xl bg-white rounded-lg border border-cyan-200 p-4 mb-4 text-sm text-gray-700 shadow-md">
          <h2 className="font-semibold text-cyan-700 mb-3">Información de Envío</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div><span className="font-medium">Método:</span> {shippingMethod}</div>
            <div><span className="font-medium">Provincia:</span> {province}</div>
            <div><span className="font-medium">Localidad:</span> {city}</div>
            <div><span className="font-medium">Código Postal:</span> {postalCode}</div>
            {shippingMethod === 'Envio a Domicilio' && address && (
              <div className="sm:col-span-2"><span className="font-medium">Dirección:</span> {address}</div>
            )}
            {shippingMethod === 'Envio a Domicilio' && observations && (
              <div className="sm:col-span-2"><span className="font-medium">Observaciones:</span> {observations}</div>
            )}
            {courierCompany && (
              <div><span className="font-medium">Empresa de Correo:</span> {courierCompany}</div>
            )}
          </div>
        </div>

        {/* Resumen de la compra */}
        <div className="w-full max-w-xl bg-white rounded-lg border border-pink-200 p-4 mb-8 text-sm text-gray-700 shadow-md">
          <h2 className="font-semibold text-pink-700 mb-2">Detalle del Pedido</h2>
          <ul className="space-y-1 max-h-56 overflow-y-auto pr-2">
            {orderItems.map(item => {
              const unit = Number(item.price || item.unit_price || item.product?.price || 0).toLocaleString('es-AR');
              const subtotal = (Number(item.price || item.unit_price || item.product?.price || 0) * item.quantity).toLocaleString('es-AR');
              return (
                <li key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b last:border-b-0 border-gray-100 py-2">
                  <span className="font-medium text-gray-800 text-sm">{item.product?.name}</span>
                  <span className="text-xs text-gray-500">Talle: {item.size || '—'} | Cant: {item.quantity} | Unit: ${unit} | Subtotal: ${subtotal}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex justify-end border-t pt-3">
            <span className="text-base font-semibold text-fuchsia-700">Total: ${totalFormatted}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs md:max-w-none md:w-auto justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-2xl transition duration-300 transform hover:scale-110 animate-pulse hover:animate-none border-2 border-green-400"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.65.87 5.11 2.37 7.14L4 29l7.14-2.37A11.93 11.93 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.98 0-3.87-.52-5.5-1.5l-.39-.23-4.23 1.41 1.41-4.23-.23-.39A9.96 9.96 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.29-.15-1.71-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46 0 1.45 1.06 2.85 1.21 3.05.15.19 2.09 3.19 5.07 4.34.71.25 1.26.4 1.69.51.71.18 1.36.16 1.87.1.57-.07 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.13-.26-.21-.55-.36z"/>
            </svg>
            ✅ CONFIRMAR PEDIDO - WhatsApp
          </a>
          <a
            href="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
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

export default Success;