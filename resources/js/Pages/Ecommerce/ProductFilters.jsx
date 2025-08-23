import React, { useState } from 'react';

const ProductFilter = ({ categories, colors, genders, onFilter, initialFilters = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || '');
  const [selectedColor, setSelectedColor] = useState(initialFilters.color || '');
  const [selectedGender, setSelectedGender] = useState(initialFilters.gender || '');

  const handleFilterChange = () => {
    onFilter({
      category: selectedCategory,
      color: selectedColor,
      gender: selectedGender,
    });
  };

  const handleClear = () => {
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedGender('');
    onFilter({ category: '', color: '', gender: '' });
  };

  return (
    <div
      className="rounded-xl p-6 bg-white max-w-6xl  mx-auto mb-8"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-black" htmlFor="category-select">Categoría</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-black rounded-md bg-white text-black"
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-black" htmlFor="color-select">Color</label>
          <select
            id="color-select"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="p-2 border border-black rounded-md bg-white text-black"
          >
            <option value="">Seleccionar color</option>
            {colors.map((color) => (
              <option key={color.id} value={color.name}>
                {color.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-black" htmlFor="gender-select">Género</label>
          <select
            id="gender-select"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="p-2 border border-black rounded-md bg-white text-black"
          >
            <option value="">Seleccionar género</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.name}>
                {gender.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={handleFilterChange}
          className="bg-black text-white px-8 py-2 rounded-md border border-black font-semibold hover:bg-white hover:text-black transition duration-300"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={handleClear}
          className="bg-white text-black px-8 py-2 rounded-md border border-black font-semibold hover:bg-black hover:text-white transition duration-300"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;