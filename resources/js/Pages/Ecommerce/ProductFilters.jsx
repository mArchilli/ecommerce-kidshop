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

const ProductFilter = ({ categories, colors, genders, sizes = [], onFilter, initialFilters = {}, compact = false, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');
  const [selectedColor, setSelectedColor] = useState(initialFilters.color || '');
  const [selectedGender, setSelectedGender] = useState(initialFilters.gender || '');
  const [selectedSize, setSelectedSize] = useState(initialFilters.size || '');
  const [minPrice, setMinPrice] = useState(initialFilters.min_price || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.max_price || '');
  const [expanded, setExpanded] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
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
  };

  const handleClear = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedGender('');
    setSelectedSize('');
    setMinPrice('');
    setMaxPrice('');
    onFilter({ min_price: '', max_price: '', category: '', color: '', gender: '', size: '' });
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
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
    <>
      {/* Contenedor de filtros expandidos */}
      {isVisible && (
        <div className="rounded-xl bg-white max-w-7xl mx-auto shadow-md border border-gray-200 my-6">
          <div
            ref={contentRef}
            className="overflow-hidden transition-all"
            style={{
              maxHeight: expanded ? `${contentRef.current?.scrollHeight || 2000}px` : '0px',
              opacity: expanded ? '1' : '0',
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
                  onClick={handleClose} 
                  className="text-gray-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:shadow-md transition-all border border-gray-300 bg-white"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilter;
