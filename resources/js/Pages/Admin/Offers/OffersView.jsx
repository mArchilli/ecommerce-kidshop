import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function OffersView({ offers }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOffers = offers.filter(offer => {
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const matchesName = offer.name.toLowerCase().includes(searchLower);
            const matchesProduct = offer.product.name.toLowerCase().includes(searchLower);
            if (!matchesName && !matchesProduct) return false;
        }
        return true;
    });

    const handleToggleActive = (offerId, e) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('offers.toggleActive', offerId), {}, {
            preserveScroll: true,
        });
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('es-AR');
    };

    const isOfferValid = (offer) => {
        if (!offer.is_active) return false;
        
        const now = new Date();
        const startDate = offer.start_date ? new Date(offer.start_date) : null;
        const endDate = offer.end_date ? new Date(offer.end_date) : null;

        if (startDate && startDate > now) return false;
        if (endDate && endDate < now) return false;

        return true;
    };

    const getImageSrc = (images) => {
        if (!images || !images[0]) return null;
        const imgPath = images[0];
        return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold leading-tight text-gray-800">
                            🏷️ Ofertas
                        </h2>
                    </div>
                    <Link
                        href={route('offers.create')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#65DA4D' }}
                    >
                        ➕ Crear Oferta
                    </Link>
                </div>
            }
        >
            <Head title="Ofertas" />

            <div className="py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Buscador */}
                    <div className="mb-4 sm:mb-6">
                        <div className="bg-gradient-to-r from-white to-neutral-50 rounded-2xl border-4 border-white shadow-lg p-4 sm:p-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="🔍 Buscar por nombre de oferta o producto..."
                                    className="w-full border-2 border-neutral-300 rounded-xl px-4 sm:px-5 py-3 text-sm sm:text-base font-semibold focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400 pr-10"
                                    style={{ backgroundColor: '#f8f9fa' }}
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Resultados */}
                    <div className="mb-4 text-sm text-gray-600">
                        Mostrando {filteredOffers.length} de {offers.length} ofertas
                    </div>

                    {/* Cards de ofertas */}
                    {filteredOffers.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-4 border-white">
                            <div className="text-6xl mb-4">📭</div>
                            <div className="text-xl font-semibold text-gray-500">No se encontraron ofertas</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredOffers.map((offer) => (
                                <div key={offer.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    {/* Badge de descuento */}
                                    <div className="relative">
                                        <div className="absolute top-3 right-3 z-10">
                                            <span className="bg-red-500 text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                                                -{offer.discount_percentage}% OFF
                                            </span>
                                        </div>
                                        
                                        {/* Imagen del producto */}
                                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                                            {getImageSrc(offer.product.images) ? (
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={getImageSrc(offer.product.images)}
                                                    alt={offer.product.name}
                                                />
                                            ) : (
                                                <div className="text-6xl">👕</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-6 space-y-4">
                                        {/* Nombre de la oferta */}
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {offer.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {offer.product.name}
                                            </p>
                                        </div>

                                        {/* Precios */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-500 line-through text-lg">
                                                ${offer.product.price}
                                            </span>
                                            <span className="text-red-600 font-bold text-2xl">
                                                ${offer.discount_price}
                                            </span>
                                        </div>

                                        {/* Fechas */}
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span>📅</span>
                                            <span>
                                                {offer.start_date ? formatDate(offer.start_date) : 'Inicio inmediato'}
                                                {' → '}
                                                {offer.end_date ? formatDate(offer.end_date) : 'Sin fin'}
                                            </span>
                                        </div>

                                        {/* Estado */}
                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={(e) => handleToggleActive(offer.id, e)}
                                                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                                                    isOfferValid(offer)
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                                                }`}
                                            >
                                                {isOfferValid(offer) ? '✓ Activa' : '✕ Inactiva'}
                                            </button>
                                        </div>

                                        {/* Acciones */}
                                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                                            <Link
                                                href={route('offers.edit', offer.id)}
                                                className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors text-center"
                                            >
                                                ✏️ Editar
                                            </Link>
                                            <Link
                                                href={route('offers.delete', offer.id)}
                                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors text-center"
                                            >
                                                🗑️ Eliminar
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
