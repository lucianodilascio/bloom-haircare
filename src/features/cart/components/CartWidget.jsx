
import { useContext } from 'react'; // 👈 1. IMPORTAMOS EL HOOK
import { Link } from 'react-router-dom';//👈  2. IMPORTAMOS LINK
import { CartContext } from '../../../context/CartContext'; // 👈 IMPORTAMOS EL CONTEXTO

const CartWidget = () => {
  // 👈 2. CONECTAMOS EL CABLE: Traemos la función matemática que cuenta el total de items
  const { totalQuantity } = useContext(CartContext);

  return (
    // 👈 2. CAMBIAMOS <button> POR <Link to="/cart">
    <Link to="/cart" className="relative p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-all group cursor-pointer">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 group-hover:scale-110 transition-transform" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      
      {totalQuantity() > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-700 rounded-full animate-fade-in">
          {totalQuantity()}
        </span>
      )}
    </Link> // 👈 CERRRAMOS EL LINK
  );
};

export default CartWidget;