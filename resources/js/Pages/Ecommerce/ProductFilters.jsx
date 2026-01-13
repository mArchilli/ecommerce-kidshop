import React, { useState, useRef, useEffect } from 'react';

const Chip = ({ label, selected, onClick, color = 'default' }) => {
  const colorStyles = {
    default: selected 
      ? 'bg-black text-white border-black shadow-md transform scale-105' 
      : 'bg-white text-black border-neutral-300 hover:bg-neutral-50',
    category: selected 
      ? 'text-white border-white shadow-lg transform scale-105' 
      : 'bg-white border-2 hover:bg-green-50',
    color: selected 
      ? 'text-white border-white shadow-lg transform scale-105' 
      : 'bg-white border-2 hover:bg-red-50',
    gender: selected 
      ? 'text-white border-white shadow-lg transform scale-105' 
      : 'bg-white border-2 hover:bg-purple-50',
    size: selected 
      ? 'text-white border-white shadow-lg transform scale-105' 
      : 'bg-white border-2 hover:bg-yellow-50',
  };
  
  const selectedBg = {
    category: '#65DA4D',
    color: '#FC1C1D',
    gender: '#9B59B6',
    size: '#FFB800',
    default: '#000',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all duration-200 hover:scale-105 ${colorStyles[color]}`}
      style={selected ? { backgroundColor: selectedBg[color] } : {}}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
};

const ANIMATION_DURATION = 500; // ms

const ProductFilter = ({ categories, colors, genders, sizes = [], onFilter, initialFilters = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');
  const [selectedColor, setSelectedColor] = useState(initialFilters.color || '');
  const [selectedGender, setSelectedGender] = useState(initialFilters.gender || '');
  const [selectedSize, setSelectedSize] = useState(initialFilters.size || '');
  const [searchTerm, setSearchTerm] = useState(initialFilters.q || '');
  const [minPrice, setMinPrice] = useState(initialFilters.min_price || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.max_price || '');
  const [sort, setSort] = useState(initialFilters.sort || '');
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  // Maneja el montaje/desmontaje con animación suave
  useEffect(() => {
    if (expanded) {
      setIsVisible(true);
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px';
          contentRef.current.style.opacity = '1';
        }
      }, 10);
    } else if (isVisible) {
      if (contentRef.current) {
        contentRef.current.style.maxHeight = '0px';
        contentRef.current.style.opacity = '0';
      }
      const timeout = setTimeout(() => setIsVisible(false), ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [expanded]);

  const handleFilterChange = () => {
    onFilter({
      q: searchTerm,
      min_price: minPrice,
      max_price: maxPrice,
      category: selectedCategory,
      color: selectedColor,
      gender: selectedGender,
      size: selectedSize,
      sort,
    });
    setExpanded(false);
  };

  const handleClear = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedGender('');
    setSelectedSize('');
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setSort('');
    onFilter({ q: '', min_price: '', max_price: '', category: '', color: '', gender: '', size: '', sort: '' });
    setExpanded(false);
  };

  const activeChips = [
    { key: 'q', label: searchTerm },
    { key: 'category', label: selectedCategory },
    { key: 'color', label: selectedColor },
    { key: 'gender', label: selectedGender },
    { key: 'size', label: selectedSize },
    { key: 'min_price', label: minPrice ? `Min: ${minPrice}` : '' },
    { key: 'max_price', label: maxPrice ? `Max: ${maxPrice}` : '' },
    { key: 'sort', label: sort ? `Orden: ${sort}` : '' },
  ].filter(c => c.label);

  const removeChip = (chipKey) => {
    switch (chipKey) {
      case 'q': setSearchTerm(''); break;
      case 'category': setSelectedCategory(''); break;
      case 'color': setSelectedColor(''); break;
      case 'gender': setSelectedGender(''); break;
      case 'size': setSelectedSize(''); break;
      case 'min_price': setMinPrice(''); break;
      case 'max_price': setMaxPrice(''); break;
      case 'sort': setSort(''); break;
    }
  };

  return (
    <div
      className="sm:rounded-2xl p-0 bg-gradient-to-br from-white to-neutral-50 max-w-7xl mx-auto sm:my-10 shadow-xl border-4 border-white"
    >
      {!expanded ? (
        <div className="flex flex-col gap-4 justify-center py-8 px-6">
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center">
              {activeChips.map(chip => (
                <button
                  key={chip.key}
                  type="button"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:scale-105 transition-all shadow-md"
                  style={{ backgroundColor: '#29C9F4' }}
                >
                  <span>{chip.label}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={handleClear}
                className="px-5 py-2.5 rounded-xl border-2 text-sm font-bold text-white hover:scale-105 transition-all shadow-md"
                style={{ backgroundColor: '#FC1C1D', borderColor: '#FC1C1D' }}
              >
                🗑️ Limpiar todo
              </button>
            </div>
          )}
          <button
            type="button"
            className="mx-auto text-white px-10 py-4 rounded-xl border-4 border-white font-bold text-lg hover:scale-105 transition-all shadow-lg"
            style={{ backgroundColor: '#29C9F4' }}
            onClick={() => setExpanded(true)}
          >
            🔍 Mostrar filtros
          </button>
        </div>
      ) : null}
      {isVisible && (
        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: expanded ? (contentRef.current ? contentRef.current.scrollHeight : 1000) : 0,
            opacity: expanded ? 1 : 0,
          }}
        >
          <div className="p-8 bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-center flex items-center gap-3">
                <span className="text-4xl">🔍</span>
                <span style={{ color: '#29C9F4' }}>Filtrar productos</span>
              </h2>
              <button
                type="button"
                className="text-white hover:scale-110 text-3xl font-bold px-4 py-2 rounded-xl transition-all"
                style={{ backgroundColor: '#FC1C1D' }}
                onClick={() => setExpanded(false)}
                aria-label="Cerrar filtros"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {/* Búsqueda */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-2xl border-4 border-white shadow-md">
                <div className="mb-3 font-bold text-lg flex items-center gap-2" style={{ color: '#29C9F4' }}>
                  <span className="text-2xl">🔎</span>
                  Buscar
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Busca por nombre o descripción..."
                  className="w-full rounded-xl border-2 border-cyan-300 px-5 py-3 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-cyan-200 focus:border-cyan-400"
                />
              </div>
              {/* Rango de precio */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-4 border-white shadow-md">
                <div className="mb-3 font-bold text-lg flex items-center gap-2" style={{ color: '#65DA4D' }}>
                  <span className="text-2xl">💰</span>
                  Precio
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-bold text-neutral-600 mb-2">Mínimo</label>
                    <input
                      type="number"
                      min="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="$ 0"
                      className="w-full rounded-xl border-2 border-green-300 px-4 py-3 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400"
                    />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-sm font-bold text-neutral-600 mb-2">Máximo</label>
                    <input
                      type="number"
                      min="0"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="$ 99999"
                      className="w-full rounded-xl border-2 border-green-300 px-4 py-3 text-base font-semibold focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400"
                    />
                  </div>
                </div>
              </div>
              {/* Categorías */}
              <div className="bg-gradient-to-r from-green-50 to-lime-50 p-6 rounded-2xl border-4 border-white shadow-md">
                <div className="mb-4 font-bold text-lg flex items-center gap-2" style={{ color: '#65DA4D' }}>
                  <span className="text-2xl">📂</span>
                  Categoría
                </div>
                <div className="flex flex-wrap gap-3">
                  <Chip
                    label="Todas"
                    selected={selectedCategory === ''}
                    onClick={() => setSelectedCategory('')}
                    color="category"
                  />
                  {categories.map((category) => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      selected={selectedCategory === category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      color="category"
                    />
                  ))}
                </div>
              </div>
              {/* Colores */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-4 border-white shadow-md">
                <div className="mb-4 font-bold text-lg flex items-center gap-2" style={{ color: '#FC1C1D' }}>
                  <span className="text-2xl">🎨</span>
                  Color
                </div>
                <div className="flex flex-wrap gap-3">
                  <Chip
                    label="Todos"
                    selected={selectedColor === ''}
                    onClick={() => setSelectedColor('')}
                    color="color"
                  />
                  {colors.map((color) => (
                    <Chip
                      key={color.id}
                      label={color.name}
                      selected={selectedColor === color.name}
                      onClick={() => setSelectedColor(color.name)}
                      color="color"
                    />
                  ))}
                </div>
              </div>
              {/* Género */}
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border-4 border-white shadow-md">
                <div className="mb-4 font-bold text-lg flex items-center gap-2" style={{ color: '#9B59B6' }}>
                  <span className="text-2xl">👶</span>
                  Género
                </div>
                <div className="flex flex-wrap gap-3">
                  <Chip
                    label="Todos"
                    selected={selectedGender === ''}
                    onClick={() => setSelectedGender('')}
                    color="gender"
                  />
                  {genders.map((gender) => (
                    <Chip
                      key={gender.id}
                      label={gender.name}
                      selected={selectedGender === gender.name}
                      onClick={() => setSelectedGender(gender.name)}
                      color="gender"
                    />
                  ))}
                </div>
              </div>
              {/* Talles */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-2xl border-4 border-white shadow-md">
                <div className="mb-4 font-bold text-lg flex items-center gap-2" style={{ color: '#FFB800' }}>
                  <span className="text-2xl">📏</span>
                  Talle
                </div>
                <div className="flex flex-wrap gap-3">
                  <Chip
                    label="Todos"
                    selected={selectedSize === ''}
                    onClick={() => setSelectedSize('')}
                    color="size"
                  />
                  {sizes.map((size) => (
                    <Chip
                      key={size.id}
                      label={size.name}
                      selected={selectedSize === size.name}
                      onClick={() => setSelectedSize(size.name)}
                      color="size"
                    />
                  ))}
                </div>
              </div>
              {/* Orden */}
              <div className="bg-gradient-to-r from-cyan-50 to-sky-50 p-6 rounded-2xl border-4 border-white shadow-md">
                <div className="mb-4 font-bold text-lg flex items-center gap-2" style={{ color: '#29C9F4' }}>
                  <span className="text-2xl">↕️</span>
                  Ordenar
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { value: '', label: 'Por defecto' },
                    { value: 'price_asc', label: '💵 Precio ↑' },
                    { value: 'price_desc', label: '💰 Precio ↓' },
                    { value: 'newest', label: '✨ Nuevos' },
                    { value: 'oldest', label: '📅 Antiguos' },
                  ].map(opt => (
                    <button
                      key={opt.value || 'default'}
                      type="button"
                      onClick={() => setSort(opt.value)}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all hover:scale-105 ${
                        sort === opt.value
                          ? 'text-white border-white shadow-lg scale-105'
                          : 'bg-white text-black border-cyan-300 hover:bg-cyan-50'
                      }`}
                      style={sort === opt.value ? { backgroundColor: '#29C9F4' } : {}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
              <button
                type="button"
                onClick={handleFilterChange}
                className="text-white px-10 py-4 rounded-xl border-4 border-white font-bold text-lg hover:scale-105 transition-all shadow-lg"
                style={{ backgroundColor: '#65DA4D' }}
              >
                ✅ Aplicar Filtros
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-white px-10 py-4 rounded-xl border-4 border-white font-bold text-lg hover:scale-105 transition-all shadow-lg"
                style={{ backgroundColor: '#FC1C1D' }}
              >
                🗑️ Limpiar Filtros
              </button>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="bg-white text-black px-10 py-4 rounded-xl border-4 border-neutral-300 font-bold text-lg hover:scale-105 transition-all shadow-lg hover:bg-neutral-50"
              >
                ❌ Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;