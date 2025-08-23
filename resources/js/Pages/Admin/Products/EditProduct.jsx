import React, { useEffect, useState } from 'react';
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

    // Previsualizaciones para las 3 imágenes
    const [imagePreviews, setImagePreviews] = useState({
        image_1: product.images && product.images[0] ? `/images/products/${product.images[0].replace(/^.*[\\/]/, '')}` : null,
        image_2: product.images && product.images[1] ? `/images/products/${product.images[1].replace(/^.*[\\/]/, '')}` : null,
        image_3: product.images && product.images[2] ? `/images/products/${product.images[2].replace(/^.*[\\/]/, '')}` : null,
    });
    const [selectedSizes, setSelectedSizes] = useState(product.sizes.map(size => size.id.toString()) || []);

    // useEffect(() => {
    //     console.log('Product:', product);
    //     console.log('Categories:', categories);
    //     console.log('Sizes:', sizes);
    //     console.log('Colors:', colors);
    //     console.log('Genders:', genders); 
    // }, [product, categories, sizes, colors, genders]);

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

        // Previsualización para cada input de imagen
        if (e.target.type === 'file' && ['image_1', 'image_2', 'image_3'].includes(key)) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImagePreviews(prev => ({
                        ...prev,
                        [key]: event.target.result
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                setImagePreviews(prev => ({ ...prev, [key]: null }));
            }
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
        // Campos simples
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('gender_id', data.gender_id);
        // Arrays
        data.categories.forEach(c => formData.append('categories[]', c));
        data.colors.forEach(c => formData.append('colors[]', c));
        data.sizes.forEach((s, i) => {
            formData.append(`sizes[${i}][id]`, s.id);
            formData.append(`sizes[${i}][stock]`, s.stock);
        });
        // Imágenes
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
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Editar Producto
                    </h2>
                    <Link
                        href={route('products.index')}
                        className="inline-flex px-4 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white transition"
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
                                                        checked={selectedSizes.includes(size.id.toString())}
                                                    />
                                                    {selectedSizes.includes(size.id.toString()) && (
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
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i}>
                                            <label className="block text-sm font-medium text-gray-700">Imagen {i}</label>
                                            <input
                                                type="file"
                                                name={`image_${i}`}
                                                accept="image/*"
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            />
                                            {errors[`image_${i}`] && <div className="text-red-600">{errors[`image_${i}`]}</div>}
                                            {imagePreviews[`image_${i}`] && (
                                                <div className="mt-2">
                                                    <img
                                                        src={
                                                            imagePreviews[`image_${i}`].startsWith('blob:')
                                                                ? imagePreviews[`image_${i}`]
                                                                : `/images/products/${imagePreviews[`image_${i}`].replace(/^.*[\\/]/, '')}`
                                                        }
                                                        alt={`Previsualización imagen ${i}`}
                                                        className="max-w-xs h-72 rounded-md" // altura aumentada
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
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