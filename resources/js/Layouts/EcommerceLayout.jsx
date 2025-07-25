import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EcommerceLayout = ({ children }) => {
  const { auth, flash } = usePage().props; // Obtener el mensaje flash
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú

  useEffect(() => {
    if (flash && flash.type === 'error') {
      toast.error(flash.message); // Mostrar notificación de error
    } else if (flash && flash.type === 'success') {
      toast.success(flash.message); // Mostrar notificación de éxito (si aplica)
    }
  }, [flash]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-lg font-bold">
            La Tienda de los Niños
          </Link>
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent z-50`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-4 items-center md:items-center">
              {auth.user ? (
                <>
                  {auth.user.role === 'admin' && (
                    <li>
                      <Link href={route('dashboard')} className="text-white block py-2 px-4">
                        <FontAwesomeIcon icon={faUserShield} /> Panel Administrador
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href={route('profile.edit')} className="text-white block py-2 px-4">
                      <FontAwesomeIcon icon={faUser} /> Perfil
                    </Link>
                  </li>
                  <li>
                    <Link href={route('cart.index')} className="text-white block py-2 px-4">
                      <FontAwesomeIcon icon={faShoppingCart} /> Carrito
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="text-white block py-2 px-4"
                    >
                      Cerrar Sesión
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={route('login')} className="text-white block py-2 px-4">
                      Ingresar
                    </Link>
                  </li>
                  <li>
                    <Link href={route('register')} className="text-white block py-2 px-4">
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="bg-black p-4 text-white text-center">
        &copy; 2025 La Tienda de los Niños. Sitio desarrollado por <a href="https://www.archillimatias.dev" className="underline" target="_blank">Archilli Matias</a>
      </footer>

      {/* Contenedor de notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default EcommerceLayout;