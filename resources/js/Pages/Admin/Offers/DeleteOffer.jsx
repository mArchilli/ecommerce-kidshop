import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function DeleteOffer({ offer }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (e) => {
        e.preventDefault();
        destroy(route('offers.destroy', offer.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold leading-tight text-gray-800">
                        🗑️ Eliminar Oferta
                    </h2>
                    <Link
                        href={route('offers.index')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#29C9F4' }}
                    >
                        ← Volver a Ofertas
                    </Link>
                </div>
            }
        >
            <Head title="Eliminar Oferta" />

            <div className="py-8 sm:py-12">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-4 border-red-200">
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                ¿Estás seguro?
                            </h3>
                            <p className="text-gray-600">
                                Estás a punto de eliminar esta oferta. Esta acción no se puede deshacer.
                            </p>
                        </div>

                        {/* Información de la oferta */}
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <div className="space-y-4">
                                <div>
                                    <span className="text-sm font-semibold text-gray-500">Producto:</span>
                                    <p className="text-lg font-bold text-gray-900">{offer.product.name}</p>
                                </div>

                                <div>
                                    <span className="text-sm font-semibold text-gray-500">Nombre de la Oferta:</span>
                                    <p className="text-lg font-bold text-gray-900">{offer.name}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm font-semibold text-gray-500">Precio Original:</span>
                                        <p className="text-lg font-bold text-gray-900">${offer.product.price}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-500">Precio de Oferta:</span>
                                        <p className="text-lg font-bold text-red-600">${offer.discount_price}</p>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-sm font-semibold text-gray-500">Descuento:</span>
                                    <p className="text-lg font-bold text-green-600">{offer.discount_percentage}% OFF</p>
                                </div>

                                {(offer.start_date || offer.end_date) && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {offer.start_date && (
                                            <div>
                                                <span className="text-sm font-semibold text-gray-500">Fecha Inicio:</span>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {new Date(offer.start_date).toLocaleDateString('es-AR')}
                                                </p>
                                            </div>
                                        )}
                                        {offer.end_date && (
                                            <div>
                                                <span className="text-sm font-semibold text-gray-500">Fecha Fin:</span>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {new Date(offer.end_date).toLocaleDateString('es-AR')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <span className="text-sm font-semibold text-gray-500">Estado:</span>
                                    <p className={`text-lg font-bold ${offer.is_active ? 'text-green-600' : 'text-red-600'}`}>
                                        {offer.is_active ? 'Activa' : 'Inactiva'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Botones */}
                        <form onSubmit={handleDelete}>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-1/2 px-8 py-4 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#FC1C1D' }}
                                >
                                    {processing ? '⏳ Eliminando...' : '🗑️ Sí, Eliminar Oferta'}
                                </button>
                                <Link
                                    href={route('offers.index')}
                                    className="w-full sm:w-1/2 px-8 py-4 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md text-center"
                                    style={{ backgroundColor: '#65DA4D' }}
                                >
                                    ❌ No, Cancelar
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
