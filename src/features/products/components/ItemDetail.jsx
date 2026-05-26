
import { useState, useContext } from 'react'; // 👈 Agregamos useContext
import { CartContext } from '../../../context/CartContext'; // 👈 Importamos nuestro contexto
import Swal from 'sweetalert2';
import ItemCount from './ItemCount';

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  
  // 👈 CONECTAMOS EL CABLE: Traemos la función addItem desde el estado global
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    // 👈 Ejecutamos la función global guardando el objeto del producto y la cantidad
    addItem(product, quantity);

    Swal.fire({
      title: '¡Agregado al carrito!',
      html: `Sumaste <strong>${quantity} u.</strong> de <strong>${product.name}</strong> a tu bolsa.`,
      icon: 'success',
      confirmButtonText: 'Continuar comprando',
      confirmButtonColor: '#1c1917',
      background: '#fafaf9',
      customClass: {
        popup: 'rounded-3xl border border-stone-200 font-sans text-stone-800',
        title: 'text-2xl font-bold tracking-tight text-stone-800',
      }
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Imagen */}
        <div className="bg-stone-50 rounded-2xl overflow-hidden aspect-square flex items-center justify-center relative border border-stone-100 group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 text-xs font-semibold tracking-wider text-stone-700 uppercase bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-100 shadow-sm">
            {product.line}
          </span>
        </div>

        {/* Detalles */}
        <div className="flex flex-col justify-between text-left">
          <div>
            <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">
              Bloom Cosmética Capilar
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-stone-800 mt-2 tracking-tight">
              {product.name}
            </h2>
            
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-stone-900">
                ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>
              <span className="block text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                Hasta 3 cuotas sin interés
              </span>
              <p className="text-sm text-stone-500 mt-1">
                <span className="font-bold text-stone-800">
                  ${product.priceTransfer.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span> con transferencia
              </p>
            </div>

            <p className="mt-6 text-stone-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            <div className="mt-6 border-t border-b border-stone-100 py-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                Especificaciones técnicas
              </h4>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-stone-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span> Tipo: Cuidado Diario
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span> Libre de Parabenos
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span> Cruelty Free
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-stone-800 rounded-full"></span> Disponible: Stock ({product.stock})
                </li>
              </ul>
            </div>
          </div>

          {/* Acciones de Compra */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Cantidad</span>
              <ItemCount 
                stock={product.stock} 
                count={quantity} 
                setCount={setQuantity} 
              />
            </div>

            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-medium h-12 rounded-xl text-sm transition-all shadow-sm active:scale-[0.98] duration-150 flex items-center justify-center gap-2 mt-auto cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Agregar al carrito
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ItemDetail;