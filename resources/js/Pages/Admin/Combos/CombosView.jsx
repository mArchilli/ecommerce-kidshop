import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function CombosView({ combos }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCombos = combos.filter(combo => {
        if (!searchTerm) return true;
        return combo.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleToggleActive = (comboId, e) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('combos.toggleActive', comboId), {}, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold leading-tight text-gray-800">
                            🎁 Combos
                        </h2>
                    </div>
                    <Link
                        href={route('combos.create')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#65DA4D' }}
                    >
                        ➕ Armar Combo
                    </Link>
                </div>
            }
        >
            <Head title="Combos" />

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
                                    placeholder="🔍 Buscar combo por nombre..."
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

                    <div className="mb-4 text-sm text-gray-600">
                        Mostrando {filteredCombos.length} de {combos.length} combos
                    </div>

                    {filteredCombos.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-4 border-white">
                            <div className="text-6xl mb-4">📭</div>
                            <div className="text-xl font-semibold text-gray-500">
                                {combos.length === 0 ? 'No hay combos creados aún' : 'No se encontraron combos'}
                            </div>
                            {combos.length === 0 && (
                                <Link
                                    href={route('combos.create')}
                                    className="mt-6 inline-flex items-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                    style={{ backgroundColor: '#65DA4D' }}
                                >
                                    ➕ Crear primer combo
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCombos.map((combo) => (
                                <div
                                    key={combo.id}
                                    className="h-full bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col"
                                >
                                    {/* Imagen de portada */}
                                    {combo.image ? (
                                        <div className="h-48 overflow-hidden flex-shrink-0">
                                            <img
                                                src={combo.image.startsWith('images/') ? `/${combo.image}` : `/images/${combo.image}`}
                                                alt={combo.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-40 bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-6xl">🎁</span>
                                        </div>
                                    )}

                                    {/* Header del combo */}
                                    <div className="p-5 border-b border-gray-100 flex-shrink-0" style={{ backgroundColor: '#f0fdf4' }}>
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">{combo.name}</h3>
                                                {combo.description && (
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{combo.description}</p>
                                                )}
                                            </div>
                                            <span className="text-2xl font-bold text-green-600 whitespace-nowrap">
                                                ${Number(combo.price).toLocaleString('es-AR')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Categorías y prendas */}
                                    <div className="p-5 space-y-3 flex-1">
                                        {combo.categories_summary?.map((slot, idx) => (
                                            <div key={idx} className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                                                    {slot.category.name}
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {slot.products.map((product) => (
                                                        <span
                                                            key={product.id}
                                                            className="text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-700 font-medium"
                                                        >
                                                            {product.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Talles */}
                                        {combo.size_names?.length > 0 && (
                                            <div className="pt-2">
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Talles</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {combo.size_names.map((size, i) => (
                                                        <span
                                                            key={i}
                                                            className="min-w-[2.25rem] h-7 flex items-center justify-center px-2 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"
                                                        >
                                                            {size}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Estado y acciones */}
                                    <div className="px-5 pb-5 space-y-3 flex-shrink-0">
                                        <button
                                            onClick={(e) => handleToggleActive(combo.id, e)}
                                            className={`w-full px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                                                combo.is_active
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                            }`}
                                        >
                                            {combo.is_active ? '✓ Activo' : '✕ Inactivo'}
                                        </button>

                                        <div className="flex gap-2">
                                            <Link
                                                href={route('combos.edit', combo.id)}
                                                className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors text-center"
                                            >
                                                ✏️ Editar
                                            </Link>
                                            <Link
                                                href={route('combos.delete', combo.id)}
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
