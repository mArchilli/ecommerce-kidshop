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
    const [searchCategory, setSearchCategory] = useState('');
    const [searchColor, setSearchColor] = useState('');
    const [searchSize, setSearchSize] = useState('');

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
        const inputValue = e.target.value;
        const newStock = inputValue === '' ? 0 : parseInt(inputValue, 10);
        
        const newSizes = data.sizes.map(size =>
            size.id == sizeId ? { ...size, stock: newStock } : size
        );
        setData('sizes', newSizes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Filtrar solo los talles seleccionados con su stock actual
        const selectedSizesWithStock = data.sizes.filter(size => selectedSizes.includes(size.id.toString()));
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('gender_id', data.gender_id);
        data.categories.forEach(c => formData.append('categories[]', c));
        data.colors.forEach(c => formData.append('colors[]', c));
        
        // Usar la variable filtrada directamente en lugar de data.sizes
        selectedSizesWithStock.forEach((s, i) => {
            formData.append(`sizes[${i}][id]`, s.id);
            formData.append(`sizes[${i}][stock]`, s.stock);
        });
        
        // Enviar imágenes con el formato que espera el backend (images[])
        ['image_1', 'image_2', 'image_3'].forEach(key => {
            if (data[key]) {
                formData.append('images[]', data[key]);
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
                            {/* Barra de búsqueda */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={searchCategory}
                                    onChange={(e) => setSearchCategory(e.target.value)}
                                    placeholder="🔍 Buscar categoría..."
                                    className="w-full rounded-lg border-2 border-green-300 px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 transition-all"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.filter(category => category.name.toLowerCase().includes(searchCategory.toLowerCase())).map((category) => (
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
                            {/* Barra de búsqueda */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={searchColor}
                                    onChange={(e) => setSearchColor(e.target.value)}
                                    placeholder="🔍 Buscar color..."
                                    className="w-full rounded-lg border-2 border-red-300 px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-400 transition-all"
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {colors.filter(color => color.name.toLowerCase().includes(searchColor.toLowerCase())).map((color) => (
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
                    <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl border-4 border-white shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                        <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-4 border-white rounded-xl p-3 sm:p-4 bg-gradient-to-r from-yellow-500 to-amber-500 shadow-md">
                            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                                <span className="text-xl sm:text-2xl">📏</span>
                                Talles y Stock
                            </h3>
                            <p className="text-xs sm:text-sm text-white/90 mt-1">Selecciona los talles disponibles y asigna su stock</p>
                        </div>
                        {/* Barra de búsqueda */}
                        <div className="mb-4">
                            <input
                                type="text"
                                value={searchSize}
                                onChange={(e) => setSearchSize(e.target.value)}
                                placeholder="🔍 Buscar talle..."
                                className="w-full rounded-lg border-2 border-yellow-300 px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                            {sizes.filter(size => size.name.toLowerCase().includes(searchSize.toLowerCase())).map(size => {
                                const selected = selectedSizes.includes(size.id.toString());
                                const current = data.sizes.find(s => s.id === size.id);
                                return (
                                    <div 
                                        key={size.id} 
                                        className={`relative rounded-xl border-3 p-4 transition-all duration-200 hover:scale-105 cursor-pointer ${
                                            selected 
                                                ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg' 
                                                : 'border-gray-200 bg-white hover:border-yellow-300 shadow-sm hover:shadow-md'
                                        }`}
                                        onClick={() => handleSizeSelection(size.id)}
                                    >
                                        {/* Checkbox en esquina */}
                                        <div className="absolute top-2 right-2">
                                            <input
                                                type="checkbox"
                                                checked={selected}
                                                onChange={() => handleSizeSelection(size.id)}
                                                className="h-5 w-5 rounded-md cursor-pointer transition"
                                                style={{ accentColor: '#FFB800' }}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                        
                                        {/* Nombre del talle */}
                                        <div className="mb-3 pr-8">
                                            <div className="text-2xl font-black" style={{ color: selected ? '#FFB800' : '#6B7280' }}>
                                                {size.name}
                                            </div>
                                            <div className="text-xs text-gray-500 font-semibold mt-1">
                                                {selected ? '✓ Disponible' : 'Click para activar'}
                                            </div>
                                        </div>
                                        
                                        {/* Input de stock */}
                                        {selected && (
                                            <div className="mt-3 pt-3 border-t-2 border-yellow-200" onClick={(e) => e.stopPropagation()}>
                                                <label className="flex items-center gap-2 text-xs font-bold mb-2" style={{ color: '#FFB800' }}>
                                                    <span>📦</span>
                                                    Stock disponible
                                                </label>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    value={current?.stock ?? 0}
                                                    onChange={e => handleStockChange(e, size.id)}
                                                    className="w-full rounded-lg border-2 border-yellow-300 px-3 py-2 text-sm font-bold text-center focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all"
                                                    placeholder="0"
                                                    style={{ backgroundColor: '#FFFBEB' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {errors.sizes && <p className="text-red-500 text-xs mt-4 font-bold bg-red-50 p-3 rounded-lg border-2 border-red-200">{errors.sizes}</p>}
                        
                        {/* Resumen de talles seleccionados */}
                        {data.sizes.length > 0 && (
                            <div className="mt-6 p-4 bg-white rounded-xl border-2 border-yellow-200">
                                <div className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: '#FFB800' }}>
                                    <span className="text-lg">✅</span>
                                    Resumen: {data.sizes.length} {data.sizes.length === 1 ? 'talle seleccionado' : 'talles seleccionados'}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.sizes.map(s => {
                                        const sizeInfo = sizes.find(sz => sz.id === s.id);
                                        return (
                                            <span 
                                                key={s.id}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-sm"
                                                style={{ backgroundColor: '#FFB800' }}
                                            >
                                                {sizeInfo?.name}: {s.stock} unidades
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
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