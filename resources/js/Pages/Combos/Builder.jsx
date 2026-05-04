import React, { useState, useMemo } from 'react';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function ComboBuilder({ combo, categories, availableSizes }) {
    const { auth } = usePage().props;

    const [selectedSizeId, setSelectedSizeId] = useState(null);
    const [selections, setSelections] = useState({});
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const selectedSize = availableSizes.find(s => s.id === selectedSizeId);

    // Para una categoría y talle dado, filtra los productos con stock > 0
    const productsWithStock = useMemo(() => {
        if (!selectedSizeId) return {};
        const result = {};
        categories.forEach(cat => {
            result[cat.category.id] = cat.products.filter(p => {
                const sizeData = p.sizes_with_stock?.find(s => s.id === selectedSizeId);
                return sizeData && sizeData.stock > 0;
            });
        });
        return result;
    }, [selectedSizeId, categories]);

    const allCategoriesSelected = useMemo(() => {
        if (!selectedSizeId) return false;
        return categories.every(cat => {
            const available = productsWithStock[cat.category.id] || [];
            if (available.length === 0) return true; // categoría sin stock, no requerida
            return !!selections[cat.category.id];
        });
    }, [selections, selectedSizeId, categories, productsWithStock]);

    const getImageSrc = (img) => {
        if (!img) return null;
        return img.startsWith('images/') ? `/${img}` : `/images/${img}`;
    };

    const handleSelectProduct = (categoryId, productId) => {
        setSelections(prev => ({
            ...prev,
            [categoryId]: prev[categoryId] === productId ? null : productId,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!auth?.user) {
            router.visit(route('login'));
            return;
        }

        setErrors({});
        const selectionList = Object.entries(selections)
            .filter(([, pid]) => pid !== null)
            .map(([catId, pid]) => ({ category_id: parseInt(catId), product_id: pid }));

        setProcessing(true);
        router.post(route('combos.addToCart', combo.id), {
            size_id: selectedSizeId,
            selections: selectionList,
        }, {
            onError: (errs) => { setErrors(errs); setProcessing(false); },
            onFinish: () => setProcessing(false),
        });
    };

    const categoriesWithAvailableProducts = categories.filter(cat =>
        !selectedSizeId || (productsWithStock[cat.category.id]?.length > 0)
    );

    return (
        <EcommerceLayout>
            <Head title={`Crear combo: ${combo.name}`} />

            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 min-h-screen py-12">
                <div className="max-w-4xl mx-auto px-4">

                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('combos.public.index')}
                            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 mb-4 transition-colors"
                        >
                            ← Volver a combos
                        </Link>
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-6">
                            <div className="flex items-start justify-between flex-wrap gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                        🎁 {combo.name}
                                    </h1>
                                    {combo.description && (
                                        <p className="text-gray-600 mt-2">{combo.description}</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500 font-medium">Precio del combo</p>
                                    <p className="text-4xl font-black bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                        ${Number(combo.price).toLocaleString('es-AR')}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">ARS</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Paso 1: Selección de talle */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                    1
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Seleccioná el talle</h2>
                            </div>

                            {availableSizes.length === 0 ? (
                                <p className="text-red-500 font-semibold">
                                    No hay talles con stock disponible para este combo.
                                </p>
                            ) : (
                                <div className="flex flex-wrap gap-3">
                                    {availableSizes.map(size => (
                                        <button
                                            key={size.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedSizeId(size.id);
                                                setSelections({});
                                            }}
                                            className={`px-5 py-3 rounded-2xl font-bold text-sm border-2 transition-all duration-200 ${
                                                selectedSizeId === size.id
                                                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-transparent scale-110 shadow-lg'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-400 hover:text-purple-600'
                                            }`}
                                        >
                                            {size.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {errors.size_id && (
                                <p className="text-red-500 text-sm mt-2 font-semibold">{errors.size_id}</p>
                            )}
                        </div>

                        {/* Paso 2: Selección de prendas por categoría */}
                        {selectedSizeId && (
                            <>
                                <div className="flex items-center gap-3 px-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        2
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        Elegí una prenda por categoría
                                        <span className="ml-2 text-sm font-normal text-gray-500">
                                            — talle {selectedSize?.name}
                                        </span>
                                    </h2>
                                </div>

                                {categories.map(cat => {
                                    const available = productsWithStock[cat.category.id] || [];
                                    const selectedProductId = selections[cat.category.id] || null;

                                    return (
                                        <div
                                            key={cat.category.id}
                                            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-6"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    👕 {cat.category.name}
                                                </h3>
                                                {selectedProductId ? (
                                                    <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                                        ✓ Seleccionada
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-bold text-orange-500 bg-orange-100 px-3 py-1 rounded-full">
                                                        Pendiente
                                                    </span>
                                                )}
                                            </div>

                                            {available.length === 0 ? (
                                                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                                                    <p className="text-red-500 font-semibold text-sm">
                                                        Sin stock para el talle {selectedSize?.name} en esta categoría
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                    {available.map(product => {
                                                        const isSelected = selectedProductId === product.id;
                                                        const sizeStock = product.sizes_with_stock?.find(s => s.id === selectedSizeId)?.stock ?? 0;

                                                        return (
                                                            <button
                                                                key={product.id}
                                                                type="button"
                                                                onClick={() => handleSelectProduct(cat.category.id, product.id)}
                                                                className={`relative rounded-2xl border-2 p-3 text-left transition-all duration-200 ${
                                                                    isSelected
                                                                        ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                                                                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                                                                }`}
                                                            >
                                                                {isSelected && (
                                                                    <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center z-10">
                                                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    </div>
                                                                )}

                                                                {/* Imagen */}
                                                                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                                                                    {getImageSrc(product.images?.[0]) ? (
                                                                        <img
                                                                            src={getImageSrc(product.images[0])}
                                                                            alt={product.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-3xl">👕</div>
                                                                    )}
                                                                </div>

                                                                <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight mb-1">
                                                                    {product.name}
                                                                </p>
                                                                <p className="text-xs text-cyan-600 font-bold">
                                                                    ${Number(product.price).toLocaleString('es-AR')}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-0.5">
                                                                    Stock: {sizeStock}
                                                                </p>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {errors.selections && (
                                    <p className="text-red-500 text-sm font-semibold px-2">{errors.selections}</p>
                                )}
                                {errors.stock && (
                                    <div className="bg-red-50 border border-red-300 rounded-2xl px-5 py-4 text-red-700 font-semibold text-sm">
                                        {errors.stock}
                                    </div>
                                )}

                                {/* Resumen de selección */}
                                {Object.values(selections).some(v => v !== null) && (
                                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-cyan-200 p-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">Tu combo</h3>
                                        <div className="space-y-3 mb-5">
                                            {categories.map(cat => {
                                                const pid = selections[cat.category.id];
                                                const product = pid ? cat.products.find(p => p.id === pid) : null;
                                                return (
                                                    <div key={cat.category.id} className="flex items-center gap-3">
                                                        <span className="text-xs font-bold text-gray-500 w-24 flex-shrink-0">{cat.category.name}</span>
                                                        {product ? (
                                                            <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                                                                {getImageSrc(product.images?.[0]) && (
                                                                    <img src={getImageSrc(product.images[0])} alt="" className="w-8 h-8 rounded-lg object-cover" />
                                                                )}
                                                                {product.name}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-400 italic">Sin seleccionar</span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <span className="font-bold text-gray-700">Total combo</span>
                                            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                                                ${Number(combo.price).toLocaleString('es-AR')} ARS
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Botón agregar al carrito */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="submit"
                                        disabled={!allCategoriesSelected || processing || categoriesWithAvailableProducts.length === 0}
                                        className="flex-1 py-4 px-8 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {processing
                                            ? '⏳ Agregando...'
                                            : !auth?.user
                                                ? '🔐 Iniciá sesión para agregar'
                                                : !allCategoriesSelected
                                                    ? 'Completá todas las categorías'
                                                    : '🛒 Agregar combo al carrito'
                                        }
                                    </button>
                                    <Link
                                        href={route('combos.public.index')}
                                        className="sm:w-auto py-4 px-8 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-full transition-all duration-300 hover:border-gray-300 text-center"
                                    >
                                        Cancelar
                                    </Link>
                                </div>
                            </>
                        )}

                        {!selectedSizeId && availableSizes.length > 0 && (
                            <p className="text-center text-gray-500 font-semibold py-4">
                                👆 Primero seleccioná un talle para ver las prendas disponibles
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </EcommerceLayout>
    );
}
