// src/features/products/components/ItemDetailContainer.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // 👈 Importamos useParams y Link
import { getProductById } from '../../../services/productsMock';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams(); // 👈 Capturamos el :itemId de la URL

  useEffect(() => {
    setLoading(true);
    getProductById(itemId)
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-stone-500 tracking-wide uppercase animate-pulse">
          Cargando detalles del producto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-600 font-medium">El producto no existe.</p>
        <Link to="/" className="text-sm text-stone-900 underline mt-4 block">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 👈 ¡ACÁ ESTÁ LA MAGIA! Ahora el botón es un Link real que te lleva al Home */}
      <div className="mb-8 text-left max-w-4xl mx-auto">
        <Link to="/" className="text-stone-400 hover:text-stone-800 flex items-center gap-2 text-sm font-medium transition-colors group">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al catálogo
        </Link>
      </div>

      <ItemDetail product={product} />
    </div>
  );
};

export default ItemDetailContainer;