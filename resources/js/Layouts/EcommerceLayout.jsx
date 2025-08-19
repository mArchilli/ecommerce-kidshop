import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
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

  // Bloquear el scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-[60] backdrop-blur-md backdrop-saturate-150 bg-black/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center relative z-[80]">
          <Link href="/" className="text-white/90 hover:text-white text-lg font-bold transition-colors">
            La Tienda de los Niños
          </Link>
          <button
            className="text-white text-2xl md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
          </button>

          {/* Menú escritorio */}
          <div className="hidden md:flex items-center">
            <ul className="flex flex-row space-x-4 items-center">
              {auth.user ? (
                <>
                  {auth.user.role === 'admin' && (
                    <li>
                      <Link href={route('dashboard')} className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
                        <FontAwesomeIcon icon={faUserShield} /> Panel Administrador
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href={route('profile.edit')} className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
                      <FontAwesomeIcon icon={faUser} /> Perfil
                    </Link>
                  </li>
                  <li>
                    <Link href={route('cart.index')} className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
                      <FontAwesomeIcon icon={faShoppingCart} /> Carrito
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Cerrar Sesión
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={route('login')} className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
                      Iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link href={route('register')} className="text-white block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Subnavegación global: Inicio / Catalogo */}
        <div className="relative z-[50] w-full">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex space-x-2 justify-center py-3">
              <li>
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
              </li>
              <li>
                <Link
                  href={route('catalog.index')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                    route().current('catalog.index')
                      ? 'bg-black text-white border-black'
                      : 'text-white border-black hover:bg-black hover:text-white'
                  }`}
                >
                  Catalogo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Overlay menú móvil - se despliega por encima de Inicio/Catálogo */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[64px] bottom-0 z-[70] bg-black/80 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col p-4 space-y-2">
            {auth.user ? (
              <>
                {auth.user.role === 'admin' && (
                  <li>
                    <Link
                      href={route('dashboard')}
                      className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FontAwesomeIcon icon={faUserShield} /> Panel Administrador
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href={route('profile.edit')}
                    className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUser} /> Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    href={route('cart.index')}
                    className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} /> Carrito
                  </Link>
                </li>
                <li>
                  <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors text-left w-full"
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
                    className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ingresar
                  </Link>
                </li>
                <li>
                  <Link
                    href={route('register')}
                    className="text-white block py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Spacer condicional: evita empuje solo fuera de la home */}
      {!route().current('welcome') && <div className="h-24 md:h-28" aria-hidden="true" />}

      <main className="flex-grow">{children}</main>

      {/* Reemplaza el footer inline por el componente */}
      <Footer />

      <ToastContainer />
    </div>
  );
};

export default EcommerceLayout;