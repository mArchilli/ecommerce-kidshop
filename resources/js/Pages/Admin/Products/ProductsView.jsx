import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ProductsView({ products }) {
    useEffect(() => {
        //console.log(products);
    }, [products]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Prendas
                    </h2>
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
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Vista Mobile: tarjetas */}
                            <div className="block md:hidden">
                                <div className="space-y-4">
                                    {products.map((product) => (
                                        <div key={product.id} className="rounded-xl border border-black/10 bg-white p-4">
                                            <div className="flex items-baseline justify-between">
                                                <h3 className="text-base font-semibold text-black">{product.name}</h3>
                                                <span className="text-sm text-neutral-700">${product.price}</span>
                                            </div>

                                            <div className="mt-3">
                                                <p className="text-xs text-neutral-500 mb-1">Talles</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {product.sizes.map((size) => (
                                                        <span
                                                            key={`${product.id}-size-${size.id}`}
                                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs border border-black/30 text-black"
                                                        >
                                                            {size.name}
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

                            {/* Vista Desktop: tabla */}
                            <div className="hidden md:block">
                                <table className="min-w-full divide-y divide-black/10 table-fixed">
                                    <thead className="bg-white">
                                        <tr>
                                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                                Precio
                                            </th>
                                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                                Talles
                                            </th>
                                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                                Categorías
                                            </th>
                                            <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-black/10">
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">${product.price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                                                    {product.sizes.map((size) => (
                                                        <span
                                                            key={`${product.id}-size-${size.id}`}
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-black/30 text-black mr-1"
                                                        >
                                                            {size.name}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                                                    {product.categories.map((category) => (
                                                        <span
                                                            key={`${product.id}-category-${category.id}`}
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-black/30 text-black mr-1"
                                                        >
                                                            {category.name}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                                                    <div className="flex flex-col space-y-2">
                                                        <Link
                                                            href={route('products.edit', product.id)}
                                                            className="inline-flex items-center px-4 py-2 bg-white border border-black rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-black hover:text-white active:bg-black focus:outline-none focus:border-black focus:ring focus:ring-black disabled:opacity-25 transition"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <Link
                                                            href={route('products.delete', product.id)}
                                                            className="inline-flex items-center px-4 py-2 bg-white border border-black rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-red-500 hover:border-red-500 hover:text-white active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring focus:ring-red-300 disabled:opacity-25 transition"
                                                        >
                                                            Eliminar
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* fin desktop */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}