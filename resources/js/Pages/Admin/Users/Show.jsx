import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Show({ user, totalSpent }) {
    const [activeTab, setActiveTab] = useState('info'); // info | orders | edit | password

    /* ── Formulario editar perfil ── */
    const profileForm = useForm({
        name:  user.name,
        email: user.email,
    });

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.put(route('admin.users.update', user.id), {
            preserveScroll: true,
        });
    };

    /* ── Formulario cambiar contraseña ── */
    const passwordForm = useForm({
        password:              '',
        password_confirmation: '',
    });

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('admin.users.password', user.id), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    /* ── Verificar manualmente ── */
    const [confirmVerify, setConfirmVerify] = useState(false);
    const handleVerify = () => {
        router.post(route('admin.users.verify', user.id), {}, { preserveScroll: true });
    };

    /* ── Helpers ── */
    const fmtDate = (d) =>
        d
            ? new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
            : '—';

    const shippingLabel = {
        pending:    { label: 'Pendiente',   color: '#FCA522' },
        dispatched: { label: 'Despachado',  color: '#29C9F4' },
        delivered:  { label: 'Entregado',   color: '#3aaa28' },
    };

    const tabs = [
        { id: 'info',     label: 'Información',  icon: '👤' },
        { id: 'orders',   label: 'Compras',       icon: '🛍️' },
        { id: 'edit',     label: 'Editar perfil', icon: '✏️' },
        { id: 'password', label: 'Contraseña',    icon: '🔒' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title={`Usuario: ${user.name}`} />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

                {/* Back */}
                <Link
                    href={route('admin.users.index')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-800 transition mb-6"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a Usuarios
                </Link>

                {/* Header */}
                <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl font-extrabold flex-shrink-0"
                        style={{ backgroundColor: user.email_verified_at ? '#29C9F4' : '#FCA522' }}
                    >
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h1 className="text-xl font-extrabold text-neutral-900">{user.name}</h1>
                            {user.email_verified_at ? (
                                <span className="px-2 py-0.5 text-xs font-bold rounded-full text-white" style={{ backgroundColor: '#3aaa28' }}>
                                    ✅ Verificado
                                </span>
                            ) : (
                                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-700 border border-amber-300">
                                    ⚠️ Sin verificar
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-neutral-500">{user.email}</p>
                        <p className="text-xs text-neutral-400 mt-0.5">Registrado el {fmtDate(user.created_at)}</p>
                    </div>

                    {/* Stats rápidas */}
                    <div className="flex gap-3 flex-shrink-0">
                        <div className="bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-center">
                            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">Compras</p>
                            <p className="text-2xl font-extrabold text-neutral-900">{user.orders_count}</p>
                        </div>
                        <div className="bg-neutral-50 border-2 border-neutral-100 rounded-xl px-4 py-3 text-center">
                            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide">Total gastado</p>
                            <p className="text-lg font-extrabold" style={{ color: '#3aaa28' }}>
                                ${Number(totalSpent).toLocaleString('es-AR')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-xl border-2 transition hover:scale-105 ${
                                activeTab === t.id
                                    ? 'text-white border-transparent'
                                    : 'border-neutral-200 text-neutral-600 bg-white hover:border-neutral-300'
                            }`}
                            style={activeTab === t.id ? { backgroundColor: '#29C9F4', borderColor: '#29C9F4' } : {}}
                        >
                            <span>{t.icon}</span>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ──────────── TAB: INFORMACIÓN ──────────── */}
                {activeTab === 'info' && (
                    <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-6 space-y-4">
                        <h2 className="text-base font-extrabold text-neutral-800 mb-4">Datos de la cuenta</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoField label="Nombre" value={user.name} />
                            <InfoField label="Email" value={user.email} />
                            <InfoField label="Rol" value={user.role === 'admin' ? 'Administrador' : 'Cliente'} />
                            <InfoField
                                label="Estado de email"
                                value={user.email_verified_at ? `Verificado el ${fmtDate(user.email_verified_at)}` : 'Sin verificar'}
                                highlight={!user.email_verified_at ? 'amber' : 'green'}
                            />
                            <InfoField label="Registro" value={fmtDate(user.created_at)} />
                            <InfoField label="Última actualización" value={fmtDate(user.updated_at)} />
                        </div>

                        {/* Botón verificar si no está verificado */}
                        {!user.email_verified_at && (
                            <div className="pt-4 border-t border-neutral-100">
                                {confirmVerify ? (
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-neutral-600 font-semibold">¿Confirmar verificación manual?</span>
                                        <button
                                            onClick={handleVerify}
                                            className="px-4 py-2 text-sm font-bold text-white rounded-xl transition hover:brightness-110"
                                            style={{ backgroundColor: '#3aaa28' }}
                                        >
                                            Sí, verificar
                                        </button>
                                        <button
                                            onClick={() => setConfirmVerify(false)}
                                            className="px-4 py-2 text-sm font-bold text-neutral-600 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 transition"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setConfirmVerify(true)}
                                        className="px-5 py-2 text-sm font-bold text-white rounded-xl transition hover:brightness-110 hover:scale-105"
                                        style={{ backgroundColor: '#FCA522' }}
                                    >
                                        ✔ Verificar cuenta manualmente
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* ──────────── TAB: COMPRAS ──────────── */}
                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        {user.orders.length === 0 ? (
                            <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-12 text-center">
                                <p className="text-4xl mb-3">🛍️</p>
                                <p className="text-neutral-500 font-semibold">Este usuario aún no realizó compras.</p>
                            </div>
                        ) : (
                            user.orders.map((order) => {
                                const status = shippingLabel[order.shipping_status] ?? { label: order.shipping_status, color: '#aaa' };
                                return (
                                    <div key={order.id} className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm hover:shadow-md transition overflow-hidden">
                                        {/* Cabecera */}
                                        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100">
                                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                                                Orden #{order.id}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className="px-2 py-0.5 text-xs font-bold rounded-full text-white"
                                                    style={{ backgroundColor: status.color }}
                                                >
                                                    {status.label}
                                                </span>
                                                <span className="text-xs text-neutral-400">{fmtDate(order.created_at)}</span>
                                                <Link
                                                    href={route('orders.show', order.id)}
                                                    className="text-xs font-bold underline transition"
                                                    style={{ color: '#29C9F4' }}
                                                >
                                                    Ver detalle →
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Productos */}
                                        <div className="p-5 space-y-2">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-3 text-sm">
                                                    <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 text-xs flex-shrink-0">
                                                        {item.product?.images?.[0] ? (
                                                            <img
                                                                src={`/${item.product.images[0].startsWith('images/') ? '' : 'images/'}${item.product.images[0]}`}
                                                                alt={item.product.name}
                                                                className="w-8 h-8 object-cover rounded-lg"
                                                            />
                                                        ) : '🧸'}
                                                    </div>
                                                    <span className="flex-1 text-neutral-700 font-medium truncate">
                                                        {item.product?.name ?? 'Producto eliminado'}
                                                    </span>
                                                    <span className="text-neutral-400 text-xs">×{item.quantity}</span>
                                                    <span className="font-bold text-neutral-800">
                                                        ${Number(item.price ?? 0).toLocaleString('es-AR')}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="px-5 py-3 border-t border-neutral-100 flex justify-between items-center">
                                            <span className="text-xs text-neutral-400">{order.items.length} producto(s)</span>
                                            <span className="font-extrabold text-base" style={{ color: '#3aaa28' }}>
                                                Total: ${Number(order.total).toLocaleString('es-AR')}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        {user.orders_count > 10 && (
                            <p className="text-center text-xs text-neutral-400 pt-2">
                                Mostrando las últimas 10 compras de {user.orders_count} totales.
                            </p>
                        )}
                    </div>
                )}

                {/* ──────────── TAB: EDITAR PERFIL ──────────── */}
                {activeTab === 'edit' && (
                    <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-6">
                        <h2 className="text-base font-extrabold text-neutral-800 mb-6">Editar información del perfil</h2>
                        <form onSubmit={submitProfile} className="space-y-5 max-w-lg">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm border-2 border-neutral-200 rounded-xl focus:border-[#29C9F4] focus:ring-0 outline-none transition"
                                    required
                                />
                                {profileForm.errors.name && (
                                    <p className="text-xs text-red-500 mt-1">{profileForm.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(e) => profileForm.setData('email', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm border-2 border-neutral-200 rounded-xl focus:border-[#29C9F4] focus:ring-0 outline-none transition"
                                    required
                                />
                                {profileForm.errors.email && (
                                    <p className="text-xs text-red-500 mt-1">{profileForm.errors.email}</p>
                                )}
                                {profileForm.data.email !== user.email && (
                                    <p className="text-xs text-amber-600 mt-1 font-semibold">
                                        ⚠️ Cambiar el email reiniciará el estado de verificación del usuario.
                                    </p>
                                )}
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="px-6 py-2.5 text-sm font-bold text-white rounded-xl transition hover:brightness-110 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#29C9F4' }}
                                >
                                    {profileForm.processing ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* ──────────── TAB: CONTRASEÑA ──────────── */}
                {activeTab === 'password' && (
                    <div className="bg-white rounded-2xl border-2 border-neutral-100 shadow-sm p-6">
                        <h2 className="text-base font-extrabold text-neutral-800 mb-2">Cambiar contraseña</h2>
                        <p className="text-sm text-neutral-500 mb-6">
                            La nueva contraseña debe tener al menos 8 caracteres.
                        </p>
                        <form onSubmit={submitPassword} className="space-y-5 max-w-lg">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                                    Nueva contraseña
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm border-2 border-neutral-200 rounded-xl focus:border-[#29C9F4] focus:ring-0 outline-none transition"
                                    autoComplete="new-password"
                                    required
                                />
                                {passwordForm.errors.password && (
                                    <p className="text-xs text-red-500 mt-1">{passwordForm.errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1">
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-2.5 text-sm border-2 border-neutral-200 rounded-xl focus:border-[#29C9F4] focus:ring-0 outline-none transition"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="px-6 py-2.5 text-sm font-bold text-white rounded-xl transition hover:brightness-110 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{ backgroundColor: '#FCA522' }}
                                >
                                    {passwordForm.processing ? 'Actualizando...' : '🔒 Actualizar contraseña'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}

function InfoField({ label, value, highlight }) {
    const colorMap = {
        green: 'bg-green-50 border-green-200 text-green-800',
        amber: 'bg-amber-50 border-amber-200 text-amber-800',
    };
    const base = highlight ? colorMap[highlight] : 'bg-neutral-50 border-neutral-200 text-neutral-800';
    return (
        <div className={`rounded-xl border-2 px-4 py-3 ${base}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">{label}</p>
            <p className="text-sm font-bold">{value ?? '—'}</p>
        </div>
    );
}
