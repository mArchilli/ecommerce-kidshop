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
  const [scrollY, setScrollY] = useState(0);
  const isHomePage = route().current('welcome');

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black overflow-x-hidden">
      <Head>
        <link rel="icon" type="image/png" href="/images/logo-tienda-de-ninios.png" />
      </Head>
      <nav className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md backdrop-saturate-150 bg-white/20">
        <div className="mx-auto max-w-7xl w-full px-4 py-3 flex justify-between items-center relative z-[80]">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-3 hover:opacity-80 transition-all duration-300 flex-shrink-0 ${
              isHomePage && scrollY === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <img 
              src="/images/logo.png" 
              alt="La Tienda de los Niños" 
              className="h-8 w-auto"
            />
            <span className="text-black text-base font-bold hidden lg:block" style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>
              La Tienda de los Niños
            </span>
          </Link>
          {/* Spacer para empujar todo a la derecha */}
          <div className="flex-1"></div>
          {/* Menú escritorio */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <ul className="flex flex-row gap-6 items-center">
              {/* Botones Inicio/Catálogo */}
              <li>
                <Link
                  href={route('welcome')}
                  className="text-black text-sm font-semibold hover:text-blue-600 transition-colors"
                  style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href={route('catalog.index')}
                  className="text-black text-sm font-semibold hover:text-blue-600 transition-colors"
                  style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
                >
                  Catálogo
                </Link>
              </li>
              {/* Menú usuario */}
              {auth.user ? (
                <>
                  {auth.user.role === 'admin' && (
                    <li>
                      <Link
                        href={route('dashboard')}
                        className="text-black hover:text-blue-600 transition-colors"
                        title="Panel de administración"
                        style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
                      >
                        <FontAwesomeIcon icon={faUserShield} /> 
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      href={route('profile.edit')}
                      className="text-black hover:text-blue-600 transition-colors"
                      title="Mi perfil"
                      style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
                    >
                      <FontAwesomeIcon icon={faUser} /> 
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('user.orders.index')}
                      className="text-black hover:text-blue-600 transition-colors"
                      title="Mis compras"
                      style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
                    >
                      <FontAwesomeIcon icon={faClipboardList} /> 
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      href={route('cart.index')}
                      className="text-black hover:text-blue-600 transition-colors"
                      title="Carrito"
                      style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
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
                      className="text-black hover:text-blue-600 transition-colors text-sm font-semibold"
                      title="Cerrar sesión"
                      style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
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
                      className="text-black text-sm font-semibold hover:text-blue-600 transition-colors"
                      title="Ingresar"
                      style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
                    >
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('register')}
                      className="text-black text-sm font-semibold hover:text-blue-600 transition-colors"
                      title="Registrarse"
                      style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}
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
            type="button"
            className="text-gray-700 text-2xl md:hidden flex-shrink-0 p-2 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
          </button>
        </div>
      </nav>
      
      {/* Overlay oscuro al abrir menú */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[85] md:hidden transition-opacity"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menú hamburguesa deslizante desde la derecha */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-screen w-64 max-w-[75vw] z-[90] bg-white shadow-2xl md:hidden overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Cerrar menú"
        >
          <FontAwesomeIcon icon={faTimes} className="text-2xl" />
        </button>

        <ul className="flex flex-col p-6 pt-20 space-y-3 w-full">
          {/* Navegación principal */}
          <li>
            <Link
              href={route('welcome')}
              className="text-gray-700 block py-3 px-4 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all text-center font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href={route('catalog.index')}
              className="text-gray-700 block py-3 px-4 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all text-center font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </Link>
          </li>

          {/* Divisor */}
          {!auth.user && <div className="border-t border-gray-200 my-2"></div>}

          {/* Menú usuario autenticado */}
          {auth.user ? (
            <>
              <div className="border-t border-gray-200 my-2"></div>
              {auth.user.role === 'admin' && (
                <li>
                  <Link
                    href={route('dashboard')}
                    className="text-gray-700 block py-3 px-4 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all text-center font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUserShield} /> Administración
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href={route('profile.edit')}
                  className="text-gray-700 block py-3 px-4 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all text-center font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faUser} /> Perfil
                </Link>
              </li>
              <li>
                <Link
                  href={route('user.orders.index')}
                  className="text-gray-700 block py-3 px-4 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all text-center font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faClipboardList} /> Mis Compras
                </Link>
              </li>
              <li>
                <Link
                  href={route('cart.index')}
                  className="text-gray-700 block py-3 px-4 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all text-center font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Carrito
                  {auth.cart_count > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {auth.cart_count}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="text-white block py-3 px-4 rounded-full bg-red-500 hover:bg-red-600 transition-all text-center font-semibold w-full"
                  onClick={() => setIsMenuOpen(false)}
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
                  className="text-gray-700 block py-3 px-4 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-all text-center font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link
                  href={route('register')}
                  className="text-white block py-3 px-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all text-center font-semibold shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
        

      {/* Spacer condicional: evita empuje solo fuera de la home */}
      {!route().current('welcome') && <div className="h-24 md:h-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50" aria-hidden="true" />}

      <main className="flex-grow">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default EcommerceLayout;