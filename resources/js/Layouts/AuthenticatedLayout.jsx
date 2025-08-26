import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-white text-black">
            <nav className="sticky top-0 z-[60] backdrop-blur-md bg-black/70 border-b border-white/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Izquierda: Logo + navegación admin (desktop) */}
                        <div className="flex items-center">

                            {user.role === 'admin' && (
                                <div className="hidden sm:ms-10 sm:flex sm:space-x-2">
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
                                        className="inline-flex text-right px-3 py-1 rounded-lg border bg-white border-black text-black hover:bg-black hover:text-white transition"
                                    >
                                        Ir a la tienda
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Derecha: Usuario / Dropdown (desktop) */}
                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-white/10 bg-transparent px-3 py-2 text-sm font-medium leading-4 text-white/90 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
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
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Perfil
                                        </Dropdown.Link>

                                        {user.role === 'admin' && (
                                            <>
                                                <Dropdown.Link href={route('products.index')}>
                                                    Prendas
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('categories.index')}>
                                                    Categorías
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('colors.index')}>
                                                    Colores
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('sizes.index')}>
                                                    Talles
                                                </Dropdown.Link>
                                                <Dropdown.Link href={route('admin.orders.index')}>
                                                    Órdenes
                                                </Dropdown.Link>
                                            </>
                                        )}

                                        

                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Botón menú móvil */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown((prev) => !prev)
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-white transition duration-150 ease-in-out hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú móvil desplegable */}
                <div
                    className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-black/90 text-white backdrop-blur-md border-t border-white/10'}
                >
                    <div className="space-y-1 pb-3 pt-2 px-4">
                        <div className="text-sm text-white/70">
                            {user.name} <span className="text-white/50">•</span> {user.email}
                        </div>

                        <div className="mt-3 grid gap-2">
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

                            {user.role === 'admin' && (
                                <>
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
                                className="inline-flex w-full justify-center items-center px-4 py-2 rounded-lg bg-black text-white border border-black font-medium hover:bg-neutral-800 hover:text-white transition text-center"
                            >
                                Cerrar Sesión
                            </Link>
                            <Link
                                href={route('welcome')}
                                className="inline-flex w-full justify-center items-center px-4 py-2 rounded-lg bg-white text-black border border-black font-medium hover:bg-black hover:text-white transition text-center"
                            >
                                Volver al sitio
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white border-b border-black/10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}