import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // 👈 IMPORTAMOS EL PROVIDER
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ItemListContainer from './features/products/components/ItemListContainer';
import ItemDetailContainer from './features/products/components/ItemDetailContainer';
import CartView from './features/cart/components/CartView';
import WhatsAppButton from './components/common/WhatsAppButton';


const App = () => {
  return (
    // 1. Envolvemos TODO con el CartProvider. Ahora el carrito es accesible en cualquier rincón.
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-stone-50">
          <Navbar />

          <div className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={<ItemListContainer greeting="¡Bienvenidos a Bloom Haircare!" />}
              />
              <Route
                path="/category/:categoryId"
                element={<ItemListContainer greeting="Productos seleccionados para vos" />}
              />
              <Route
                path="/item/:itemId"
                element={<ItemDetailContainer />}
              />
              <Route path="/cart" element={<CartView />} />

              

            </Routes>
          </div>

          <Footer />
          <WhatsAppButton/>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;

