import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function ProductsView({ products }) {
    // Obtener valores únicos para filtros
    const allCategories = Array.from(
        new Set(products.flatMap(p => p.categories.map(c => c.name)))
    );
    const allColors = Array.from(
        new Set(products.flatMap(p => p.colors.map(c => c.name)))
    );
    const allSizes = Array.from(
        new Set(products.flatMap(p => p.sizes.map(s => s.name)))
    );
    const allGenders = Array.from(
        new Set(products.map(p => p.gender?.name).filter(Boolean))
    );

    // Estados de filtros (persistidos en localStorage)
    const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem('pv_search') || '');
    const [selectedCategory, setSelectedCategory] = useState(() => localStorage.getItem('pv_category') || '');
    const [selectedColor, setSelectedColor] = useState(() => localStorage.getItem('pv_color') || '');
    const [selectedSize, setSelectedSize] = useState(() => localStorage.getItem('pv_size') || '');
    const [selectedGender, setSelectedGender] = useState(() => localStorage.getItem('pv_gender') || '');
    const [minPrice, setMinPrice] = useState(() => localStorage.getItem('pv_minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(() => localStorage.getItem('pv_maxPrice') || '');
    const [showFilters, setShowFilters] = useState(true);
    const [sortOrder, setSortOrder] = useState(() => localStorage.getItem('pv_sort') || '');

    // Filtrar productos según todos los criterios
    const filteredProducts = products.filter(product => {
        // Búsqueda por texto
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const matchesName = product.name.toLowerCase().includes(searchLower);
            const matchesDescription = product.description?.toLowerCase().includes(searchLower);
            if (!matchesName && !matchesDescription) return false;
        }

        // Filtro por categoría
        if (selectedCategory && !product.categories.some(cat => cat.name === selectedCategory)) {
            return false;
        }

        // Filtro por color
        if (selectedColor && !product.colors.some(col => col.name === selectedColor)) {
            return false;
        }

        // Filtro por talle
        if (selectedSize && !product.sizes.some(size => size.name === selectedSize)) {
            return false;
        }

        // Filtro por género
        if (selectedGender && product.gender?.name !== selectedGender) {
            return false;
        }

        // Filtro por precio mínimo
        if (minPrice && Number(product.price) < Number(minPrice)) {
            return false;
        }

        // Filtro por precio máximo
        if (maxPrice && Number(product.price) > Number(maxPrice)) {
            return false;
        }

        return true;
    }).sort((a, b) => {
        if (sortOrder === 'asc') return a.name.localeCompare(b.name);
        if (sortOrder === 'desc') return b.name.localeCompare(a.name);
        return 0;
    });

    const clearAllFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedColor('');
        setSelectedSize('');
        setSelectedGender('');
        setMinPrice('');
        setMaxPrice('');
        setSortOrder('');
        ['pv_search','pv_category','pv_color','pv_size','pv_gender','pv_minPrice','pv_maxPrice','pv_sort']
            .forEach(k => localStorage.removeItem(k));
    };

    const activeFiltersCount = [
        searchTerm,
        selectedCategory,
        selectedColor,
        selectedSize,
        selectedGender,
        minPrice,
        maxPrice,
        sortOrder
    ].filter(Boolean).length;

    // Persistir todos los filtros en localStorage al cambiar
    useEffect(() => {
        localStorage.setItem('pv_search', searchTerm);
        localStorage.setItem('pv_category', selectedCategory);
        localStorage.setItem('pv_color', selectedColor);
        localStorage.setItem('pv_size', selectedSize);
        localStorage.setItem('pv_gender', selectedGender);
        localStorage.setItem('pv_minPrice', minPrice);
        localStorage.setItem('pv_maxPrice', maxPrice);
        localStorage.setItem('pv_sort', sortOrder);
    }, [searchTerm, selectedCategory, selectedColor, selectedSize, selectedGender, minPrice, maxPrice, sortOrder]);

    const handleToggleFeatured = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        router.post(route('products.toggleFeatured', productId), {}, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
                    
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold leading-tight text-gray-800">
                            👕 Prendas
                        </h2>
                    </div>
                    <Link
                        href={route('products.create')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#65DA4D' }}
                    >
                        ➕ Agregar Prenda
                    </Link>
                </div>
            }
        >
            <Head title="Prendas" />

            <div className="py-8 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Buscador y botón de filtros */}
                    <div className="mb-4 sm:mb-6">
                        <div className="bg-gradient-to-r from-white to-neutral-50 rounded-2xl border-4 border-white shadow-lg p-4 sm:p-6">
                            <div className="flex flex-col gap-3 sm:gap-4">
                                {/* Buscador */}
                                <div className="w-full sm:max-w-sm">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="🔍 Buscar por nombre o descripción..."
                                            className="w-full border-2 border-neutral-300 rounded-xl px-4 sm:px-5 py-3 text-sm sm:text-base font-semibold focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400 pr-10"
                                            style={{ backgroundColor: '#f8f9fa' }}
                                        />
                                        {searchTerm && (
                                            <button
                                                onClick={() => setSearchTerm('')}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Botones de orden A-Z + Filtros en la misma línea */}
                                <div className="flex items-center gap-2 w-full">
                                    {/* Orden alfabético */}
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? '' : 'asc')}
                                        className={`px-4 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md ${
                                            sortOrder === 'asc' ? 'text-white' : 'bg-white border-2 border-cyan-300 text-cyan-600'
                                        }`}
                                        style={sortOrder === 'asc' ? { backgroundColor: '#29C9F4', color: 'white' } : {}}
                                    >
                                        A → Z
                                    </button>
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'desc' ? '' : 'desc')}
                                        className={`px-4 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md ${
                                            sortOrder === 'desc' ? 'text-white' : 'bg-white border-2 border-cyan-300 text-cyan-600'
                                        }`}
                                        style={sortOrder === 'desc' ? { backgroundColor: '#29C9F4', color: 'white' } : {}}
                                    >
                                        Z → A
                                    </button>

                                    {/* Botones de filtros alineados a la derecha */}
                                    <div className="flex gap-2 ml-auto">
                                        {activeFiltersCount > 0 && (
                                            <button
                                                onClick={clearAllFilters}
                                                className="px-5 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                                style={{ backgroundColor: '#FC1C1D' }}
                                            >
                                                🗑️ Limpiar
                                            </button>
                                        )}
                                        <button
                                            onClick={() => setShowFilters(!showFilters)}
                                            className="px-5 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md relative"
                                            style={{ backgroundColor: '#29C9F4' }}
                                        >
                                            {showFilters ? '❌ Ocultar Filtros' : '🔧 Más Filtros'}
                                            {activeFiltersCount > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                                    {activeFiltersCount}
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chips de filtros activos */}
                    {activeFiltersCount > 0 && (
                        <div className="mb-4 flex flex-wrap gap-2 items-center">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Filtros activos:</span>
                            {searchTerm && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#29C9F4' }}>
                                    🔍 &quot;{searchTerm}&quot;
                                    <button onClick={() => setSearchTerm('')} className="ml-1 hover:opacity-70">✕</button>
                                </span>
                            )}
                            {selectedCategory && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#65DA4D' }}>
                                    📂 {selectedCategory}
                                    <button onClick={() => setSelectedCategory('')} className="ml-1 hover:opacity-70">✕</button>
                                </span>
                            )}
                            {selectedColor && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#FC1C1D' }}>
                                    🎨 {selectedColor}
                                    <button onClick={() => setSelectedColor('')} className="ml-1 hover:opacity-70">✕</button>
                                </span>
                            )}
                            {selectedSize && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#FFB800' }}>
                                    📏 {selectedSize}
                                    <button onClick={() => setSelectedSize('')} className="ml-1 hover:opacity-70">✕</button>
                                </span>
                            )}
                            {selectedGender && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#9B59B6' }}>
                                    👶 {selectedGender}
                                    <button onClick={() => setSelectedGender('')} className="ml-1 hover:opacity-70">✕</button>
                                </span>
                            )}
                            {minPrice && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#29C9F4' }}>
                                    💵 Min: ${minPrice}
                                    <button onClick={() => setMinPrice('')} className="ml-1 hover:opacity-70">✕</button>
                                </span>
                            )}
                            {maxPrice && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#29C9F4' }}>
                                    💰 Max: ${maxPrice}
                                    <button onClick={() => setMaxPrice('')} className="ml-1 hover:opacity-70">✕</button>
                                </span>
                            )}
                            {sortOrder && (
                                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#29C9F4' }}>
                                    🔤 {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
                                    <button onClick={() => setSortOrder('')} className="ml-1 hover:opacity-70">✕</button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Panel de filtros expandible */}
                    {showFilters && (
                        <div className="mb-4 sm:mb-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl border-4 border-white shadow-lg p-4 sm:p-6 lg:p-8">
                                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2" style={{ color: '#29C9F4' }}>
                                    <span className="text-2xl sm:text-3xl">🔧</span>
                                    Filtros Avanzados
                                </h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {/* Filtro por Categoría */}
                                    <div className="bg-gradient-to-r from-green-50 to-lime-50 p-5 rounded-xl border-2 border-green-200">
                                        <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: '#65DA4D' }}>
                                            <span className="text-xl">📂</span>
                                            Categoría
                                        </label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                            className="w-full border-2 border-green-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-400"
                                        >
                                            <option value="">Todas</option>
                                            {allCategories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Filtro por Color */}
                                    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-5 rounded-xl border-2 border-red-200">
                                        <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: '#FC1C1D' }}>
                                            <span className="text-xl">🎨</span>
                                            Color
                                        </label>
                                        <select
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                            className="w-full border-2 border-red-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-400"
                                        >
                                            <option value="">Todos</option>
                                            {allColors.map((color) => (
                                                <option key={color} value={color}>{color}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Filtro por Talle */}
                                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl border-2 border-yellow-200">
                                        <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: '#FFB800' }}>
                                            <span className="text-xl">📏</span>
                                            Talle
                                        </label>
                                        <select
                                            value={selectedSize}
                                            onChange={(e) => setSelectedSize(e.target.value)}
                                            className="w-full border-2 border-yellow-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            <option value="">Todos</option>
                                            {allSizes.map((size) => (
                                                <option key={size} value={size}>{size}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Filtro por Género */}
                                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-5 rounded-xl border-2 border-purple-200">
                                        <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: '#9B59B6' }}>
                                            <span className="text-xl">👶</span>
                                            Género
                                        </label>
                                        <select
                                            value={selectedGender}
                                            onChange={(e) => setSelectedGender(e.target.value)}
                                            className="w-full border-2 border-purple-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
                                        >
                                            <option value="">Todos</option>
                                            {allGenders.map((gender) => (
                                                <option key={gender} value={gender}>{gender}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Filtro por Precio Mínimo */}
                                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-5 rounded-xl border-2 border-cyan-200">
                                        <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: '#29C9F4' }}>
                                            <span className="text-xl">💵</span>
                                            Precio Mínimo
                                        </label>
                                        <input
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            placeholder="$ 0"
                                            min="0"
                                            className="w-full border-2 border-cyan-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        />
                                    </div>

                                    {/* Filtro por Precio Máximo */}
                                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-5 rounded-xl border-2 border-cyan-200">
                                        <label className="flex items-center gap-2 text-sm font-bold mb-2" style={{ color: '#29C9F4' }}>
                                            <span className="text-xl">💰</span>
                                            Precio Máximo
                                        </label>
                                        <input
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            placeholder="$ 99999"
                                            min="0"
                                            className="w-full border-2 border-cyan-300 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Resumen de resultados */}
                    <div className="mb-4 px-0">
                        <p className="text-sm sm:text-base font-bold text-gray-700">
                            📊 Mostrando {filteredProducts.length} de {products.length} prendas
                        </p>
                    </div>

                    <div className="overflow-hidden bg-white rounded-2xl border-4 border-white shadow-lg">
                        <div className="p-4 sm:p-6 lg:p-8 text-gray-900">
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {filteredProducts.map((product) => {
                                    const getImageSrc = (imgPath) => {
                                        if (!imgPath) return '/placeholder.svg';
                                        return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
                                    };
                                    
                                    const totalStock = product.sizes.reduce((sum, size) => 
                                        sum + (size.pivot?.stock || 0), 0
                                    );

                                    return (
                                        <div key={product.id} className="rounded-2xl border-4 border-white bg-gradient-to-br from-white to-neutral-50 flex flex-col h-full shadow-lg hover:scale-[1.02] transform transition-all duration-300 overflow-hidden group">
                                            {/* Imagen del producto */}
                                            <div className="relative w-full h-64 bg-neutral-100 overflow-hidden">
                                                {/* Badge de OFERTA ACTIVA */}
                                                {product.active_offer && product.active_offer.is_active && (
                                                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl font-bold text-white shadow-lg animate-pulse z-20" 
                                                        style={{ backgroundColor: '#FF6B9D' }}>
                                                        🏷️ OFERTA {product.active_offer.discount_percentage}% OFF
                                                    </div>
                                                )}
                                                <img 
                                                    src={product.images && product.images.length > 0 
                                                        ? getImageSrc(product.images[0]) 
                                                        : '/placeholder.svg'
                                                    }
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                {/* Badge de stock total */}
                                                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl font-bold text-white shadow-lg animate-pulse" 
                                                    style={{ backgroundColor: totalStock > 0 ? '#65DA4D' : '#FC1C1D' }}>
                                                    📦 Stock: {totalStock}
                                                </div>
                                                {/* Badge de precio */}
                                                <div className="absolute bottom-3 left-3 z-10">
                                                    {product.active_offer && product.active_offer.is_active ? (
                                                        <div className="flex flex-col gap-1">
                                                            <div className="px-3 py-1 rounded-lg font-bold text-white shadow-lg text-xs" 
                                                                style={{ backgroundColor: '#9CA3AF' }}>
                                                                <span className="line-through">${Number(product.price).toLocaleString('es-AR')}</span>
                                                            </div>
                                                            <div className="px-4 py-2 rounded-xl font-bold text-white shadow-lg" 
                                                                style={{ backgroundColor: '#FF6B9D' }}>
                                                                💰 ${Number(product.active_offer.discount_price).toLocaleString('es-AR')}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="px-4 py-2 rounded-xl font-bold text-white shadow-lg" 
                                                            style={{ backgroundColor: '#FFB800' }}>
                                                            💰 ${Number(product.price).toLocaleString('es-AR')}
                                                        </div>
                                                    )}
                                                </div>
                                                {/* Estrella de destacado */}
                                                <button
                                                    onClick={(e) => handleToggleFeatured(product.id, e)}
                                                    className="absolute bottom-3 right-3 p-2 rounded-full hover:scale-110 transform transition-all duration-200 shadow-lg"
                                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                                                    title={product.is_featured ? 'Quitar de destacados' : 'Marcar como destacado'}
                                                >
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        viewBox="0 0 24 24" 
                                                        className="w-6 h-6"
                                                        style={{
                                                            fill: product.is_featured ? '#FFB800' : 'none',
                                                            stroke: product.is_featured ? '#FFB800' : '#9CA3AF',
                                                            strokeWidth: 2
                                                        }}
                                                    >
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                </button>
                                                {/* Badge de BAJO STOCK */}
                                                {totalStock > 0 && totalStock <= 5 && (
                                                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl font-bold text-white shadow-lg animate-pulse" 
                                                        style={{ backgroundColor: '#FC1C1D' }}>
                                                        ⚠️ BAJO STOCK
                                                    </div>
                                                )}
                                            </div>

                                            {/* Contenido de la card */}
                                            <div className="p-6 flex flex-col flex-1">
                                                {/* Barra de stock visual */}
                                                <div className="mb-3">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-bold text-gray-600">Stock Total</span>
                                                        <span className="text-xs font-bold" style={{ 
                                                            color: totalStock > 10 ? '#65DA4D' : totalStock > 5 ? '#FFB800' : '#FC1C1D' 
                                                        }}>
                                                            {totalStock} unidades
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="h-2 rounded-full transition-all duration-500"
                                                            style={{ 
                                                                width: `${Math.min((totalStock / 50) * 100, 100)}%`,
                                                                backgroundColor: totalStock > 10 ? '#65DA4D' : totalStock > 5 ? '#FFB800' : '#FC1C1D'
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {/* Título y género */}
                                                <div className="mb-3">
                                                    <h3 className="text-xl font-bold text-black mb-2 group-hover:scale-105 transition-transform">{product.name}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.gender && (
                                                            <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm border-2 text-white font-bold shadow-sm"
                                                                style={{ backgroundColor: '#9B59B6', borderColor: '#9B59B6' }}>
                                                                👶 {product.gender.name}
                                                            </span>
                                                        )}
                                                        {product.active_offer && product.active_offer.is_active && (
                                                            <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm border-2 text-white font-bold shadow-sm animate-pulse"
                                                                style={{ backgroundColor: '#FF6B9D', borderColor: '#FF6B9D' }}>
                                                                🏷️ En Oferta
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Información de oferta */}
                                                {product.active_offer && product.active_offer.is_active && (
                                                    <div className="mb-3 p-3 rounded-xl border-2" style={{ backgroundColor: '#FFF0F5', borderColor: '#FF6B9D' }}>
                                                        <p className="text-xs font-bold mb-1" style={{ color: '#FF6B9D' }}>📢 Oferta Activa</p>
                                                        <p className="text-sm font-semibold text-gray-800">{product.active_offer.name}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="text-gray-500 line-through text-sm">${Number(product.price).toLocaleString('es-AR')}</span>
                                                            <span className="text-lg font-bold" style={{ color: '#FF6B9D' }}>${Number(product.active_offer.discount_price).toLocaleString('es-AR')}</span>
                                                            <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#FF6B9D' }}>
                                                                -{product.active_offer.discount_percentage}%
                                                            </span>
                                                        </div>
                                                        {(product.active_offer.start_date || product.active_offer.end_date) && (
                                                            <p className="text-xs text-gray-600 mt-1">
                                                                📅 {product.active_offer.start_date ? new Date(product.active_offer.start_date).toLocaleDateString('es-AR') : 'Desde ya'}
                                                                {' → '}
                                                                {product.active_offer.end_date ? new Date(product.active_offer.end_date).toLocaleDateString('es-AR') : 'Sin límite'}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Descripción */}
                                                {product.description && (
                                                    <div className="mb-3">
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {product.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* Categorías */}
                                                <div className="mb-3">
                                                    <p className="text-xs font-bold text-neutral-600 mb-2">📂 Categorías</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.categories.map((category) => (
                                                            <span
                                                                key={`${product.id}-category-${category.id}`}
                                                                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs border-2 text-black font-semibold shadow-sm"
                                                                style={{ borderColor: '#65DA4D', backgroundColor: '#E8F8E8' }}
                                                            >
                                                                {category.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Colores */}
                                                <div className="mb-3">
                                                    <p className="text-xs font-bold text-neutral-600 mb-2">🎨 Colores</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.colors.map((color) => (
                                                            <span
                                                                key={`${product.id}-color-${color.id}`}
                                                                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs border-2 text-black font-semibold shadow-sm"
                                                                style={{ borderColor: '#FC1C1D', backgroundColor: '#FFE8E8' }}
                                                            >
                                                                {color.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Talles y Stock */}
                                                <div className="mb-4 flex-1">
                                                    <p className="text-xs font-bold text-neutral-600 mb-2">📏 Talles y Stock</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {product.sizes.map((size) => (
                                                            <span
                                                                key={`${product.id}-size-${size.id}`}
                                                                className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs border-2 text-black font-semibold shadow-sm"
                                                                style={{ borderColor: '#FFB800', backgroundColor: '#FFF9E6' }}
                                                            >
                                                                {size.name}
                                                                {size.pivot && typeof size.pivot.stock !== 'undefined' && (
                                                                    <span className="ml-1.5 font-bold" style={{ color: size.pivot.stock > 0 ? '#65DA4D' : '#FC1C1D' }}>
                                                                        ({size.pivot.stock})
                                                                    </span>
                                                                )}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Botones de acción */}
                                                <div className="flex flex-col gap-2 mt-auto">
                                                    <Link
                                                        href={route('products.show', product.id)}
                                                        className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                                        style={{ backgroundColor: '#9B59B6' }}
                                                    >
                                                        👁️ Ver Producto
                                                    </Link>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('products.edit', product.id)}
                                                            className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                                            style={{ backgroundColor: '#29C9F4' }}
                                                        >
                                                            ✏️ Editar
                                                        </Link>
                                                        <Link
                                                            href={route('products.delete', product.id)}
                                                            className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                                            style={{ backgroundColor: '#FC1C1D' }}
                                                        >
                                                            🗑️ Eliminar
                                                        </Link>
                                                    </div>
                                                    
                                                    {/* Botones de gestión de ofertas */}
                                                    {product.active_offer && product.active_offer.is_active ? (
                                                        <div className="flex gap-2 pt-2 border-t border-gray-200">
                                                            <Link
                                                                href={route('offers.edit', product.active_offer.id)}
                                                                className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                                                style={{ backgroundColor: '#FF6B9D' }}
                                                            >
                                                                ✏️ Editar Oferta
                                                            </Link>
                                                            <Link
                                                                href={route('offers.delete', product.active_offer.id)}
                                                                className="flex-1 inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                                                style={{ backgroundColor: '#DC2626' }}
                                                            >
                                                                🗑️ Quitar Oferta
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                        <div className="pt-2 border-t border-gray-200">
                                                            <Link
                                                                href={route('offers.create', { product_id: product.id })}
                                                                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                                                style={{ backgroundColor: '#FF6B9D' }}
                                                            >
                                                                🏷️ Crear Oferta
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            ) : (
                                <div className="text-center py-12">
                                    <span className="text-6xl mb-4 block">🔍</span>
                                    <p className="text-xl font-bold text-gray-600 mb-2">
                                        No se encontraron productos
                                    </p>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Intenta ajustar los filtros de búsqueda
                                    </p>
                                    <button
                                        onClick={clearAllFilters}
                                        className="px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                        style={{ backgroundColor: '#29C9F4' }}
                                    >
                                        Limpiar todos los filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}