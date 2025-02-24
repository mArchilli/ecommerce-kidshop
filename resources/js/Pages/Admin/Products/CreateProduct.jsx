import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import CheckboxLabel from '@/Components/CheckboxLabel';
import RadioLabel from '@/Components/RadioLabel';

export default function CreateProduct({ categories = [], sizes = [], colors = [], genders = [] }) {
    const { data, setData, post, errors } = useForm({
        name: '',
        description: '',
        price: '',
        categories: [],
        sizes: [],
        colors: [],
        gender_id: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;

        if (e.target.type === 'checkbox') {
            if (e.target.checked) {
                setData(key, [...data[key], value]);
            } else {
                setData(key, data[key].filter((item) => item !== value));
            }
        } else {
            setData(key, value);
        }

        if (e.target.type === 'file') {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSizeSelection = (sizeId) => {
        if (selectedSizes.includes(sizeId)) {
            setSelectedSizes(selectedSizes.filter(id => id !== sizeId));
            setData('sizes', data.sizes.filter(size => size.id !== sizeId));
        } else {
            setSelectedSizes([...selectedSizes, sizeId]);
            setData('sizes', [...data.sizes, { id: sizeId, stock: 0 }]);
        }
    };

    const handleStockChange = (e, sizeId) => {
        const newSizes = data.sizes.map(size => 
            size.id === sizeId ? { ...size, stock: parseInt(e.target.value) || 0 } : size
        );
        setData('sizes', newSizes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedSizesWithStock = data.sizes.filter(size => selectedSizes.includes(size.id.toString()));
        setData('sizes', selectedSizesWithStock);
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                data[key].forEach(value => formData.append(`${key}[]`, value));
            } else {
                formData.append(key, data[key]);
            }
        });
        post(route('products.store'), {
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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
                            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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
                                                <div key={size.id} className="mr-4 mb-4">
                                                    <CheckboxLabel
                                                        id={size.id}
                                                        name={`sizes[${size.id}].id`}
                                                        value={size.id}
                                                        label={size.name}
                                                        onChange={() => handleSizeSelection(size.id)}
                                                        checked={selectedSizes.includes(size.id)}
                                                    />
                                                    {selectedSizes.includes(size.id) && (
                                                        <input
                                                            type="number"
                                                            name={`sizes[${size.id}].stock`}
                                                            value={data.sizes.find(s => s.id === size.id)?.stock || 0}
                                                            onChange={(e) => handleStockChange(e, size.id)}
                                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        />
                                                    )}
                                                    {errors[`sizes.${size.id}.stock`] && <div className="text-red-600">{errors[`sizes.${size.id}.stock`]}</div>}
                                                </div>
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
                                                    onChange={handleChange}
                                                    checked={data.gender_id == gender.id}
                                                />
                                            ))}
                                        </div>
                                        {errors.gender_id && <div className="text-red-600">{errors.gender_id}</div>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Imagen</label>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        />
                                        {errors.image && <div className="text-red-600">{errors.image}</div>}
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img src={imagePreview} alt="Previsualización de la imagen" className="max-w-xs h-auto rounded-md" />
                                            </div>
                                        )}
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