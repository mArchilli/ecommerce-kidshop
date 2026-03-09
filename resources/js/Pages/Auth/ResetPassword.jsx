import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout full>
            <Head title="Restablecer Contraseña" />

            <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-blue-50/30 flex">

                {/* Panel izquierdo – formulario */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">

                        {/* Volver */}
                        <div className="mb-8">
                            <Link
                                href={route('login')}
                                className="inline-flex items-center text-neutral-600 hover:text-black transition-all duration-300"
                            >
                                <span className="mr-2">←</span> Volver al inicio de sesión
                            </Link>
                        </div>

                        {/* Logo/título móvil */}
                        <div className="text-center mb-8 lg:hidden" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl border-4 border-purple-300 p-2">
                                <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900">Nueva contraseña</h1>
                            <p className="text-purple-600 mt-2 font-bold">Elegí una contraseña segura</p>
                        </div>

                        {/* Card del formulario */}
                        <div
                            className="bg-white/90 backdrop-blur-md shadow-2xl border-4 border-white rounded-3xl p-8"
                            style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Restablecer contraseña</h2>
                                <p className="text-gray-600 text-sm">
                                    Ingresá tu nueva contraseña para recuperar el acceso a tu cuenta.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">

                                {/* Email (readonly) */}
                                <div className="group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-4 bg-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                        autoComplete="username"
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Nueva contraseña */}
                                <div className="group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Nueva contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full px-4 py-4 pr-24 bg-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                            autoComplete="new-password"
                                            placeholder="Mínimo 8 caracteres"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-all duration-300 text-sm font-bold"
                                        >
                                            {showPassword ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Confirmar contraseña */}
                                <div className="group">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Confirmar contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full px-4 py-4 pr-24 bg-purple-50 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 focus:bg-white transition-all duration-300 hover:border-purple-300 font-semibold"
                                            autoComplete="new-password"
                                            placeholder="Repetí la contraseña"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm((v) => !v)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-all duration-300 text-sm font-bold"
                                        >
                                            {showConfirm ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                {/* Botón */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {processing ? 'Guardando...' : '🔒 Restablecer contraseña'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Panel derecho – decorativo */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-500 via-pink-400 to-purple-600 text-white p-12 items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5" />
                    <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300/30 rounded-full blur-xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl animate-pulse" />
                    <div className="absolute top-40 right-40 w-24 h-24 bg-blue-300/30 rounded-full blur-xl" />

                    <div className="relative z-10 flex flex-col justify-center items-center text-center max-w-md" style={{ fontFamily: "'Quicksand', 'Nunito', 'Poppins', sans-serif" }}>
                        <div className="mb-8">
                            <img src="/images/logo.png" alt="Logo" className="w-48 h-auto mx-auto drop-shadow-2xl mb-6" />
                            <h1 className="text-5xl font-black mb-4 drop-shadow-lg">¡Casi listo!</h1>
                            <p className="text-xl font-semibold">Creá una contraseña segura para proteger tu cuenta</p>
                        </div>

                        <div className="space-y-4 w-full">
                            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-lg">Contraseña segura</h3>
                                    <p className="text-sm">Usá al menos 8 caracteres</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl p-5 border-2 border-white/30 shadow-xl">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-black text-lg">Acceso recuperado</h3>
                                    <p className="text-sm">Vas a poder ingresar normalmente</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </GuestLayout>
    );
}

