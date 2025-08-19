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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl">
                        <div className="p-6 text-neutral-800">
                            Bienvenido, {auth.user.name}!
                        </div>
                    </div>

                    {/* Métricas rápidas */}
                    {typeof productCount !== 'undefined' && (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="rounded-xl border border-black/10 bg-white p-6 text-center">
                                <div className="text-3xl font-bold text-black">{productCount}</div>
                                <div className="text-sm text-neutral-600 mt-1">Prendas publicadas</div>
                            </div>
                            {/* ...podés agregar más métricas acá si las tenés disponibles... */}
                        </div>
                    )}

                    {/* Botón para volver a la home */}
                    <div className="mt-6 flex justify-end">
                        <Link
                            href={route('welcome')}
                            className="inline-flex items-center px-4 py-2 rounded-lg border border-black text-black hover:bg-black hover:text-white transition"
                        >
                            Ir a la tienda
                        </Link>
                    </div>

                    {/* Panel de accesos rápidos */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link
                            href={route('products.index')}
                            className="block rounded-xl border border-black text-black text-center py-4 hover:bg-black hover:text-white transition"
                        >
                            Prendas
                        </Link>
                        <Link
                            href={route('categories.index')}
                            className="block rounded-xl border border-black text-black text-center py-4 hover:bg-black hover:text-white transition"
                        >
                            Categorías
                        </Link>
                        <Link
                            href={route('colors.index')}
                            className="block rounded-xl border border-black text-black text-center py-4 hover:bg-black hover:text-white transition"
                        >
                            Colores
                        </Link>
                        <Link
                            href={route('sizes.index')}
                            className="block rounded-xl border border-black text-black text-center py-4 hover:bg-black hover:text-white transition"
                        >
                            Talles
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}