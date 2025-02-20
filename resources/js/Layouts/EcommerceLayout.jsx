import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const EcommerceLayout = ({ children }) => {
  const { auth, flash } = usePage().props;

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-lg font-bold">Ecommerce</Link>
          <div>
            {auth.user ? (
              <>
                {auth.user.role === 'admin' && (
                  <Link href={route('dashboard')} className="text-white mr-4">Dashboard</Link>
                )}
                <Link href={route('logout')} method="post" as="button" className="text-white">Cerrar Sesion</Link>
              </>
            ) : (
              <Link href={route('login')} className="text-white">Login</Link>
            )}
          </div>
        </div>
      </nav>
      {flash && flash.message && (
        <div className="bg-red-500 text-white p-4 text-center">
          {flash.message}
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 p-4 text-white text-center">
        &copy; 2025 Nuestro Ecommerce. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default EcommerceLayout;