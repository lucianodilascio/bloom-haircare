// src/context/CartContext.jsx
import { createContext, useState } from 'react';

// 1. Creamos el contexto que los componentes van a "buscar" para leer los datos
export const CartContext = createContext();

// 2. Creamos el Proveedor (Provider) que va a guardar el estado y las funciones
export const CartProvider = ({ children }) => {
  // El estado global: un array donde meteremos los productos con su cantidad
  const [cart, setCart] = useState([]);

  // Función para saber si un producto ya está en el carrito (evita duplicados)
  const isInCart = (id, size) => {
    return cart.some((prod) => prod.id === id && prod.selectedSize === size);
  };

  // Función principal: Agregar al carrito
  const addItem = (item, quantity) => {
  const productInCart = cart.find(
    (prod) => prod.id === item.id && prod.selectedSize === item.selectedSize
  );

  if (productInCart) {
    const totalProposedQuantity = productInCart.quantity + quantity;

    // CASO A: El usuario ya alcanzó el stock máximo permitido en su carrito
    if (productInCart.quantity >= item.stock) {
      return 'LIMIT_REACHED';
    }

    // CASO B: La nueva suma supera el stock, entonces lo "clavamós" en el tope máximo
    if (totalProposedQuantity > item.stock) {
      setCart(
        cart.map((prod) =>
          prod.id === item.id && prod.selectedSize === item.selectedSize
            ? { ...prod, quantity: item.stock }
            : prod
        )
      );
      return 'CAPPED';
    }

    // CASO C: Hay stock de sobra, sumamos normalmente
    setCart(
      cart.map((prod) =>
        prod.id === item.id && prod.selectedSize === item.selectedSize
          ? { ...prod, quantity: totalProposedQuantity }
          : prod
      )
    );
    return 'SUCCESS';
  } else {
    // CASO D: El producto no estaba en el carrito, entra de cero
    setCart([...cart, { ...item, quantity }]);
    return 'SUCCESS';
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