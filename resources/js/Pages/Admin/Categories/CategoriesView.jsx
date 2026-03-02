import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function CategoriesView({ categories }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    // Filtrar y ordenar categorías
    const filteredCategories = categories
        .filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.name.localeCompare(b.name);
            if (sortOrder === 'desc') return b.name.localeCompare(a.name);
            return 0;
        });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-2xl font-bold leading-tight text-gray-800">📂 Categorías</h2>
                    <Link
                        href={route('categories.create')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                        style={{ backgroundColor: '#29C9F4' }}
                    >
                        ✨ Agregar Categoría
                    </Link>
                </div>
            }
        >
            <Head title="Categorías" />
            <div className="py-6 sm:py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Buscador y orden */}
                    <div className="mb-6">
                        <div className="bg-gradient-to-r from-white to-cyan-50 rounded-2xl border-4 border-white shadow-lg p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                {/* Buscador */}
                                <div className="relative w-full sm:max-w-sm">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="🔍 Buscar categoría por nombre..."
                                        className="w-full border-2 border-neutral-300 rounded-xl px-4 sm:px-5 py-3 text-sm sm:text-base font-semibold focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400 pr-10"
                                        style={{ backgroundColor: '#f8f9fa' }}
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={() => setSearchTerm('')}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 text-xl font-bold"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                                {/* Botones de orden */}
                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? '' : 'asc')}
                                        className={`px-4 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md ${
                                            sortOrder === 'asc' ? 'text-white' : 'bg-white border-2 border-cyan-300 text-cyan-600'
                                        }`}
                                        style={sortOrder === 'asc' ? { backgroundColor: '#29C9F4', color: 'white' } : {}}
                                    >
                                        A → Z
                                    </button>
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'desc' ? '' : 'desc')}
                                        className={`px-4 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md ${
                                            sortOrder === 'desc' ? 'text-white' : 'bg-white border-2 border-cyan-300 text-cyan-600'
                                        }`}
                                        style={sortOrder === 'desc' ? { backgroundColor: '#29C9F4', color: 'white' } : {}}
                                    >
                                        Z → A
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contador de resultados */}
                    <div className="mb-4">
                        <p className="text-sm sm:text-base font-bold text-gray-700">
                            📊 Mostrando {filteredCategories.length} de {categories.length} categorías
                        </p>
                    </div>

                    {/* Grid de tarjetas */}
                    {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredCategories.map((category, index) => (
                            <div 
                                key={category.id} 
                                className={`rounded-2xl border-4 border-white p-4 sm:p-6 flex flex-col h-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                                    index % 2 === 0 ? 'bg-gradient-to-br from-white to-cyan-50' : 'bg-gradient-to-br from-white to-green-50'
                                }`}
                                style={{ borderColor: '#29C9F4' }}
                            >
                                <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 hover:scale-125 transition-transform duration-300 cursor-pointer">📂</div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: '#29C9F4' }}>{category.name}</h3>
                                {/* Contador de productos */}
                                {category.products_count !== undefined && (
                                    <span className="inline-flex items-center gap-1 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold mb-3 sm:mb-4 w-fit">
                                        👕 {category.products_count} {category.products_count === 1 ? 'producto' : 'productos'}
                                    </span>
                                )}
                                <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:gap-3">
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
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border-4 border-white shadow-lg">
                            <span className="text-6xl mb-4 block">🔍</span>
                            <p className="text-xl font-bold text-gray-600 mb-2">
                                No se encontraron categorías
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                                Intenta con otro término de búsqueda
                            </p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                style={{ backgroundColor: '#29C9F4' }}
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}