import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`bg-gradient-to-br from-white to-red-50 rounded-2xl border-4 border-white shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow ${className}`}>
            <header className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-4 border-white rounded-xl p-3 sm:p-4 bg-gradient-to-r from-red-500 to-red-600 shadow-md">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">⚠️</span>
                    Eliminar Cuenta
                </h2>
                <p className="mt-1 text-sm text-red-100">
                    Una vez que tu cuenta sea eliminada, todos sus recursos y datos serán eliminados permanentemente. Antes de eliminar tu cuenta, por favor descarga cualquier dato o información que desees conservar.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
                🗑️ Eliminar Cuenta
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 bg-gradient-to-br from-white to-red-50 rounded-2xl">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 mb-6 shadow-md">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="text-2xl">⚠️</span>
                            ¿Estás seguro de que deseas eliminar tu cuenta?
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-700 mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                        <span className="font-bold text-yellow-800">⚡ Advertencia:</span> Una vez que tu cuenta sea eliminada, todos sus recursos y datos serán eliminados permanentemente. Por favor, ingresa tu contraseña para confirmar que deseas eliminar tu cuenta permanentemente.
                    </p>

                    <div className="mt-6">
                        <label className="flex items-center gap-2 text-sm font-bold mb-2 text-neutral-700">
                            <span className="text-lg">🔑</span>
                            Contraseña
                        </label>

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="w-full rounded-xl border-2 border-neutral-300 px-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-400 hover:border-red-300 transition-all"
                            isFocused
                            placeholder="Ingresa tu contraseña"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-red-600 text-xs font-bold"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-gray-700 hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl bg-gray-200 hover:bg-gray-300"
                        >
                            ❌ Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white hover:scale-105 transform transition-all duration-300 shadow-md hover:shadow-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            🗑️ Eliminar Cuenta
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}