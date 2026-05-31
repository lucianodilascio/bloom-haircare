// src/features/products/components/ItemListContainer.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 👈 1. IMPORTAMOS EL HOOK
// 🌟 CAMBIO: Importamos las funciones reales de nuestro servicio de Firebase
import { getProducts, getProductsByCategory } from '../../../services/productService';
import ProductCard from './ProductCard';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 👈 2. CAPTURAMOS EL PARAMETRO DE LA URL (definido como :categoryId en App.jsx)
  const { categoryId } = useParams();

  // 👈 3. DICCIONARIO para transformar el slug de la URL en títulos limpios y reales
  const categoryTitles = {
    'shampoos-enjuagues': 'Shampoos y Enjuagues',
    'mascaras-tratamientos': 'Máscaras y Tratamientos',
    'serums-ampollas': 'Sérums y Ampollas'
  };

  useEffect(() => {
    setLoading(true); // Activamos el spinner cada vez que el usuario cambia de categoría
    
    // 🌟 LÓGICA DE FIREBASE: 
    // Evaluamos qué función ejecutar. Si hay categoryId, llamamos a la consulta con filtro de Firestore.
    // Si no (Home), traemos toda la colección completa.
    const asyncRequest = categoryId 
      ? getProductsByCategory(categoryId) 
      : getProducts();

    asyncRequest
      .then((data) => {
        // Al setear los productos, la data ya viene mapeada con sus IDs reales de Google
        setProducts(data);
      })
      .catch((error) => console.error("Error al traer el catálogo de Firestore:", error))
      .finally(() => setLoading(false));

  }, [categoryId]); // 👈 5. ¡SUPER IMPORTANTE! Agregamos categoryId acá para que el useEffect se vuelva a ejecutar cada vez que el usuario hace clic en el Navbar

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-stone-800 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-stone-500 tracking-wide uppercase animate-pulse">
          Cargando catálogo premium...
        </p>
      </div>
    );
  }

  // 👈 6. DEFINIMOS EL TITULO DINÁMICO
  // Si existe categoryId, usa el nombre lindo del diccionario. Si no, usa el greeting del Home.
  const displayTitle = categoryId ? categoryTitles[categoryId] : greeting;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 text-center">
      {/* El título ahora es dinámico */}
      <h2 className="text-4xl font-bold text-stone-1000 tracking-tight">
        {displayTitle}
      </h2>
      
      {/* La descripción también cambia dinámicamente si es el Home o una categoría */}
      <p className="mt-3 text-stone-500 max-w-md mx-auto text-sm">
        {categoryId 
          ? `Explorá nuestra selección exclusiva de ${categoryTitles[categoryId].toLowerCase()} para el cuidado de tu cabello.`
          : "No dudes más y despertá la salud de tu cabello con Bloom..."
        }
      </p>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ItemListContainer;