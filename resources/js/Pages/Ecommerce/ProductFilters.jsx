import React, { useState } from 'react';

const ProductFilter = ({ categories, colors, genders, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const handleFilterChange = () => {
    onFilter({
      category: selectedCategory,
      color: selectedColor,
      gender: selectedGender,
    });
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Filtrar Productos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Todos los colores</option>
          {colors.map((color) => (
            <option key={color.id} value={color.name}>
              {color.name}
            </option>
          ))}
        </select>

        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Todos los géneros</option>
          {genders.map((gender) => (
            <option key={gender.id} value={gender.name}>
              {gender.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={handleFilterChange}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;