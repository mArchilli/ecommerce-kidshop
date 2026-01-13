import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function EditSize({ size }) {
    const { data, setData, put, errors } = useForm({
        name: size.name,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('sizes.update', size.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">
                        ✏️ Editar Talle
                    </h2>
                    <Link
                        href={route('sizes.index')}
                        className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                        style={{ backgroundColor: '#FC1C1D' }}
                    >
                        ← Volver
                    </Link>
                </div>
            }
        >
            <Head title="Editar Talle" />

            <div className="py-10">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div 
                        className="rounded-2xl border-4 border-white bg-white shadow-xl p-8"
                        style={{ borderColor: '#29C9F4' }}
                    >
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">✏️</div>
                            <h3 className="text-2xl font-bold" style={{ color: '#29C9F4' }}>Editar Talle</h3>
                            <p className="text-gray-600 mt-2">Modifica la información de este talle</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-2">📐 Nombre del Talle</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-3 border-gray-300 shadow-sm focus:border-[#29C9F4] focus:ring focus:ring-[#29C9F4] focus:ring-opacity-50 text-lg p-4"
                                    placeholder="Ej: XS, S, M, L, XL, 2, 4, 6..."
                                    required
                                />
                                {errors.name && <div className="mt-2 text-red-600 font-semibold">❌ {errors.name}</div>}
                            </div>
                            <div className="flex items-center justify-end gap-4 mt-8">
                                <Link
                                    href={route('sizes.index')}
                                    className="inline-flex items-center px-6 py-3 rounded-xl border-3 font-bold text-sm hover:scale-105 transform transition shadow-md"
                                    style={{ borderWidth: '3px', borderColor: '#FC1C1D', color: '#FC1C1D' }}
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-8 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                                    style={{ backgroundColor: '#29C9F4' }}
                                >
                                    💾 Actualizar Talle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}