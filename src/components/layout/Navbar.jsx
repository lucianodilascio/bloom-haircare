// src/components/layout/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import CartWidget from '../../features/cart/components/CartWidget';

const Navbar = () => {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-stone-300 border-b border-stone-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-24">

          {/* SECCIÓN IZQUIERDA: Logo y Nombre de la marca */}
          <Link to="/" className="flex-1 flex items-center gap-4 cursor-pointer group">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-20 rounded-full object-cover border border-stone-100 shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
            <h1 className="text-2xl font-bold tracking-tight text-stone-800 hidden lg:block">
              Bloom Haircare
            </h1>
          </Link>

          {/* SECCIÓN CENTRAL: Navegación de escritorio 🌟 (Cambiado de md a lg para evitar colisiones) */}
          <div className="hidden lg:flex flex-none justify-center space-x-6 xl:space-x-8 items-center">
            <Link to="/" className="text-stone-600 hover:text-stone-900 font-medium transition-colors border-b-2 border-transparent hover:border-stone-900 pb-1 text-sm">Inicio</Link>
            <Link to="/category/shampoos-enjuagues" className="text-stone-600 hover:text-stone-900 font-medium transition-colors border-b-2 border-transparent hover:border-stone-900 pb-1 text-sm">Shampoos y Enjuagues</Link>
            <Link to="/category/mascaras-tratamientos" className="text-stone-600 hover:text-stone-900 font-medium transition-colors border-b-2 border-transparent hover:border-stone-900 pb-1 text-sm">Máscaras y Tratamientos</Link>
            <Link to="/category/serums-ampollas" className="text-stone-600 hover:text-stone-900 font-medium transition-colors border-b-2 border-transparent hover:border-stone-900 pb-1 text-sm">Sérums y Ampollas</Link>
          </div>

          {/* SECCIÓN DERECHA: Carrito, Panel Admin y Botón de Menú Hamburguesa */}
          <div className="flex-1 flex justify-end items-center gap-4">

            {/* BOTÓN PANEL ADMIN (Escritorio/Tablet): Se mantiene visible desde sm gracias al espacio liberado */}
            <Link 
              to="/admin" 
              className="text-[11px] font-bold uppercase tracking-widest bg-stone-100 hover:bg-stone-900 text-stone-700 hover:text-white px-3 py-2 rounded-xl border border-stone-200/60 transition-all duration-300 active:scale-95 cursor-pointer hidden sm:block"
            >
              Panel Admin
            </Link>

            {/* BOTÓN HAMBURGUESA: 🌟 (Ahora se oculta recién en lg:hidden para cubrir el rango de tablets) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all active:scale-95 cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <CartWidget />
          </div>

        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE: 🌟 (Cambiado de md:hidden a lg:hidden) */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-md border-b border-stone-200/80 px-4 pt-2 pb-6 space-y-2 shadow-lg transition-all duration-300 ${
          isOpen 
            ? "opacity-100 pointer-events-auto translate-y-0" 
            : "opacity-0 pointer-events-none -translate-y-2"
        }`}
        id="mobile-menu"
      >
        <Link to="/" onClick={() => setIsOpen(false)} className="block text-stone-600 hover:text-stone-900 font-medium py-2.5 px-3 rounded-xl hover:bg-stone-50/50 transition-colors text-sm text-center">Inicio</Link>
        <Link to="/category/shampoos-enjuagues" onClick={() => setIsOpen(false)} className="block text-stone-600 hover:text-stone-900 font-medium py-2.5 px-3 rounded-xl hover:bg-stone-50/50 transition-colors text-sm text-center">Shampoos y Enjuagues</Link>
        <Link to="/category/mascaras-tratamientos" onClick={() => setIsOpen(false)} className="block text-stone-600 hover:text-stone-900 font-medium py-2.5 px-3 rounded-xl hover:bg-stone-50/50 transition-colors text-sm text-center">Máscaras y Tratamientos</Link>
        <Link to="/category/serums-ampollas" onClick={() => setIsOpen(false)} className="block text-stone-600 hover:text-stone-900 font-medium py-2.5 px-3 rounded-xl hover:bg-stone-50/50 transition-colors text-sm text-center">Sérums y Ampollas</Link>
        
        {/* 🌟 ACCESIBILIDAD: Agregamos el Panel Admin dentro del menú móvil (Solo visible en pantallas bien chicas) */}
        <Link 
          to="/admin" 
          onClick={() => setIsOpen(false)} 
          className="block sm:hidden text-center text-[11px] font-bold uppercase tracking-widest bg-stone-900 text-white mt-4 py-3 rounded-xl transition-all active:scale-95"
        >
          Panel Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;