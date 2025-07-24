import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import CheckboxLabel from '@/Components/CheckboxLabel';
import RadioLabel from '@/Components/RadioLabel';

export default function CreateProduct({ categories = [], sizes = [], colors = [], genders = [] }) {
  const { data, setData, post, errors } = useForm({
    name: '',
    description: '',
    price: '',
    categories: [],
    sizes: [],
    colors: [],
    gender_id: '',
    image_1: null,
    image_2: null,
    image_3: null,
  });

  const [imagePreviews, setImagePreviews] = useState({});

  const handleChange = (e) => {
    const { name, type, value, files, checked } = e.target;

    if (type === 'file') {
      const file = files[0];
      setData(name, file);
      setImagePreviews(prev => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    } else if (type === 'checkbox') {
      const arr = data[name];
      const v = value.toString();
      setData(name, checked
        ? [...arr, v]
        : arr.filter(i => i !== v)
      );
    } else {
      setData(name, value);
    }
  };

  const handleSizeSelection = (sizeId) => {
    const id = sizeId.toString();
    const exists = data.sizes.find(s => s.id.toString() === id);
    if (exists) {
      setData('sizes', data.sizes.filter(s => s.id.toString() !== id));
    } else {
      setData('sizes', [...data.sizes, { id: sizeId, stock: 0 }]);
    }
  };

  const handleStockChange = (e, sizeId) => {
    const updated = data.sizes.map(s =>
      s.id === sizeId ? { ...s, stock: parseInt(e.target.value) || 0 } : s
    );
    setData('sizes', updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    

    // campos simples
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('gender_id', data.gender_id);

    

    // arrays
    data.categories.forEach(c => formData.append('categories[]', c));
    data.colors.forEach(c => formData.append('colors[]', c));
    data.sizes.forEach((s, i) => {
      formData.append(`sizes[${i}][id]`, s.id);
      formData.append(`sizes[${i}][stock]`, s.stock);
    });
    
    
    // imágenes bajo images[]
    ['image_1', 'image_2', 'image_3'].forEach(key => {
      if (data[key]) {
        formData.append('images[]', data[key]);
      }
    });
    console.log('hasta aca llego');
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
        }

    post(route('products.store'), {
      data: formData
    });
    
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Crear Producto</h2>
          <Link
            href={route('products.index')}
            className="inline-flex px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Volver a Productos
          </Link>
        </div>
      }
    >
      <Head title="Crear Producto" />

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6 p-6 bg-white shadow rounded">
        {/* Nombre & Descripción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded"
              required
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded"
            />
            {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
          </div>
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            name="price"
            value={data.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded"
            required
          />
          {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
        </div>

        {/* Categorías */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Categorías</label>
          <div className="mt-1 flex flex-wrap">
            {categories.map(({ id, name }) => (
              <CheckboxLabel
                key={id}
                id={id}
                name="categories"
                value={id}
                label={name}
                onChange={handleChange}
                checked={data.categories.includes(id.toString())}
              />
            ))}
          </div>
          {errors.categories && <p className="text-red-600 text-sm">{errors.categories}</p>}
        </div>

        {/* Talles */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Talles</label>
          <div className="mt-1 flex flex-wrap">
            {sizes.map(size => (
              <div key={size.id} className="mr-4 mb-4">
                <CheckboxLabel
                  id={size.id}
                  name="sizes"
                  value={size.id}
                  label={size.name}
                  onChange={() => handleSizeSelection(size.id)}
                  checked={data.sizes.some(s => s.id === size.id)}
                />
                {data.sizes.some(s => s.id === size.id) && (
                  <input
                    type="number"
                    value={data.sizes.find(s => s.id === size.id).stock}
                    onChange={e => handleStockChange(e, size.id)}
                    className="mt-1 block w-20 border-gray-300 rounded"
                  />
                )}
              </div>
            ))}
          </div>
          {errors.sizes && <p className="text-red-600 text-sm">{errors.sizes}</p>}
        </div>

        {/* Colores */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Colores</label>
          <div className="mt-1 flex flex-wrap">
            {colors.map(({ id, name }) => (
              <CheckboxLabel
                key={id}
                id={id}
                name="colors"
                value={id}
                label={name}
                onChange={handleChange}
                checked={data.colors.includes(id.toString())}
              />
            ))}
          </div>
          {errors.colors && <p className="text-red-600 text-sm">{errors.colors}</p>}
        </div>

        {/* Género */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Género</label>
          <div className="mt-1 flex flex-wrap">
            {genders.map(({ id, name }) => (
              <RadioLabel
                key={id}
                id={id}
                name="gender_id"
                value={id}
                label={name}
                onChange={handleChange}
                checked={data.gender_id == id}
              />
            ))}
          </div>
          {errors.gender_id && <p className="text-red-600 text-sm">{errors.gender_id}</p>}
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700">Imagen {i}</label>
              <input
                type="file"
                name={`image_${i}`}
                accept="image/*"
                onChange={handleChange}
                className="mt-1 block w-full"
              />
              {errors[`image_${i}`] && (
                <p className="text-red-600 text-sm">{errors[`image_${i}`]}</p>
              )}
              {imagePreviews[`image_${i}`] && (
                <img
                  src={imagePreviews[`image_${i}`]}
                  alt={`Preview ${i}`}
                  className="mt-2 h-24 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear Producto
          </button>
        </div>
      </form>
    </AuthenticatedLayout>
  );
}