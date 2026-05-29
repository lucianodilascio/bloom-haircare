// Importamos las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
// 🌟 IMPORTANTE: Agregamos esta línea para traer la base de datos de Firestore
import { getFirestore } from "firebase/firestore";

// Tus credenciales de Google (Pegá acá tus claves reales que copiaste de la consola)
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "bloom-haircare.firebaseapp.com",
  projectId: "bloom-haircare",
  storageBucket: "bloom-haircare.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};

// Inicializamos la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// 🌟 Inicializamos la base de datos de Firestore conectada a nuestra app
export const db = getFirestore(app);