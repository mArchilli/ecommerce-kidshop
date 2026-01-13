import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CategoriesView({ categories }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">📂 Categorías</h2>
                    <Link
                        href={route('categories.create')}
                        className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                        style={{ backgroundColor: '#29C9F4' }}
                    >
                        ✨ Crear Categoría
                    </Link>
                </div>
            }
        >
            <Head title="Categorías" />
            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Grid de tarjetas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(category => (
                            <div 
                                key={category.id} 
                                className="rounded-2xl border-4 border-white bg-white p-6 flex flex-col h-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
                                style={{ borderColor: '#29C9F4' }}
                            >
                                <div className="text-3xl mb-3">📂</div>
                                <h3 className="text-xl font-bold mb-4" style={{ color: '#29C9F4' }}>{category.name}</h3>
                                <div className="mt-auto flex gap-3">
                                    <Link
                                        href={route('categories.edit', category.id)}
                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-xl border-3 font-bold text-sm hover:scale-105 transform transition shadow-md"
                                        style={{ borderWidth: '3px', borderColor: '#29C9F4', color: '#29C9F4' }}
                                    >
                                        ✏️ Editar
                                    </Link>
                                    <Link
                                        href={route('categories.delete', category.id)}
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