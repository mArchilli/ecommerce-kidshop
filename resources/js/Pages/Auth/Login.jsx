import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout full>
            <Head title="Iniciar sesión" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex">
                {/* Columna izquierda (info) */}
                <div className="hidden lg:flex lg:w-1/2 justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden text-white">
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
                                    className="w-64 h-32 mx-auto drop-shadow-2xl"
                                />
                            </div>
                            <h1 className="text-5xl font-black mb-4 drop-shadow-lg">¡Hola!</h1>
                            <p className="text-xl font-semibold">
                                Accede a tu cuenta para continuar
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
                                    <h3 className="font-black text-lg">Compra segura</h3>
                                    <p className="text-sm">
                                        Tus datos están protegidos
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
                                    <h3 className="font-black text-lg">Acceso rápido</h3>
                                    <p className="text-sm">
                                        Experiencia simple y divertida
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna derecha (formulario) */}
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
                            <p className="text-purple-600 mt-2 font-bold">¡Bienvenido de nuevo!</p>
                        </div>

                        {/* Status (mensajes) */}
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        {/* Card del formulario */}
                        <div className="bg-white/90 backdrop-blur-md shadow-2xl border-4 border-white rounded-3xl transition-all duration-500" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                            <div className="p-8">
                                <form onSubmit={submit} className="space-y-6">
                                    {/* Email */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Correo electrónico"
                                            className="block text-sm font-bold text-gray-700 mb-2 transition-colors duration-300"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="w-full px-4 py-4 bg-purple-50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="tu@email.com"
                                            />
                                            <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"></div>
                                        </div>
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    {/* Password */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Contraseña"
                                            className="block text-sm font-bold text-gray-700 mb-2 transition-colors duration-300"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="w-full px-4 py-4 pr-12 bg-purple-50 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-all duration-300 text-sm font-bold"
                                                aria-label={
                                                    showPassword
                                                        ? 'Ocultar contraseña'
                                                        : 'Mostrar contraseña'
                                                }
                                            >
                                                {showPassword ? 'Ocultar' : 'Mostrar'}
                                            </button>
                                            <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"></div>
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    {/* Recordar y recuperar */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center cursor-pointer">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData('remember', e.target.checked)
                                                }
                                            />
                                            <span className="ml-3 text-sm text-gray-700 hover:text-purple-600 transition-colors duration-300 font-semibold">
                                                Recordar sesión
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-purple-600 hover:text-purple-800 transition-all duration-300 hover:underline font-bold"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Botón */}
                                    <PrimaryButton
                                        className="w-full text-white py-4 text-lg font-black rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0"
                                        disabled={processing}
                                    >
                                        Iniciar sesión
                                    </PrimaryButton>
                                </form>

                                {/* Info adicional */}
                                <div className="mt-8 pt-6 border-t border-neutral-200 space-y-3">
                                    <p className="text-center text-sm text-gray-600">
                                        ¿No tenés una cuenta?{' '}
                                        <Link
                                            href={route('register')}
                                            className="text-purple-600 hover:text-purple-800 font-bold transition-colors hover:underline"
                                        >
                                            Registrate
                                        </Link>
                                    </p>
                                    <p className="text-center text-sm text-neutral-600">
                                        ¿Necesitas ayuda con el acceso?{' '}
                                        <a
                                            href="#"
                                            className="text-neutral-900 hover:underline"
                                        >
                                            Contáctanos
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8">
                            <p className="text-sm text-neutral-500">
                                © {new Date().getFullYear()} La Tienda de los Niños. Todos los derechos
                                reservados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
