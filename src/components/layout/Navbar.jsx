// src/components/layout/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import CartWidget from '../../features/cart/components/CartWidget';

const Navbar = () => {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Se añade 'relative' para asegurar el correcto posicionamiento del menú absolute
    <nav className="bg-stone-300 border-b border-stone-200 sticky top-0  z-50 shadow-sm">
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

          {/* SECCIÓN CENTRAL: Navegación de escritorio (oculta en móviles) */}
          <div className="hidden md:flex flex-none justify-center space-x-8 items-center">
            <Link to="/" className="text-stone-600 hover:text-stone-900 font-medium transition-colors border-b-2 border-transparent hover:border-stone-900 pb-1 text-sm">Inicio</Link>
            <Link to="/category/shampoos-enjuagues" className="text-stone-600 hover:text-stone-900 font-medium transition-colors border-b-2 border-transparent hover:border-stone-900 pb-1 text-sm">Shampoos y Enjuagues</Link>
            <Link to="/category/mascaras-tratamientos" className="text-stone-600 hover:text-stone-900 font-medium transition-colors border-b-2 border-transparent hover:border-stone-900 pb-1 text-sm">Máscaras y Tratamientos</Link>
            <Link to="/category/serums-ampollas" className="text-stone-600 hover:text-stone-900 font-medium transition-colors border-b-2 border-transparent hover:border-stone-900 pb-1 text-sm">Sérums y Ampollas</Link>
          </div>

          {/* SECCIÓN DERECHA: Carrito y Botón de Menú Hamburguesa */}
          <div className="flex-1 flex justify-end items-center gap-4">

            {/* BOTÓN HAMBURGUESA RESTAURADO: Solo se ve en dispositivos móviles (md:hidden) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all active:scale-95 cursor-pointer"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                // Icono de "X" (Cerrar) cuando el menú está abierto
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Icono de "Hamburguesa" (Tres líneas) cuando el menú está cerrado
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <CartWidget />
          </div>

        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE: Efecto Frosted Glass Premium */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/10 backdrop-blur-md border-b border-stone-200/80 px-4 pt-2 pb-6 space-y-2 shadow-lg transition-all duration-300 ${
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
      </div>
    </nav>
  );
};

export default Navbar;