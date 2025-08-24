import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ pendingOrders, dispatchedOrders }) {
    // Render de paginación reutilizable
    const Pagination = ({ links }) => (
        <div className="mt-4 flex flex-wrap gap-1">
            {links.map((l, i) => {
                if (!l.url) {
                    return (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs rounded border border-neutral-200 text-neutral-400 cursor-not-allowed"
                            dangerouslySetInnerHTML={{ __html: l.label }}
                        />
                    );
                }
                return (
                    <Link
                        key={i}
                        href={l.url}
                        className={`px-3 py-1 text-xs rounded border transition ${
                            l.active
                                ? 'bg-black text-white border-black'
                                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                        dangerouslySetInnerHTML={{ __html: l.label }}
                    />
                );
            })}
        </div>
    );

    const TableBlock = ({ title, collection }) => (
        <div className="overflow-hidden bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl">
            <div className="p-4 border-b border-black/10">
                <h3 className="font-semibold text-black">{title}</h3>
                <p className="text-xs text-neutral-600">
                    {collection.total} registro(s) (mostrando {collection.from || 0}-{collection.to || 0})
                </p>
            </div>
            <div className="p-4">
                {collection.data.length ? (
                    <>
                        <table className="min-w-full divide-y divide-black/10 table-fixed">
                            <thead className="bg-white">
                                <tr>
                                    <th className="w-2/6 px-4 py-2 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="w-2/6 px-4 py-2 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="w-1/6 px-4 py-2 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-black/10">
                                {collection.data.map(order => (
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
                        <Pagination links={collection.links} />
                    </>
                ) : (
                    <p className="text-sm text-neutral-500">Sin registros.</p>
                )}
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-black">Órdenes</h2>
                {/* eliminado selector de filtro */}
                </div>
            }
        >
            <Head title="Órdenes" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
                    <TableBlock title="Pendientes" collection={pendingOrders} />
                    <TableBlock title="Despachadas" collection={dispatchedOrders} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}