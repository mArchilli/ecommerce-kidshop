import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SizesView({ sizes }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-2xl font-bold leading-tight text-gray-800">📏 Talles</h2>
                    <Link
                        href={route('sizes.create')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                        style={{ backgroundColor: '#FFB800' }}
                    >
                        ✨ Crear Talle
                    </Link>
                </div>
            }
        >
            <Head title="Talles" />
            <div className="py-6 sm:py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Grid de tarjetas */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {sizes.map((size, index) => (
                            <div 
                                key={size.id} 
                                className={`rounded-2xl border-4 border-white p-4 sm:p-6 flex flex-col h-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                                    index % 2 === 0 ? 'bg-gradient-to-br from-white to-yellow-50' : 'bg-gradient-to-br from-white to-orange-50'
                                }`}
                                style={{ borderColor: '#FFB800' }}
                            >
                                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 hover:scale-125 transition-transform duration-300 cursor-pointer">📏</div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#FFB800' }}>{size.name}</h3>
                                {/* Indicador visual del talle */}
                                <div className="mb-3 sm:mb-4">
                                    <span className="inline-flex items-center gap-1 bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                                        📊 Talle {size.name}
                                    </span>
                                </div>
                                <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
                                    <Link
                                        href={route('sizes.edit', size.id)}
                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl border-3 font-bold text-sm hover:scale-105 transform transition shadow-md"
                                        style={{ borderWidth: '3px', borderColor: '#29C9F4', color: '#29C9F4' }}
                                    >
                                        ✏️ Editar
                                    </Link>
                                    <Link
                                        href={route('sizes.delete', size.id)}
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