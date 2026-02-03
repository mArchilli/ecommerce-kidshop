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
            <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-blue-50/30 flex">
                {/* Columna izquierda (info) */}
                <div className="hidden lg:flex lg:w-1/2 justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 relative overflow-hidden text-white">
                    <div className="absolute inset-0 bg-white/5"></div>
                    <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute top-40 right-40 w-24 h-24 bg-blue-300/30 rounded-full blur-xl"></div>
                    
                    <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                        <div className="mb-8">
                            {/* Logo de la tienda */}
                            <div className="mb-6">
                                <img 
                                    src="/images/logo.png" 
                                    alt="Logo La Tienda de los Niños" 
                                    className="w-48 h-auto mx-auto drop-shadow-2xl"
                                />
                            </div>
                            <h1 className="text-5xl font-black mb-4 drop-shadow-lg">¡Ya casi está!</h1>
                            <p className="text-xl font-semibold">
                                Verifica tu correo para activar tu cuenta
                            </p>
                        </div>
                        
                        <div className="space-y-4 max-w-md w-full">
                            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-lg">Seguridad</h3>
                                    <p className="text-sm">
                                        Protegemos tu identidad y datos
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                    <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-lg">Acceso total</h3>
                                    <p className="text-sm">
                                        Un paso más para disfrutar todo
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
                        <div className="text-center mb-8 lg:hidden" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl border-4 border-purple-300 p-2">
                                <img 
                                    src="/images/logo.png" 
                                    alt="Logo" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900">
                                La Tienda de los Niños
                            </h1>
                            <p className="text-purple-600 mt-2 font-bold">Verifica tu correo</p>
                        </div>

                        {/* Card de verificación */}
                        <div className="bg-white/90 backdrop-blur-md shadow-2xl border-4 border-white rounded-3xl transition-all duration-500" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                            <div className="p-8">
                                <div className="flex flex-col items-center mb-6">
                                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full p-4 mb-4 shadow-lg">
                                        <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h1 className="text-3xl font-black text-gray-900 mb-3">Verifica tu correo</h1>
                                    <p className="text-gray-600 text-center text-base font-semibold leading-relaxed">
                                        ¡Gracias por registrarte! Revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
                                    </p>
                                </div>
                                
                                {status === 'verification-link-sent' && (
                                    <div className="mb-6 flex items-center gap-3 text-green-700 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl px-4 py-3 text-sm font-bold shadow-md animate-pulse">
                                        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>¡Nuevo enlace enviado exitosamente!</span>
                                    </div>
                                )}
                                
                                <form onSubmit={submit}>
                                    <div className="mt-6 flex flex-col gap-4">
                                        <PrimaryButton
                                            disabled={processing}
                                            className="w-full text-white py-4 text-lg font-black rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
                                        >
                                            Reenviar correo de verificación
                                        </PrimaryButton>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full py-4 text-base font-bold rounded-full bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
                                        >
                                            Cerrar sesión
                                        </Link>
                                    </div>
                                </form>
                                
                                <div className="mt-8 text-sm text-gray-500 text-center font-semibold bg-purple-50 rounded-2xl py-3 px-4 border border-purple-100">
                                    💡 <span className="text-purple-700">Tip:</span> Revisa tu carpeta de spam si no ves el correo
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