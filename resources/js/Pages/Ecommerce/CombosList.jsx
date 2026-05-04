import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function CombosList({ combos = [] }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!combos || combos.length === 0) return null;

    const getImageSrc = (image) => {
        if (!image) return null;
        return image.startsWith('images/') ? `/${image}` : `/images/${image}`;
    };

    const ComboCard = ({ combo, animated = true }) => (
        <div className={`bg-white rounded-3xl shadow-lg border-2 border-pink-100 overflow-hidden flex flex-col h-full${animated ? ' hover:shadow-2xl hover:-translate-y-2 transition-all duration-300' : ''}`}>
            {/* Header: imagen si hay, sino degradado */}
            {getImageSrc(combo.image) ? (
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                        src={getImageSrc(combo.image)}
                        alt={combo.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-xl font-bold text-white leading-tight">{combo.name}</h3>
                        {combo.description && (
                            <p className="text-white/75 text-sm mt-1 line-clamp-2">{combo.description}</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-6 text-white relative overflow-hidden flex-shrink-0">
                    <div className="absolute -top-4 -right-4 text-8xl opacity-20 select-none">🎁</div>
                    <div className="text-4xl mb-3">🎁</div>
                    <h3 className="text-xl font-bold leading-tight">{combo.name}</h3>
                    {combo.description && (
                        <p className="text-white/75 text-sm mt-1 line-clamp-2">{combo.description}</p>
                    )}
                </div>
            )}

            {/* Cuerpo */}
            <div className="p-5 flex flex-col flex-1">
                <div className="mb-4 flex-1">
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

                {/* Talles */}
                {combo.size_names?.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Talles</p>
                        <div className="flex flex-wrap gap-1.5">
                            {combo.size_names.map((size, i) => (
                                <span key={i} className="min-w-[2.25rem] h-8 flex items-center justify-center px-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

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
                        className={`px-5 py-2.5 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white text-sm font-bold rounded-full transition-all duration-200${animated ? ' hover:shadow-lg hover:scale-105' : ''}`}
                    >
                        Armar combo →
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <section className="w-full px-4 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado */}
                <div className="text-left mb-12 px-8" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Combos especiales
                    </h2>
                    <p className="text-lg text-gray-600">
                        Armá tu conjunto a medida y llevate todo junto con un precio especial
                    </p>
                </div>

                {isMobile ? (
                    /* Carrusel mobile: scroll horizontal con snap */
                    <div className="overflow-x-auto scrollbar-hide px-4">
                        <div className="flex gap-4 snap-x snap-mandatory pb-4">
                            {combos.map((combo) => (
                                <div
                                    key={combo.id}
                                    className="snap-center flex-shrink-0"
                                    style={{ flex: '0 0 85%' }}
                                >
                                    <ComboCard combo={combo} animated={false} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Grid desktop */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
                        {combos.map((combo, idx) => (
                            <div key={combo.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                                <ComboCard combo={combo} idx={idx} />
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
