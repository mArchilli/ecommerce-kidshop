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
                    <p><strong>Nombre del Cliente:</strong> {order.user.name}</p>
                    <p><strong>Correo Electrónico:</strong> {order.user.email}</p>
                    <p><strong>Provincia:</strong> {order.province}</p>
                    <p><strong>Localidad:</strong> {order.city}</p>
                    <p><strong>Código Postal:</strong> {order.postal_code}</p>
                    <p><strong>Dirección:</strong> {order.address}</p>
                    <p><strong>Teléfono:</strong> {order.phone}</p>
                    <p><strong>Método de Envío:</strong> {order.shipping_method}</p>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold mb-4">Resumen de Productos</h2>
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
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
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {order.items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${item.product.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        ${item.quantity * item.product.price}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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