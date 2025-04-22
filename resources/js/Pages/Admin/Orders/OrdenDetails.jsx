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

                <div className="mt-6">
                    <Link
                        href={route('admin.orders.index')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                        Volver a Órdenes
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderDetails;