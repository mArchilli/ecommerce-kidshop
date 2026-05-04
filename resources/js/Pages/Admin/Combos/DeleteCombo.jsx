import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function DeleteCombo({ combo, categories_summary }) {
    const handleDelete = () => {
        router.delete(route('combos.destroy', combo.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold leading-tight text-gray-800">
                        🗑️ Eliminar Combo
                    </h2>
                    <Link
                        href={route('combos.index')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#29C9F4' }}
                    >
                        ← Volver a Combos
                    </Link>
                </div>
            }
        >
            <Head title="Eliminar Combo" />

            <div className="py-8 sm:py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-4 border-red-200">
                        {/* Icono de advertencia */}
                        <div className="text-center mb-6">
                            <div className="text-6xl mb-3">⚠️</div>
                            <h3 className="text-2xl font-bold text-red-600">¿Eliminar este combo?</h3>
                            <p className="text-gray-600 mt-2">Esta acción no se puede deshacer.</p>
                        </div>

                        {/* Detalle del combo */}
                        <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-bold text-gray-800">{combo.name}</span>
                                <span className="text-xl font-bold text-green-600">
                                    ${Number(combo.price).toLocaleString('es-AR')}
                                </span>
                            </div>

                            {combo.description && (
                                <p className="text-sm text-gray-600">{combo.description}</p>
                            )}

                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                    combo.is_active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {combo.is_active ? '✓ Activo' : '✕ Inactivo'}
                                </span>
                            </div>

                            {/* Categorías y prendas */}
                            {categories_summary.length > 0 && (
                                <div className="space-y-2 pt-2 border-t border-gray-200">
                                    <p className="text-sm font-bold text-gray-600">Composición del combo:</p>
                                    {categories_summary.map((slot, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">
                                                {slot.category.name}
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {slot.products.map(product => (
                                                    <span
                                                        key={product.id}
                                                        className="text-xs bg-gray-100 rounded-lg px-2 py-1 text-gray-700"
                                                    >
                                                        {product.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-8 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                style={{ backgroundColor: '#FC1C1D' }}
                            >
                                🗑️ Sí, eliminar combo
                            </button>
                            <Link
                                href={route('combos.index')}
                                className="flex-1 px-8 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md text-center"
                                style={{ backgroundColor: '#29C9F4' }}
                            >
                                ❌ Cancelar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
