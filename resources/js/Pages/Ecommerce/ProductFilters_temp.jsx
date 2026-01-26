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
      className={px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all duration-200 hover:scale-105 }
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
    { key: 'min_price', label: minPrice ? Min:  : '' },
    { key: 'max_price', label: maxPrice ? Max:  : '' },
  ].filter(c => c.label);

  return (
    <div
      className={
        compact
          ? 'rounded-2xl p-0 bg-white shadow-md max-w-full mx-auto my-2'
          : 'sm:rounded-2xl p-0 bg-gradient-to-br from-white to-neutral-50 max-w-7xl mx-auto sm:my-10 shadow-xl border-4 border-white'
      }
    >
      {!expanded ? (
        <div className={compact ? 'flex items-center gap-3 p-3' : 'flex flex-col gap-4 justify-center py-8 px-6'}>
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
                 Limpiar todo
              </button>
            </div>
          )}
          <button
            type="button"
            className={compact ? 'ml-auto text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md' : 'mx-auto text-white px-10 py-4 rounded-xl border-4 border-white font-bold text-lg hover:scale-105 transition-all shadow-lg'}
            style={{ backgroundColor: '#29C9F4' }}
            onClick={() => setExpanded(true)}
          >
             {compact ? 'Filtros' : 'Mostrar filtros'}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductFilter;
