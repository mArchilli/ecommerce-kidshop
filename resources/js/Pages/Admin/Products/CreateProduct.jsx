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
        [name]: file ? URL.createObjectURL(file) : null,
      }));
    } else if (type === 'checkbox') {
      const arr = data[name];
      const v = value.toString();
      setData(name, checked ? [...arr, v] : arr.filter(i => i !== v));
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
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('gender_id', data.gender_id);
    data.categories.forEach(c => formData.append('categories[]', c));
    data.colors.forEach(c => formData.append('colors[]', c));
    data.sizes.forEach((s, i) => {
      formData.append(`sizes[${i}][id]`, s.id);
      formData.append(`sizes[${i}][stock]`, s.stock);
    });
    ['image_1', 'image_2', 'image_3'].forEach(key => {
      if (data[key]) {
        formData.append('images[]', data[key]);
      }
    });
    post(route('products.store'), { data: formData });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">Nuevo Producto</h2>
          <Link
            href={route('products.index')}
            className="px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition"
          >
            Volver
          </Link>
        </div>
      }
    >
      <Head title="Crear Producto" />
      <div className="max-w-7xl mx-auto py-10">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
          {/* Información básica */}
          <div className="bg-white rounded-2xl shadow p-6 border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800 mb-6 border-b pb-2">Información Básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  placeholder="Ej: Remera estampada"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  min="0"
                  step="1"
                  placeholder="Ej: 3500"
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Describe el producto..."
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Género</label>
                <div className="flex gap-4">
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
                {errors.gender_id && <p className="text-red-500 text-xs mt-2">{errors.gender_id}</p>}
              </div>
            </div>
          </div>

          {/* Categorías y Colores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow p-6 border border-neutral-200">
              <h3 className="text-base font-semibold text-neutral-800 mb-4">Categorías</h3>
              <div className="flex flex-wrap gap-2">
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
              {errors.categories && <p className="text-red-500 text-xs mt-2">{errors.categories}</p>}
            </div>
            <div className="bg-white rounded-2xl shadow p-6 border border-neutral-200">
              <h3 className="text-base font-semibold text-neutral-800 mb-4">Colores</h3>
              <div className="flex flex-wrap gap-2">
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
              {errors.colors && <p className="text-red-500 text-xs mt-2">{errors.colors}</p>}
            </div>
          </div>

          {/* Talles y stock */}
          <div className="bg-white rounded-2xl shadow p-6 border border-neutral-200">
            <h3 className="text-base font-semibold text-neutral-800 mb-4">Talles y Stock</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sizes.map(size => {
                const selected = data.sizes.some(s => s.id === size.id);
                const current = data.sizes.find(s => s.id === size.id);
                return (
                  <div key={size.id} className="flex items-center gap-3 border-b pb-2 mb-2">
                    <CheckboxLabel
                      id={size.id}
                      name="sizes"
                      value={size.id}
                      label={size.name}
                      onChange={() => handleSizeSelection(size.id)}
                      checked={selected}
                    />
                    {selected && (
                      <input
                        type="number"
                        min={0}
                        value={current?.stock ?? 0}
                        onChange={e => handleStockChange(e, size.id)}
                        className="w-24 rounded-md border border-neutral-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Stock"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {errors.sizes && <p className="text-red-500 text-xs mt-2">{errors.sizes}</p>}
          </div>

          {/* Imágenes */}
          <div className="bg-white rounded-2xl shadow p-6 border border-neutral-200">
            <h3 className="text-base font-semibold text-neutral-800 mb-4">Imágenes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <label className="block text-sm font-medium mb-2">Imagen {i}</label>
                  <input
                    type="file"
                    name={`image_${i}`}
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-white file:hover:bg-neutral-800 file:transition"
                  />
                  {errors[`image_${i}`] && (
                    <p className="text-red-500 text-xs mt-2">{errors[`image_${i}`]}</p>
                  )}
                  {imagePreviews[`image_${i}`] && (
                    <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200 w-full">
                      <img
                        src={imagePreviews[`image_${i}`]}
                        alt={`Preview ${i}`}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-6">
            <Link
              href={route('products.index')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-center border border-black text-black hover:bg-black hover:text-white transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-black text-white hover:bg-white hover:text-black border border-black transition font-semibold"
            >
              Crear Producto
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}