import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth, productCount, categoryCount, sizeCount, colorCount, orderCount, offerCount, activeOfferCount, pendingOrders } = usePage().props;

    // Estilos para animaciones
    const floatingAnimation = `
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        .animate-floating {
            animation: floating 3s ease-in-out infinite;
        }
        .animate-floating-delayed {
            animation: floating 3s ease-in-out 0.5s infinite;
        }
        .animate-floating-slow {
            animation: floating 4s ease-in-out 1s infinite;
        }
    `;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-lg sm:text-xl font-semibold leading-tight text-black">
                    Panel de Administración
                </h2>
            }
        >
            <Head title="Dashboard" />
            <style>{floatingAnimation}</style>

            <div className="py-6 sm:py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
                    {/* Bienvenida */}
                    <section 
                        className="rounded-2xl border-4 border-white shadow-lg overflow-hidden relative"
                        style={{ backgroundColor: '#29C9F4' }}
                    >
                        {/* Elementos decorativos */}
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-4xl sm:text-6xl opacity-20 animate-floating">
                            ⭐
                        </div>
                        <div className="absolute bottom-2 right-10 sm:bottom-4 sm:right-20 text-3xl sm:text-4xl opacity-20 animate-floating-delayed">
                            ☁️
                        </div>
                        <div className="absolute top-1/2 right-20 sm:right-40 text-4xl sm:text-5xl opacity-20 animate-floating-slow">
                            🎈
                        </div>
                        
                        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 relative z-10">
                            <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                                ¡Hola, {auth.user.name}! 👋
                            </h3>
                            <p className="mt-2 sm:mt-3 text-base sm:text-lg text-white/95 font-medium">
                                Gestioná el catálogo, categorías, colores y talles desde un solo lugar.
                            </p>
                            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                                <Link
                                    href={route('products.index')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transform transition shadow-md hover:shadow-xl"
                                >
                                    🛍️ Ir a Prendas
                                </Link>
                                <Link
                                    href={route('admin.orders.index')}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border-3 border-white text-white font-bold hover:bg-white hover:text-black transform transition shadow-md hover:shadow-xl"
                                    style={{ borderWidth: '3px' }}
                                >
                                    📦 Ver Órdenes 
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Métricas rápidas */}
                    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
                        <div 
                            className="rounded-2xl border-4 border-white bg-gradient-to-br from-[#29C9F4] to-[#1ea8d1] p-4 sm:p-6 shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300 animate-floating cursor-pointer"
                        >
                            <div className="text-xs sm:text-sm text-white/90 font-semibold">👕 Prendas</div>
                            <div className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-white drop-shadow-md">{productCount || 0}</div>
                        </div>
                        <div 
                            className="rounded-2xl border-4 border-white p-4 sm:p-6 shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300 animate-floating-delayed cursor-pointer"
                            style={{ backgroundColor: '#65DA4D' }}
                        >
                            <div className="text-xs sm:text-sm text-white/90 font-semibold">📂 Categorías</div>
                            <div className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-white drop-shadow-md">{categoryCount || 0}</div>
                        </div>
                        <div 
                            className="rounded-2xl border-4 border-white p-4 sm:p-6 shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300 animate-floating-slow cursor-pointer"
                            style={{ backgroundColor: '#FC1C1D' }}
                        >
                            <div className="text-xs sm:text-sm text-white/90 font-semibold">🌈 Colores</div>
                            <div className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-white drop-shadow-md">{colorCount || 0}</div>
                        </div>
                        <div 
                            className="rounded-2xl border-4 border-white p-4 sm:p-6 shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300 animate-floating cursor-pointer"
                            style={{ backgroundColor: '#FFB800' }}
                        >
                            <div className="text-xs sm:text-sm text-white/90 font-semibold">📏 Talles</div>
                            <div className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-white drop-shadow-md">{sizeCount || 0}</div>
                        </div>
                        <div 
                            className="rounded-2xl border-4 border-white p-4 sm:p-6 shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300 animate-floating-slow cursor-pointer"
                            style={{ backgroundColor: '#FF6B9D' }}
                        >
                            <div className="text-xs sm:text-sm text-white/90 font-semibold">🏷️ Ofertas</div>
                            <div className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-white drop-shadow-md">{activeOfferCount || 0}/{offerCount || 0}</div>
                        </div>
                        <div 
                            className="col-span-2 sm:col-span-1 rounded-2xl border-4 border-white p-4 sm:p-6 shadow-lg transform hover:scale-105 hover:rotate-2 transition-all duration-300 animate-floating-delayed cursor-pointer"
                            style={{ backgroundColor: '#9B59B6' }}
                        >
                            <div className="text-xs sm:text-sm text-white/90 font-semibold">📦 Órdenes</div>
                            <div className="mt-1 sm:mt-2 text-3xl sm:text-4xl font-black text-white drop-shadow-md">{orderCount || 0}</div>
                        </div>
                    </section>

                    {/* Órdenes Pendientes */}
                    {pendingOrders && pendingOrders.length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h4 className="text-xl font-bold text-gray-800">
                                    ⏰ Órdenes Pendientes
                                </h4>
                                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {pendingOrders.length} pendientes
                                </span>
                            </div>
                            <div className="space-y-4">
                                {pendingOrders.map((order) => (
                                    <Link
                                        key={order.id}
                                        href={route('orders.show', order.id)}
                                        className="block rounded-2xl border-4 border-yellow-400 bg-yellow-50 p-6 hover:shadow-xl transform hover:scale-[1.02] transition"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="font-bold text-lg text-gray-800">
                                                        Orden #{order.id}
                                                    </span>
                                                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                        Pendiente
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p>👤 Cliente: <span className="font-semibold">{order.user?.name || 'N/A'}</span></p>
                                                    <p>📧 Email: <span className="font-semibold">{order.user?.email || 'N/A'}</span></p>
                                                    <p>📦 Items: <span className="font-semibold">{order.items?.length || 0} productos</span></p>
                                                    <p>💰 Total: <span className="font-semibold text-green-600">${parseFloat(order.total).toFixed(2)}</span></p>
                                                </div>
                                            </div>
                                            <div className="text-right text-xs text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('es-AR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <Link
                                    href={route('admin.orders.index')}
                                    className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold hover:scale-105 transform transition shadow-lg"
                                >
                                    Ver todas las órdenes →
                                </Link>
                            </div>
                        </section>
                    )}

                    {/* Accesos rápidos */}
                    <section>
                        <h4 className="mb-4 sm:mb-6 text-lg sm:text-xl font-bold text-gray-800 px-4 sm:px-0">
                            🚀 Accesos rápidos
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <Link
                                href={route('products.index')}
                                className="group rounded-2xl border-4 border-white bg-white p-6 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
                                style={{ borderColor: '#29C9F4' }}
                            >
                                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">👕</div>
                                <div className="font-bold text-lg" style={{ color: '#29C9F4' }}>Prendas</div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Gestiona el catálogo y sus variantes.
                                </p>
                            </Link>

                            <Link
                                href={route('categories.index')}
                                className="group rounded-2xl border-4 border-white bg-white p-6 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
                                style={{ borderColor: '#65DA4D' }}
                            >
                                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">📂</div>
                                <div className="font-bold text-lg" style={{ color: '#65DA4D' }}>Categorías</div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Organiza productos por categorías.
                                </p>
                            </Link>

                            <Link
                                href={route('colors.index')}
                                className="group rounded-2xl border-4 border-white bg-white p-6 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
                                style={{ borderColor: '#FC1C1D' }}
                            >
                                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">🎨</div>
                                <div className="font-bold text-lg" style={{ color: '#FC1C1D' }}>Colores</div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Define paletas disponibles.
                                </p>
                            </Link>

                            <Link
                                href={route('sizes.index')}
                                className="group rounded-2xl border-4 border-white bg-white p-6 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
                                style={{ borderColor: '#FFB800' }}
                            >
                                <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">📏</div>
                                <div className="font-bold text-lg" style={{ color: '#FFB800' }}>Talles</div>
                                <p className="mt-2 text-sm text-gray-600">
                                    Administra talles y stock.
                                </p>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}