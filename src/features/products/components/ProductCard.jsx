import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group p-4 text-center">
      
      {/* CONTENEDOR DE IMAGEN */}
      <div className="bg-stone-50 h-72 w-full flex items-center justify-center relative overflow-hidden rounded-xl mb-4 border border-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider text-stone-600 uppercase bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-stone-100">
          {product.line}
        </span>
      </div>

      {/* INFORMACIÓN DEL PRODUCTO */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-stone-800 tracking-tight leading-snug min-h-[44px] flex items-center justify-center px-1">
            {product.name}
          </h3>
          
          <div className="mt-3 space-y-0.5">
            <span className="block text-lg font-medium text-stone-600">
              ${product.price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </span>
            <span className="block text-[10px] font-bold tracking-widest text-stone-400 uppercase">
              Hasta 3 cuotas sin interés
            </span>
            <div className="w-4/5 mx-auto border-t border-stone-200 my-2 pt-2">
              <p className="text-sm text-stone-500">
                <span className="text-base font-black text-stone-900">
                  ${product.priceTransfer.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </span> con transferencia
              </p>
            </div>
          </div>
        </div>

        {/* 2. CAMBIO CLAVE: Transformamos el <button> en un <Link> que apunta al id de este producto */}
        <Link 
          to={`/item/${product.id}`}
          className="mt-4 w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-2.5 rounded-xl text-sm transition-all shadow-sm active:scale-[0.98] duration-150 flex items-center justify-center"
        >
          Ver detalle
        </Link>
      </div>

    </div>
  );
};

export default ProductCard;