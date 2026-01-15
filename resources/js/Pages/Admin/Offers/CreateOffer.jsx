import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function CreateOffer({ products }) {
    const { url } = usePage();
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const preSelectedProductId = urlParams.get('product_id');

    const { data, setData, post, processing, errors } = useForm({
        product_id: preSelectedProductId || '',
        name: '',
        discount_price: '',
        discount_percentage: '',
        start_date: '',
        end_date: '',
        is_active: true,
    });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchProduct, setSearchProduct] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const filteredProducts = products.filter(product => {
        if (searchProduct) {
            const searchLower = searchProduct.toLowerCase();
            return product.name.toLowerCase().includes(searchLower) || 
                   product.description?.toLowerCase().includes(searchLower);
        }
        return true;
    });

    const getImageSrc = (images) => {
        if (!images || !images[0]) return null;
        const imgPath = images[0];
        return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
    };

    useEffect(() => {
        if (data.product_id) {
            const product = products.find(p => p.id === parseInt(data.product_id));
            setSelectedProduct(product);
        } else {
            setSelectedProduct(null);
        }
    }, [data.product_id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown-container')) {
                setIsDropdownOpen(false);
                setSearchProduct('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    useEffect(() => {
        if (selectedProduct && data.discount_price) {
            const originalPrice = parseFloat(selectedProduct.price);
            const discountPrice = parseFloat(data.discount_price);
            
            if (!isNaN(originalPrice) && !isNaN(discountPrice) && originalPrice > 0) {
                const percentage = ((originalPrice - discountPrice) / originalPrice * 100).toFixed(2);
                setData('discount_percentage', percentage);
            }
        }
    }, [data.discount_price, selectedProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('offers.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    <h2 className="text-lg sm:text-xl font-semibold leading-tight text-gray-800">
                        ➕ Crear Nueva Oferta
                    </h2>
                    <Link
                        href={route('offers.index')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#29C9F4' }}
                    >
                        ← Volver a Ofertas
                    </Link>
                </div>
            }
        >
            <Head title="Crear Oferta" />

            <div className="py-8 sm:py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-4 border-white">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Producto con búsqueda integrada */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Producto *
                                </label>
                                <div className="relative dropdown-container">
                                    <div 
                                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 cursor-pointer focus-within:ring-4 focus-within:ring-cyan-200 focus-within:border-cyan-400"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={selectedProduct ? 'text-gray-900' : 'text-gray-400'}>
                                                {selectedProduct ? `${selectedProduct.name} - $${selectedProduct.price}` : 'Selecciona un producto'}
                                            </span>
                                            <span className="text-gray-400">
                                                {isDropdownOpen ? '▲' : '▼'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {isDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-lg max-h-96 overflow-hidden">
                                            {/* Búsqueda dentro del dropdown */}
                                            <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                        🔍
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={searchProduct}
                                                        onChange={(e) => setSearchProduct(e.target.value)}
                                                        placeholder="Buscar por nombre o descripción..."
                                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 pl-9 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    {searchProduct && (
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSearchProduct('');
                                                            }}
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                        >
                                                            ✕
                                                        </button>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {filteredProducts.length} de {products.length} productos
                                                </p>
                                            </div>
                                            
                                            {/* Lista de productos */}
                                            <div className="max-h-64 overflow-y-auto">
                                                {filteredProducts.length > 0 ? (
                                                    filteredProducts.map((product) => (
                                                        <div
                                                            key={product.id}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setData('product_id', product.id.toString());
                                                                setSelectedProduct(product);
                                                                setIsDropdownOpen(false);
                                                                setSearchProduct('');
                                                            }}
                                                            className={`px-4 py-3 cursor-pointer hover:bg-cyan-50 transition-colors ${
                                                                data.product_id === product.id.toString() ? 'bg-cyan-100' : ''
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                {getImageSrc(product.images) ? (
                                                                    <img
                                                                        src={getImageSrc(product.images)}
                                                                        alt={product.name}
                                                                        className="w-10 h-10 object-cover rounded-lg"
                                                                    />
                                                                ) : (
                                                                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-xl">
                                                                        👕
                                                                    </div>
                                                                )}
                                                                <div className="flex-1">
                                                                    <p className="font-semibold text-gray-900">{product.name}</p>
                                                                    <p className="text-sm text-gray-600">${product.price}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-8 text-center text-gray-500">
                                                        No se encontraron productos
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <InputError message={errors.product_id} className="mt-2" />
                            </div>

                            {/* Información del producto seleccionado */}
                            {selectedProduct && (
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                    <div className="flex items-center gap-4">
                                        {getImageSrc(selectedProduct.images) ? (
                                            <img
                                                src={getImageSrc(selectedProduct.images)}
                                                alt={selectedProduct.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-4xl">
                                                👕
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
                                            <p className="text-gray-600 text-sm">{selectedProduct.description}</p>
                                            <p className="text-xl font-bold text-green-600 mt-2">
                                                Precio original: ${selectedProduct.price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Nombre de la oferta */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Nombre de la Oferta *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ej: Oferta de Verano, Black Friday, etc."
                                    className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Precio de oferta */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Precio de Oferta *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max={selectedProduct?.price || undefined}
                                        value={data.discount_price}
                                        onChange={(e) => setData('discount_price', e.target.value)}
                                        placeholder="0.00"
                                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 pl-8 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                        required
                                    />
                                </div>
                                <InputError message={errors.discount_price} className="mt-2" />
                                {selectedProduct && data.discount_price && (
                                    <p className="text-sm text-gray-600 mt-2">
                                        Ahorro: ${(selectedProduct.price - parseFloat(data.discount_price || 0)).toFixed(2)}
                                    </p>
                                )}
                            </div>

                            {/* Porcentaje de descuento (calculado automáticamente) */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Porcentaje de Descuento
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.discount_percentage}
                                        onChange={(e) => setData('discount_percentage', e.target.value)}
                                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-100 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                        readOnly
                                    />
                                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
                                        %
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Se calcula automáticamente basado en el precio de oferta
                                </p>
                            </div>

                            {/* Fechas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Fecha de Inicio (Opcional)
                                    </label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                    />
                                    <InputError message={errors.start_date} className="mt-2" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Fecha de Fin (Opcional)
                                    </label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        min={data.start_date}
                                        className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                                    />
                                    <InputError message={errors.end_date} className="mt-2" />
                                </div>
                            </div>

                            {/* Estado activo */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                />
                                <label htmlFor="is_active" className="text-sm font-bold text-gray-700">
                                    Oferta activa
                                </label>
                            </div>

                            {/* Botones */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#65DA4D' }}
                                >
                                    {processing ? '⏳ Guardando...' : '💾 Guardar Oferta'}
                                </button>
                                <Link
                                    href={route('offers.index')}
                                    className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md text-center"
                                    style={{ backgroundColor: '#FC1C1D' }}
                                >
                                    ❌ Cancelar
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
