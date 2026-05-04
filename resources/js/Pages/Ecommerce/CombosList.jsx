import React from 'react';
import { Link } from '@inertiajs/react';

export default function CombosList({ combos = [] }) {
    if (!combos || combos.length === 0) return null;

    return (
        <section className="w-full px-4 py-16 ">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado */}
                <div className="text-left mb-12 px-4" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        🎁 Combos especiales
                    </h2>
                    <p className="text-lg text-gray-600">
                        Armá tu conjunto a medida y llevate todo junto con un precio especial
                    </p>
                </div>

                {/* Cards de combos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {combos.map((combo, idx) => (
                        <div
                            key={combo.id}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                            className="bg-white rounded-3xl shadow-lg border-2 border-pink-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            {/* Header degradado */}
                            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-6 text-white relative overflow-hidden">
                                <div className="absolute -top-4 -right-4 text-8xl opacity-20 select-none">🎁</div>
                                <div className="text-4xl mb-3">🎁</div>
                                <h3 className="text-xl font-bold leading-tight">{combo.name}</h3>
                                {combo.description && (
                                    <p className="text-white/75 text-sm mt-1 line-clamp-2">{combo.description}</p>
                                )}
                            </div>

                            {/* Cuerpo */}
                            <div className="p-5">
                                {/* Qué incluye */}
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Incluye</p>
                                    <div className="space-y-1.5">
                                        {combo.category_names?.map((name, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex-shrink-0" />
                                                <span className="text-sm font-semibold text-gray-700">{name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Precio y CTA */}
                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Precio del combo</p>
                                        <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                            ${Number(combo.price).toLocaleString('es-AR')}
                                            <span className="text-sm font-bold text-gray-400 ml-1">ARS</span>
                                        </p>
                                    </div>
                                    <Link
                                        href={route('combos.public.show', combo.id)}
                                        className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white text-sm font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
                                    >
                                        Armar combo →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Ver todos */}
                <div className="text-center mt-10" data-aos="fade-up">
                    <Link
                        href={route('combos.public.index')}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 hover:scale-105 transform transition-all shadow-lg hover:shadow-xl"
                    >
                        Ver todos los combos
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
