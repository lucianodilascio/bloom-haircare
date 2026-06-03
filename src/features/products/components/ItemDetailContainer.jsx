// src/features/products/components/ItemDetailContainer.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore'; // 🌟 Importamos onSnapshot y doc para tiempo real
import { db } from '../../../firebase/config';       // 🌟 Conexión directa a tu configuración de Firebase
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams(); // Capturamos el :itemId de la URL

  useEffect(() => {
    setLoading(true);

    // 1. Creamos la referencia al documento del producto en Firestore usando el ID de la URL
    const docRef = doc(db, "products", itemId);

    // 2. Abrimos el canal en tiempo real. Cada cambio en este producto en Firebase actualizará el estado automáticamente
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setProduct({
          id: snapshot.id,
          ...snapshot.data()
        });
      } else {
        setProduct(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error en tiempo real de Firestore:", error);
      setLoading(false);
    });

    // 3. ⚠️ CLAVE DE SENIOR: Cuando el componente se desmonta (el usuario cambia de página),
    // apagamos el escuchador para no consumir lecturas ni memoria en segundo plano.
    return () => unsubscribe();

  }, [itemId]);

  // PANTALLA 1: Spinner de carga mientras conecta con Firestore
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

  // PANTALLA 2: Error por si meten un ID que no existe en tu Firebase
  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-600 font-medium">El producto no existe.</p>
        <Link to="/" className="text-sm text-stone-900 underline mt-4 block">Volver al inicio</Link>
      </div>
    );
  }

  // PANTALLA 3: Renderizado del detalle del producto con datos en vivo
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
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