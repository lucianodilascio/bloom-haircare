import { collection, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

/**
 * 🛍️ 1. Traer todos los productos de la base de datos
 * Ideal para el ItemListContainer cuando se carga la tienda por primera vez.
 */
export const getProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    
    // Mapeamos los documentos para incluir el ID automático de Firebase dentro del objeto del producto
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return products;
  } catch (error) {
    console.error("Error al traer los productos de Firestore:", error);
    throw error;
  }
};

/**
 * 🔍 2. Traer un solo producto por su ID
 * Se utiliza en ItemDetailContainer para alimentar al componente ItemDetail.
 */
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "products", id);
    const snapshot = await getDoc(docRef);
    
    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    } else {
      console.warn(`No se encontró ningún producto con el ID: ${id}`);
      return null;
    }
  } catch (error) {
    console.error("Error al traer el producto por ID de Firestore:", error);
    throw error;
  }
};

/**
 * 🏷️ 3. Traer productos filtrados por categoría
 * Clave para cuando el usuario navega a través de las categorías del Navbar (ej: /category/shampoo)
 */
export const getProductsByCategory = async (categoryName) => {
  try {
    const productsRef = collection(db, "products");
    // Creamos una consulta filtrando donde el campo 'category' sea igual al parámetro recibido
    const q = query(productsRef, where("category", "==", categoryName));
    const snapshot = await getDocs(q);
    
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return products;
  } catch (error) {
    console.error("Error al filtrar productos por categoría:", error);
    throw error;
  }
};