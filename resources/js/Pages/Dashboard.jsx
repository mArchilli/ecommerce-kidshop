import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props; // Obtener los datos del usuario autenticado

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Panel de Administración
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Bienvenido, {auth.user.name}!
                        </div>
                    </div>

                    {/* Panel de botones */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link
                            href={route('products.index')}
                            className="block bg-blue-500 text-white text-center py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                        >
                            Prendas
                        </Link>
                        <Link
                            href={route('categories.index')}
                            className="block bg-green-500 text-white text-center py-4 rounded-lg shadow hover:bg-green-600 transition duration-300"
                        >
                            Categoría
                        </Link>
                        <Link
                            href={route('colors.index')}
                            className="block bg-red-500 text-white text-center py-4 rounded-lg shadow hover:bg-red-600 transition duration-300"
                        >
                            Colores
                        </Link>
                        <Link
                            href={route('sizes.index')}
                            className="block bg-purple-500 text-white text-center py-4 rounded-lg shadow hover:bg-purple-600 transition duration-300"
                        >
                            Talles
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}