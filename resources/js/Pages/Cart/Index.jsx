import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link, router } from '@inertiajs/react';

const Cart = ({ cart }) => {
  const [quantities, setQuantities] = useState(
    cart && cart.items
      ? cart.items.reduce((acc, item) => {
          acc[item.id] = item.quantity;
          return acc;
        }, {})
      : {}
  );

  const handleQuantityChange = (itemId, value) => {
    setQuantities({
      ...quantities,
      [itemId]: value,
    });
  };

  const updateQuantity = (itemId, value = null) => {
    const newQuantity = value !== null ? value : quantities[itemId];
    Inertia.put(
      `/cart/update/${itemId}`,
      { quantity: newQuantity },
      { preserveScroll: true, preserveState: true }
    );
  };

  const updateAll = () => {
    Inertia.put(
      '/cart/update-all',
      { quantities },
      { preserveScroll: true, preserveState: true }
    );
  };

  // Vaciar el carrito: setea todas las cantidades a 0 usando updateAll
  const clearCart = () => {
    if (!cart || !cart.items) return;
    const zeros = cart.items.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {});
    Inertia.put(
      route('cart.updateAll'),
      { quantities: zeros },
      {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => router.visit(route('cart.index')),
      }
    );
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.visit(route('catalog.index'));
    }
  };

  // Subtotal del carrito
  const subtotal =
    cart?.items?.reduce(
      (total, item) => total + item.product.price * (parseInt(quantities[item.id] || 0, 10)),
      0
    ) || 0;

  // Función para asegurar el prefijo correcto en la ruta de la imagen
  const getImageSrc = (imgPath) => {
    if (!imgPath) return '/placeholder.svg';
    return imgPath.startsWith('images/') ? `/${imgPath}` : `/images/${imgPath}`;
  };

  return (
    <EcommerceLayout>
      <Head title="Carrito de Compras" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header responsive: botón izq + título centrado (mobile),
           y título izq + botón der (desktop) */}
        <div className="mb-6 relative h-12 md:h-auto md:flex md:items-center md:justify-between">
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-center md:static md:translate-x-0 md:translate-y-0 md:text-left">
            Carrito
          </h1>
          <button
            onClick={handleGoBack}
            className="absolute left-0 top-1/2 -translate-y-1/2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 md:static md:translate-y-0 md:ml-auto"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
        </div>

        {cart && cart.items && cart.items.length > 0 ? (
          <>
            <div className="grid md:grid-cols-12 gap-6">
              {/* Columna izquierda: Ítems */}
              <section className="md:col-span-8 flex flex-col gap-4">
                {/* Vista DESKTOP: tarjetas con mejor estilo */}
                <div className="md:flex md:flex-col md:gap-4">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border rounded-lg p-4 my-2 flex items-center gap-4 hover:shadow-md transition"
                    >
                      <img
                        src={
                          item.product.images && item.product.images.length > 0
                            ? getImageSrc(item.product.images[0])
                            : '/placeholder.svg'
                        }
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-md border"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-semibold text-gray-900">
                            {item.product.name}
                          </h3>
                          <Link
                            href={`/cart/remove/${item.id}`}
                            method="delete"
                            as="button"
                            aria-label="Eliminar"
                            className="bg-red-500 text-white w-9 h-9 rounded-md hover:bg-red-600 inline-flex items-center justify-center"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m1 0l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5 4v8m4-8v8" />
                            </svg>
                          </Link>
                        </div>

                        <div className="mt-3 grid grid-cols-12 items-center gap-4">
                          {/* Precio unitario */}
                          <div className="col-span-3">
                            <div className="text-sm text-gray-600">Precio</div>
                            <div className="text-sm font-medium text-gray-900">
                              ${Number(item.product.price).toFixed(2)}
                            </div>
                          </div>

                          {/* Controles de cantidad */}
                          <div className="col-span-5">
                            <div className="text-sm text-gray-600 text-center">Cantidad</div>
                            <div className="mt-1 flex items-center justify-center gap-2">
                              <button
                                type="button"
                                aria-label="Disminuir cantidad"
                                onClick={() => {
                                  const current = parseInt(quantities[item.id] || 1, 10);
                                  const newQty = Math.max(1, current - 1);
                                  setQuantities({ ...quantities, [item.id]: newQty });
                                  updateQuantity(item.id, newQty);
                                }}
                                className="w-14 h-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                name="quantity"
                                value={quantities[item.id]}
                                min="1"
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                onBlur={() => updateQuantity(item.id)}
                                className="w-20 p-2 border rounded-md text-center"
                              />
                              <button
                                type="button"
                                aria-label="Aumentar cantidad"
                                onClick={() => {
                                  const current = parseInt(quantities[item.id] || 1, 10);
                                  const newQty = current + 1;
                                  setQuantities({ ...quantities, [item.id]: newQty });
                                  updateQuantity(item.id, newQty);
                                }}
                                className="w-14 h-7 rounded-md border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Total por ítem */}
                          <div className="col-span-4 text-right">
                            <div className="text-sm text-gray-600">Total</div>
                            <div className="text-base font-semibold text-gray-900">
                              ${(item.product.price * (parseInt(quantities[item.id] || 0, 10))).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Columna derecha: Resumen */}
              <aside className="md:col-span-4">
                <div className="bg-white rounded-lg shadow p-6 md:sticky top-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Envío</span>
                      <span className="font-medium">Se calcula en el checkout</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 text-center"
                    >
                      Vaciar carrito
                    </button>
                    <Link
                      href="/checkout"
                      className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border border-black transition duration-300 text-center"
                    >
                      Continuar
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </>
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