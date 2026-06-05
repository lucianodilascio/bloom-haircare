// src/features/cart/components/CartView.jsx
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import Swal from 'sweetalert2';

const CartView = () => {
  // Traemos todo el arsenal del estado global
  const { cart, removeItem, clear, totalPrice, totalQuantity } = useContext(CartContext);

  // 🚀 Lógica para controlar la transición fluida con Spinner al Checkout
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  // 🚚 ESTADOS NUEVOS: Lógica de simulación de envío
  const [postalCode, setPostalCode] = useState('');
  const [shippingCost, setShippingCost] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Lógica de cálculo comercial de Bloom
  const subtotal = totalPrice();
  const freeShippingThreshold = 50000;
  const isFreeShipping = subtotal >= freeShippingThreshold;

  // Función inteligente para simular la cotización con el correo
  const handleCalculateShipping = (e) => {
    e.preventDefault();
    
    // 🔍 Validamos que tenga exactamente 4 dígitos antes de correr la simulación
    if (postalCode.length !== 4) return;

    setIsCalculating(true);

    // Simulamos una deley de API de correo (800ms)
    setTimeout(() => {
      // 🚚 NUEVA LÓGICA: 
      if (postalCode === '7400') {
        setShippingCost(0); // ✨ Olavarría: ¡Entrega local GRATIS!
      } else if (postalCode.startsWith('7')) {
        setShippingCost(3500); // Resto de Provincia de BSAS
      } else {
        setShippingCost(5800); // Resto del país
      }
      setIsCalculating(false);
    }, 800);
  };

  // Montos finales consolidados
  const finalShipping = isFreeShipping ? 0 : (shippingCost || 0);
  const total = subtotal + finalShipping;

  const handleCheckoutClick = () => {
    // 🔒 INTERCEPTOR: Si no tiene envío gratis y el costo de envío aún es null, frenamos el flujo
    if (!isFreeShipping && shippingCost === null) {
      Swal.fire({
        title: 'Falta calcular el envío',
        html: 'Por favor, ingresá tu <strong>Código Postal</strong> y dale a <strong>Calcular</strong> para poder consolidar el total de tu pedido.',
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#1c1917',
        background: '#fafaf9',
        customClass: {
          popup: 'rounded-3xl border border-stone-200 font-sans text-stone-800',
          title: 'text-xl font-bold tracking-tight text-stone-800',
        }
      });
      return; // Frena la ejecución acá y no deja avanzar al checkout
    }

    setIsNavigating(true); // Encendemos la animación del spinner

    // Simulamos una pequeña transición de 800ms antes de saltar de pantalla
    setTimeout(() => {
      navigate('/checkout');
    }, 800);
  };

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
        {/* ✨ CAMBIO CLAVE: Cambiamos lg:grid por flex-col para evitar el estiramiento vertical de los hijos */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((product) => (
            <div key={`${product.id}-${product.selectedSize}`} className="bg-white rounded-2xl border border-stone-200 p-4 flex gap-4 items-center relative group">
              {/* Miniatura de Imagen */}
              <div className="w-20 h-20 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100">
                <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Textos del Producto */}
              <div className="flex-grow text-left pr-8">
                <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">{product.line}</span>
                <h3 className="text-sm font-bold text-stone-800 leading-snug mt-0.5">
                  {product.name} <span className="text-xs font-normal text-stone-500">({product.selectedSize}ml)</span>
                </h3>
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
                onClick={() => removeItem(product.id, product.selectedSize)}
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
          <div className="flex justify-center items-center pt-2">
            <button
              onClick={clear}
              className="inline-flex items-center gap-2 border border-stone-200 bg-stone-100/60 hover:bg-stone-200/80 text-stone-600 hover:text-stone-900 font-medium py-1 px-2 rounded-xl text-xs tracking-wider uppercase transition-all shadow-sm active:scale-[0.98] duration-150 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Columna Derecha (Ocupa 1 espacio): Resumen de Facturación Interactiva */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm h-fit text-left flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-800 tracking-tight border-b border-stone-100 pb-3">Resumen de pedido</h3>

            {/* 🚚 Formulario de Cotización de Envío */}
            <form onSubmit={handleCalculateShipping} className="mt-4 pb-4 border-b border-stone-100">
              <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1.5">
                Calcular costo de envío
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength="4"
                  placeholder="Tu Código Postal (Ej: 7400)"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))} // Bloquea letras
                  className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-3 h-10 w-full focus:outline-none focus:border-stone-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isCalculating || postalCode.length !== 4} // Deshabilitado si no tiene 4 caracteres
                  className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-4 h-10 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                >
                  {isCalculating ? 'Calculando...' : 'Calcular'}
                </button>
              </div>

              {/* 🎉 Avisos Dinámicos de Beneficio de Envío Gratis */}
              {!isFreeShipping && (
                <p className="text-[11px] text-stone-500 mt-2 leading-snug">
                  Te faltan <span className="font-semibold text-stone-700">${(freeShippingThreshold - subtotal).toLocaleString('es-AR')}</span> para conseguir <strong>Envío Gratis</strong>.
                </p>
              )}
              {isFreeShipping && (
                <p className="text-[11px] text-emerald-600 font-medium mt-2 flex items-center gap-1">
                  🔥 ¡Envío gratis aplicado por superar los ${freeShippingThreshold.toLocaleString('es-AR')}!
                </p>
              )}
            </form>

            {/* Desglose Dinámico de Precios */}
            <div className="mt-4 space-y-2 border-b border-stone-100 pb-4">
              <div className="flex justify-between text-sm text-stone-500">
                <span>Subtotal ({totalQuantity()} productos)</span>
                <span>${subtotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm items-center text-stone-500">
                <span>Envío</span>
                {isFreeShipping || shippingCost === 0 ? (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Gratis</span>
                ) : shippingCost !== null ? (
                  <span className="font-medium text-stone-800">${shippingCost.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
                ) : (
                  <span className="text-xs text-stone-400 italic">Ingresá tu CP</span>
                )}
              </div>
            </div>

            {/* Total Final Ajustado */}
            <div className="mt-4 flex justify-between items-baseline">
              <span className="text-base font-bold text-stone-800">Total</span>
              <div className="text-right">
                <span className="text-2xl font-black text-stone-900 block">
                  ${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] font-bold text-stone-400 block tracking-widest uppercase mt-0.5">
                  O 3 cuotas sin interés de ${(total / 3).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Botón interactivo con Spinner */}
          <button
            onClick={handleCheckoutClick}
            disabled={isNavigating}
            className="mt-6 w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 rounded-xl text-sm transition-all shadow-sm active:scale-[0.98] duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isNavigating ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Procesando...</span>
              </>
            ) : (
              "Finalizar Comra"
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartView;