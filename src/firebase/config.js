// Importamos las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
// 🌟 IMPORTANTE: Agregamos esta línea para traer la base de datos de Firestore
import { getFirestore } from "firebase/firestore";

// 🔐 Tus credenciales ahora se leen de forma segura desde el entorno (.env o Vercel)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inicializamos la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// 🌟 Inicializamos la base de datos de Firestore conectada a nuestra app
export const db = getFirestore(app);