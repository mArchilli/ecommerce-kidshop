import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function DeleteColor({ color }) {
    const { data, setData, delete: destroy, errors } = useForm({
        name: color.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        destroy(route('colors.destroy', color.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold leading-tight text-gray-800">
                        🗑️ Eliminar Color
                    </h2>
                    <Link
                        href={route('colors.index')}
                        className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                        style={{ backgroundColor: '#29C9F4' }}
                    >
                        ← Volver
                    </Link>
                </div>
            }
        >
            <Head title="Eliminar Color" />

            <div className="py-10">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div 
                        className="rounded-2xl border-4 border-white bg-red-50 shadow-xl p-8"
                        style={{ borderColor: '#FC1C1D' }}
                    >
                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h3 className="text-2xl font-bold" style={{ color: '#FC1C1D' }}>¡Atención!</h3>
                            <p className="text-gray-800 mt-2 font-semibold">Estás por eliminar este color permanentemente</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-white rounded-xl p-6 border-3" style={{ borderWidth: '3px', borderColor: '#FC1C1D' }}>
                                <label className="block text-lg font-bold text-gray-800 mb-3">🎨 Color a eliminar:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    readOnly
                                    className="block w-full rounded-xl border-3 border-gray-300 shadow-sm text-lg p-4 bg-gray-100 font-bold text-gray-700"
                                />
                                {errors.name && <div className="mt-2 text-red-600 font-semibold">❌ {errors.name}</div>}
                            </div>
                            
                            <div className="bg-yellow-100 border-4 border-yellow-400 rounded-xl p-6">
                                <p className="text-yellow-900 font-bold text-center">
                                    ⚠️ Esta acción no se puede deshacer. Los productos asociados a este color no se eliminarán.
                                </p>
                            </div>
                            
                            <div className="flex items-center justify-end gap-4 mt-8">
                                <Link
                                    href={route('colors.index')}
                                    className="inline-flex items-center px-6 py-3 rounded-xl border-3 font-bold text-sm hover:scale-105 transform transition shadow-md"
                                    style={{ borderWidth: '3px', borderColor: '#29C9F4', color: '#29C9F4' }}
                                >
                                    ← Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-8 py-3 rounded-xl font-bold text-sm text-white uppercase tracking-wider hover:scale-105 transform transition shadow-lg"
                                    style={{ backgroundColor: '#FC1C1D' }}
                                >
                                    🗑️ Sí, Eliminar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}