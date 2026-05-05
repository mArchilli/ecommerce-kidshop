import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function CreateCombo({ categories, sizes }) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        is_active: true,
        is_featured: false,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedSizeIds, setSelectedSizeIds] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [categoryQuantities, setCategoryQuantities] = useState({});
    const [categorySearch, setCategorySearch] = useState('');
    const [productSearch, setProductSearch] = useState({});
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const toggleSize = (sizeId) => {
        setSelectedSizeIds(prev =>
            prev.includes(sizeId) ? prev.filter(id => id !== sizeId) : [...prev, sizeId]
        );
    };

    const filteredCategories = categories.filter(cat =>
        !categorySearch || cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );

    const toggleCategory = (categoryId) => {
        if (selectedCategoryIds.includes(categoryId)) {
            setSelectedCategoryIds(prev => prev.filter(id => id !== categoryId));
            setProductsByCategory(prev => {
                const next = { ...prev };
                delete next[categoryId];
                return next;
            });
            setCategoryQuantities(prev => {
                const next = { ...prev };
                delete next[categoryId];
                return next;
            });
        } else {
            setSelectedCategoryIds(prev => [...prev, categoryId]);
            setProductsByCategory(prev => ({ ...prev, [categoryId]: [] }));
            setCategoryQuantities(prev => ({ ...prev, [categoryId]: 1 }));
        }
    };

    const toggleProduct = (categoryId, productId) => {
        setProductsByCategory(prev => {
            const current = prev[categoryId] || [];
            const next = current.includes(productId)
                ? current.filter(id => id !== productId)
                : [...current, productId];
            return { ...prev, [categoryId]: next };
        });
    };

    const getImageSrc = (images) => {
        if (!images || !images[0]) return null;
        const imgPath = images[0];
        return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0] || null;
        setImageFile(file);
        setImagePreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const items = selectedCategoryIds.map(catId => ({
            category_id: catId,
            quantity: categoryQuantities[catId] || 1,
            product_ids: productsByCategory[catId] || [],
        }));

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('price', form.price);
        formData.append('is_active', form.is_active ? '1' : '0');
        formData.append('is_featured', form.is_featured ? '1' : '0');
        if (imageFile) formData.append('image', imageFile);
        selectedSizeIds.forEach((sid, i) => {
            formData.append(`size_ids[${i}]`, sid);
        });
        items.forEach((item, i) => {
            formData.append(`items[${i}][category_id]`, item.category_id);
            formData.append(`items[${i}][quantity]`, item.quantity);
            item.product_ids.forEach((pid, j) => {
                formData.append(`items[${i}][product_ids][${j}]`, pid);
            });
        });

        setProcessing(true);

        router.post(route('combos.store'), formData, {
            onError: (errs) => {
                setErrors(errs);
                setProcessing(false);
            },
            onFinish: () => setProcessing(false),
        });
    };

    const selectedCategoriesData = categories.filter(c => selectedCategoryIds.includes(c.id));

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold leading-tight text-gray-800">
                        ➕ Crear Nuevo Combo
                    </h2>
                    <Link
                        href={route('combos.index')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#29C9F4' }}
                    >
                        ← Volver a Combos
                    </Link>
                </div>
            }
        >
            <Head title="Crear Combo" />

            <div className="py-8 sm:py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Datos básicos */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-4 border-white space-y-5">
                            <h3 className="text-base font-bold text-gray-700 border-b pb-3">Datos del Combo</h3>

                            {/* Nombre */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nombre *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="Ej: Combo Verano Niño"
                                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Descripción */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Descripción (Opcional)</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Descripción del combo..."
                                    rows={3}
                                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Precio */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Precio *</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        placeholder="0.00"
                                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 pl-8 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                    />
                                </div>
                                <InputError message={errors.price} className="mt-2" />
                            </div>

                            {/* Activo / Destacado */}
                            <div className="flex flex-wrap gap-6">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={form.is_active}
                                        onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                                        className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-bold text-gray-700">Combo activo</label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        checked={form.is_featured}
                                        onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
                                        className="w-5 h-5 text-amber-500 border-gray-300 rounded focus:ring-amber-400"
                                    />
                                    <label htmlFor="is_featured" className="text-sm font-bold text-gray-700">⭐ Destacar en la tienda</label>
                                </div>
                            </div>

                            {/* Imagen de portada */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Imagen de portada (Opcional)</label>
                                <div className="flex items-start gap-4">
                                    {imagePreview && (
                                        <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200 flex-shrink-0">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cyan-400 hover:bg-cyan-50 transition-colors">
                                            <div className="text-center">
                                                <div className="text-3xl mb-1">🖼️</div>
                                                <p className="text-sm font-semibold text-gray-600">
                                                    {imageFile ? imageFile.name : 'Hacer click para subir imagen'}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — max 2MB</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/gif,image/webp"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                        {imageFile && (
                                            <button
                                                type="button"
                                                onClick={() => { setImageFile(null); setImagePreview(null); }}
                                                className="mt-2 text-xs text-red-500 hover:text-red-700 font-semibold"
                                            >
                                                ✕ Quitar imagen
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                        </div>

                        {/* Selección de talles */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-4 border-white space-y-4">
                            <h3 className="text-base font-bold text-gray-700 border-b pb-3">
                                Talles disponibles *
                                <span className="ml-2 text-sm font-normal text-gray-500">Seleccioná en qué talles estará disponible este combo</span>
                            </h3>

                            {sizes.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No hay talles creados en el sistema.</p>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map(size => (
                                        <button
                                            key={size.id}
                                            type="button"
                                            onClick={() => toggleSize(size.id)}
                                            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                                                selectedSizeIds.includes(size.id)
                                                    ? 'bg-cyan-500 text-white border-cyan-500 scale-105'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-400 hover:text-cyan-600'
                                            }`}
                                        >
                                            {selectedSizeIds.includes(size.id) ? '✓ ' : ''}{size.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {selectedSizeIds.length > 0 && (
                                <p className="text-sm text-cyan-700 font-semibold">
                                    ✓ {selectedSizeIds.length} {selectedSizeIds.length === 1 ? 'talle seleccionado' : 'talles seleccionados'}
                                </p>
                            )}
                            <InputError message={errors.size_ids} className="mt-1" />
                        </div>

                        {/* Selección de categorías */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-4 border-white space-y-4">
                            <h3 className="text-base font-bold text-gray-700 border-b pb-3">
                                Categorías del Combo *
                                <span className="ml-2 text-sm font-normal text-gray-500">Seleccioná qué tipos de prendas compondrán el combo</span>
                            </h3>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={categorySearch}
                                    onChange={(e) => setCategorySearch(e.target.value)}
                                    placeholder="🔍 Buscar categoría..."
                                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                                {filteredCategories.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                                            selectedCategoryIds.includes(cat.id)
                                                ? 'bg-cyan-500 text-white border-cyan-500 scale-105'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-cyan-400 hover:text-cyan-600'
                                        }`}
                                    >
                                        {selectedCategoryIds.includes(cat.id) ? '✓ ' : ''}{cat.name}
                                    </button>
                                ))}
                            </div>

                            {selectedCategoryIds.length > 0 && (
                                <p className="text-sm text-cyan-700 font-semibold">
                                    ✓ {selectedCategoryIds.length} {selectedCategoryIds.length === 1 ? 'categoría seleccionada' : 'categorías seleccionadas'}
                                </p>
                            )}
                            <InputError message={errors.items} className="mt-1" />
                        </div>

                        {/* Prendas por categoría */}
                        {selectedCategoriesData.map(cat => {
                            const selectedProducts = productsByCategory[cat.id] || [];
                            const search = productSearch[cat.id] || '';
                            const filteredProducts = cat.products.filter(p =>
                                !search || p.name.toLowerCase().includes(search.toLowerCase())
                            );

                            return (
                                <div key={cat.id} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-4 border-white space-y-4">
                                    <div className="flex items-center justify-between border-b pb-3">
                                        <h3 className="text-base font-bold text-gray-700">
                                            👕 {cat.name}
                                            <span className="ml-2 text-sm font-normal text-gray-500">
                                                — Seleccioná las prendas disponibles para esta categoría
                                            </span>
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => toggleCategory(cat.id)}
                                            className="text-red-400 hover:text-red-600 text-sm font-bold"
                                        >
                                            ✕ Quitar
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 bg-cyan-50 rounded-xl px-4 py-3 border border-cyan-200">
                                        <span className="text-sm font-bold text-cyan-800">
                                            ¿Cuántas prendas elige el cliente de esta categoría?
                                        </span>
                                        <div className="flex items-center gap-1 ml-auto">
                                            {[1, 2, 3, 4, 5].map(n => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => setCategoryQuantities(prev => ({ ...prev, [cat.id]: n }))}
                                                    className={`w-8 h-8 rounded-lg text-sm font-bold border-2 transition-all ${
                                                        (categoryQuantities[cat.id] || 1) === n
                                                            ? 'bg-cyan-500 text-white border-cyan-500'
                                                            : 'bg-white text-gray-600 border-gray-300 hover:border-cyan-400'
                                                    }`}
                                                >
                                                    {n}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setProductSearch({ ...productSearch, [cat.id]: e.target.value })}
                                            placeholder="🔍 Buscar prenda..."
                                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                        />
                                    </div>

                                    {selectedProducts.length > 0 && (
                                        <p className="text-sm text-green-700 font-semibold">
                                            ✓ {selectedProducts.length} {selectedProducts.length === 1 ? 'prenda seleccionada' : 'prendas seleccionadas'}
                                        </p>
                                    )}

                                    {cat.products.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No hay prendas en esta categoría.</p>
                                    ) : filteredProducts.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">No se encontraron prendas.</p>
                                    ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto pr-1">
                                            {filteredProducts.map(product => {
                                                const isSelected = selectedProducts.includes(product.id);
                                                return (
                                                    <div
                                                        key={product.id}
                                                        onClick={() => toggleProduct(cat.id, product.id)}
                                                        className={`cursor-pointer rounded-xl border-2 p-2 transition-all ${
                                                            isSelected
                                                                ? 'border-cyan-500 bg-cyan-50 scale-105'
                                                                : 'border-gray-200 bg-white hover:border-cyan-300'
                                                        }`}
                                                    >
                                                        <div className="relative">
                                                            {isSelected && (
                                                                <div className="absolute top-1 right-1 bg-cyan-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold z-10">
                                                                    ✓
                                                                </div>
                                                            )}
                                                            <div className="h-20 bg-gray-100 rounded-lg overflow-hidden mb-2">
                                                                {getImageSrc(product.images) ? (
                                                                    <img
                                                                        src={getImageSrc(product.images)}
                                                                        alt={product.name}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-2xl">👕</div>
                                                                )}
                                                            </div>
                                                            <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight">{product.name}</p>
                                                            <p className="text-xs text-green-600 font-bold mt-1">${Number(product.price).toLocaleString('es-AR')}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    <InputError message={errors[`items.${selectedCategoryIds.indexOf(cat.id)}.product_ids`]} className="mt-1" />
                                </div>
                            );
                        })}

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: '#65DA4D' }}
                            >
                                {processing ? '⏳ Guardando...' : '💾 Guardar Combo'}
                            </button>
                            <Link
                                href={route('combos.index')}
                                className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md text-center"
                                style={{ backgroundColor: '#FC1C1D' }}
                            >
                                ❌ Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
