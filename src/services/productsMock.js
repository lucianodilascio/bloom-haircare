// src/services/productsMock.js

const products = [
  {
    id: 1,
    name: 'Shampoo CONTROL LISS (Nanoqueratinas)',
    price: 13500.00,
    priceTransfer: 12150.00,
    category: 'shampoos-enjuagues',
    line: 'Control Liss',
    description: 'Shampoo disciplinante con nanoqueratinas. Diseñado para reducir visiblemente el volumen y controlar el frizz, aportando un brillo extremo y suavidad sedosa.',
    stock: 10,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Acondicionador CONTROL LISS (Nanoqueratinas)',
    price: 13500.00,
    priceTransfer: 12150.00,
    category: 'shampoos-enjuagues',
    line: 'Control Liss',
    description: 'Acondicionador anti-frizz de acción profunda. Desenreda instantáneamente, sella la cutícula capilar y prolonga el efecto lacio aportando una hidratación ligera.',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop' // URL corregida y testeada
  },
  {
    id: 3,
    name: 'Máscara Nutritiva ARGÁN (Antifrizz)',
    price: 16900.00,
    priceTransfer: 15210.00,
    category: 'mascaras-tratamientos',
    line: 'Argán Line',
    description: 'Tratamiento intensivo enriquecido con aceite de Argán puro. Hidrata profundamente la fibra capilar, elimina el encrespamiento y devuelve la elasticidad al cabello.',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Tratamiento REPAIR PLEX (Profesional)',
    price: 20300.00,
    priceTransfer: 18270.00,
    category: 'mascaras-tratamientos',
    line: 'Repair Plex',
    description: 'Tratamiento reestructurante avanzado con nanoesferas. Repara los enlaces de queratina rotos por procesos químicos y térmicos, devolviendo la fuerza al cabello dañado.',
    stock: 5,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Serum Capilar JOJOBA RepairPLEX',
    price: 13000.00,
    priceTransfer: 11700.00,
    category: 'serums-ampollas',
    line: 'Repair Plex',
    description: 'Sérum finalizador concentrado de Jojoba. Sella las puntas abiertas, aporta un brillo radiante inmediato y perfuma el cabello sin dejar residuos grasos.',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Ampolla Capilar BYE FRIZZ (Aceite de Argán)',
    price: 3000.00,
    priceTransfer: 2700.00,
    category: 'serums-ampollas',
    line: 'Bye Frizz',
    description: 'Ampolla de hidratación exprés concentrada. Disminuye y controla el frizz de manera inmediata, dejando el cabello suave, manejable y con un brillo natural.',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=600&auto=format&fit=crop' // URL corregida y testeada
  }
];

// Dejá la función getProducts abajo tal cual como la tenías
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1500);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Buscamos el producto. Usamos Number(id) porque de la URL viene como texto
      const product = products.find((prod) => prod.id === Number(id));
      resolve(product);
    }, 1000); // 1 segundo de carga simulada
  });
};