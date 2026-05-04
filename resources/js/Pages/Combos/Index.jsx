import React from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';

export default function CombosIndex({ combos }) {
    return (
        <EcommerceLayout>
            <Head title="Combos" />

            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 min-h-screen py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                            🎁 Combos
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Armá tu combo a medida y ahorrá en cada prenda
                        </p>
                    </div>

                    {combos.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📭</div>
                            <p className="text-xl text-gray-500">No hay combos disponibles por el momento.</p>
                            <Link
                                href={route('welcome')}
                                className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
                            >
                                ← Volver al inicio
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {combos.map((combo) => (
                                <div
                                    key={combo.id}
                                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-6 text-white">
                                        <div className="text-4xl mb-3">🎁</div>
                                        <h2 className="text-2xl font-bold">{combo.name}</h2>
                                        {combo.description && (
                                            <p className="text-white/80 text-sm mt-1 line-clamp-2">{combo.description}</p>
                                        )}
                                    </div>

                                    {/* Categorías */}
                                    <div className="p-5 space-y-2">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Incluye</p>
                                        {combo.category_names?.map((name, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                                                <span className="text-sm font-semibold text-gray-700">{name}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Precio y botón */}
                                    <div className="px-5 pb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm text-gray-500 font-medium">Precio del combo</span>
                                            <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                                ${Number(combo.price).toLocaleString('es-AR')}
                                            </span>
                                        </div>
                                        <Link
                                            href={route('combos.public.show', combo.id)}
                                            className="block w-full text-center py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold rounded-full transition-all duration-300 hover:shadow-lg"
                                        >
                                            Crear mi combo →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </EcommerceLayout>
    );
}
