import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import CheckboxLabel from '@/Components/CheckboxLabel';

export default function EditProduct({ product, categories = [], sizes = [], colors = [] }) {
    const { data, setData, put, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categories: product.categories.map(category => category.id.toString()),
        sizes: product.sizes.map(size => size.id.toString()),
        colors: product.colors.map(color => color.id.toString()),
    });

    useEffect(() => {
        console.log('Product:', product);
        console.log('Categories:', categories);
        console.log('Sizes:', sizes);
        console.log('Colors:', colors);
    }, [product, categories, sizes, colors]);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        if (e.target.type === 'checkbox') {
            if (e.target.checked) {
                setData(key, [...data[key], value]);
            } else {
                setData(key, data[key].filter((item) => item !== value));
            }
        } else {
            setData(key, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('products.update', product.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Editar Producto
                    </h2>
                    <Link
                        href={route('products.index')}
                        className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
                    >
                        Volver a Productos
                    </Link>
                </div>
            }
        >
            <Head title="Editar Producto" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                        {errors.name && <div className="text-red-600">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                        <textarea
                                            name="description"
                                            value={data.description}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        ></textarea>
                                        {errors.description && <div className="text-red-600">{errors.description}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Precio</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={data.price}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            required
                                        />
                                        {errors.price && <div className="text-red-600">{errors.price}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={data.stock}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        {errors.stock && <div className="text-red-600">{errors.stock}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Categorías</label>
                                        <div className="mt-1 flex flex-wrap">
                                            {categories.map((category) => (
                                                <CheckboxLabel
                                                    key={category.id}
                                                    id={category.id}
                                                    name="categories"
                                                    value={category.id}
                                                    label={category.name}
                                                    onChange={handleChange}
                                                    checked={data.categories.includes(category.id.toString())}
                                                />
                                            ))}
                                        </div>
                                        {errors.categories && <div className="text-red-600">{errors.categories}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Talles</label>
                                        <div className="mt-1 flex flex-wrap">
                                            {sizes.map((size) => (
                                                <CheckboxLabel
                                                    key={size.id}
                                                    id={size.id}
                                                    name="sizes"
                                                    value={size.id}
                                                    label={size.name}
                                                    onChange={handleChange}
                                                    checked={data.sizes.includes(size.id.toString())}
                                                />
                                            ))}
                                        </div>
                                        {errors.sizes && <div className="text-red-600">{errors.sizes}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Colores</label>
                                        <div className="mt-1 flex flex-wrap">
                                            {colors.map((color) => (
                                                <CheckboxLabel
                                                    key={color.id}
                                                    id={color.id}
                                                    name="colors"
                                                    value={color.id}
                                                    label={color.name}
                                                    onChange={handleChange}
                                                    checked={data.colors.includes(color.id.toString())}
                                                />
                                            ))}
                                        </div>
                                        {errors.colors && <div className="text-red-600">{errors.colors}</div>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 disabled:opacity-25 transition"
                                    >
                                        Actualizar Producto
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}