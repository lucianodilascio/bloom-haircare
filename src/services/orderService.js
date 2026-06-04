import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

/**
 * Envía una nueva orden de compra a la colección "orders" de Firestore.
 * @param {Object} orderData - Objeto completo con buyer, items, date y total.
 * @returns {Promise<string>} - El ID único de la orden generado por Firebase.
 */
export const createOrder = async (orderData) => {
  try {
    // 1. Creamos la referencia a la colección de órdenes en la base de datos
    const ordersRef = collection(db, "orders");
    
    // 2. Le mandamos el objeto a Firebase para que lo guarde
    const docRef = await addDoc(ordersRef, orderData);
    
    // 3. Devolvemos el ID único de la compra
    return docRef.id;
  } catch (error) {
    console.error("Error al crear la orden en Firestore:", error);
    throw error;
  }
};