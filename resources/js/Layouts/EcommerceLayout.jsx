import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const EcommerceLayout = ({ children }) => {
  const { auth, flash } = usePage().props;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-lg font-bold">
            Ecommerce
          </Link>
          <div>
            {auth.user ? (
              <>
                {auth.user.role === 'admin' && (
                  <Link href={route('dashboard')} className="text-white mr-4">
                    Dashboard
                  </Link>
                )}
                <Link href={route('cart.index')} className="text-white mr-4">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="text-white"
                >
                  Cerrar Sesión
                </Link>
              </>
            ) : (
              <>
                <Link href={route('login')} className="text-white mr-4">
                  Ingresar
                </Link>
                <Link href={route('register')} className="text-white">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {flash && flash.message && (
        <div className="bg-black text-white p-4 text-center">
          {flash.message}
        </div>
      )}
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-black p-4 text-white text-center">
        &copy; 2025 Nuestro Ecommerce. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default EcommerceLayout;