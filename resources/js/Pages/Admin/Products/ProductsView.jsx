import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ProductsView({ products }) {
    // Obtener todas las categorías únicas de los productos
    const allCategories = Array.from(
        new Set(products.flatMap(p => p.categories.map(c => c.name)))
    );

    const [selectedCategory, setSelectedCategory] = useState('');

    // Filtrar productos por categoría seleccionada
    const filteredProducts = selectedCategory
        ? products.filter(product =>
            product.categories.some(category => category.name === selectedCategory)
        )
        : products;

    useEffect(() => {
        //console.log(products);
    }, [products]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Prendas
                        </h2>
                    </div>
                    <Link
                        href={route('products.create')}
                        className="inline-flex items-center px-4 py-2 bg-white border border-black rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-black hover:text-white active:bg-black focus:outline-none focus:border-black focus:ring focus:ring-black disabled:opacity-25 transition"
                    >
                        Crear Prenda
                    </Link>
                </div>
            }
        >
            <Head title="Prendas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 ml-6">
                        <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
                            Filtrar por categoría:
                        </label>
                        <select
                            id="category-filter"
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="border border-black rounded-md px-2 py-1 text-sm"
                        >
                            <option value="">Todas</option>
                            {allCategories.map((cat) => (
                                <option className='px-2' key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Cards para ambas vistas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="rounded-xl border border-black/10 bg-white p-4 flex flex-col h-full">
                                        <div className="flex items-baseline justify-between">
                                            <h3 className="text-base font-semibold text-black">{product.name}</h3>
                                            <span className="text-sm text-neutral-700">
                                                ${Number(product.price).toLocaleString('es-AR')}
                                            </span>
                                        </div>

                                        <div className="mt-3">
                                            <p className="text-xs text-neutral-500 mb-1">Talles y Stock</p>
                                            <div className="flex flex-wrap gap-2">
                                                {product.sizes.map((size) => (
                                                    <span
                                                        key={`${product.id}-size-${size.id}`}
                                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border border-black/30 text-black bg-gray-50"
                                                    >
                                                        {size.name}
                                                        {size.pivot && typeof size.pivot.stock !== 'undefined' && (
                                                            <span className="ml-2 text-gray-500">({size.pivot.stock})</span>
                                                        )}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <p className="text-xs text-neutral-500 mb-1">Categorías</p>
                                            <div className="flex flex-wrap gap-1">
                                                {product.categories.map((category) => (
                                                    <span
                                                        key={`${product.id}-category-${category.id}`}
                                                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border border-black/30 text-black"
                                                    >
                                                        {category.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            <Link
                                                href={route('products.edit', product.id)}
                                                className="inline-flex items-center px-3 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white transition text-xs"
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                                href={route('products.delete', product.id)}
                                                className="inline-flex items-center px-3 py-2 rounded-md border border-black text-black hover:border-red-500 hover:bg-red-500 hover:text-white transition text-xs"
                                            >
                                                Eliminar
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}