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
                        className="inline-flex items-center px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition"
                    >
                        ← Volver a Órdenes
                    </Link>
                    <h2 className="text-xl font-semibold text-black">Orden #{order.id}</h2>
                </div>
            }
        >
            <Head title={`Orden #${order.id}`} />

            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Información de envío */}
                <section className="bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Información de Envío</h3>
                    {order.shipping_method === 'Retirar en el local' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-800">
                            <p><strong>Método de Envío:</strong> {order.shipping_method}</p>
                            <p><strong>DNI:</strong> {resolveDni(order)}</p>
                            <p><strong>Nombre del Cliente:</strong> {order.user.name}</p>
                            <p><strong>Correo Electrónico:</strong> {order.user.email}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-800">
                            <p><strong>Método de Envío:</strong> {order.shipping_method}</p>
                            <p><strong>DNI:</strong> {resolveDni(order)}</p>
                            <p><strong>Nombre del Cliente:</strong> {order.user.name}</p>
                            <p><strong>Correo Electrónico:</strong> {order.user.email}</p>
                            <p><strong>Provincia:</strong> {order.province}</p>
                            <p><strong>Localidad:</strong> {order.city}</p>
                            <p><strong>Código Postal:</strong> {order.postal_code}</p>
                            <p><strong>Dirección:</strong> {order.address}</p>
                            <p><strong>Teléfono:</strong> {order.phone}</p>
                        </div>
                    )}
                </section>

                {/* Resumen de productos */}
                <section className="bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl p-6 mt-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Resumen de Productos</h3>
                    <div className="space-y-4">
                        {order.items.map((item) => {
                            const size = resolveItemSize(item);
                            const unitPrice = item.price ?? item.product?.price ?? 0;
                            const subtotal = unitPrice * item.quantity;
                            const firstImage = item.product?.images && item.product.images.length > 0 ? item.product.images[0] : null;
                            const imgSrc = firstImage ? (firstImage.startsWith('images/') ? `/${firstImage}` : `/images/${firstImage}`) : '/placeholder.svg';
                            return (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-4 rounded-xl border border-black/10 bg-white p-4 shadow-sm">
                                    <div className="shrink-0">
                                        <img
                                            src={imgSrc}
                                            alt={item.product?.name}
                                            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg border"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-semibold text-black text-lg leading-snug mb-1">{item.product?.name}</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs sm:text-sm mt-2">
                                                <div className="rounded-md border border-black/10 bg-neutral-50 px-3 py-2">
                                                    <p className="text-neutral-500">Cantidad</p>
                                                    <p className="font-medium text-neutral-900">{item.quantity}</p>
                                                </div>
                                                <div className="rounded-md border border-black/10 bg-neutral-50 px-3 py-2">
                                                    <p className="text-neutral-500">Talle</p>
                                                    <p className="font-medium text-neutral-900">{size}</p>
                                                </div>
                                                <div className="rounded-md border border-black/10 bg-neutral-50 px-3 py-2">
                                                    <p className="text-neutral-500">Precio Unit.</p>
                                                    <p className="font-medium text-neutral-900">${unitPrice.toLocaleString('es-AR')}</p>
                                                </div>
                                                <div className="rounded-md border border-black/10 bg-neutral-50 px-3 py-2">
                                                    <p className="text-neutral-500">Subtotal</p>
                                                    <p className="font-medium text-neutral-900">${subtotal.toLocaleString('es-AR')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 flex justify-end">
                        <div className="w-full sm:w-auto rounded-xl border border-black/10 bg-neutral-900 text-white px-6 py-4 flex items-center justify-between gap-8">
                            <span className="text-sm font-medium tracking-wide">Total de la Compra</span>
                            <span className="text-lg font-semibold">${Number(order.total).toLocaleString('es-AR')}</span>
                        </div>
                    </div>
                </section>

                {/* Estado del envío */}
                <section className="bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl p-6 mt-6">
                    <h3 className="text-lg font-semibold text-black mb-2">Estado del Envío</h3>
                    <p className="mb-4 text-sm text-neutral-800">
                        <strong>Estado Actual:</strong>{' '}
                        {order.shipping_status === 'pending' && 'Pendiente'}
                        {order.shipping_status === 'dispatched' && 'Despachado'}
                        {order.shipping_status === 'delivered' && 'Entregado'}
                    </p>

                    <div className="flex flex-wrap gap-3">
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
                                    className="inline-flex items-center px-4 py-2 rounded-lg border border-black text-black transition hover:bg-yellow-100"
                                >
                                    Marcar como Pendiente
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
                                    className="inline-flex items-center px-4 py-2 rounded-lg border border-black text-black transition hover:bg-blue-100"
                                >
                                    Marcar como Despachado
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