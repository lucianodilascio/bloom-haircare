// src/features/cart/components/CartView.jsx
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import { Link } from 'react-router-dom';

const CartView = () => {
  // Traemos todo el arsenal del estado global
  const { cart, removeItem, clear, totalPrice, totalQuantity } = useContext(CartContext);

  // PANTALLA 1: Si el carrito está completamente vacío
  if (cart.length === 0) {
    return (
      <main className="max-w-md mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-stone-800 tracking-tight">Tu bolsa está vacía</h2>
        <p className="mt-2 text-sm text-stone-500">¿Todavía no sabés qué regalarle a tu cabello hoy? Explorá el catálogo exclusivo de Bloom.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 px-6 rounded-xl text-sm transition-all shadow-sm active:scale-95 duration-150">
          Explorar productos
        </Link>
      </main>
    );
  }

  // PANTALLA 2: Si el carrito contiene items comprados
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-black text-stone-800 tracking-tight text-left mb-8">
        Tu Bolsa de Compras ({totalQuantity()} items)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda (Ocupa 2 espacios): Lista de Productos */}
        <div className="lg:grid lg:col-span-2 space-y-4">
          {cart.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-stone-200 p-4 flex gap-4 items-center relative group">
              {/* Miniatura de Imagen */}
              <div className="w-20 h-20 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Textos del Producto */}
              <div className="flex-grow text-left pr-8">
                <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">{product.line}</span>
                <h3 className="text-sm font-bold text-stone-800 leading-snug mt-0.5">{product.name}</h3>
                <p className="text-xs text-stone-500 mt-1">
                  {product.quantity} u.  ×  ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </p>
              </div>

              {/* Subtotal de esta tarjeta */}
              <div className="text-right flex-shrink-0">
                <span className="text-sm font-black text-stone-900">
                  ${(product.price * product.quantity).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Botón eliminar individual (Tachito/X) */}
              <button 
                onClick={() => removeItem(product.id)}
                className="absolute top-4 right-4 p-1 text-stone-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                title="Eliminar producto"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}

          {/* Botón para vaciar todo */}
          <div className="flex justify-center pt-4">
            <button 
              onClick={clear}
              className="inline-flex items-center gap-2 border border-stone-200 bg-stone-100/60 hover:bg-stone-200/80 text-stone-600 hover:text-stone-900 font-medium py-2 px-5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-sm active:scale-[0.98] duration-150 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Vaciar carrito
            </button>
          </div>
          
        </div>

        {/* Columna Derecha (Ocupa 1 espacio): Resumen de Facturación */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm h-fit text-left flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-800 tracking-tight border-b border-stone-100 pb-3">Resumen de pedido</h3>
            
            <div className="mt-4 space-y-2 border-b border-stone-100 pb-4">
              <div className="flex justify-between text-sm text-stone-500">
                <span>Subtotal ({totalQuantity()} productos)</span>
                <span>${totalPrice().toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-500">
                <span>Envío</span>
                <span className="text-emerald-600 font-medium">Gratis</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-baseline">
              <span className="text-base font-bold text-stone-800">Total</span>
              <div className="text-right">
                <span className="text-2xl font-black text-stone-900 block">
                  ${totalPrice().toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] font-bold text-stone-400 block tracking-widest uppercase mt-0.5">O 3 cuotas sin interés de ${(totalPrice() / 3).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-sm active:scale-[0.98] duration-150 flex items-center justify-center gap-2 cursor-pointer">
            Finalizar Compra
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartView;