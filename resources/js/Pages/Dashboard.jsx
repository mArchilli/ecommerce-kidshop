import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth, productCount } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black">
                    Panel de Administración
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
                    {/* Bienvenida */}
                    <section className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm">
                        <div className="px-6 py-6 sm:px-8">
                            <h3 className="text-2xl font-semibold text-black">
                                Hola, {auth.user.name}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-700">
                                Gestioná el catálogo, categorías, colores y talles desde un solo lugar.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link
                                    href={route('products.index')}
                                    className="inline-flex px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition"
                                >
                                    Ir a Prendas
                                </Link>
                                <Link
                                    href={route('admin.orders.index')}
                                    className="inline-flex px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition"
                                >
                                    Ver Órdenes
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Métricas rápidas */}
                    {typeof productCount !== 'undefined' && (
                        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="rounded-2xl border border-black/10 bg-white p-6">
                                <div className="text-sm text-neutral-600">Prendas publicadas</div>
                                <div className="mt-2 text-3xl font-bold text-black">{productCount}</div>
                            </div>
                            {/* ...podés sumar más métricas acá cuando estén disponibles... */}
                        </section>
                    )}

                    {/* Accesos rápidos */}
                    <section>
                        <h4 className="mb-4 text-sm font-semibold text-neutral-700">
                            Accesos rápidos
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link
                                href={route('products.index')}
                                className="group rounded-2xl border border-black/10 bg-white p-5 hover:bg-black hover:text-white transition"
                            >
                                <div className="font-semibold">Prendas</div>
                                <p className="mt-1 text-sm text-neutral-600 group-hover:text-white/80">
                                    Gestiona el catálogo y sus variantes.
                                </p>
                            </Link>

                            <Link
                                href={route('categories.index')}
                                className="group rounded-2xl border border-black/10 bg-white p-5 hover:bg-black hover:text-white transition"
                            >
                                <div className="font-semibold">Categorías</div>
                                <p className="mt-1 text-sm text-neutral-600 group-hover:text-white/80">
                                    Organiza productos por categorías.
                                </p>
                            </Link>

                            <Link
                                href={route('colors.index')}
                                className="group rounded-2xl border border-black/10 bg-white p-5 hover:bg-black hover:text-white transition"
                            >
                                <div className="font-semibold">Colores</div>
                                <p className="mt-1 text-sm text-neutral-600 group-hover:text-white/80">
                                    Define paletas disponibles.
                                </p>
                            </Link>

                            <Link
                                href={route('sizes.index')}
                                className="group rounded-2xl border border-black/10 bg-white p-5 hover:bg-black hover:text-white transition"
                            >
                                <div className="font-semibold">Talles</div>
                                <p className="mt-1 text-sm text-neutral-600 group-hover:text-white/80">
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