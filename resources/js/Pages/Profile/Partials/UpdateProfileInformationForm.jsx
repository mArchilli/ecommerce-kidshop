import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={`bg-gradient-to-br from-white to-purple-50 rounded-2xl border-4 border-white shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow ${className}`}>
            <div className="flex items-center gap-4 mb-4">
                <Link
                    href={route('welcome')}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl"
                    style={{ backgroundColor: '#9B59B6' }}
                >
                    ← Volver a la tienda
                </Link>
            </div>
            
            <header className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-4 border-white rounded-xl p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-purple-600 shadow-md">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">👤</span>
                    Información del Perfil
                </h2>
                <p className="mt-1 text-sm text-purple-100">
                    Actualiza la información del perfil y la dirección de correo electrónico de tu cuenta.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-neutral-700">
                        <span className="text-lg">📛</span>
                        Nombre y Apellido
                    </label>

                    <TextInput
                        id="name"
                        className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 hover:border-purple-300 transition-all"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2 text-red-500 text-xs font-bold" message={errors.name} />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-neutral-700">
                        <span className="text-lg">📧</span>
                        Correo Electrónico
                    </label>

                    <TextInput
                        id="email"
                        type="email"
                        className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 hover:border-purple-300 transition-all"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2 text-red-500 text-xs font-bold" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                        <p className="text-sm text-yellow-800">
                            ⚠️ Tu dirección de correo electrónico no está verificada.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 rounded-md text-sm text-purple-600 underline hover:text-purple-800 font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            >
                                Haz clic aquí para reenviar el correo de verificación.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                ✅ Se ha enviado un nuevo enlace de verificación a tu dirección de correo electrónico.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#27AE60' }}
                    >
                        💾 Guardar
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 font-bold">
                            ✅ Guardado.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}