import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        // Cargar estado del localStorage
        const saved = localStorage.getItem('sidebarCollapsed');
        return saved ? JSON.parse(saved) : false;
    });

    // Guardar estado en localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
    }, [sidebarCollapsed]);

    return (
        <div className="min-h-screen text-black" style={{ backgroundColor: '#F0F4F8' }}>
            {/* Sidebar para admin */}
            {user.role === 'admin' && (
                <aside
                    className={`fixed left-0 top-0 h-full border-r border-gray-200 z-50 transition-all duration-300 ${
                        sidebarCollapsed ? 'w-16' : 'w-64'
                    }`}
                    style={{ backgroundColor: '#29C9F4' }}
                >
                    {/* Botón de toggle */}
                    <div className="flex items-center justify-between p-4 border-b border-white/20">
                        {!sidebarCollapsed && (
                            <span className="text-white font-semibold text-lg">Admin Panel</span>
                        )}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className={`text-white p-2 rounded-md hover:bg-white/10 transition ${
                                sidebarCollapsed ? 'mx-auto' : ''
                            }`}
                            title={sidebarCollapsed ? 'Expandir' : 'Colapsar'}
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {sidebarCollapsed ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Navegación del sidebar */}
                    <nav className="p-4 space-y-2">
                        <Link
                            href={route('dashboard')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                                route().current('dashboard')
                                    ? 'bg-white text-black'
                                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:scale-105'
                            } ${sidebarCollapsed ? 'justify-center' : ''}`}
                            title={sidebarCollapsed ? 'Dashboard' : ''}
                        >
                            <svg
                                className="h-5 w-5 flex-shrink-0 group-hover:rotate-12 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            {!sidebarCollapsed && <span>Dashboard</span>}
                        </Link>

                        <Link
                            href={route('products.index')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                                route().current('products.index')
                                    ? 'bg-white text-black'
                                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:scale-105'
                            } ${sidebarCollapsed ? 'justify-center' : ''}`}
                            title={sidebarCollapsed ? 'Prendas' : ''}
                        >
                            <svg
                                className="h-5 w-5 flex-shrink-0 group-hover:rotate-12 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                            </svg>
                            {!sidebarCollapsed && <span>Prendas</span>}
                        </Link>

                        <Link
                            href={route('categories.index')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                                route().current('categories.index')
                                    ? 'bg-white text-black'
                                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:scale-105'
                            } ${sidebarCollapsed ? 'justify-center' : ''}`}
                            title={sidebarCollapsed ? 'Categorías' : ''}
                        >
                            <svg
                                className="h-5 w-5 flex-shrink-0 group-hover:rotate-12 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                            {!sidebarCollapsed && <span>Categorías</span>}
                        </Link>

                        <Link
                            href={route('colors.index')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                                route().current('colors.index')
                                    ? 'bg-white text-black'
                                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:scale-105'
                            } ${sidebarCollapsed ? 'justify-center' : ''}`}
                            title={sidebarCollapsed ? 'Colores' : ''}
                        >
                            <svg
                                className="h-5 w-5 flex-shrink-0 group-hover:rotate-12 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                />
                            </svg>
                            {!sidebarCollapsed && <span>Colores</span>}
                        </Link>

                        <Link
                            href={route('sizes.index')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group ${
                                route().current('sizes.index')
                                    ? 'bg-white text-black'
                                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:scale-105'
                            } ${sidebarCollapsed ? 'justify-center' : ''}`}
                            title={sidebarCollapsed ? 'Talles' : ''}
                        >
                            <svg
                                className="h-5 w-5 flex-shrink-0 group-hover:rotate-12 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                />
                            </svg>
                            {!sidebarCollapsed && <span>Talles</span>}
                        </Link>

                        <Link
                            href={route('admin.orders.index')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 group relative ${
                                route().current('admin.orders.index')
                                    ? 'bg-white text-black'
                                    : 'text-white/90 hover:text-white hover:bg-white/10 hover:scale-105'
                            } ${sidebarCollapsed ? 'justify-center' : ''}`}
                            title={sidebarCollapsed ? 'Órdenes' : ''}
                        >
                            <svg
                                className="h-5 w-5 flex-shrink-0 group-hover:rotate-12 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            {!sidebarCollapsed && (
                                <span className="flex-1">Órdenes</span>
                            )}
                            {/* Badge de notificaciones - solo mostrar si hay órdenes pendientes */}
                            {usePage().props.pendingOrders && usePage().props.pendingOrders.length > 0 && (
                                <span 
                                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse"
                                    title={`${usePage().props.pendingOrders.length} órdenes pendientes`}
                                >
                                    {usePage().props.pendingOrders.length}
                                </span>
                            )}
                        </Link>

                        <div className="pt-4 border-t border-white/20">
                            <Link
                                href={route('welcome')}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
                                title={sidebarCollapsed ? 'Ir a la tienda' : ''}
                            >
                                <svg
                                    className="h-5 w-5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                {!sidebarCollapsed && <span>Ir a la tienda</span>}
                            </Link>
                        </div>
                    </nav>

                    {/* Usuario y perfil en el sidebar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20" style={{ backgroundColor: '#29C9F4' }}>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition ${
                                        sidebarCollapsed ? 'justify-center' : ''
                                    }`}
                                    title={sidebarCollapsed ? user.name : ''}
                                >
                                    <svg
                                        className="h-5 w-5 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    {!sidebarCollapsed && (
                                        <div className="flex items-center justify-between flex-1">
                                            <span className="truncate">{user.name}</span>
                                            <svg
                                                className="h-4 w-4 flex-shrink-0"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content openUpward={true} align="left">
                                <Dropdown.Link href={route('profile.edit')}>
                                    Perfil
                                </Dropdown.Link>

                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Cerrar Sesión
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </aside>
            )}

            {/* Navbar superior (solo para no-admin) */}
            <nav className={`sticky top-0 z-40 backdrop-blur-md bg-black/70 border-b border-white/10 ${
                user.role === 'admin' ? (sidebarCollapsed ? 'ml-16' : 'ml-64') : ''
            }`}>
               

                {/* Menú móvil desplegable */}
                <div
                    className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-black/90 text-white backdrop-blur-md border-t border-white/10'}
                >
                    <div className="space-y-1 pb-3 pt-2 px-4">
                        <div className="text-sm text-white/70">
                            {user.name} <span className="text-white/50">•</span> {user.email}
                        </div>

                        <div className="mt-3 grid gap-2">
                            {user.role === 'admin' && (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            route().current('dashboard')
                                                ? 'bg-white text-black'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route('products.index')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            route().current('products.index')
                                                ? 'bg-white text-black'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Prendas
                                    </Link>
                                    <Link
                                        href={route('categories.index')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            route().current('categories.index')
                                                ? 'bg-white text-black'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Categorías
                                    </Link>
                                    <Link
                                        href={route('colors.index')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            route().current('colors.index')
                                                ? 'bg-white text-black'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Colores
                                    </Link>
                                    <Link
                                        href={route('sizes.index')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            route().current('sizes.index')
                                                ? 'bg-white text-black'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Talles
                                    </Link>
                                    <Link
                                        href={route('admin.orders.index')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            route().current('admin.orders.index')
                                                ? 'bg-white text-black'
                                                : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Órdenes
                                    </Link>
                                    <Link
                                        href={route('welcome')}
                                        className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        Ir a la tienda
                                    </Link>
                                </>
                            )}

                            <Link
                                href={route('profile.edit')}
                                className="px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                Perfil
                            </Link>
                            <Link
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="inline-flex w-full justify-center items-center px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition text-center"
                            >
                                Cerrar Sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenedor principal con margen izquierdo para admin */}
            <div className={user.role === 'admin' ? (sidebarCollapsed ? 'ml-16' : 'ml-64') : ''}>
                {header && (
                    <header className="bg-white border-b border-black/10">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}