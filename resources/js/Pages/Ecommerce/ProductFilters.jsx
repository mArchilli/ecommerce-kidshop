import React, { useState, useRef, useEffect } from 'react';

const Chip = ({ label, selected, onClick, color = 'default' }) => {
  const colorStyles = {
    default: selected 
      ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
    category: selected 
      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-md' 
      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50',
    color: selected 
      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md' 
      : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50',
    gender: selected 
      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-transparent shadow-md' 
      : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-50',
    size: selected 
      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md' 
      : 'bg-white text-gray-700 border-gray-300 hover:bg-amber-50',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all hover:shadow-md ${colorStyles[color]}`}
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
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-3 font-semibold text-sm sm:text-base text-gray-700">
          Precio
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <div className="flex-1 min-w-[100px] sm:min-w-[120px]">
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Mínimo</label>
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="$ 0"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
          <div className="flex-1 min-w-[100px] sm:min-w-[120px]">
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Máximo</label>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="$ 99999"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Filtro de Categoría */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-3 font-semibold text-sm sm:text-base text-gray-700">
          Categoría
        </div>
        <div className="flex flex-wrap gap-2">
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
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-3 font-semibold text-sm sm:text-base text-gray-700">
          Color
        </div>
        <div className="flex flex-wrap gap-2">
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
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-3 font-semibold text-sm sm:text-base text-gray-700">
          Género
        </div>
        <div className="flex flex-wrap gap-2">
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
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="mb-3 font-semibold text-sm sm:text-base text-gray-700">
          Talle
        </div>
        <div className="flex flex-wrap gap-2">
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
          ? 'rounded-xl p-0 bg-white shadow-sm max-w-full mx-auto my-2 border border-gray-200'
          : 'sm:rounded-xl p-0 bg-white max-w-7xl mx-auto sm:my-8 shadow-md border border-gray-200'
      }
    >
      {/* Vista colapsada */}
      {!expanded ? (
        <div className={compact ? 'flex items-center gap-3 p-3' : 'flex flex-col gap-4 justify-center py-5 sm:py-6 px-4 sm:px-6'}>
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {activeChips.map(chip => (
                <button
                  key={chip.key}
                  type="button"
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-semibold hover:shadow-md transition-all"
                >
                  <span>{chip.label}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-red-500 to-rose-500 text-white hover:shadow-md transition-all"
              >
                Limpiar todo
              </button>
            </div>
          )}
          <button
            type="button"
            className={compact ? 'ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-sm hover:shadow-md transition-all' : 'mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-md transition-all w-full sm:w-auto'}
            onClick={() => setExpanded(true)}
            aria-expanded={expanded}
          >
            {compact ? 'Filtros' : 'Mostrar filtros'}
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
              <div className="flex justify-center gap-3 sm:gap-4 mt-6">
                <button 
                  onClick={handleFilterChange} 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-lg transition-all"
                >
                  Aplicar filtros
                </button>
                <button 
                  onClick={handleClear} 
                  className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-lg transition-all"
                >
                  Limpiar
                </button>
                <button 
                  onClick={() => setExpanded(false)} 
                  className="text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-md transition-all border border-gray-300 bg-white"
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
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 pt-4">
                <button 
                  onClick={handleFilterChange} 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-lg transition-all"
                >
                  Aplicar filtros
                </button>
                <button 
                  onClick={handleClear} 
                  className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-lg transition-all"
                >
                  Limpiar todo
                </button>
                <button 
                  onClick={() => setExpanded(false)} 
                  className="text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-md transition-all border border-gray-300 bg-white"
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
