import React, { useEffect, useState } from 'react';
import { Link, usePage, Head } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faBars, faTimes, faUserShield, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/Components/Footer';
import CartButton from '@/Components/CartButton';

const EcommerceLayout = ({ children }) => {
  const { auth, flash } = usePage().props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const isHomePage = route().current('welcome');

  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error)   toast.error(flash.error);
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
                  className="text-white text-sm font-semibold hover:text-cyan-200 transition-colors"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href={route('catalog.index')}
                  className="text-white text-sm font-semibold hover:text-cyan-200 transition-colors"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)' }}
                >
                  Catálogo
                </Link>
              </li>
              {/* Menú usuario */}
              {auth.user ? (
                <>
                  <li className="relative">
                    <button
                      type="button"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 text-white hover:text-cyan-200 transition-colors"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)' }}
                    >
                      <span className="text-sm font-semibold">{auth.user.name}</span>
                      <svg className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Menú desplegable */}
                    {isUserMenuOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-[70]" 
                          onClick={() => setIsUserMenuOpen(false)}
                        />
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-[75] border-2 border-purple-100">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3">
                            <p className="text-white font-bold text-sm truncate">{auth.user.name}</p>
                            <p className="text-purple-100 text-xs truncate">{auth.user.email}</p>
                          </div>
                          <div className="py-2">
                            {auth.user.role === 'admin' && (
                              <Link
                                href={route('dashboard')}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <FontAwesomeIcon icon={faUserShield} className="w-4" />
                                <span className="text-sm font-semibold">Administración</span>
                              </Link>
                            )}
                            <Link
                              href={route('profile.edit')}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 transition-all"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <FontAwesomeIcon icon={faUser} className="w-4" />
                              <span className="text-sm font-semibold">Mi Perfil</span>
                            </Link>
                            <Link
                              href={route('user.orders.index')}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600 transition-all"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <FontAwesomeIcon icon={faClipboardList} className="w-4" />
                              <span className="text-sm font-semibold">Mis Compras</span>
                            </Link>
                            <div className="border-t border-gray-200 my-2"></div>
                            <Link
                              href={route('logout')}
                              method="post"
                              as="button"
                              className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all w-full text-left"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <span className="text-sm font-semibold">Cerrar Sesión</span>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href={route('login')}
                      className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      title="Ingresar"
                    >
                      Ingresar
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('register')}
                      className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
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
      {!route().current('welcome') && <div className="h-14 md:h-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50" aria-hidden="true" />}

      <main className="flex-grow bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">{children}</main>
      <CartButton />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default EcommerceLayout;