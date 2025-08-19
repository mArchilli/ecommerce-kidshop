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

            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex">
                {/* Columna izquierda (info) */}
                <div className="hidden lg:flex lg:w-1/2 justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
                        <div className="mb-8">
                            <div className="w-24 h-24 mx-auto bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                <span className="text-3xl font-bold">KS</span>
                            </div>
                            <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
                            <p className="text-lg text-neutral-200">
                                Accede a tu cuenta para continuar
                            </p>
                        </div>

                        <div className="space-y-4 max-w-md w-full">
                            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-sm font-semibold">
                                    1
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold">Compra segura</h3>
                                    <p className="text-sm text-neutral-200">
                                        Tus datos están protegidos
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-sm font-semibold">
                                    2
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold">Experiencia simple</h3>
                                    <p className="text-sm text-neutral-200">
                                        Acceso rápido y sin fricción
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
                        <div className="text-center mb-8 lg:hidden">
                            <div className="w-16 h-16 bg-gradient-to-br from-black to-neutral-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <span className="text-white font-bold text-2xl">KS</span>
                            </div>
                            <h1 className="text-2xl font-bold text-neutral-900">
                                Kidshop
                            </h1>
                            <p className="text-neutral-600 mt-2">Acceso a tu cuenta</p>
                        </div>

                        {/* Status (mensajes) */}
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        {/* Card del formulario */}
                        <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl transition-all duration-500">
                            <div className="p-8">
                                <form onSubmit={submit} className="space-y-6">
                                    {/* Email */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Correo electrónico"
                                            className="block text-sm font-medium text-neutral-700 mb-2 group-focus-within:text-black transition-colors duration-300"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="w-full px-4 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-300 transform focus:scale-[1.01] hover:border-neutral-300"
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
                                            className="block text-sm font-medium text-neutral-700 mb-2 group-focus-within:text-black transition-colors duration-300"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="w-full px-4 py-4 pr-12 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-300 transform focus:scale-[1.01] hover:border-neutral-300"
                                                autoComplete="current-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-all duration-300 text-sm"
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
                                            <span className="ml-3 text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-300">
                                                Recordar sesión
                                            </span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-neutral-800 hover:text-black transition-all duration-300 hover:underline"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        )}
                                    </div>

                                    {/* Botón */}
                                    <PrimaryButton
                                        className="w-full bg-black hover:bg-white  hover:text-black border border-black text-white py-4 text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] hover:-translate-y-0.5 transition-all duration-300 justify-center"
                                        disabled={processing}
                                    >
                                        Iniciar sesión
                                    </PrimaryButton>
                                </form>

                                {/* Info adicional */}
                                <div className="mt-8 pt-6 border-t border-neutral-200">
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
                                © {new Date().getFullYear()} Kidshop. Todos los derechos
                                reservados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
