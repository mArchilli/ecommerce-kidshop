import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const OrderDetails = ({ order }) => {
    return (
        <AuthenticatedLayout>
            <Head title={`Orden #${order.id}`} />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold mb-6">Detalles de la Orden</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
                    <p><strong>Provincia:</strong> {order.province}</p>
                    <p><strong>Localidad:</strong> {order.city}</p>
                    <p><strong>Código Postal:</strong> {order.postal_code}</p>
                    <p><strong>Dirección:</strong> {order.address}</p>
                    <p><strong>Teléfono:</strong> {order.phone}</p>
                    <p><strong>Método de Envío:</strong> {order.shipping_method}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Estado del Envío</h2>
                    <p className="mb-4">
                        <strong>Estado Actual:</strong> {order.shipping_status === 'pending' && 'Pendiente'}
                        {order.shipping_status === 'dispatched' && 'Despachado'}
                        {order.shipping_status === 'delivered' && 'Entregado'}
                    </p>

                    <div className="flex space-x-4">
                        {order.shipping_status !== 'pending' && (
                            <form
                                method="POST"
                                action={route('orders.updateShippingStatus', order.id)}
                                className="inline"
                            >
                                {/* Agregar el token CSRF */}
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                                <input type="hidden" name="_method" value="PUT" />
                                <input type="hidden" name="shipping_status" value="pending" />
                                <button
                                    type="submit"
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
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
                                {/* Agregar el token CSRF */}
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                                <input type="hidden" name="_method" value="PUT" />
                                <input type="hidden" name="shipping_status" value="dispatched" />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
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
                                {/* Agregar el token CSRF */}
                                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]').getAttribute('content')} />
                                <input type="hidden" name="_method" value="PUT" />
                                <input type="hidden" name="shipping_status" value="delivered" />
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                                >
                                    Marcar como Entregado
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        href={route('admin.orders.index')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                    >
                        Volver a Órdenes
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderDetails;