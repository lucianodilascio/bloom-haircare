// src/features/products/components/ItemDetail.jsx
import { useState, useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import Swal from 'sweetalert2';
import ItemCount from './ItemCount';

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  // 🧴 1. Estado para controlar el tamaño de mililitros seleccionado
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 300);

  // 🚚 2. Estados para el simulador de Andreani
  const [zipCode, setZipCode] = useState('');
  const [shippingCost, setShippingCost] = useState(null);

  // 📸 NUEVO: Estado para controlar el índice de la imagen activa en el carrusel
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const { addItem } = useContext(CartContext);

  // 💳 3. Lógica inteligente de descuento: calcula el % real en base a tus dos precios
  const discountPercentage = product.price && product.priceTransfer
    ? Math.round(((product.price - product.priceTransfer) / product.price) * 100)
    : 0;

  // 📸 NUEVO: Normalizamos las imágenes. Si existe el array 'images' lo usa; si no, mete la 'image' única en un array.
  const imagesList = product.images || (product.image ? [product.image] : []);

  // 🚚 Handler para simular el costo de envío de Andreani
  const handleCalculateShipping = (e) => {
    e.preventDefault();
    const cp = Number(zipCode);
    if (!zipCode) return;

    if (cp >= 7400 && cp <= 7403) {
      setShippingCost(0); // Local / Retiro
    } else if (cp >= 1000 && cp <= 1999) {
      setShippingCost(4500); // CABA y GBA
    } else {
      setShippingCost(6500); // Resto del país
    }
  };

  // 🛒 Lógica de agregado con validación de stock inyectada
  const handleAddToCart = () => {
    // Capturamos el código de respuesta que viene de la validación del CartContext
    const result = addItem({ ...product, selectedSize }, quantity);

    // 🔴 ALERTA 1: Ya se alcanzó el límite de stock en el carrito
    if (result === 'LIMIT_REACHED') {
      Swal.fire({
        title: 'Stock máximo alcanzado',
        html: `Ya tenés las <strong>${product.stock} u.</strong> disponibles de este producto en tu bolsa de compras.`,
        icon: 'info',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#1c1917',
        background: '#fafaf9',
        customClass: {
          popup: 'rounded-3xl border border-stone-200 font-sans text-stone-800',
          title: 'text-2xl font-bold tracking-tight text-stone-800',
        }
      });
      return;
    }

    // 🟡 ALERTA 2: Se sumaron unidades pero se clavó en el tope máximo de stock
    if (result === 'CAPPED') {
      Swal.fire({
        title: 'Cantidad ajustada',
        html: `Sumamos el producto a tu bolsa, pero limitamos el total a <strong>${product.stock} u.</strong> por falta de stock disponible.`,
        icon: 'warning',
        confirmButtonText: 'Revisar bolsa',
        confirmButtonColor: '#1c1917',
        background: '#fafaf9',
        customClass: {
          popup: 'rounded-3xl border border-stone-200 font-sans text-stone-800',
          title: 'text-2xl font-bold tracking-tight text-stone-800',
        }
      });
      return;
    }

    // 🟢 ALERTA 3: Éxito (Se pudo agregar la cantidad solicitada normalmente)
    Swal.fire({
      title: '¡Agregado al carrito!',
      html: `Sumaste <strong>${quantity} u.</strong> de <strong>${product.name} (${selectedSize}ml)</strong> a tu bolsa.`,
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

  // Funciones para navegar por las fotos
  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm max-w-4xl mx-auto">

      {/* 📊 GRILLA SUPERIOR: Contiene la imagen/carrusel y la zona de conversión rápida */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

        {/* 📸 COLUMNA IZQUIERDA: Módulo de Carrusel Premium con Efecto Slide */}
        <div className="w-full flex flex-col gap-3">
          {/* Contenedor padre con overflow-hidden para tapar las fotos que quedan "afuera" */}
          <div className="bg-stone-50 rounded-2xl overflow-hidden aspect-square relative border border-stone-100 group w-full">
            
            {imagesList.length > 0 ? (
              /* 🌟 ESTA ES LA MAGIA: Una pista flex que contiene todas las fotos alineadas de corrido */
              <div 
                className="flex w-full h-full transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentImgIndex * 100}%)` }}
              >
                {imagesList.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} - Vista ${index + 1}`}
                    /* flex-shrink-0 es clave para que cada foto ocupe el 100% exacto de la caja sin aplastarse */
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-sm">
                Sin imagen disponible
              </div>
            )}

            {/* Etiqueta de la línea */}
            <span className="absolute top-4 left-4 z-10 text-[10px] font-bold tracking-wider text-stone-700 uppercase bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-100 shadow-sm">
              {product.line}
            </span>

            {/* Flechas de navegación con z-10 para quedar siempre al frente */}
            {imagesList.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-sm border border-stone-100 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Anterior"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-sm border border-stone-100 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                  title="Siguiente"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Miniaturas inferiores (Thumbnails) */}
          {imagesList.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 justify-start">
              {imagesList.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImgIndex(index)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all bg-stone-50 cursor-pointer ${
                    index === currentImgIndex ? 'border-stone-800 scale-[0.98]' : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: Detalles de Compra Rápidos */}
        <div className="flex flex-col gap-5 text-left h-full justify-between w-full">
          <div>
            <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">
              Bloom Cosmética Capilar
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-stone-800 mt-1 tracking-tight leading-tight">
              {product.name}
            </h2>

            <div className="mt-3 flex flex-col gap-1">
              <span className="text-2xl font-extrabold text-stone-900">
                ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </span>

              {/* Bloque dinámico de cuotas y descuento por transferencia */}
              <div className="mt-1 bg-stone-50 border border-stone-100 p-3 rounded-xl max-w-sm">
                <span className="block text-[10px] font-bold tracking-widest text-stone-500 uppercase">
                  💳 Hasta 3 cuotas sin interés
                </span>
                {discountPercentage > 0 && (
                  <span className="inline-block mt-1 text-[10px] font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md uppercase">
                    🔥 {discountPercentage}% OFF con Transferencia
                  </span>
                )}
                <p className="text-xs text-stone-500 mt-2">
                  Precio final: <span className="font-bold text-stone-800">
                    ${product.priceTransfer.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* 🧴 Selector de Mililitros */}
          <div className="flex flex-col gap-1.5 max-w-[140px]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Mililitros</span>
            <div className="relative">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(Number(e.target.value))}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm text-stone-800 font-medium focus:outline-none focus:border-stone-400 appearance-none cursor-pointer"
              >
                {product.sizes?.map((ml) => (
                  <option key={ml} value={ml}>
                    {ml} ml
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          {/* Acciones de Compra */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
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

          {/* 🚚 Módulo Andreani Integrado */}
          <div className="border-t border-stone-100 pt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-stone-500 bg-stone-50/60 border border-stone-100 rounded-xl p-3 text-xs">
              <span className="text-base">📦</span>
              <span>Envíos a todo el país a través de <strong>Andreani</strong></span>
            </div>

            <form onSubmit={handleCalculateShipping} className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                Calculá el costo de envío
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Tu código postal"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 flex-1 focus:outline-none focus:border-stone-400 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-white border border-stone-300 hover:border-stone-800 text-stone-800 font-medium px-5 h-11 rounded-xl text-xs uppercase tracking-wider transition-all active:scale-[0.97]"
                >
                  Calcular
                </button>
              </div>
            </form>

            {shippingCost !== null && (
              <div className="text-xs font-semibold text-stone-700 bg-stone-50 border border-stone-100 p-2.5 rounded-xl animate-fade-in">
                {shippingCost === 0
                  ? "🎉 ¡Retiro en Olavarría o envío local gratis disponible!"
                  : `El costo de envío es de $${shippingCost.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 📝 SECCIÓN INFERIOR: Texto extendido a ancho completo */}
      <div className="mt-12 pt-10 border-t border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

        <div className="md:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-4">
            Descripción Detallada
          </h3>
          <p className="text-stone-600 leading-snug text-sm md:text-base whitespace-pre-line">
            {product.description}
          </p>
        </div>

        <div className="bg-stone-50/60 border border-stone-100 p-6 rounded-2xl h-fit">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
            Especificaciones técnicas
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-stone-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-stone-800 rounded-full flex-shrink-0"></span>
              <span><strong>Tipo:</strong> Cuidado Diario</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-stone-800 rounded-full flex-shrink-0"></span>
              <span>Libre de Parabenos</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-stone-800 rounded-full flex-shrink-0"></span>
              <span>Cruelty Free</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-stone-800 rounded-full flex-shrink-0"></span>
              <span><strong>Disponible:</strong> Stock ({product.stock})</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};

export default ItemDetail;