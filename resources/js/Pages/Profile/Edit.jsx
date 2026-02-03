import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <EcommerceLayout>
            <Head title="Mi Perfil" />

            <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-cyan-50 py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 text-center" data-aos="fade-down">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                            <span className="text-5xl">👤</span>
                            Mi Perfil
                        </h1>
                        <p className="text-lg text-gray-600">
                            Gestiona tu información personal y configuración de cuenta
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div data-aos="fade-up" data-aos-delay="100">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </div>

                        <div data-aos="fade-up" data-aos-delay="200">
                            <UpdatePasswordForm />
                        </div>

                        <div data-aos="fade-up" data-aos-delay="300">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </EcommerceLayout>
    );
}
