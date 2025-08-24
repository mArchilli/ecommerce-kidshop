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
                    <h2 className="text-2xl font-bold text-red-600">Eliminar Producto</h2>
                    <Link
                        href={route('products.index')}
                        className="px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition"
                    >
                        Volver
                    </Link>
                </div>
            }
        >
            <Head title="Eliminar Producto" />
            <div className="max-w-7xl mx-auto py-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-2xl shadow p-8 border-2 border-red-400">
                        <h3 className="text-lg font-semibold text-red-600 mb-6 border-b pb-2">¿Estás seguro que deseas eliminar este producto?</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="block text-xs text-neutral-500 mb-1">Nombre</span>
                                <div className="text-lg font-bold">{data.name}</div>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 mb-1">Descripción</span>
                                <div className="text-neutral-700">{data.description}</div>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 mb-1">Precio</span>
                                <div className="text-neutral-700">${Number(data.price).toLocaleString('es-AR')}</div>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 mb-1">Categorías</span>
                                <div className="flex flex-wrap gap-2">
                                    {categories.filter(c => data.categories.includes(c.id.toString())).map(c => (
                                        <span key={c.id} className="bg-neutral-100 border px-2 py-1 rounded text-xs">{c.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 mb-1">Talles y Stock</span>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.filter(s => data.sizes.some(sz => sz.id === s.id)).map(s => (
                                        <span key={s.id} className="bg-neutral-100 border px-2 py-1 rounded text-xs">
                                            {s.name} ({data.sizes.find(sz => sz.id === s.id)?.stock || 0})
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 mb-1">Colores</span>
                                <div className="flex flex-wrap gap-2">
                                    {colors.filter(c => data.colors.includes(c.id.toString())).map(c => (
                                        <span key={c.id} className="bg-neutral-100 border px-2 py-1 rounded text-xs">{c.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 mb-1">Género</span>
                                <div className="flex flex-wrap gap-2">
                                    {genders.filter(g => data.gender_id == g.id).map(g => (
                                        <span key={g.id} className="bg-neutral-100 border px-2 py-1 rounded text-xs">{g.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="block text-xs text-neutral-500 mb-1">Imágenes</span>
                                <div className="flex gap-4 mt-2">
                                    {product.images && product.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={`/${img}`}
                                            alt={`Imagen ${idx + 1}`}
                                            className="h-24 w-24 object-cover rounded border"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
                            <Link
                                href={route('products.index')}
                                className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-center border border-black text-black hover:bg-black hover:text-white transition"
                            >
                                Cancelar
                            </Link>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-white hover:text-red-600 border border-red-600 transition font-semibold"
                            >
                                Eliminar Producto
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}