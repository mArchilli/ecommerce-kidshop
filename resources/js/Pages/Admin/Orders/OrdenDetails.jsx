import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const OrderDetails = ({ order }) => {
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-neutral-800">
                        <p><strong>Nombre del Cliente:</strong> {order.user.name}</p>
                        <p><strong>Correo Electrónico:</strong> {order.user.email}</p>
                        <p><strong>Provincia:</strong> {order.province}</p>
                        <p><strong>Localidad:</strong> {order.city}</p>
                        <p><strong>Código Postal:</strong> {order.postal_code}</p>
                        <p><strong>Dirección:</strong> {order.address}</p>
                        <p><strong>Teléfono:</strong> {order.phone}</p>
                        <p><strong>Método de Envío:</strong> {order.shipping_method}</p>
                    </div>
                </section>

                {/* Resumen de productos */}
                <section className="bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl p-6 mt-6">
                    <h3 className="text-lg font-semibold text-black mb-4">Resumen de Productos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.items.map((item) => {
                            const total = item.quantity * item.product.price;
                            return (
                                <div key={item.id} className="rounded-xl border border-black/10 bg-white p-4">
                                    <div className="flex items-baseline justify-between">
                                        <h4 className="font-semibold text-black">{item.product.name}</h4>
                                        <span className="text-sm text-neutral-700">${item.product.price}</span>
                                    </div>
                                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                        <div className="rounded-lg border border-black/10 bg-white p-2">
                                            <p className="text-neutral-500">Cantidad</p>
                                            <p className="font-medium text-neutral-900">{item.quantity}</p>
                                        </div>
                                        <div className="rounded-lg border border-black/10 bg-white p-2">
                                            <p className="text-neutral-500">Total</p>
                                            <p className="font-medium text-neutral-900">${total}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
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
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
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
                        {order.shipping_status !== 'delivered' && (
                            <form
                                method="POST"
                                action={route('orders.updateShippingStatus', order.id)}
                                className="inline"
                            >
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                                <input type="hidden" name="_method" value="PUT" />
                                <input type="hidden" name="shipping_status" value="delivered" />
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 rounded-lg border border-black text-black transition hover:bg-green-100"
                                >
                                    Marcar como Entregado
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