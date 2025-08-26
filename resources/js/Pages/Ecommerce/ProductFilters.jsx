import React, { useState, useRef, useEffect } from 'react';

const Chip = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-1 rounded-full border text-sm font-medium transition
      ${selected
        ? 'bg-black text-white border-black shadow'
        : 'bg-white text-black border-neutral-300 hover:bg-neutral-100'}
    `}
    aria-pressed={selected}
  >
    {label}
  </button>
);

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
      className="sm:rounded-md p-0 bg-white max-w-7xl mx-auto sm:my-10 shadow border border-neutral-200"
      // data-aos="fade-up"
      // data-aos-delay="400"
    >
      {!expanded ? (
        <div className="flex flex-col gap-4 justify-center py-6 px-4">
          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {activeChips.map(chip => (
                <button
                  key={chip.key}
                  type="button"
                  // onClick={() => { removeChip(chip.key); setTimeout(() => handleFilterChange(), 0); }}
                  className="group flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-700 transition"
                >
                  <span>{chip.label}</span>
                  
                </button>
              ))}
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-1 rounded-full border text-xs font-medium bg-white text-black border-neutral-300 hover:bg-neutral-100"
              >
                Limpiar todo
              </button>
            </div>
          )}
          <button
            type="button"
            className="mx-auto bg-black text-white px-8 py-2 rounded-lg border border-black font-semibold hover:bg-white hover:text-black transition"
            onClick={() => setExpanded(true)}
          >
            Mostrar filtros
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
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-center">Filtrar productos</h2>
              <button
                type="button"
                className="text-neutral-500 hover:text-black text-2xl font-bold px-2"
                onClick={() => setExpanded(false)}
                aria-label="Cerrar filtros"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {/* Búsqueda */}
              <div>
                <div className="mb-2 font-semibold text-neutral-700">Buscar</div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nombre o descripción"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              {/* Rango de precio */}
              <div>
                <div className="mb-2 font-semibold text-neutral-700">Precio</div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs text-neutral-500 mb-1">Mín</label>
                    <input
                      type="number"
                      min="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-xs text-neutral-500 mb-1">Máx</label>
                    <input
                      type="number"
                      min="0"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="99999"
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>
              {/* Categorías */}
              <div>
                <div className="mb-2 font-semibold text-neutral-700 flex items-center gap-2">
                  Categoría
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    label="Todas"
                    selected={selectedCategory === ''}
                    onClick={() => setSelectedCategory('')}
                  />
                  {categories.map((category) => (
                    <Chip
                      key={category.id}
                      label={category.name}
                      selected={selectedCategory === category.name}
                      onClick={() => setSelectedCategory(category.name)}
                    />
                  ))}
                </div>
              </div>
              {/* Colores */}
              <div>
                <div className="mb-2 font-semibold text-neutral-700 flex items-center gap-2">
                  Color
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    label="Todos"
                    selected={selectedColor === ''}
                    onClick={() => setSelectedColor('')}
                  />
                  {colors.map((color) => (
                    <Chip
                      key={color.id}
                      label={color.name}
                      selected={selectedColor === color.name}
                      onClick={() => setSelectedColor(color.name)}
                    />
                  ))}
                </div>
              </div>
              {/* Género */}
              <div>
                <div className="mb-2 font-semibold text-neutral-700 flex items-center gap-2">
                  Género
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    label="Todos"
                    selected={selectedGender === ''}
                    onClick={() => setSelectedGender('')}
                  />
                  {genders.map((gender) => (
                    <Chip
                      key={gender.id}
                      label={gender.name}
                      selected={selectedGender === gender.name}
                      onClick={() => setSelectedGender(gender.name)}
                    />
                  ))}
                </div>
              </div>
              {/* Talles */}
              <div>
                <div className="mb-2 font-semibold text-neutral-700 flex items-center gap-2">
                  Talle
                </div>
                <div className="flex flex-wrap gap-2">
                  <Chip
                    label="Todos"
                    selected={selectedSize === ''}
                    onClick={() => setSelectedSize('')}
                  />
                  {sizes.map((size) => (
                    <Chip
                      key={size.id}
                      label={size.name}
                      selected={selectedSize === size.name}
                      onClick={() => setSelectedSize(size.name)}
                    />
                  ))}
                </div>
              </div>
              {/* Orden */}
              <div>
                <div className="mb-2 font-semibold text-neutral-700">Ordenar</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { value: '', label: 'Por defecto' },
                    { value: 'price_asc', label: 'Precio ↑' },
                    { value: 'price_desc', label: 'Precio ↓' },
                    { value: 'newest', label: 'Nuevos' },
                    { value: 'oldest', label: 'Antiguos' },
                  ].map(opt => (
                    <button
                      key={opt.value || 'default'}
                      type="button"
                      onClick={() => setSort(opt.value)}
                      className={`px-3 py-1 rounded-md border text-xs font-medium transition ${
                        sort === opt.value
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-neutral-300 hover:bg-neutral-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={handleFilterChange}
                className="bg-black text-white px-8 py-2 rounded-lg border border-black font-semibold hover:bg-white hover:text-black transition"
              >
                Aplicar Filtros
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-white text-black px-8 py-2 rounded-lg border border-black font-semibold hover:bg-black hover:text-white transition"
              >
                Limpiar Filtros
              </button>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="bg-neutral-100 text-black px-8 py-2 rounded-lg border border-neutral-300 font-semibold hover:bg-neutral-200 transition"
              >
                Ocultar filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilter;