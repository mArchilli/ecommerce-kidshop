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

const ProductFilter = ({ categories, colors, genders, onFilter, initialFilters = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');
  const [selectedColor, setSelectedColor] = useState(initialFilters.color || '');
  const [selectedGender, setSelectedGender] = useState(initialFilters.gender || '');
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
      category: selectedCategory,
      color: selectedColor,
      gender: selectedGender,
    });
    setExpanded(false);
  };

  const handleClear = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedGender('');
    onFilter({ category: '', color: '', gender: '' });
    setExpanded(false);
  };

  return (
    <div
      className="rounded-2xl p-0 bg-white max-w-4xl mx-auto my-10 shadow border border-neutral-200"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      {!expanded ? (
        <div className="flex justify-center py-6">
          <button
            type="button"
            className="bg-black text-white px-8 py-2 rounded-lg border border-black font-semibold hover:bg-white hover:text-black transition"
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