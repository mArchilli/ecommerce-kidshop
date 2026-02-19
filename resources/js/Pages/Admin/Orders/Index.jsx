import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

// ─── DATOS DE MUESTRA (hardcodeados para previsualización) ───────────────────
const DEMO_PENDING = {
    total: 1,
    from: 1,
    to: 1,
    links: [],
    data: [
        {
            id: 101,
            total: '18500.00',
            created_at: '2026-02-18T14:32:00.000Z',
            shipping_method: 'Envio a Domicilio',
            province: 'Buenos Aires',
            city: 'La Plata',
            courier_company: 'Andreani',
            payment_id: 'MP-98765432',
            user: { name: 'Lucas Fernández', email: 'lucas@ejemplo.com' },
        },
    ],
};

const DEMO_DISPATCHED = {
    total: 1,
    from: 1,
    to: 1,
    links: [],
    data: [
        {
            id: 87,
            total: '43250.00',
            created_at: '2026-02-10T09:15:00.000Z',
            shipping_method: 'Envio a Sucursal',
            province: 'Córdoba',
            city: 'Villa Carlos Paz',
            courier_company: 'Correo Argentino',
            payment_id: 'MP-12345678',
            user: { name: 'Valentina Gómez', email: 'valen@ejemplo.com' },
        },
    ],
};
// ─────────────────────────────────────────────────────────────────────────────

export default function Index({ pendingOrders: pendingProp, dispatchedOrders: dispatchedProp, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [month, setMonth] = useState(filters?.month || '');
    const [year, setYear] = useState(filters?.year || '');

    // Usar datos reales si existen, si no los demo
    const pendingOrders   = (pendingProp?.data?.length   ? pendingProp   : DEMO_PENDING);
    const dispatchedOrders = (dispatchedProp?.data?.length ? dispatchedProp : DEMO_DISPATCHED);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.orders.index'),
            { search, month, year },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setMonth('');
        setYear('');
        router.get(route('admin.orders.index'), {}, { preserveState: true });
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = [
        { value: '1',  label: 'Enero' },
        { value: '2',  label: 'Febrero' },
        { value: '3',  label: 'Marzo' },
        { value: '4',  label: 'Abril' },
        { value: '5',  label: 'Mayo' },
        { value: '6',  label: 'Junio' },
        { value: '7',  label: 'Julio' },
        { value: '8',  label: 'Agosto' },
        { value: '9',  label: 'Septiembre' },
        { value: '10', label: 'Octubre' },
        { value: '11', label: 'Noviembre' },
        { value: '12', label: 'Diciembre' },
    ];

    // Paginación
    const Pagination = ({ links }) => (
        <div className="mt-5 flex flex-wrap gap-2 justify-center">
            {links.map((l, i) => {
                if (!l.url) {
                    return (
                        <span
                            key={i}
                            className="px-4 py-2 text-xs rounded-xl border-2 border-neutral-200 text-neutral-400 cursor-not-allowed font-semibold"
                            dangerouslySetInnerHTML={{ __html: l.label }}
                        />
                    );
                }
                return (
                    <Link
                        key={i}
                        href={l.url}
                        className={`px-4 py-2 text-xs rounded-xl border-2 font-bold transition hover:scale-105 ${
                            l.active
                                ? 'text-white border-transparent'
                                : 'border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                        style={l.active ? { backgroundColor: '#29C9F4', borderColor: '#29C9F4' } : {}}
                        dangerouslySetInnerHTML={{ __html: l.label }}
                    />
                );
            })}
        </div>
    );

    // Tarjeta de orden individual
    const OrderCard = ({ order, accentColor }) => (
        <div className="bg-white rounded-2xl border-4 border-white shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200 overflow-hidden">
            {/* Header de la tarjeta */}
            <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: accentColor + '22' }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>
                    Orden #{order.id}
                </span>
                <span className="text-xs text-neutral-500 font-semibold">
                    📅 {new Date(order.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
            </div>

            {/* Cuerpo */}
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {/* Cliente */}
                <div className="col-span-2 sm:col-span-1 bg-neutral-50 rounded-xl border-2 border-neutral-200 px-4 py-3">
                    <p className="text-xs text-neutral-500 font-semibold mb-1">👤 Cliente</p>
                    <p className="font-bold text-neutral-900 text-sm leading-tight">{order.user.name}</p>
                    <p className="text-xs text-neutral-400 truncate">{order.user.email}</p>
                </div>

                {/* Total */}
                <div className="bg-neutral-50 rounded-xl border-2 px-4 py-3" style={{ borderColor: '#65DA4D' }}>
                    <p className="text-xs text-neutral-500 font-semibold mb-1">💰 Total</p>
                    <p className="font-bold text-lg" style={{ color: '#3aaa28' }}>
                        ${Number(order.total).toLocaleString('es-AR')}
                    </p>
                </div>

                {/* Método de envío */}
                <div className="bg-neutral-50 rounded-xl border-2 px-4 py-3" style={{ borderColor: '#29C9F4' }}>
                    <p className="text-xs text-neutral-500 font-semibold mb-1">🚚 Envío</p>
                    <p className="font-bold text-neutral-900 text-sm leading-tight">{order.shipping_method || '—'}</p>
                    {order.courier_company && (
                        <p className="text-xs text-neutral-500 mt-0.5">{order.courier_company}</p>
                    )}
                </div>

                {/* Localidad */}
                <div className="bg-neutral-50 rounded-xl border-2 px-4 py-3" style={{ borderColor: '#FFB800' }}>
                    <p className="text-xs text-neutral-500 font-semibold mb-1">📍 Destino</p>
                    <p className="font-bold text-neutral-900 text-sm leading-tight">{order.city || '—'}</p>
                    <p className="text-xs text-neutral-500">{order.province || ''}</p>
                </div>

                {/* Acción */}
                <div className="flex items-center justify-center">
                    <Link
                        href={route('orders.show', order.id)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition shadow-md text-sm w-full justify-center"
                        style={{ backgroundColor: '#9B59B6' }}
                    >
                        👁️ Ver
                    </Link>
                </div>
            </div>
        </div>
    );

    // Bloque de sección (Pendientes / Despachadas)
    const SectionBlock = ({ title, collection, accentColor, emoji }) => (
        <div className="overflow-hidden bg-white rounded-2xl border-4 border-white shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b-4 border-white" style={{ backgroundColor: accentColor }}>
                <div>
                    <h3 className="font-bold text-white text-xl">{emoji} {title}</h3>
                    <p className="text-sm text-white/90 mt-0.5">
                        {collection.total} registro(s)
                        {collection.from ? ` · mostrando ${collection.from}–${collection.to}` : ''}
                    </p>
                </div>
                <div className="bg-white/20 rounded-xl px-4 py-2">
                    <span className="text-white font-black text-2xl">{collection.total}</span>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-5 space-y-4">
                {collection.data.length ? (
                    <>
                        {collection.data.map(order => (
                            <OrderCard key={order.id} order={order} accentColor={accentColor} />
                        ))}
                        {collection.links?.length > 0 && <Pagination links={collection.links} />}
                    </>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-5xl mb-3">📭</p>
                        <p className="text-base text-neutral-500 font-semibold">Sin registros en esta sección.</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-black">📦 Gestión de Órdenes</h2>
                </div>
            }
        >
            <Head title="Órdenes" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">

                    {/* ── Filtros ─────────────────────────────────────── */}
                    <div className="bg-white rounded-2xl shadow-lg border-4 border-white overflow-hidden">
                        <div className="px-6 py-4 border-b-4 border-white" style={{ backgroundColor: '#29C9F4' }}>
                            <h3 className="text-lg font-bold text-white">🔍 Buscar y Filtrar Órdenes</h3>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSearch} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <label htmlFor="search" className="block text-sm font-bold text-neutral-700 mb-2">
                                            Nombre, email, DNI o ID de pago
                                        </label>
                                        <input
                                            type="text"
                                            id="search"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Buscar..."
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="month" className="block text-sm font-bold text-neutral-700 mb-2">
                                            Mes
                                        </label>
                                        <select
                                            id="month"
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition font-medium"
                                        >
                                            <option value="">Todos</option>
                                            {months.map((m) => (
                                                <option key={m.value} value={m.value}>{m.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="year" className="block text-sm font-bold text-neutral-700 mb-2">
                                            Año
                                        </label>
                                        <select
                                            id="year"
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition font-medium"
                                        >
                                            <option value="">Todos</option>
                                            {years.map((y) => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-1">
                                    <button
                                        type="submit"
                                        className="px-7 py-3 text-white font-bold rounded-xl hover:scale-105 transform transition shadow-md"
                                        style={{ backgroundColor: '#29C9F4' }}
                                    >
                                        🔍 Buscar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="px-7 py-3 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200 hover:scale-105 transform transition border-2 border-neutral-200"
                                    >
                                        🔄 Limpiar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* ── Órdenes Pendientes ───────────────────────────── */}
                    <SectionBlock
                        title="Órdenes Pendientes"
                        collection={pendingOrders}
                        accentColor="#FFB800"
                        emoji="⏳"
                    />

                    {/* ── Órdenes Despachadas ──────────────────────────── */}
                    <SectionBlock
                        title="Órdenes Despachadas"
                        collection={dispatchedOrders}
                        accentColor="#65DA4D"
                        emoji="✅"
                    />

                </div>
            </div>
        </AuthenticatedLayout>
    );
}