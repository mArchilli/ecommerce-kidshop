import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout full>
            <Head title="Verificación de Correo Electrónico" />
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex">
                {/* Columna izquierda (info) */}
                <div className="hidden lg:flex lg:w-1/2 justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold mb-4">Verifica tu correo</h1>
                            <p className="text-lg text-neutral-200">
                                Activa tu cuenta para comenzar a comprar y disfrutar de todos los beneficios.
                            </p>
                        </div>
                        <div className="space-y-4 max-w-md w-full">
                            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-sm font-semibold">
                                    1
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold">Seguridad</h3>
                                    <p className="text-sm text-neutral-200">
                                        Confirmamos tu identidad para proteger tu cuenta.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-sm font-semibold">
                                    2
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold">Acceso total</h3>
                                    <p className="text-sm text-neutral-200">
                                        Solo un paso más para acceder a todas las funciones.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna derecha (verificación) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {/* Volver al inicio */}
                        <div className="mb-8">
                            <Link
                                href="/"
                                className="inline-flex items-center text-neutral-600 hover:text-black transition-all duration-300"
                            >
                                <span className="mr-2">←</span> Volver al inicio
                            </Link>
                        </div>

                        {/* Logo/título móvil */}
                        <div className="text-center mb-8 lg:hidden">
                            <div className="w-16 h-16 bg-gradient-to-br from-black to-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <span className="text-white font-bold text-2xl">KS</span>
                            </div>
                            <h1 className="text-2xl font-bold text-neutral-900">
                                Kidshop
                            </h1>
                            <p className="text-neutral-600 mt-2">Verifica tu correo electrónico</p>
                        </div>

                        {/* Card de verificación */}
                        <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl transition-all duration-500">
                            <div className="p-8">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="bg-indigo-100 rounded-full p-3 mb-3">
                                        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8" />
                                        </svg>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-1">Verifica tu correo electrónico</h1>
                                    <p className="text-gray-500 text-center text-sm">
                                        ¡Gracias por registrarte! Por favor, revisa tu bandeja de entrada y haz clic en el enlace que te enviamos para activar tu cuenta.
                                    </p>
                                </div>
                                {status === 'verification-link-sent' && (
                                    <div className="mb-4 flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm font-medium animate-pulse">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Nuevo enlace de verificación enviado.
                                    </div>
                                )}
                                <form onSubmit={submit}>
                                    <div className="mt-6 flex flex-col gap-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            className="w-full py-3 border border-black text-center font-semibold rounded-lg shadow-sm transition hover:scale-[1.02] hover:bg-white hover:text-black justify-center"
                                        >
                                            Reenviar correo de verificación
                                        </PrimaryButton>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full py-3 text-base rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                                        >
                                            Cerrar sesión
                                        </Link>
                                    </div>
                                </form>
                                <div className="mt-8 text-xs text-gray-400 text-center">
                                    ¿Problemas? Revisa tu carpeta de spam o contacta soporte.
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8">
                            <p className="text-sm text-neutral-500">
                                © {new Date().getFullYear()} La Tienda de los Niños. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}