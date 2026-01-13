import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ColorsView({ colors }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-2xl font-bold leading-tight text-gray-800">🎨 Colores</h2>
                    <Link
                        href={route('colors.create')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                        style={{ backgroundColor: '#FC1C1D' }}
                    >
                        ✨ Crear Color
                    </Link>
                </div>
            }
        >
            <Head title="Colores" />
            <div className="py-6 sm:py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Grid de tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {colors.map((color, index) => (
                            <div 
                                key={color.id} 
                                className={`rounded-2xl border-4 border-white p-4 sm:p-6 flex flex-col h-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                                    index % 2 === 0 ? 'bg-gradient-to-br from-white to-red-50' : 'bg-gradient-to-br from-white to-pink-50'
                                }`}
                                style={{ borderColor: '#FC1C1D' }}
                            >
                                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 hover:scale-125 transition-transform duration-300 cursor-pointer">🎨</div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#FC1C1D' }}>{color.name}</h3>
                                {/* Contador de productos */}
                                {color.products_count !== undefined && (
                                    <span className="inline-flex items-center gap-1 bg-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold mb-3 sm:mb-4 w-fit">
                                        👕 {color.products_count} {color.products_count === 1 ? 'producto' : 'productos'}
                                    </span>
                                )}
                                <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <Link
                                        href={route('colors.edit', color.id)}
                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl border-3 font-bold text-sm hover:scale-105 transform transition shadow-md"
                                        style={{ borderWidth: '3px', borderColor: '#29C9F4', color: '#29C9F4' }}
                                    >
                                        ✏️ Editar
                                    </Link>
                                    <Link
                                        href={route('colors.delete', color.id)}
                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl border-3 font-bold text-sm hover:scale-105 transform transition shadow-md"
                                        style={{ borderWidth: '3px', borderColor: '#FC1C1D', color: '#FC1C1D' }}
                                    >
                                        🗑️ Eliminar
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}