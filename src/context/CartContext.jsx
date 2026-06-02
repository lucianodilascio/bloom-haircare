// src/context/CartContext.jsx
import { createContext, useState } from 'react';

// 1. Creamos el contexto que los componentes van a "buscar" para leer los datos
export const CartContext = createContext();

// 2. Creamos el Proveedor (Provider) que va a guardar el estado y las funciones
export const CartProvider = ({ children }) => {
  // El estado global: un array donde meteremos los productos con su cantidad
  const [cart, setCart] = useState([]);

  // Función para saber si un producto ya está en el carrito (evita duplicados)
  const isInCart = (id) => {
    return cart.some((prod) => prod.id === id);
  };

  // Función principal: Agregar al carrito
  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      // Si ya existe, recorremos el carrito y sumamos la nueva cantidad a la vieja
      setCart(
        cart.map((prod) => 
          prod.id === item.id 
            ? { ...prod, quantity: prod.quantity + quantity } 
            : prod
        )
      );
    } else {
      // Si no existe, lo agregamos al array manteniendo lo que ya había
      setCart([...cart, { ...item, quantity }]);
    }
  };

  // Función para eliminar un solo producto del carrito (el botón de la cruz/tacho)
  const removeItem = (id, size) => {
    setCart(cart.filter((prod) => !(prod.id === id && prod.selectedSize === size)));
  };

  // Función para vaciar todo el carrito de un solo clic
  const clear = () => {
    setCart([]);
  };

  // Función de cálculo: Devuelve la cantidad TOTAL de productos en el carrito
  // Esto es lo que va a leer el numerito rojo del Navbar
  const totalQuantity = () => {
    return cart.reduce((total, prod) => total + prod.quantity, 0);
  };

  // Función de cálculo: Devuelve el precio TOTAL de la compra (Suma de precios * cantidades)
  const totalPrice = () => {
    return cart.reduce((total, prod) => total + (prod.price * prod.quantity), 0);
  };

  return (
    // 3. Pasamos todas las variables y funciones en el 'value' para que estén disponibles globalmente
    <CartContext.Provider value={{ cart, addItem, removeItem, clear, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};