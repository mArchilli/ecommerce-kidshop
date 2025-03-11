import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';

const Cart = ({ cart }) => {
  // Estado local para controlar las cantidades en el input.
  const [quantities, setQuantities] = useState(
    cart.items.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const handleQuantityChange = (itemId, value) => {
    setQuantities({
      ...quantities,
      [itemId]: value,
    });
  };

  // Función para actualizar cantidad individual (si lo requieres)
  const updateQuantity = (itemId) => {
    const newQuantity = quantities[itemId];
    console.log('Actualizando cantidad:', itemId, newQuantity);
    Inertia.put(
      `/cart/update/${itemId}`,
      { quantity: newQuantity },
      { preserveScroll: true, preserveState: true }
    );
  };

  // Función para actualizar todas las cantidades a la vez.
  const updateAll = () => {
    console.log('Actualizando todas las cantidades:', quantities);
    Inertia.put(
      '/cart/update-all',
      { quantities },
      { preserveScroll: true, preserveState: true }
    );
  };

  return (
    <EcommerceLayout>
      <Head title="Carrito de Compras" />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
        {cart && cart.items.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="quantity"
                        value={quantities[item.id]}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        onBlur={() => updateQuantity(item.id)}
                        className="w-16 p-2 border rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${Number(item.product.price).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${(
                          item.product.price * quantities[item.id]
                        ).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/cart/remove/${item.id}`}
                        method="delete"
                        as="button"
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Botón para actualizar todas las cantidades de una vez */}
            <div className="p-4 text-right space-x-4">
              <button
                onClick={updateAll}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Actualizar Carrito
              </button>
            </div>
            <div className="p-4 text-right">
              <h3 className="text-xl font-bold">
                Total: $
                {cart.items
                  .reduce(
                    (total, item) =>
                      total + item.product.price * quantities[item.id],
                    0
                  )
                  .toFixed(2)}
              </h3>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-8">
            No hay productos en el carrito.
          </p>
        )}
      </div>
    </EcommerceLayout>
  );
};

export default Cart;