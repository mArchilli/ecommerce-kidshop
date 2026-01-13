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

    const TableBlock = ({ title, collection }) => {
        const isPending = title === 'Pendientes';
        const bgColor = isPending ? '#FFB800' : '#65DA4D';
        const emoji = isPending ? '⏳' : '✅';
        
        return (
            <div className="overflow-hidden bg-white rounded-2xl border-4 border-white shadow-lg transform hover:scale-[1.01] transition-transform">
                <div className="p-6 border-b-4 border-white" style={{ backgroundColor: bgColor }}>
                    <h3 className="font-bold text-white text-xl">{emoji} {title}</h3>
                    <p className="text-sm text-white/90 mt-1">
                        {collection.total} registro(s) (mostrando {collection.from || 0}-{collection.to || 0})
                    </p>
                </div>
            <div className="p-4">
                {collection.data.length ? (
                    <>
                        <table className="min-w-full divide-y divide-neutral-200 table-fixed">
                            <thead style={{ backgroundColor: '#f8f9fa' }}>
                                <tr>
                                    <th className="w-2/6 px-6 py-4 text-left text-sm font-bold text-neutral-700 uppercase tracking-wider">
                                        👤 Cliente
                                    </th>
                                    <th className="w-1/6 px-6 py-4 text-left text-sm font-bold text-neutral-700 uppercase tracking-wider">
                                        💰 Total
                                    </th>
                                    <th className="w-2/6 px-6 py-4 text-left text-sm font-bold text-neutral-700 uppercase tracking-wider">
                                        📅 Fecha
                                    </th>
                                    <th className="w-1/6 px-6 py-4 text-left text-sm font-bold text-neutral-700 uppercase tracking-wider">
                                        ⚡ Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-neutral-200">
                                {collection.data.map(order => (
                                    <tr key={order.id} className="hover:bg-neutral-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-neutral-900">
                                            {order.user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-green-600">
                                            ${order.total}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Link
                                                href={route('orders.show', order.id)}
                                                className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md"
                                                style={{ backgroundColor: '#29C9F4' }}
                                            >
                                                👁️ Ver Detalles
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={collection.links} />
                    </>
                ) : (
                    <p className="text-base text-neutral-500 font-semibold py-4">📭 Sin registros.</p>
                )}
            </div>
        </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-black">📦 Órdenes</h2>
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