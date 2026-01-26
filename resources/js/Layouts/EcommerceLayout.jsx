import React, { useEffect, useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes, faUserShield, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/Components/Footer';

const EcommerceLayout = ({ children }) => {
  const { auth, flash } = usePage().props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (flash && flash.type === 'error') {
      toast.error(flash.message);
    } else if (flash && flash.type === 'success') {
      toast.success(flash.message);
    }
  }, [flash]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black overflow-x-hidden">
      <Head>
        <link rel="icon" type="image/png" href="/images/logo-tienda-de-ninios.png" />
      </Head>
      <nav className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md backdrop-saturate-150 bg-white/90 border-b border-gray-200 shadow-sm overflow-x-hidden">
        <div className="mx-auto max-w-7xl w-full px-4 py-3 flex justify-between items-center relative z-[80]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity flex-shrink-0"
          >
            <img 
              src="/images/logo.png" 
              alt="La Tienda de los Niños" 
              className="h-12 w-auto"
            />
            <span className="text-gray-800 text-xl font-bold hidden lg:block">
              La Tienda de los Niños
            </span>
          </Link>
          {/* Botones Inicio/Catálogo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href={route('welcome')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                route().current('welcome')
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 hover:text-white hover:shadow-md'
              }`}
            >
              Inicio
            </Link>
            <Link
              href={route('catalog.index')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                route().current('catalog.index')
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-400 hover:text-white hover:shadow-md'
              }`}
            >
              Catálogo
            </Link>
          </div>
          {/* Menú escritorio */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <ul className="flex flex-row gap-4 items-center">
              {/* Menú usuario */}
              {auth.user ? (
                <>
                  {auth.user.role === 'admin' && (
                    <li>
                      <Link
                        href={route('dashboard')}
                        className="text-gray-700 block py-2 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        title="Panel de administración"
                      >
                        <FontAwesomeIcon icon={faUserShield} /> 
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href={route('profile.edit')}
                      className="text-gray-700 block py-2 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      title="Mi perfil"
                    >
                      <FontAwesomeIcon icon={faUser} /> 
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('user.orders.index')}
                      className="text-gray-700 block py-2 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      title="Mis compras"
                    >
                      <FontAwesomeIcon icon={faClipboardList} /> 
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href={route('cart.index')}
                      className="text-gray-700 block py-2 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      title="Carrito"
                    >
                      <span className="relative inline-block">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {auth.cart_count > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow border border-white">
                            {auth.cart_count}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="text-gray-700 block py-2 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      title="Cerrar sesión"
                    >
                      Cerrar Sesión
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href={route('login')}
                      className="px-5 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                      title="Ingresar"
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('register')}
                      className="px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500 transition-all shadow-md"
                      title="Registrarse"
                    >
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {/* Botón menú hamburguesa */}
          <button
            className="text-gray-700 text-2xl md:hidden flex-shrink-0 p-2 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
        </div>
        {/* Menú hamburguesa solo para usuario en mobile */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-[64px] bottom-0 z-[70] bg-white/95 backdrop-blur-md backdrop-saturate-150 border-t border-gray-200 md:hidden overflow-y-auto overflow-x-hidden"
          >
            <ul className="flex flex-col p-4 space-y-2 bg-white/95 backdrop-blur-md backdrop-saturate-150 border-t border-gray-200 w-full">
              {/* Menú usuario */}
              {auth.user ? (
                <>
                  {auth.user.role === 'admin' && (
                    <li>
                      <Link
                        href={route('dashboard')}
                        className="text-gray-700 block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors "
                        onClick={() => setIsMenuOpen(false)}
                        title="Panel de administración"
                      >
                        <FontAwesomeIcon icon={faUserShield} /> Administracion
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href={route('profile.edit')}
                      className="text-gray-700 block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      title="Mi perfil"
                    >
                      <FontAwesomeIcon icon={faUser} /> Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('user.orders.index')}
                      className="text-gray-700 block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      title="Mis compras"
                    >
                      <FontAwesomeIcon icon={faClipboardList} /> Mis Compras
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href={route('cart.index')}
                      className="text-gray-700 block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      title="Carrito"
                    >
                      <span className="relative inline-block">
                        <FontAwesomeIcon icon={faShoppingCart} /> Carrito
                        {auth.cart_count > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow border border-white">
                            {auth.cart_count}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="text-gray-700 block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-left w-full"
                      onClick={() => setIsMenuOpen(false)}
                      title="Cerrar sesión"
                    >
                      Cerrar Sesión
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href={route('login')}
                      className="text-gray-700 block py-3 px-4 rounded-lg bg-gray-100 hover:bg-blue-500 hover:text-white transition-all text-center font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                      title="Ingresar"
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('register')}
                      className="text-white block py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all text-center font-semibold shadow-md"
                      onClick={() => setIsMenuOpen(false)}
                      title="Registrarse"
                    >
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Spacer condicional: evita empuje solo fuera de la home */}
      {!route().current('welcome') && <div className="h-24 md:h-20" aria-hidden="true" />}

      <main className="flex-grow">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default EcommerceLayout;