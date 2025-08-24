import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SizesView({ sizes }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">Talles</h2>
                    <Link
                        href={route('sizes.create')}
                        className="inline-flex items-center px-4 py-2 bg-white border border-black rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-black hover:text-white active:bg-black focus:outline-none focus:border-black focus:ring focus:ring-black disabled:opacity-25 transition"
                    >
                        Crear Talle
                    </Link>
                </div>
            }
        >
            <Head title="Talles" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Grid de tarjetas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sizes.map(size => (
                                    <div key={size.id} className="rounded-xl border border-black/10 bg-white p-4 flex flex-col h-full">
                                        <h3 className="text-base font-semibold text-black mb-4">{size.name}</h3>
                                        <div className="mt-auto flex gap-2">
                                            <Link
                                                href={route('sizes.edit', size.id)}
                                                className="inline-flex items-center px-3 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white transition text-xs"
                                            >
                                                Editar
                                            </Link>
                                            <Link
                                                href={route('sizes.delete', size.id)}
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