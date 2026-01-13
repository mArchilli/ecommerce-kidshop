import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ColorsView({ colors }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">🎨 Colores</h2>
                    <Link
                        href={route('colors.create')}
                        className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                        style={{ backgroundColor: '#FC1C1D' }}
                    >
                        ✨ Crear Color
                    </Link>
                </div>
            }
        >
            <Head title="Colores" />
            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Grid de tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {colors.map((color, index) => (
                            <div 
                                key={color.id} 
                                className={`rounded-2xl border-4 border-white p-6 flex flex-col h-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                                    index % 2 === 0 ? 'bg-gradient-to-br from-white to-red-50' : 'bg-gradient-to-br from-white to-pink-50'
                                }`}
                                style={{ borderColor: '#FC1C1D' }}
                            >
                                <div className="text-5xl mb-3 hover:scale-125 transition-transform duration-300 cursor-pointer">🎨</div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: '#FC1C1D' }}>{color.name}</h3>
                                {/* Contador de productos */}
                                {color.products_count !== undefined && (
                                    <span className="inline-flex items-center gap-1 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit">
                                        👕 {color.products_count} {color.products_count === 1 ? 'producto' : 'productos'}
                                    </span>
                                )}
                                <div className="mt-auto flex gap-3">
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