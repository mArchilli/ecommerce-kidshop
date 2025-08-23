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

            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex">
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
                        <div className="text-center mb-8 lg:hidden">
                            <h1 className="text-2xl font-bold text-neutral-900">Crear cuenta</h1>
                            <p className="text-neutral-600 mt-2">Regístrate para comenzar</p>
                        </div>

                        {/* Card del formulario */}
                        <div className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 rounded-2xl transition-all duration-500">
                            <div className="p-8">
                                <form onSubmit={submit} className="space-y-6">
                                    {/* Nombre */}
                                    <div className="group">
                                        <InputLabel
                                            htmlFor="name"
                                            value="Nombre"
                                            className="block text-sm font-medium text-neutral-700 mb-2"
                                        />
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="w-full px-4 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-300 hover:border-neutral-300"
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
                                            className="block text-sm font-medium text-neutral-700 mb-2"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="w-full px-4 py-4 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-300 hover:border-neutral-300"
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
                                            className="block text-sm font-medium text-neutral-700 mb-2"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={data.password}
                                                className="w-full px-4 py-4 pr-12 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-300 hover:border-neutral-300"
                                                autoComplete="new-password"
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-all duration-300 text-sm"
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
                                            className="block text-sm font-medium text-neutral-700 mb-2"
                                        />
                                        <div className="relative">
                                            <TextInput
                                                id="password_confirmation"
                                                type={showPasswordConfirm ? 'text' : 'password'}
                                                name="password_confirmation"
                                                value={data.password_confirmation}
                                                className="w-full px-4 py-4 pr-12 bg-neutral-50 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-300 hover:border-neutral-300"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData('password_confirmation', e.target.value)
                                                }
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPasswordConfirm((v) => !v)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-all duration-300 text-sm"
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
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={route('login')}
                                            className="text-sm text-neutral-800 hover:text-black transition-all duration-300 hover:underline"
                                        >
                                            ¿Ya tienes cuenta? Iniciar sesión
                                        </Link>

                                        <PrimaryButton
                                            className="bg-black hover:bg-neutral-800 text-white py-3 px-5 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300 border-0"
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
                <div className="hidden lg:flex lg:w-1/2 justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden text-white">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>

                    <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
                        <div className="mb-8">
                            <div className="w-24 h-24 mx-auto bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                <span className="text-3xl font-bold">KS</span>
                            </div>
                            <h2 className="text-4xl font-bold mb-4">Únete a Kidshop</h2>
                            <p className="text-lg text-neutral-200">
                                Crea tu cuenta y comienza a disfrutar
                            </p>
                        </div>

                        <div className="space-y-4 max-w-md w-full">
                            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-sm font-semibold">
                                    1
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold">Compra segura</h3>
                                    <p className="text-sm text-neutral-200">Tus datos están protegidos</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-sm font-semibold">
                                    2
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold">Experiencia simple</h3>
                                    <p className="text-sm text-neutral-200">Registro rápido y sin fricción</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}