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
    // console.log('hasta aca llego');
    for (let pair of formData.entries()) {
        // console.log(pair[0], pair[1]);
        }

    post(route('products.store'), {
      data: formData
    });
    
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Crear Producto</h2>
          <Link
            href={route('products.index')}
            className="inline-flex px-4 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white transition"
          >
            Volver a Productos
          </Link>
        </div>
      }
    >
      <Head title="Crear Producto" />

      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8 p-6 bg-white/80 backdrop-blur-sm  rounded-2xl">
          {/* Sección: Información básica */}
          <section>
            <h3 className="text-sm font-semibold text-neutral-700 mb-4">Información básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-800">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-black/20 bg-white px-3 py-2 focus:outline-none focus:border-black focus:ring-black"
                  required
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-800">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-black/20 bg-white px-3 py-2 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
                {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-800">Descripción</label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 w-full rounded-md border border-black/20 bg-white px-3 py-2 focus:outline-none focus:border-black focus:ring-black"
                />
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-800 mb-2">Género</label>
                <div className="flex flex-wrap gap-3">
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
                {errors.gender_id && <p className="text-red-600 text-sm mt-2">{errors.gender_id}</p>}
              </div>
            </div>
          </section>

          {/* Sección: Categorías */}
          <section className="rounded-md border border-black/10 bg-white p-4">
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Categorías</h3>
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
            {errors.categories && <p className="text-red-600 text-sm mt-2">{errors.categories}</p>}
          </section>

          {/* Sección: Talles con stock */}
          <section className="rounded-xl border border-black/10 bg-white p-4">
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Talles y stock</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sizes.map(size => {
                const selected = data.sizes.some(s => s.id === size.id);
                const current = data.sizes.find(s => s.id === size.id);
                return (
                  <div key={size.id} className="rounded-md border border-black/10 p-3">
                    <div className="flex items-center justify-between">
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
                          className="ml-3 w-24 rounded-md border border-black/20 bg-white px-2 py-1 text-sm focus:outline-none focus:border-black "
                          placeholder="Stock"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.sizes && <p className="text-red-600 text-sm mt-2">{errors.sizes}</p>}
          </section>

          {/* Sección: Colores */}
          <section className="rounded-xl border border-black/10 bg-white p-4">
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Colores</h3>
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
            {errors.colors && <p className="text-red-600 text-sm mt-2">{errors.colors}</p>}
          </section>

          {/* Sección: Imágenes */}
          <section>
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Imágenes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-xl border border-black/10 bg-white p-4">
                  <label className="block text-sm font-medium text-neutral-800">Imagen {i}</label>
                  <input
                    type="file"
                    name={`image_${i}`}
                    accept="image/*"
                    onChange={handleChange}
                    className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-white file:hover:bg-neutral-800 file:transition"
                  />
                  {errors[`image_${i}`] && (
                    <p className="text-red-600 text-sm mt-2">{errors[`image_${i}`]}</p>
                  )}
                  {imagePreviews[`image_${i}`] && (
                    <div className="mt-3 overflow-hidden rounded-md border border-black/10">
                      <img
                        src={
                          imagePreviews[`image_${i}`].startsWith('blob:')
                            ? imagePreviews[`image_${i}`]
                            : `/images/products/${imagePreviews[`image_${i}`].replace(/^.*[\\/]/, '')}`
                        }
                        alt={`Preview ${i}`}
                        className="h-72 w-full object-cover" // altura aumentada
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
            <Link
              href={route('products.index')}
              className="hidden w-full sm:w-auto sm:inline-flex px-4 py-2.5 rounded-md text-center border border-black text-black hover:bg-black hover:text-white transition"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="block w-full sm:w-auto sm:inline-flex px-5 py-2.5 rounded-md bg-black text-white hover:bg-white hover:text-black border border-black transition"
            >
              Crear Producto
            </button>
            <Link
              href={route('products.index')}
              className="block w-full sm:w-auto sm:hidden px-4 py-2.5 rounded-md text-center border border-black text-black hover:bg-black hover:text-white transition"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}