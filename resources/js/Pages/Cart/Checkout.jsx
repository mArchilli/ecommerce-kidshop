import React, { useState, useEffect } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, useForm, router } from '@inertiajs/react';

// Provincias de Argentina
const provinciasArgentina = [
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Ciudad Autónoma de Buenos Aires',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
];

// Localidades por provincia (lista representativa, se puede ampliar)
const localidadesPorProvincia = {
  'Buenos Aires': ['La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Quilmes', 'Lanús', 'Lomas de Zamora', 'Morón', 'Tigre', 'San Isidro', 'Vicente López', 'Avellaneda', 'Almirante Brown', 'Berazategui', 'Florencio Varela', 'Esteban Echeverría', 'Merlo', 'Moreno', 'José C. Paz', 'Malvinas Argentinas', 'San Miguel', 'Pilar', 'Escobar', 'Zárate', 'Campana', 'Luján', 'Mercedes', 'San Nicolás', 'Pergamino', 'Junín', 'Olavarría', 'Azul', 'Necochea', 'Tres Arroyos', 'Mariano Acosta'],
  'Catamarca': ['San Fernando del Valle de Catamarca', 'Valle Viejo', 'Fray Mamerto Esquiú', 'Andalgalá', 'Belén', 'Tinogasta', 'Santa María', 'Recreo'],
  'Chaco': ['Resistencia', 'Barranqueras', 'Fontana', 'Presidencia Roque Sáenz Peña', 'Villa Ángela', 'Charata', 'General San Martín', 'Quitilipi'],
  'Chubut': ['Rawson', 'Comodoro Rivadavia', 'Trelew', 'Puerto Madryn', 'Esquel', 'Sarmiento', 'Gaiman', 'Dolavon'],
  'Ciudad Autónoma de Buenos Aires': ['Agronomía', 'Almagro', 'Balvanera', 'Barracas', 'Belgrano', 'Boedo', 'Caballito', 'Chacarita', 'Coghlan', 'Colegiales', 'Constitución', 'Flores', 'Floresta', 'La Boca', 'La Paternal', 'Liniers', 'Mataderos', 'Monte Castro', 'Monserrat', 'Nueva Pompeya', 'Núñez', 'Palermo', 'Parque Avellaneda', 'Parque Chacabuco', 'Parque Chas', 'Parque Patricios', 'Puerto Madero', 'Recoleta', 'Retiro', 'Saavedra', 'San Cristóbal', 'San Nicolás', 'San Telmo', 'Vélez Sársfield', 'Versalles', 'Villa Crespo', 'Villa del Parque', 'Villa Devoto', 'Villa General Mitre', 'Villa Lugano', 'Villa Luro', 'Villa Ortúzar', 'Villa Pueyrredón', 'Villa Real', 'Villa Riachuelo', 'Villa Santa Rita', 'Villa Soldati', 'Villa Urquiza'],
  'Córdoba': ['Córdoba', 'Villa Carlos Paz', 'Río Cuarto', 'Villa María', 'San Francisco', 'Alta Gracia', 'Jesús María', 'La Falda', 'Cosquín', 'Bell Ville', 'Río Tercero', 'Villa Dolores'],
  'Corrientes': ['Corrientes', 'Goya', 'Paso de los Libres', 'Curuzú Cuatiá', 'Mercedes', 'Santo Tomé', 'Bella Vista', 'Esquina'],
  'Entre Ríos': ['Paraná', 'Concordia', 'Gualeguaychú', 'Concepción del Uruguay', 'Gualeguay', 'Villaguay', 'Colón', 'Victoria', 'Diamante', 'Federación'],
  'Formosa': ['Formosa', 'Clorinda', 'Pirané', 'El Colorado', 'Ingeniero Juárez', 'Las Lomitas', 'Laguna Blanca'],
  'Jujuy': ['San Salvador de Jujuy', 'San Pedro', 'Libertador General San Martín', 'Palpalá', 'Perico', 'La Quiaca', 'Humahuaca', 'Tilcara'],
  'La Pampa': ['Santa Rosa', 'General Pico', 'Toay', 'General Acha', 'Eduardo Castex', 'Victorica', 'Realicó', 'Intendente Alvear'],
  'La Rioja': ['La Rioja', 'Chilecito', 'Aimogasta', 'Chamical', 'Chepes', 'Famatina', 'Villa Unión'],
  'Mendoza': ['Mendoza', 'San Rafael', 'Godoy Cruz', 'Las Heras', 'Guaymallén', 'Maipú', 'Luján de Cuyo', 'Tunuyán', 'San Martín', 'Rivadavia', 'Malargüe'],
  'Misiones': ['Posadas', 'Oberá', 'Eldorado', 'Puerto Iguazú', 'Apóstoles', 'Leandro N. Alem', 'San Vicente', 'Jardín América', 'Montecarlo'],
  'Neuquén': ['Neuquén', 'San Martín de los Andes', 'Zapala', 'Centenario', 'Plottier', 'Cutral Có', 'Plaza Huincul', 'Junín de los Andes', 'Villa La Angostura'],
  'Río Negro': ['Viedma', 'San Carlos de Bariloche', 'General Roca', 'Cipolletti', 'Allen', 'Villa Regina', 'El Bolsón', 'Choele Choel', 'Cinco Saltos'],
  'Salta': ['Salta', 'San Ramón de la Nueva Orán', 'Tartagal', 'General Güemes', 'Metán', 'Cafayate', 'Rosario de la Frontera', 'Embarcación'],
  'San Juan': ['San Juan', 'Rawson', 'Chimbas', 'Rivadavia', 'Santa Lucía', 'Pocito', 'Caucete', 'Jáchal', 'Albardón'],
  'San Luis': ['San Luis', 'Villa Mercedes', 'Merlo', 'Justo Daract', 'La Punta', 'Villa de Merlo', 'Potrero de los Funes'],
  'Santa Cruz': ['Río Gallegos', 'Caleta Olivia', 'El Calafate', 'Pico Truncado', 'Puerto Deseado', 'Las Heras', 'Perito Moreno', 'San Julián'],
  'Santa Fe': ['Santa Fe', 'Rosario', 'Rafaela', 'Venado Tuerto', 'Reconquista', 'Santo Tomé', 'Villa Gobernador Gálvez', 'San Lorenzo', 'Esperanza', 'Casilda', 'Cañada de Gómez'],
  'Santiago del Estero': ['Santiago del Estero', 'La Banda', 'Termas de Río Hondo', 'Añatuya', 'Frías', 'Fernández', 'Loreto', 'Quimilí'],
  'Tierra del Fuego': ['Ushuaia', 'Río Grande', 'Tolhuin'],
  'Tucumán': ['San Miguel de Tucumán', 'Yerba Buena', 'Tafí Viejo', 'Banda del Río Salí', 'Concepción', 'Famaillá', 'Monteros', 'Aguilares', 'Tafí del Valle'],
};

const Checkout = ({ cart, savedShippingInfo }) => {
  const { data, setData, post, processing, errors } = useForm({
    province: savedShippingInfo?.province || '',
    city: savedShippingInfo?.city || '',
    postal_code: savedShippingInfo?.postal_code || '',
    address: savedShippingInfo?.address || '',
    phone: savedShippingInfo?.phone || '',
    shipping_method: savedShippingInfo?.shipping_method || '',
    dni: savedShippingInfo?.dni || '',
    first_name: savedShippingInfo?.first_name || '',
    last_name: savedShippingInfo?.last_name || '',
    email: savedShippingInfo?.email || '',
    observations: savedShippingInfo?.observations || '',
    courier_company: savedShippingInfo?.courier_company || '',
  });

  const [localidades, setLocalidades] = useState(() => {
    // Inicializar localidades si hay una provincia guardada
    if (savedShippingInfo?.province && localidadesPorProvincia[savedShippingInfo.province]) {
      return localidadesPorProvincia[savedShippingInfo.province];
    }
    return [];
  });

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Actualizar localidades cuando cambia la provincia
  useEffect(() => {
    if (data.province && localidadesPorProvincia[data.province]) {
      setLocalidades(localidadesPorProvincia[data.province]);
      // Limpiar la ciudad solo si no es la carga inicial y la ciudad no está en las localidades
      if (!isInitialLoad && !localidadesPorProvincia[data.province].includes(data.city)) {
        setData('city', '');
      }
    } else {
      setLocalidades([]);
      if (!isInitialLoad) {
        setData('city', '');
      }
    }
    setIsInitialLoad(false);
  }, [data.province]);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setData('province', selectedProvince);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('checkout.payment')); 
  };

  const proceedToPayment = () => {
    // Validar campos comunes requeridos
    const commonFieldsValid = data.shipping_method && 
      data.dni.trim() && 
      data.first_name.trim() && 
      data.last_name.trim() && 
      data.email.trim() &&
      data.province &&
      data.city &&
      data.postal_code.trim();
    
    if (!commonFieldsValid) return;
    post(route('checkout.payment'));
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.visit(route('catalog.index'));
    }
  };

  const total =
    cart?.items?.reduce((sum, item) => sum + item.unit_price * item.quantity, 0) || 0;

  // Función para asegurar el prefijo correcto en la ruta de la imagen
  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  return (
    <EcommerceLayout>
      <Head title="Resumen de Compra" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header responsive: botón izq + título centrado (mobile),
           y título izq + botón der (desktop) */}
        <div className="mb-6 relative h-12 md:h-auto md:flex md:items-center md:justify-between">
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-center md:static md:translate-x-0 md:translate-y-0 md:text-left">
            Resumen
          </h1>
          <button
            onClick={handleGoBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 md:static md:translate-y-0 md:ml-auto"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>

        {cart && cart.items && cart.items.length > 0 ? (
          <div className="grid md:grid-cols-12 gap-6">
            {/* Columna izquierda: Envío + Lista de productos */}
            <section className="md:col-span-8 flex flex-col gap-6">
              {/* Información de envío (se mantiene el formulario condicional) */}
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Método de Envío (A cargo del comprador)</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    En ambos casos nos comunicaremos con usted para informarle el importe del envío.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      aria-pressed={data.shipping_method === 'Envio a Domicilio'}
                      onClick={() => setData('shipping_method', 'Envio a Domicilio')}
                      className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 border transition
                        ${data.shipping_method === 'Envio a Domicilio'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
                        focus:outline-none focus:ring-2 focus:ring-black`}
                    >
                      {/* ícono camión */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h11v8H3zM14 10h3l4 3v2h-7V10zM5.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                      <span>Envío a Domicilio</span>
                    </button>

                    <button
                      type="button"
                      aria-pressed={data.shipping_method === 'Envio a Sucursal'}
                      onClick={() => setData('shipping_method', 'Envio a Sucursal')}
                      className={`w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 border transition
                        ${data.shipping_method === 'Envio a Sucursal'
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-gray-300 hover:bg-gray-50'}
                        focus:outline-none focus:ring-2 focus:ring-black`}
                    >
                      {/* ícono tienda */}
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10l1-4h14l1 4M5 10h14v9H5zM9 19v-5h6v5" />
                      </svg>
                      <span>Envío a Sucursal</span>
                    </button>
                  </div>

                  {errors.shipping_method && (
                    <span className="text-red-500 text-sm mt-2 block">{errors.shipping_method}</span>
                  )}
                </div>

                {/* Mensajes en vez de formulario */}

                {data.shipping_method === 'Envio a Domicilio' && (
                  <>
                    <div className="mt-2 p-3 rounded-md bg-gray-50 text-sm text-gray-700">
                      Te contactaremos luego de la compra para coordinar el envío y su costo.
                    </div>
                    {/* Formulario visible nuevamente si es Envío a Domicilio */}
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nombre</label>
                          <input
                            type="text"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Apellido</label>
                          <input
                            type="text"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                          <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">DNI</label>
                          <input
                            type="text"
                            value={data.dni}
                            onChange={(e) => setData('dni', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Provincia</label>
                          <select
                            value={data.province}
                            onChange={handleProvinceChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          >
                            <option value="">Seleccione una provincia</option>
                            {provinciasArgentina.map((provincia) => (
                              <option key={provincia} value={provincia}>{provincia}</option>
                            ))}
                          </select>
                          {errors.province && <span className="text-red-500 text-sm">{errors.province}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Localidad</label>
                          <select
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            disabled={!data.province}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">Seleccione una localidad</option>
                            {localidades.map((localidad) => (
                              <option key={localidad} value={localidad}>{localidad}</option>
                            ))}
                          </select>
                          {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                          <input
                            type="text"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.postal_code && <span className="text-red-500 text-sm">{errors.postal_code}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Dirección</label>
                          <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Teléfono de Contacto (Nos contactaremos via WhatsApp)</label>
                          <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Observaciones (opcional)</label>
                          <textarea
                            value={data.observations}
                            onChange={(e) => setData('observations', e.target.value)}
                            rows={3}
                            placeholder="Agregue cualquier observación o instrucción especial para la entrega"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.observations && <span className="text-red-500 text-sm">{errors.observations}</span>}
                        </div>
                      </div>
                      {/* Sin botón aquí; se usa el de la card de resumen o Enter en inputs */}
                    </form>
                  </>
                )}

                {data.shipping_method === 'Envio a Sucursal' && (
                  <>
                    <div className="mt-2 p-3 rounded-md bg-gray-50 text-sm text-gray-700">
                      Tu pedido será enviado a la sucursal de correo más cercana a tu domicilio.
                    </div>
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nombre</label>
                          <input
                            type="text"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Apellido</label>
                          <input
                            type="text"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                          <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">DNI</label>
                          <input
                            type="text"
                            value={data.dni}
                            onChange={(e) => setData('dni', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.dni && <span className="text-red-500 text-sm">{errors.dni}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Provincia</label>
                          <select
                            value={data.province}
                            onChange={handleProvinceChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          >
                            <option value="">Seleccione una provincia</option>
                            {provinciasArgentina.map((provincia) => (
                              <option key={provincia} value={provincia}>{provincia}</option>
                            ))}
                          </select>
                          {errors.province && <span className="text-red-500 text-sm">{errors.province}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Localidad</label>
                          <select
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            disabled={!data.province}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                          >
                            <option value="">Seleccione una localidad</option>
                            {localidades.map((localidad) => (
                              <option key={localidad} value={localidad}>{localidad}</option>
                            ))}
                          </select>
                          {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                          <input
                            type="text"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.postal_code && <span className="text-red-500 text-sm">{errors.postal_code}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Empresa de Correo</label>
                          <select
                            value={data.courier_company}
                            onChange={(e) => setData('courier_company', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          >
                            <option value="">Seleccione una empresa</option>
                            <option value="Correo Argentino">Correo Argentino</option>
                            <option value="Andreani">Andreani</option>
                            <option value="Via Cargo">Via Cargo</option>
                            <option value="Consultar con la tienda">Consultar con la tienda</option>
                          </select>
                          {errors.courier_company && <span className="text-red-500 text-sm">{errors.courier_company}</span>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Teléfono de Contacto (Nos contactaremos via WhatsApp)</label>
                          <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                          />
                          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>

              {/* Lista de productos (estilo similar a Index) */}
              <div className="bg-white border rounded-lg">
                <h2 className="text-lg font-semibold p-4">Productos</h2>
                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center gap-4">
                      <img
                        src={
                          item.product.images && item.product.images.length > 0
                            ? getImageSrc(item.product.images[0])
                            : '/placeholder.svg'
                        }
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">{item.product.name}</h3>
                            <p className="text-xs text-gray-500">Talle: {item.size || 'N/A'}</p>
                            <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-900">
                              {item.unit_price < item.product.price ? (
                                <div className="flex flex-col items-end">
                                  <div className="text-sm font-bold" style={{ color: '#FF6B9D' }}>
                                    Precio: ${Number(item.unit_price).toLocaleString('es-AR')}
                                  </div>
                                  <div className="text-xs text-gray-500 line-through">
                                    ${Number(item.product.price).toLocaleString('es-AR')}
                                  </div>
                                </div>
                              ) : (
                                <div>Precio: ${Number(item.unit_price).toLocaleString('es-AR')}</div>
                              )}
                            </div>
                            <div className="text-sm font-semibold text-gray-900 mt-1">
                              Total: ${(item.unit_price * item.quantity).toLocaleString('es-AR')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Columna derecha: Resumen sticky + botón de pago */}
            <aside className="md:col-span-4">
              <div className="bg-white rounded-lg shadow p-6 md:sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">A confirmar</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-base">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={proceedToPayment}
                    className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={processing || !data.shipping_method || !data.dni.trim() || !data.first_name.trim() || !data.last_name.trim() || !data.email.trim() || !data.province || !data.city || !data.postal_code.trim()}
                  >
                    {processing ? 'Procesando...' : 'Proceder al Pago'}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-8">
            No hay productos en el carrito.
          </p>
        )}
      </div>
    </EcommerceLayout>
  );
};

export default Checkout;