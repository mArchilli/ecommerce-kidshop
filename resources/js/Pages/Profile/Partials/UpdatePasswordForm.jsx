import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`bg-gradient-to-br from-white to-green-50 rounded-2xl border-4 border-white shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow ${className}`}>
            <header className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-4 border-white rounded-xl p-3 sm:p-4 bg-gradient-to-r from-green-500 to-green-600 shadow-md">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">🔐</span>
                    Actualizar Contraseña
                </h2>
                <p className="mt-1 text-sm text-green-100">
                    Asegúrate de que tu cuenta esté usando una contraseña larga y aleatoria para mantenerla segura.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-neutral-700">
                        <span className="text-lg">🔑</span>
                        Contraseña Actual
                    </label>

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 hover:border-green-300 transition-all"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2 text-red-500 text-xs font-bold"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-neutral-700">
                        <span className="text-lg">🆕</span>
                        Nueva Contraseña
                    </label>

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 hover:border-green-300 transition-all"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2 text-red-500 text-xs font-bold" />
                </div>

                <div>
                    <label className="flex items-center gap-2 text-sm font-bold mb-2 text-neutral-700">
                        <span className="text-lg">✅</span>
                        Confirmar Contraseña
                    </label>

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-400 hover:border-green-300 transition-all"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2 text-red-500 text-xs font-bold"
                    />
                </div>

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