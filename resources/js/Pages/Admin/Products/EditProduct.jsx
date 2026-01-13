import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import CheckboxLabel from '@/Components/CheckboxLabel';
import RadioLabel from '@/Components/RadioLabel';

export default function EditProduct({ product, categories = [], sizes = [], colors = [], genders = [] }) {
    const { data, setData, post, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        categories: product.categories.map(category => category.id.toString()) || [],
        sizes: product.sizes.map(size => ({ id: size.id, stock: size.pivot.stock })) || [],
        colors: product.colors.map(color => color.id.toString()) || [],
        gender_id: product.gender_id || '',
        image_1: null,
        image_2: null,
        image_3: null,
    });

    const [imagePreviews, setImagePreviews] = useState({
        image_1: product.images && product.images[0] ? `/${product.images[0]}` : null,
        image_2: product.images && product.images[1] ? `/${product.images[1]}` : null,
        image_3: product.images && product.images[2] ? `/${product.images[2]}` : null,
    });
    const [selectedSizes, setSelectedSizes] = useState(product.sizes.map(size => size.id.toString()) || []);

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

        if (e.target.type === 'file' && ['image_1', 'image_2', 'image_3'].includes(key)) {
            const file = e.target.files[0];
            setImagePreviews(prev => ({
                ...prev,
                [key]: file ? URL.createObjectURL(file) : null,
            }));
        }
    };

    const handleSizeSelection = (sizeId) => {
        if (selectedSizes.includes(sizeId.toString())) {
            setSelectedSizes(selectedSizes.filter(id => id !== sizeId.toString()));
            setData('sizes', data.sizes.filter(size => size.id !== sizeId));
        } else {
            setSelectedSizes([...selectedSizes, sizeId.toString()]);
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
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('gender_id', data.gender_id);
        data.categories.forEach(c => formData.append('categories[]', c));
        data.colors.forEach(c => formData.append('colors[]', c));
        data.sizes.forEach((s, i) => {
            formData.append(`sizes[${i}][id]`, s.id);
            formData.append(`sizes[${i}][stock]`, s.stock);
        });
        ['image_1', 'image_2', 'image_3'].forEach(key => {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        });
        post(route('products.update', product.id), {
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
                    <h2 className="text-2xl font-bold text-black">✏️ Editar Producto</h2>
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
            <Head title="Editar Producto" />
            <div className="max-w-7xl mx-auto py-10">
                <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
                    {/* Información básica */}
                    <div className="bg-white rounded-2xl border-4 border-white shadow-lg p-6">
                        <div className="mb-6 pb-4 border-b-4 border-white rounded-xl p-4" style={{ backgroundColor: '#29C9F4' }}>
                            <h3 className="text-xl font-bold text-white">📝 Información Básica</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-700">📛 Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-neutral-700">💰 Precio</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={data.price}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                    required
                                    min="0"
                                    step="1"
                                />
                                {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold mb-2 text-neutral-700">📄 Descripción</label>
                                <textarea
                                    name="description"
                                    value={data.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                                />
                                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold mb-3 text-neutral-700">👶 Género</label>
                                <div className="flex gap-4">
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
                                {errors.gender_id && <div className="text-red-500 text-xs mt-2">{errors.gender_id}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Categorías y Colores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl border-4 border-white shadow-lg p-6">
                            <div className="mb-4 pb-3 border-b-4 border-white rounded-xl p-3" style={{ backgroundColor: '#65DA4D' }}>
                                <h3 className="text-lg font-bold text-white">📂 Categorías</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
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
                            {errors.categories && <div className="text-red-500 text-xs mt-2">{errors.categories}</div>}
                        </div>
                        <div className="bg-white rounded-2xl border-4 border-white shadow-lg p-6">
                            <div className="mb-4 pb-3 border-b-4 border-white rounded-xl p-3" style={{ backgroundColor: '#FC1C1D' }}>
                                <h3 className="text-lg font-bold text-white">🎨 Colores</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
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
                            {errors.colors && <div className="text-red-500 text-xs mt-2">{errors.colors}</div>}
                        </div>
                    </div>

                    {/* Talles y stock */}
                    <div className="bg-white rounded-2xl border-4 border-white shadow-lg p-6">
                        <div className="mb-4 pb-3 border-b-4 border-white rounded-xl p-3" style={{ backgroundColor: '#FFB800' }}>
                            <h3 className="text-lg font-bold text-white">📏 Talles y Stock</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {sizes.map(size => (
                                <div key={size.id} className="flex items-center gap-3 border-b pb-2 mb-2">
                                    <CheckboxLabel
                                        id={size.id}
                                        name="sizes"
                                        value={size.id}
                                        label={size.name}
                                        onChange={() => handleSizeSelection(size.id)}
                                        checked={selectedSizes.includes(size.id.toString())}
                                    />
                                    {selectedSizes.includes(size.id.toString()) && (
                                        <input
                                            type="number"
                                            min={0}
                                            value={data.sizes.find(s => s.id === size.id)?.stock || 0}
                                            onChange={e => handleStockChange(e, size.id)}
                                            className="w-24 rounded-md border border-neutral-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                            placeholder="Stock"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        {errors.sizes && <div className="text-red-500 text-xs mt-2">{errors.sizes}</div>}
                    </div>

                    {/* Imágenes */}
                    <div className="bg-white rounded-2xl border-4 border-white shadow-lg p-6">
                        <div className="mb-4 pb-3 border-b-4 border-white rounded-xl p-3" style={{ backgroundColor: '#29C9F4' }}>
                            <h3 className="text-lg font-bold text-white">🖼️ Imágenes</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex flex-col items-center">
                                    <label className="block text-sm font-bold mb-3 text-neutral-700">Imagen {i}</label>
                                    <input
                                        type="file"
                                        name={`image_${i}`}
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:px-6 file:py-3 file:text-white file:font-bold file:hover:scale-105 file:transition file:shadow-md"
                                    />
                                    <style>{`input[type="file"]::file-selector-button { background-color: #9B59B6; }`}</style>
                                    {errors[`image_${i}`] && (
                                        <div className="text-red-500 text-xs mt-2">{errors[`image_${i}`]}</div>
                                    )}
                                    {imagePreviews[`image_${i}`] && (
                                        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-white w-full shadow-md">
                                            <img
                                                src={imagePreviews[`image_${i}`]}
                                                alt={`Preview ${i}`}
                                                className="h-48 w-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-6">
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
                            style={{ backgroundColor: '#29C9F4' }}
                        >
                            💾 Actualizar Producto
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}