import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ users, filters, stats }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [filter, setFilter] = useState(filters?.filter || 'all');
    const [confirmUserId, setConfirmUserId] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search, filter }, { preserveState: true, preserveScroll: true });
    };

    const handleFilterChange = (value) => {
        setFilter(value);
        router.get(route('admin.users.index'), { search, filter: value }, { preserveState: true, preserveScroll: true });
    };

    const handleVerify = (userId) => {
        router.post(
            route('admin.users.verify', userId),
            {},
            {
                preserveScroll: true,
                onSuccess: () => setConfirmUserId(null),
            }
        );
    };

    // Paginación
    const Pagination = ({ links }) => (
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
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

    return (
        <AuthenticatedLayout>
            <Head title="Usuarios" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

                {/* Título */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                        👤 Cuentas de usuarios
                    </h1>
                    <p className="text-neutral-500 mt-1 text-sm">
                        Gestioná las cuentas registradas y verificá manualmente las que no pudieron confirmar su email.
                    </p>
                </div>

                {/* Tarjetas de estadísticas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#29C9F422' }}>
                            👥
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Total</p>
                            <p className="text-2xl font-extrabold text-neutral-900">{stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#65DA4D22' }}>
                            ✅
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Verificados</p>
                            <p className="text-2xl font-extrabold" style={{ color: '#3aaa28' }}>{stats.verified}</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#FCA52222' }}>
                            ⚠️
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Sin verificar</p>
                            <p className="text-2xl font-extrabold text-amber-500">{stats.unverified}</p>
                        </div>
                    </div>
                </div>

                {/* Filtros y búsqueda */}
                <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-5 mb-6">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar por nombre o email..."
                                className="w-full pl-9 pr-4 py-2 text-sm border-2 border-neutral-200 rounded-xl focus:border-[#29C9F4] focus:ring-0 outline-none transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2 text-sm font-bold text-white rounded-xl transition hover:brightness-110 hover:scale-105"
                            style={{ backgroundColor: '#29C9F4' }}
                        >
                            Buscar
                        </button>
                        {(search || filter !== 'all') && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch('');
                                    setFilter('all');
                                    router.get(route('admin.users.index'), {}, { preserveState: true });
                                }}
                                className="px-4 py-2 text-sm font-semibold text-neutral-500 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 transition"
                            >
                                Limpiar
                            </button>
                        )}
                    </form>

                    {/* Tabs de filtro */}
                    <div className="flex gap-2 mt-4">
                        {[
                            { value: 'all',        label: 'Todos' },
                            { value: 'verified',   label: '✅ Verificados' },
                            { value: 'unverified', label: '⚠️ Sin verificar' },
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => handleFilterChange(tab.value)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-full border-2 transition hover:scale-105 ${
                                    filter === tab.value
                                        ? 'text-white border-transparent'
                                        : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                                }`}
                                style={filter === tab.value ? { backgroundColor: '#29C9F4', borderColor: '#29C9F4' } : {}}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lista de usuarios */}
                {users.data.length === 0 ? (
                    <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-12 text-center">
                        <p className="text-4xl mb-3">👤</p>
                        <p className="text-neutral-500 font-semibold">No se encontraron usuarios</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {users.data.map((user) => (
                            <div
                                key={user.id}
                                className={`bg-white rounded-2xl border-2 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
                                    user.email_verified_at ? 'border-neutral-100' : 'border-amber-200'
                                }`}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
                                    {/* Avatar inicial */}
                                    <div
                                        className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg font-extrabold flex-shrink-0"
                                        style={{ backgroundColor: user.email_verified_at ? '#29C9F4' : '#FCA522' }}
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

                                    {/* Info principal */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <p className="font-bold text-neutral-900 text-sm truncate">{user.name}</p>
                                            {user.email_verified_at ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full text-white" style={{ backgroundColor: '#3aaa28' }}>
                                                    ✅ Verificado
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-700 border border-amber-300">
                                                    ⚠️ Sin verificar
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                                    </div>

                                    {/* Datos secundarios */}
                                    <div className="flex flex-wrap gap-3 text-xs text-neutral-500 sm:justify-end">
                                        <div className="bg-neutral-50 rounded-xl border border-neutral-200 px-3 py-2 text-center">
                                            <p className="text-neutral-400 font-semibold uppercase tracking-wide text-[10px]">Compras</p>
                                            <p className="font-extrabold text-neutral-800 text-base">{user.orders_count}</p>
                                        </div>
                                        <div className="bg-neutral-50 rounded-xl border border-neutral-200 px-3 py-2 text-center">
                                            <p className="text-neutral-400 font-semibold uppercase tracking-wide text-[10px]">Registro</p>
                                            <p className="font-bold text-neutral-700 text-[11px]">
                                                {new Date(user.created_at).toLocaleDateString('es-AR', {
                                                    day: '2-digit', month: 'short', year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        {user.email_verified_at && (
                                            <div className="bg-neutral-50 rounded-xl border border-neutral-200 px-3 py-2 text-center">
                                                <p className="text-neutral-400 font-semibold uppercase tracking-wide text-[10px]">Verificado el</p>
                                                <p className="font-bold text-neutral-700 text-[11px]">
                                                    {new Date(user.email_verified_at).toLocaleDateString('es-AR', {
                                                        day: '2-digit', month: 'short', year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Botón Ver + Botón verificar */}
                                    <div className="flex flex-col gap-2 flex-shrink-0">
                                        <Link
                                            href={route('admin.users.show', user.id)}
                                            className="px-4 py-2 text-xs font-bold text-white rounded-xl transition hover:brightness-110 hover:scale-105 whitespace-nowrap text-center"
                                            style={{ backgroundColor: '#29C9F4' }}
                                        >
                                            Ver perfil →
                                        </Link>
                                        {!user.email_verified_at && (
                                            confirmUserId === user.id ? (
                                                <div className="flex gap-2 items-center">
                                                    <span className="text-xs text-neutral-500 font-semibold">¿Confirmar?</span>
                                                    <button
                                                        onClick={() => handleVerify(user.id)}
                                                        className="px-3 py-1.5 text-xs font-bold text-white rounded-xl transition hover:brightness-110"
                                                        style={{ backgroundColor: '#3aaa28' }}
                                                    >
                                                        Sí
                                                    </button>
                                                    <button
                                                        onClick={() => setConfirmUserId(null)}
                                                        className="px-3 py-1.5 text-xs font-bold text-neutral-600 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 transition"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setConfirmUserId(user.id)}
                                                    className="px-4 py-2 text-xs font-bold text-white rounded-xl transition hover:brightness-110 hover:scale-105 whitespace-nowrap"
                                                    style={{ backgroundColor: '#FCA522' }}
                                                >
                                                    ✔ Verificar cuenta
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Paginación */}
                {users.links && <Pagination links={users.links} />}
            </div>
        </AuthenticatedLayout>
    );
}
