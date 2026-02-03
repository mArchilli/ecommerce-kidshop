import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartButton = () => {
  const { auth } = usePage().props;
  
  // Solo mostrar si el usuario está autenticado
  if (!auth.user) {
    return null;
  }

  const cartCount = auth.cart_count || 0;
  
  

  return (
    <>
      <style>{`
        @keyframes pulse-cart {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes bounce-badge {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.1);
          }
        }
        
        .cart-button-container {
          animation: pulse-cart 2s ease-in-out infinite;
        }
        
        .cart-button-container:hover {
          animation: none;
        }
        
        .cart-badge {
          animation: bounce-badge 0.5s ease-in-out;
        }
      `}</style>
      
      <Link
        href={route('cart.index')}
        className="cart-button-container fixed bottom-6 right-6 z-50 group"
        title="Ver carrito"
      >
        <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
          {/* Efecto de resplandor */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-75 blur-xl transition-opacity duration-300"></div>
          
          {/* Icono del carrito */}
          <FontAwesomeIcon 
            icon={faShoppingCart} 
            className="text-white text-2xl relative z-10 group-hover:rotate-12 transition-transform duration-300"
          />
          
          {/* Badge con contador */}
          {cartCount > 0 && (
            <span className="cart-badge absolute -top-1 -right-1 flex items-center justify-center min-w-[32px] h-8 px-2 bg-gradient-to-br from-red-500 to-red-600 text-white text-sm font-extrabold rounded-full shadow-2xl border-3 border-white z-20 ring-2 ring-red-300">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
          
          {/* Anillo decorativo */}
          <div className="absolute inset-0 rounded-full border-4 border-white/30 group-hover:border-white/50 transition-all duration-300"></div>
        </div>
      </Link>
    </>
  );
};

export default CartButton;
