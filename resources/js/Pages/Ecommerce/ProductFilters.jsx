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
      className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all duration-200 hover:scale-105 ${colorStyles[color]}`}
      style={selected ? { backgroundColor: selectedBg[color] } : {}}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
};

const ANIMATION_DURATION = 500;

const ProductFilter = ({ categories, colors, genders, sizes = [], onFilter, initialFilters = {}, compact = false }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');
  const [selectedColor, setSelectedColor] = useState(initialFilters.color || '');
  const [selectedGender, setSelectedGender] = useState(initialFilters.gender || '');
  const [selectedSize, setSelectedSize] = useState(initialFilters.size || '');
  const [minPrice, setMinPrice] = useState(initialFilters.min_price || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.max_price || '');
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

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
  }, [expanded, isVisible]);

  const handleFilterChange = () => {
    onFilter({
      min_price: minPrice,
      max_price: maxPrice,
      category: selectedCategory,
      color: selectedColor,
      gender: selectedGender,
      size: selectedSize,
    });
    setExpanded(false);
  };

  const handleClear = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedGender('');
    setSelectedSize('');
    setMinPrice('');
    setMaxPrice('');
    onFilter({ min_price: '', max_price: '', category: '', color: '', gender: '', size: '' });
    setExpanded(false);
  };

  const activeChips = [
    { key: 'category', label: selectedCategory },
    { key: 'color', label: selectedColor },
    { key: 'gender', label: selectedGender },
    { key: 'size', label: selectedSize },
    { key: 'min_price', label: minPrice ? `Min: ${minPrice}` : '' },
    { key: 'max_price', label: maxPrice ? `Max: ${maxPrice}` : '' },
  ].filter(c => c.label);

  const FilterContent = () => (
    <div className="flex flex-col gap-4 sm:gap-8">
      {/* Filtro de Precio */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-md">
        <div className="mb-2 sm:mb-3 font-bold text-base sm:text-lg flex items-center gap-2" style={{ color: '#65DA4D' }}>
          <span className="text-xl sm:text-2xl">💰</span>
          Precio
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          <div className="flex-1 min-w-[100px] sm:min-w-[120px]">
            <label className="block text-xs sm:text-sm font-bold text-neutral-600 mb-1 sm:mb-2">Mínimo</label>
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="$ 0"
              className="w-full rounded-lg sm:rounded-xl border-2 border-green-300 px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-green-200 focus:border-green-400"
            />
          </div>
          <div className="flex-1 min-w-[100px] sm:min-w-[120px]">
            <label className="block text-xs sm:text-sm font-bold text-neutral-600 mb-1 sm:mb-2">Máximo</label>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="$ 99999"
              className="w-full rounded-lg sm:rounded-xl border-2 border-green-300 px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-green-200 focus:border-green-400"
            />
          </div>
        </div>
      </div>

      {/* Filtro de Categoría */}
      <div className="bg-gradient-to-r from-green-50 to-lime-50 p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-md">
        <div className="mb-2 sm:mb-4 font-bold text-base sm:text-lg flex items-center gap-2" style={{ color: '#65DA4D' }}>
          <span className="text-xl sm:text-2xl">📂</span>
          Categoría
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
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

      {/* Filtro de Color */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-md">
        <div className="mb-2 sm:mb-4 font-bold text-base sm:text-lg flex items-center gap-2" style={{ color: '#FC1C1D' }}>
          <span className="text-xl sm:text-2xl">🎨</span>
          Color
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
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

      {/* Filtro de Género */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-md">
        <div className="mb-2 sm:mb-4 font-bold text-base sm:text-lg flex items-center gap-2" style={{ color: '#9B59B6' }}>
          <span className="text-xl sm:text-2xl">👶</span>
          Género
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
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

      {/* Filtro de Talle */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-md">
        <div className="mb-2 sm:mb-4 font-bold text-base sm:text-lg flex items-center gap-2" style={{ color: '#FFB800' }}>
          <span className="text-xl sm:text-2xl">📏</span>
          Talle
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
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
    </div>
  );

  return (
    <div
      className={
        compact
          ? 'rounded-2xl p-0 bg-white shadow-md max-w-full mx-auto my-2'
          : 'sm:rounded-2xl p-0 bg-gradient-to-br from-white to-neutral-50 max-w-7xl mx-auto sm:my-10 shadow-xl border-4 border-white'
      }
    >
      {/* Vista colapsada */}
      {!expanded ? (
        <div className={compact ? 'flex items-center gap-3 p-3' : 'flex flex-col gap-4 justify-center py-6 sm:py-8 px-4 sm:px-6'}>
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
            className={compact ? 'ml-auto text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md' : 'mx-auto text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl border-4 border-white font-bold text-base sm:text-lg hover:scale-105 transition-all shadow-lg w-full sm:w-auto'}
            style={{ backgroundColor: '#29C9F4' }}
            onClick={() => setExpanded(true)}
            aria-expanded={expanded}
          >
            🔍 {compact ? 'Filtros' : 'Mostrar filtros'}
          </button>
        </div>
      ) : null}

      {/* Vista expandida */}
      {isVisible && (
        compact ? (
          // Modo compact: Modal overlay
          <div className="fixed inset-0 z-50 bg-black/40 p-4 overflow-auto">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Filtrar productos</h3>
                <button 
                  onClick={() => setExpanded(false)} 
                  className="text-4xl font-bold text-neutral-500 hover:text-neutral-700 w-10 h-10 flex items-center justify-center leading-none"
                >
                  ×
                </button>
              </div>
              <div ref={contentRef} className="space-y-6">
                <FilterContent />
              </div>
              <div className="flex justify-center gap-4 mt-6">
                <button 
                  onClick={handleFilterChange} 
                  className="text-white px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-md"
                  style={{ backgroundColor: '#65DA4D' }}
                >
                  ✓ Aplicar filtros
                </button>
                <button 
                  onClick={handleClear} 
                  className="text-white px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-md"
                  style={{ backgroundColor: '#FC1C1D' }}
                >
                  🗑️ Limpiar
                </button>
                <button 
                  onClick={() => setExpanded(false)} 
                  className="text-neutral-700 px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-md border-2 border-neutral-300 bg-white"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Modo normal: Panel inline expandible
          <div
            ref={contentRef}
            className="overflow-hidden transition-all"
            style={{
              maxHeight: '0px',
              opacity: '0',
              transitionDuration: `${ANIMATION_DURATION}ms`,
            }}
          >
            <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
              <FilterContent />
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
                <button 
                  onClick={handleFilterChange} 
                  className="text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl border-2 sm:border-4 border-white font-bold text-base sm:text-lg hover:scale-105 transition-all shadow-lg"
                  style={{ backgroundColor: '#65DA4D' }}
                >
                  ✓ Aplicar filtros
                </button>
                <button 
                  onClick={handleClear} 
                  className="text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl border-2 sm:border-4 border-white font-bold text-base sm:text-lg hover:scale-105 transition-all shadow-lg"
                  style={{ backgroundColor: '#FC1C1D' }}
                >
                  🗑️ Limpiar todo
                </button>
                <button 
                  onClick={() => setExpanded(false)} 
                  className="text-neutral-700 px-6 sm:px-10 py-3 sm:py-4 rounded-xl border-2 sm:border-4 border-neutral-300 bg-white font-bold text-base sm:text-lg hover:scale-105 transition-all shadow-lg"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductFilter;
