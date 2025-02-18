import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function CreateProduct({ categories = [], sizes = [], colors = [] }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        categories: [],
        sizes: [],
        colors: [],
    });

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
        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Crear Producto
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
            <Head title="Crear Producto" />

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
                                                <label key={category.id} className="inline-flex items-center mr-4 mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="categories"
                                                        value={category.id}
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-700">{category.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.categories && <div className="text-red-600">{errors.categories}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Talles</label>
                                        <div className="mt-1 flex flex-wrap">
                                            {sizes.map((size) => (
                                                <label key={size.id} className="inline-flex items-center mr-4 mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="sizes"
                                                        value={size.id}
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-700">{size.name}</span>
                                                </label>
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
                                                <label key={color.id} className="inline-flex items-center mr-4 mb-2">
                                                    <input
                                                        type="checkbox"
                                                        name="colors"
                                                        value={color.id}
                                                        onChange={handleChange}
                                                        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                    />
                                                    <span className="ml-2 text-sm font-medium text-gray-700">{color.name}</span>
                                                </label>
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
                                        Crear Producto
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