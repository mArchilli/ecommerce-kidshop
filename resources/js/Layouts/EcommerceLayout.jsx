import React, { useEffect, useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes, faUserShield } from '@fortawesome/free-solid-svg-icons';
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
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Head>
        <link rel="icon" type="image/png" href="/images/logo-tienda-de-ninios.png" />
      </Head>
      <nav className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md backdrop-saturate-150 bg-black/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center relative z-[80]">
          {/* Logo: oculto en mobile */}
          <Link
            href="/"
            className="text-white/90 hover:text-white text-lg font-bold transition-colors hidden md:block"
          >
            La Tienda de los Niños
          </Link>
          {/* Botones Inicio/Catálogo SIEMPRE visibles */}
          <div className="flex items-center space-x-2">
            <Link
              href={route('welcome')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                route().current('welcome')
                  ? 'bg-black/80 text-white border-black'
                  : 'text-white border-black hover:bg-black hover:text-white'
              }`}
            >
              Inicio
            </Link>
            <Link
              href={route('catalog.index')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                route().current('catalog.index')
                  ? 'bg-black text-white border-black'
                  : 'text-white border-black hover:bg-black hover:text-white'
              }`}
            >
              Catálogo
            </Link>
          </div>
          {/* Menú escritorio */}
          <div className="hidden md:flex items-center">
            <ul className="flex flex-row space-x-4 items-center">
              {/* Menú usuario */}
              {auth.user ? (
                <>
                  {auth.user.role === 'admin' && (
                    <li>
                      <Link
                        href={route('dashboard')}
                        className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
                        title="Panel de administración"
                      >
                        <FontAwesomeIcon icon={faUserShield} /> 
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href={route('profile.edit')}
                      className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
                      title="Mi perfil"
                    >
                      <FontAwesomeIcon icon={faUser} /> 
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href={route('cart.index')}
                      className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
                      className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
                      className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
                      title="Ingresar"
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('register')}
                      className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
            className="text-white text-2xl md:hidden"
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
            className="fixed inset-x-0 top-[64px] bottom-0 z-[70] bg-black/60 backdrop-blur-md backdrop-saturate-150 border-t border-white/10 md:hidden"
          >
            <ul className="flex flex-col p-4 space-y-2 bg-black/60 backdrop-blur-md backdrop-saturate-150 border-t border-white/10">
              {/* Menú usuario */}
              {auth.user ? (
                <>
                  {auth.user.role === 'admin' && (
                    <li>
                      <Link
                        href={route('dashboard')}
                        className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors "
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
                      className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      title="Mi perfil"
                    >
                      <FontAwesomeIcon icon={faUser} /> Perfil
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href={route('cart.index')}
                      className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
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
                      className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-left w-full"
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
                      className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      title="Ingresar"
                    >
                      Ingresar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('register')}
                      className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
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