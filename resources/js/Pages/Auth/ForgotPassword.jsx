import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout full={true}>
            <Head title="Recuperar Contraseña" />

            <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-blue-50/30 flex">
                {/* Panel Izquierdo - Formulario */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {/* Logo/Marca */}
                        <div className="text-center mb-8">
                            <div className="inline-block">
                                <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    La Tienda de los Niños
                                </h1>
                            </div>
                            <p className="text-blue-600 mt-2 font-bold">¿Olvidaste tu contraseña?</p>
                        </div>

                        {/* Tarjeta del Formulario */}
                        <div className="bg-white/90 backdrop-blur-md shadow-2xl border-4 border-white rounded-3xl transition-all duration-500 p-8" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Recuperar Contraseña
                                </h2>
                                <p className="text-gray-600 text-sm">
                                    No te preocupes, te enviaremos un enlace para restablecer tu contraseña.
                                </p>
                            </div>

                            {status && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl">
                                    <p className="text-green-700 font-semibold text-sm">
                                        {status}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                {/* Email Input */}
                                <div className="relative group">
                                    <InputLabel
                                        htmlFor="email"
                                        className="block mb-2 font-bold text-gray-700 transition-all group-focus-within:text-purple-600"
                                        value="Correo electrónico"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="block w-full px-4 py-4 bg-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="tu@email.com"
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Botón Enviar */}
                                <div className="space-y-4">
                                    <PrimaryButton
                                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 justify-center"
                                        disabled={processing}
                                    >
                                        Enviar Enlace de Recuperación
                                    </PrimaryButton>

                                    <div className="text-center">
                                        <Link
                                            href={route('login')}
                                            className="text-purple-600 hover:text-purple-800 font-semibold text-sm transition-colors"
                                        >
                                            ← Volver al inicio de sesión
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Enlaces adicionales */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                ¿No tienes cuenta?{' '}
                                <Link
                                    href={route('register')}
                                    className="text-pink-600 hover:text-pink-800 font-bold transition-colors"
                                >
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Panel Derecho - Información */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 text-white p-12 items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5"></div>
                    <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300/30 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute top-40 right-40 w-24 h-24 bg-blue-300/30 rounded-full blur-xl"></div>
                    <div className="relative z-10 max-w-md space-y-8">
                        <div>
                            <h1 className="text-5xl font-black mb-4 drop-shadow-lg">¡Tranquilo!</h1>
                            <p className="text-xl text-purple-100">
                                Recupera el acceso a tu cuenta en simples pasos
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Feature 1 */}
                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-white/20 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Proceso Rápido</h3>
                                    <p className="text-purple-100 text-sm">
                                        Recibirás un correo en segundos para recuperar tu cuenta
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-white/20 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                    <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">100% Seguro</h3>
                                    <p className="text-purple-100 text-sm">
                                        Tu información está protegida en todo momento
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border-2 border-white/20 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Soporte 24/7</h3>
                                    <p className="text-purple-100 text-sm">
                                        Estamos aquí para ayudarte cuando lo necesites
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/20">
                            <p className="text-purple-100 text-sm text-center">
                                Tus datos están protegidos y nunca serán compartidos
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}