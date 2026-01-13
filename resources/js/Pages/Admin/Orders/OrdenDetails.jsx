import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const resolveDni = (order) =>
    order?.dni ||
    order?.user?.dni ||
    order?.user?.profile?.dni ||
    order?.billing_dni ||
    '—';

const resolveItemSize = (item) =>
    item?.size ||
    item?.pivot?.size ||
    item?.selected_size ||
    item?.size_selected ||
    item?.product_size ||
    '—';

const OrderDetails = ({ order, csrf_token }) => {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <Link
                        href={route('admin.orders.index')}
                        className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                        style={{ backgroundColor: '#9B59B6' }}
                    >
                        ← Volver a Órdenes
                    </Link>
                    <h2 className="text-xl font-semibold text-black">📦 Orden #{order.id}</h2>
                </div>
            }
        >
            <Head title={`Orden #${order.id}`} />

            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Información de envío */}
                <section className="bg-white rounded-2xl border-4 border-white shadow-lg p-6">
                    <div className="mb-6 pb-4 border-b-4 border-white rounded-xl p-4" style={{ backgroundColor: '#29C9F4' }}>
                        <h3 className="text-2xl font-bold text-white">🚚 Información de Envío</h3>
                    </div>
                    {order.shipping_method === 'Retirar en el local' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-neutral-800">
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">📦 Método de Envío:</strong> <span className="font-bold">{order.shipping_method}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">🆔 DNI:</strong> <span className="font-bold">{resolveDni(order)}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">👤 Nombre del Cliente:</strong> <span className="font-bold">{order.user.name}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">📧 Correo Electrónico:</strong> <span className="font-bold">{order.user.email}</span></p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base text-neutral-800">
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">📦 Método de Envío:</strong> <span className="font-bold">{order.shipping_method}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">🆔 DNI:</strong> <span className="font-bold">{resolveDni(order)}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">👤 Nombre del Cliente:</strong> <span className="font-bold">{order.user.name}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">📧 Correo Electrónico:</strong> <span className="font-bold">{order.user.email}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">🗺️ Provincia:</strong> <span className="font-bold">{order.province}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">🏘️ Localidad:</strong> <span className="font-bold">{order.city}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">📮 Código Postal:</strong> <span className="font-bold">{order.postal_code}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">🏠 Dirección:</strong> <span className="font-bold">{order.address}</span></p>
                            <p className="bg-neutral-50 p-4 rounded-xl border-2 border-neutral-200"><strong className="text-neutral-600">📞 Teléfono:</strong> <span className="font-bold">{order.phone}</span></p>
                        </div>
                    )}
                </section>

                {/* Resumen de productos */}
                <section className="bg-white rounded-2xl border-4 border-white shadow-lg p-6 mt-6">
                    <div className="mb-6 pb-4 border-b-4 border-white rounded-xl p-4" style={{ backgroundColor: '#65DA4D' }}>
                        <h3 className="text-2xl font-bold text-white">🛍️ Resumen de Productos</h3>
                    </div>
                    <div className="space-y-4">
                        {order.items.map((item) => {
                            const size = resolveItemSize(item);
                            const unitPrice = item.price ?? item.product?.price ?? 0;
                            const subtotal = unitPrice * item.quantity;
                            const firstImage = item.product?.images && item.product.images.length > 0 ? item.product.images[0] : null;
                            const imgSrc = firstImage ? (firstImage.startsWith('images/') ? `/${firstImage}` : `/images/${firstImage}`) : '/placeholder.svg';
                            return (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-4 rounded-2xl border-4 border-white bg-gradient-to-r from-neutral-50 to-white p-6 shadow-lg hover:scale-[1.02] transform transition">
                                    <div className="shrink-0">
                                        <img
                                            src={imgSrc}
                                            alt={item.product?.name}
                                            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border-4 border-white shadow-md"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-bold text-black text-xl leading-snug mb-3">{item.product?.name}</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm sm:text-base mt-3">
                                                <div className="rounded-xl border-3 bg-white px-4 py-3 shadow-sm" style={{ borderColor: '#29C9F4', borderWidth: '3px' }}>
                                                    <p className="text-neutral-500 font-semibold text-xs">📦 Cantidad</p>
                                                    <p className="font-bold text-neutral-900 text-lg">{item.quantity}</p>
                                                </div>
                                                <div className="rounded-xl border-3 bg-white px-4 py-3 shadow-sm" style={{ borderColor: '#FFB800', borderWidth: '3px' }}>
                                                    <p className="text-neutral-500 font-semibold text-xs">📏 Talle</p>
                                                    <p className="font-bold text-neutral-900 text-lg">{size}</p>
                                                </div>
                                                <div className="rounded-xl border-3 bg-white px-4 py-3 shadow-sm" style={{ borderColor: '#65DA4D', borderWidth: '3px' }}>
                                                    <p className="text-neutral-500 font-semibold text-xs">💵 Precio Unit.</p>
                                                    <p className="font-bold text-green-600 text-lg">${unitPrice.toLocaleString('es-AR')}</p>
                                                </div>
                                                <div className="rounded-xl border-3 bg-white px-4 py-3 shadow-sm" style={{ borderColor: '#FC1C1D', borderWidth: '3px' }}>
                                                    <p className="text-neutral-500 font-semibold text-xs">💰 Subtotal</p>
                                                    <p className="font-bold text-green-600 text-lg">${subtotal.toLocaleString('es-AR')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <div className="w-full sm:w-auto rounded-2xl border-4 border-white text-white px-8 py-6 flex items-center justify-between gap-8 shadow-lg transform hover:scale-105 transition" style={{ backgroundColor: '#9B59B6' }}>
                            <span className="text-lg font-bold tracking-wide">💎 Total de la Compra</span>
                            <span className="text-2xl font-bold">${Number(order.total).toLocaleString('es-AR')}</span>
                        </div>
                    </div>
                </section>

                {/* Estado del envío */}
                <section className="bg-white rounded-2xl border-4 border-white shadow-lg p-6 mt-6">
                    <div className="mb-6 pb-4 border-b-4 border-white rounded-xl p-4" style={{ backgroundColor: '#FC1C1D' }}>
                        <h3 className="text-2xl font-bold text-white">📊 Estado del Envío</h3>
                    </div>
                    <div className="mb-6 p-6 rounded-xl border-4" style={{ borderColor: order.shipping_status === 'pending' ? '#FFB800' : order.shipping_status === 'dispatched' ? '#29C9F4' : '#65DA4D', backgroundColor: order.shipping_status === 'pending' ? '#FFF9E6' : order.shipping_status === 'dispatched' ? '#E6F7FF' : '#E8F8E8' }}>
                        <p className="text-lg font-bold text-neutral-800">
                            <strong>Estado Actual:</strong>{' '}
                            {order.shipping_status === 'pending' && '⏳ Pendiente'}
                            {order.shipping_status === 'dispatched' && '🚚 Despachado'}
                            {order.shipping_status === 'delivered' && '✅ Entregado'}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {order.shipping_status !== 'pending' && (
                            <form
                                method="POST"
                                action={route('orders.updateShippingStatus', order.id)}
                                className="inline"
                            >
                                <input type="hidden" name="_token" value={csrf_token} />
                                <input type="hidden" name="_method" value="PUT" />
                                <input type="hidden" name="shipping_status" value="pending" />
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-white transition hover:scale-105 transform shadow-md"
                                    style={{ backgroundColor: '#FFB800' }}
                                >
                                    ⏳ Marcar como Pendiente
                                </button>
                            </form>
                        )}
                        {order.shipping_status !== 'dispatched' && (
                            <form
                                method="POST"
                                action={route('orders.updateShippingStatus', order.id)}
                                className="inline"
                            >
                                <input type="hidden" name="_token" value={csrf_token} />
                                <input type="hidden" name="_method" value="PUT" />
                                <input type="hidden" name="shipping_status" value="dispatched" />
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-white transition hover:scale-105 transform shadow-md"
                                    style={{ backgroundColor: '#29C9F4' }}
                                >
                                    🚚 Marcar como Despachado
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderDetails;