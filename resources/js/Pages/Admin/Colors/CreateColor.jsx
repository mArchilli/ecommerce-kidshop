import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function CreateColor() {
    const { data, setData, post, errors } = useForm({
        name: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('colors.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">
                        ✨ Crear Color
                    </h2>
                    <Link
                        href={route('colors.index')}
                        className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                        style={{ backgroundColor: '#FC1C1D' }}
                    >
                        ← Volver
                    </Link>
                </div>
            }
        >
            <Head title="Crear Color" />

            <div className="py-10">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div 
                        className="rounded-2xl border-4 border-white bg-white shadow-xl p-8"
                        style={{ borderColor: '#FC1C1D' }}
                    >
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">🎨</div>
                            <h3 className="text-2xl font-bold" style={{ color: '#FC1C1D' }}>Nuevo Color</h3>
                            <p className="text-gray-600 mt-2">Agrega un nuevo color para tus productos</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-2">🌈 Nombre del Color</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-xl border-3 border-gray-300 shadow-sm focus:border-[#FC1C1D] focus:ring focus:ring-[#FC1C1D] focus:ring-opacity-50 text-lg p-4"
                                    placeholder="Ej: Rojo, Azul, Verde..."
                                    required
                                />
                                {errors.name && <div className="mt-2 text-red-600 font-semibold">❌ {errors.name}</div>}
                            </div>
                            <div className="flex items-center justify-end gap-4 mt-8">
                                <Link
                                    href={route('colors.index')}
                                    className="inline-flex items-center px-6 py-3 rounded-xl border-3 font-bold text-sm hover:scale-105 transform transition shadow-md"
                                    style={{ borderWidth: '3px', borderColor: '#FC1C1D', color: '#FC1C1D' }}
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-8 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                                    style={{ backgroundColor: '#FC1C1D' }}
                                >
                                    ✅ Agregar Color
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}