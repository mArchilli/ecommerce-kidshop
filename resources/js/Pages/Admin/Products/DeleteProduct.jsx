// filepath: /c:/Users/matia/OneDrive/Escritorio/proyectos/ecommerce/resources/js/Pages/Admin/Products/DeleteProduct.jsx
import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import CheckboxLabel from '@/Components/CheckboxLabel';
import RadioLabel from '@/Components/RadioLabel'; // Importa el componente RadioLabel

export default function DeleteProduct({ product, categories = [], sizes = [], colors = [], genders = [] }) {
    const { data, setData, delete: destroy, errors } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        categories: product.categories.map(category => category.id.toString()),
        sizes: product.sizes.map(size => size.id.toString()),
        colors: product.colors.map(color => color.id.toString()),
        gender_id: product.gender_id || '', // Agrega el estado para el género
    });

    useEffect(() => {
        console.log('Product:', product);
        console.log('Categories:', categories);
        console.log('Sizes:', sizes);
        console.log('Colors:', colors);
        console.log('Genders:', genders); // Log para verificar los géneros
    }, [product, categories, sizes, colors, genders]);

    const handleSubmit = (e) => {
        e.preventDefault();
        destroy(route('products.destroy', product.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Eliminar Producto
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
            <Head title="Eliminar Producto" />

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
                                            readOnly
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100"
                                        />
                                        {errors.name && <div className="text-red-600">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                        <textarea
                                            name="description"
                                            value={data.description}
                                            readOnly
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100"
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
                                            readOnly
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100"
                                        />
                                        {errors.price && <div className="text-red-600">{errors.price}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={data.stock}
                                            readOnly
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-100"
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
                                                    onChange={() => {}}
                                                    checked={data.categories.includes(category.id.toString())}
                                                    readOnly
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
                                                    onChange={() => {}}
                                                    checked={data.sizes.includes(size.id.toString())}
                                                    readOnly
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
                                                    onChange={() => {}}
                                                    checked={data.colors.includes(color.id.toString())}
                                                    readOnly
                                                />
                                            ))}
                                        </div>
                                        {errors.colors && <div className="text-red-600">{errors.colors}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Género</label>
                                        <div className="mt-1 flex flex-wrap">
                                            {genders.map((gender) => (
                                                <RadioLabel
                                                    key={gender.id}
                                                    id={gender.id}
                                                    name="gender_id"
                                                    value={gender.id}
                                                    label={gender.name}
                                                    onChange={() => {}}
                                                    checked={data.gender_id == gender.id}
                                                    readOnly
                                                />
                                            ))}
                                        </div>
                                        {errors.gender_id && <div className="text-red-600">{errors.gender_id}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Imagen</label>
                                        {product.image && (
                                            <div className="mt-2">
                                                <img src={`/storage/${product.image}`} alt="Imagen del producto" className="max-w-xs h-auto rounded-md" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring focus:ring-red-300 disabled:opacity-25 transition"
                                    >
                                        Eliminar Producto
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