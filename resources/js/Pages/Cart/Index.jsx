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

  // Vaciar el carrito: elimina todos los productos del carrito
  const clearCart = () => {
    Inertia.delete(
      route('cart.clear'),
      {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => router.visit(route('cart.index')),
      }
    );
  };

  const handleGoBack = () => {
    router.visit(route('welcome'));
  };

  // Subtotal del carrito
  const subtotal =
    cart?.items?.reduce(
      (total, item) => total + item.unit_price * (parseInt(quantities[item.id] || 0, 10)),
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

      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Mi Carrito
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Revisa tus productos antes de finalizar la compra
            </p>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      className="bg-white/80 backdrop-blur-sm border-2 border-pink-200 rounded-2xl p-6 my-2 flex items-center gap-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      <img
                        src={
                          item.product.images && item.product.images.length > 0
                            ? getImageSrc(item.product.images[0])
                            : '/placeholder.svg'
                        }
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-xl border-2 border-pink-200 shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-bold text-gray-900">
                            {item.product.name}
                          </h3>
                          <Link
                            href={`/cart/remove/${item.id}`}
                            method="delete"
                            as="button"
                            aria-label="Eliminar"
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white w-9 h-9 rounded-full inline-flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m1 0l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6m5 4v8m4-8v8" />
                            </svg>
                          </Link>
                        </div>

                        <div className="mt-3 grid grid-cols-12 items-center gap-4">
                          {/* Precio unitario */}
                          <div className="col-span-3">
                            <div className="text-sm font-semibold text-purple-600">Precio</div>
                            {item.unit_price < item.product.price ? (
                              <div className="flex flex-col">
                                <div className="text-sm font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                  ${Number(item.unit_price).toLocaleString('es-AR')}
                                </div>
                                <div className="text-xs text-gray-500 line-through">
                                  ${Number(item.product.price).toLocaleString('es-AR')}
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm font-bold text-gray-900">
                                ${Number(item.unit_price).toLocaleString('es-AR')}
                              </div>
                            )}
                          </div>

                          {/* Controles de cantidad */}
                          <div className="col-span-5">
                            <div className="text-sm font-semibold text-purple-600 text-center">Cantidad</div>
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-center select-none bg-white/70 px-4 py-2 rounded-lg border-2 border-pink-200 font-bold">
                                {quantities[item.id]}
                              </span>
                            </div>
                          </div>

                          {/* Total por ítem */}
                          <div className="col-span-4 text-right">
                            <div className="text-sm font-semibold text-purple-600">Total</div>
                            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                              ${(item.unit_price * (parseInt(quantities[item.id] || 0, 10))).toLocaleString('es-AR')}
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
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-pink-200 p-6 md:sticky top-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">Resumen</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between bg-white/70 px-4 py-3 rounded-lg border border-pink-200">
                      <span className="text-purple-600 font-semibold">Subtotal</span>
                      <span className="font-bold text-gray-900">${subtotal.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="flex justify-between bg-white/70 px-4 py-3 rounded-lg border border-pink-200">
                      <span className="text-purple-600 font-semibold">Envío</span>
                      <span className="font-medium text-gray-700">Se calcula en el checkout</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-cyan-100 border-2 border-cyan-300 rounded-xl px-4 py-4 flex justify-between text-base">
                      <span className="font-bold text-purple-700">Total</span>
                      <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">${subtotal.toLocaleString('es-AR')}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-5 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Vaciar carrito
                    </button>
                    <Link
                      href="/checkout"
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-5 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                    >
                      Continuar
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-pink-200 p-12 max-w-2xl mx-auto">
              <svg
                className="w-32 h-32 mx-auto text-purple-300 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Tu carrito está vacío
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                ¡Descubre nuestros productos y comienza a agregar al carrito!
              </p>
              <Link
                href={route('catalog.index')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explorar productos
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}
        </div>
      </div>
    </EcommerceLayout>
  );
};

export default Cart;