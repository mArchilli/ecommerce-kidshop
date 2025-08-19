import React, { useEffect, useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ orders }) {
    useEffect(() => {
    }, [orders]);

    const [statusFilter, setStatusFilter] = useState('all');

    const groupedOrders = useMemo(() => ({
        pending: orders.filter(o => o.shipping_status === 'pending'),
        dispatched: orders.filter(o => o.shipping_status === 'dispatched'),
        delivered: orders.filter(o => o.shipping_status === 'delivered'),
    }), [orders]);

    const statusesToRender = statusFilter === 'all'
        ? ['pending', 'dispatched', 'delivered']
        : [statusFilter];

    const titles = {
        pending: 'Pendientes',
        dispatched: 'Despachadas',
        delivered: 'Entregadas',
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-black">
                        Órdenes
                    </h2>
                    <div className="flex items-center gap-3">
                        <label htmlFor="status" className="text-sm text-neutral-700">Filtrar</label>
                        <select
                            id="status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="rounded-lg border border-black/20 bg-white px-3 py-2 text-sm focus:outline-none focus:border-black"
                        >
                            <option value="all">Todas</option>
                            <option value="pending">Pendientes</option>
                            <option value="dispatched">Despachadas</option>
                            <option value="delivered">Entregadas</option>
                        </select>
                    </div>
                </div>
            }
        >
            <Head title="Órdenes" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Contenedores por estado */}
                    <div className={`grid grid-cols-1 ${statusFilter === 'all' ? 'lg:grid-cols-3' : ''} gap-6`}>
                        {statusesToRender.map((status) => {
                            const list = groupedOrders[status] || [];
                            return (
                                <div key={status} className="overflow-hidden bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl">
                                    <div className="p-4 border-b border-black/10">
                                        <h3 className="font-semibold text-black">{titles[status]}</h3>
                                        <p className="text-xs text-neutral-600">{list.length} orden(es)</p>
                                    </div>
                                    <div className="p-4">
                                        {list.length > 0 ? (
                                            <table className="min-w-full divide-y divide-black/10 table-fixed">
                                                <thead className="bg-white">
                                                    <tr>
                                                        <th className="w-2/6 px-4 py-2 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Cliente</th>
                                                        <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Total</th>
                                                        <th className="w-2/6 px-4 py-2 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Fecha</th>
                                                        <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-black/10">
                                                    {list.map((order) => (
                                                        <tr key={order.id}>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">
                                                                {order.user.name}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                                                                ${order.total}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-700">
                                                                {new Date(order.created_at).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                                <Link
                                                                    href={route('orders.show', order.id)}
                                                                    className="inline-flex items-center px-3 py-1.5 rounded-md border border-black text-black hover:bg-black hover:text-white transition text-xs"
                                                                >
                                                                    Ver Detalles
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="text-sm text-neutral-500">Sin órdenes {titles[status].toLowerCase()}.</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}