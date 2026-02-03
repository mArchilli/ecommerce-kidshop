import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'gmail.com.ar', 'yahoo.com.ar', 'hotmail.com.ar'];

    const submit = (e) => {
        e.preventDefault();

        const emailDomain = data.email.split('@')[1];
        if (!allowedDomains.includes(emailDomain)) {
            alert('Solo se permiten correos electrónicos de Gmail, Hotmail y Yahoo.');
            return;
        }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout full>
            <Head title="Crear cuenta" />

            <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-blue-50/30 flex">
                {/* Columna izquierda (formulario) */}
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
                            <h1 className="text-3xl font-black text-gray-900">Crear cuenta</h1>
                            <p className="text-purple-600 mt-2 font-bold">¡Únete a la familia!</p>
                        </div>

                        {/* Card del formulario */}
                        <div className="bg-white/90 backdrop-blur-md shadow-2xl border-4 border-white rounded-3xl transition-all duration-500" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                            <div className="p-8">
                                <form onSubmit={submit} className="space-y-6">
                                    {/* Nombre */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="name"
                                            value="Nombre"
                                            className="block text-sm font-bold text-gray-700 mb-2"
                                        />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="w-full px-4 py-4 bg-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>

                                    {/* Email */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Correo electrónico"
                                            className="block text-sm font-bold text-gray-700 mb-2"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="w-full px-4 py-4 bg-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    {/* Password */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Contraseña"
                                            className="block text-sm font-bold text-gray-700 mb-2"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="w-full px-4 py-4 pr-12 bg-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-all duration-300 text-sm font-bold"
                                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                            >
                                                {showPassword ? 'Ocultar' : 'Mostrar'}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    {/* Confirmación */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirmar contraseña"
                                            className="block text-sm font-bold text-gray-700 mb-2"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password_confirmation"
                                                type={showPasswordConfirm ? 'text' : 'password'}
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="w-full px-4 py-4 pr-12 bg-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData('password_confirmation', e.target.value)
                                                }
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswordConfirm((v) => !v)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-all duration-300 text-sm font-bold"
                                                aria-label={
                                                    showPasswordConfirm
                                                        ? 'Ocultar confirmación'
                                                        : 'Mostrar confirmación'
                                                }
                                            >
                                                {showPasswordConfirm ? 'Ocultar' : 'Mostrar'}
                                            </button>
                                        </div>
                                        <InputError
                                            message={errors.password_confirmation}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Footer del form */}
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <Link
                                            href={route('login')}
                                            className="text-sm text-purple-600 hover:text-purple-800 transition-all duration-300 hover:underline font-bold order-2 sm:order-1"
                                        >
                                            ¿Ya tienes cuenta? Iniciar sesión
                                        </Link>

                                        <PrimaryButton
                                            className="text-white py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-black text-lg order-1 sm:order-2 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
                                            disabled={processing}
                                        >
                                            Crear cuenta
                                        </PrimaryButton>
                                    </div>
                                </form>
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

                {/* Columna derecha (info) */}
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
                            <h2 className="text-5xl font-black mb-4 drop-shadow-lg">¡Bienvenido!</h2>
                            <p className="text-xl font-semibold">
                                Crea tu cuenta y comienza la aventura
                            </p>
                        </div>

                        <div className="space-y-4 max-w-md w-full">
                            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-lg">Compras seguras</h3>
                                    <p className="text-sm">Tus datos están protegidos</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                                    <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-lg">Ofertas exclusivas</h3>
                                    <p className="text-sm">Descuentos especiales para miembros</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}