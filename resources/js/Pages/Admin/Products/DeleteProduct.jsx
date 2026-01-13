import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import CheckboxLabel from '@/Components/CheckboxLabel';
import RadioLabel from '@/Components/RadioLabel';

export default function DeleteProduct({ product, categories = [], sizes = [], colors = [], genders = [] }) {
    const { data, setData, delete: destroy, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.categories.map(category => category.id.toString()),
        sizes: product.sizes.map(size => ({ id: size.id, stock: size.pivot.stock })),
        colors: product.colors.map(color => color.id.toString()),
        gender_id: product.gender_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        destroy(route('products.destroy', product.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white px-6 py-3 rounded-xl" style={{ backgroundColor: '#FC1C1D' }}>⚠️ Eliminar Producto</h2>
                    <Link
                        href={route('products.index')}
                        className="px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#9B59B6' }}
                    >
                        ← Volver
                    </Link>
                </div>
            }
        >
            <Head title="Eliminar Producto" />
            <div className="max-w-7xl mx-auto py-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-2xl border-4 shadow-lg p-8" style={{ borderColor: '#FC1C1D' }}>
                        <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: '#FFF0F0', borderLeft: '6px solid #FC1C1D' }}>
                            <h3 className="text-xl font-bold mb-2" style={{ color: '#FC1C1D' }}>⚠️ ¿Estás seguro que deseas eliminar este producto?</h3>
                            <p className="text-sm text-neutral-600">Esta acción no se puede deshacer.</p>
                        </div>
                        <div className="space-y-5">
                            <div className="bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                                <span className="block text-sm font-bold mb-2 text-neutral-600">📛 Nombre</span>
                                <div className="text-xl font-bold text-black">{data.name}</div>
                            </div>
                            <div className="bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                                <span className="block text-sm font-bold mb-2 text-neutral-600">📄 Descripción</span>
                                <div className="text-base text-neutral-700">{data.description}</div>
                            </div>
                            <div className="bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                                <span className="block text-sm font-bold mb-2 text-neutral-600">💰 Precio</span>
                                <div className="text-xl font-bold text-green-600">${Number(data.price).toLocaleString('es-AR')}</div>
                            </div>
                            <div className="bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                                <span className="block text-sm font-bold mb-3 text-neutral-600">📂 Categorías</span>
                                <div className="flex flex-wrap gap-2">
                                    {categories.filter(c => data.categories.includes(c.id.toString())).map(c => (
                                        <span key={c.id} className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md" style={{ backgroundColor: '#65DA4D' }}>{c.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                                <span className="block text-sm font-bold mb-3 text-neutral-600">📏 Talles y Stock</span>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.filter(s => data.sizes.some(sz => sz.id === s.id)).map(s => (
                                        <span key={s.id} className="px-4 py-2 rounded-xl text-sm font-bold text-black shadow-md" style={{ backgroundColor: '#FFF9E6', border: '2px solid #FFB800' }}>
                                            {s.name} ({data.sizes.find(sz => sz.id === s.id)?.stock || 0})
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                                <span className="block text-sm font-bold mb-3 text-neutral-600">🎨 Colores</span>
                                <div className="flex flex-wrap gap-2">
                                    {colors.filter(c => data.colors.includes(c.id.toString())).map(c => (
                                        <span key={c.id} className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md" style={{ backgroundColor: '#FC1C1D' }}>{c.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                                <span className="block text-sm font-bold mb-3 text-neutral-600">👶 Género</span>
                                <div className="flex flex-wrap gap-2">
                                    {genders.filter(g => data.gender_id == g.id).map(g => (
                                        <span key={g.id} className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-md" style={{ backgroundColor: '#29C9F4' }}>{g.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-neutral-50 p-5 rounded-xl border-2 border-neutral-200">
                                <span className="block text-sm font-bold mb-3 text-neutral-600">🖼️ Imágenes</span>
                                <div className="flex gap-4 mt-3">
                                    {product.images && product.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={`/${img}`}
                                            alt={`Imagen ${idx + 1}`}
                                            className="h-32 w-32 object-cover rounded-xl border-4 border-white shadow-md"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
                            <Link
                                href={route('products.index')}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl text-center font-bold text-white hover:scale-105 transform transition shadow-md"
                                style={{ backgroundColor: '#9B59B6' }}
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                style={{ backgroundColor: '#FC1C1D' }}
                            >
                                🗑️ Eliminar Producto
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}