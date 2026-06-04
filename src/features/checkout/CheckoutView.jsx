import { useState } from "react";
import { useCart } from "../../context/CartContext"; 
import { createOrder } from "../../services/orderService";

export const CheckoutView = () => {
  const { cart, totalCartPrice, clearCart } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado para los inputs del formulario
  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
    confirmEmail: ""
  });

  // Manejador de cambios en los inputs
  const handleInputChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas antes de mandar a Firebase
    if (!buyer.name || !buyer.phone || !buyer.email) {
      setError("Por favor, completá todos los campos obligatorios.");
      return;
    }

    if (buyer.email !== buyer.confirmEmail) {
      setError("Los correos electrónicos no coinciden.");
      return;
    }

    setLoading(true);

    try {
      // Estructuramos la orden tal como la espera Firestore
      const order = {
        buyer: {
          name: buyer.name,
          phone: buyer.phone,
          email: buyer.email
        },
        items: cart.map(prod => ({
          id: prod.id,
          title: prod.name,
          price: prod.price,
          quantity: prod.quantity
        })),
        date: new Date(),
        total: totalCartPrice()
      };

      // Llamamos al servicio para guardar en la base de datos
      const id = await createOrder(order);
      setOrderId(id); // Guardamos el ID del pedido para mostrarlo en pantalla
      clearCart();    // Vaciamos el carrito de compras
    } catch (err) {
      setError("Hubo un problema al procesar tu orden. Intentalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // 1. Pantalla de Éxito: Si la compra ya se procesó y tenemos ID
  if (orderId) {
    return (
      <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center", padding: "20px" }}>
        <h2 style={{ color: "#4CAF50" }}>¡Muchas gracias por tu compra! 🎉</h2>
        <p>Tu orden ha sido generada con éxito en nuestro sistema.</p>
        <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", margin: "20px 0", border: "1px dashed #ccc" }}>
          <span style={{ fontWeight: "bold", display: "block" }}>Número de seguimiento:</span>
          <code style={{ fontSize: "1.2rem", color: "#333", fontWeight: "bold" }}>{orderId}</code>
        </div>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>Guardá este código para consultar el estado de tu envío.</p>
      </div>
    );
  }

  // 2. Pantalla de Carrito Vacío: Por si intentan entrar al checkout sin productos
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", margin: "50px auto" }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p>Agregá productos al catálogo para poder iniciar el pago.</p>
      </div>
    );
  }

  // 3. Pantalla Principal del Checkout (Formulario + Resumen)
  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ borderBottom: "2px solid #eaeaea", paddingBottom: "10px" }}>Finalizar Compra</h2>
      
      {error && <p style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "50px" }}>Nombre Completo *</label>
          <input type="text" name="name" value={buyer.name} onChange={handleInputChange} required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Teléfono de Contacto *</label>
          <input type="tel" name="phone" value={buyer.phone} onChange={handleInputChange} required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Email *</label>
          <input type="email" name="email" value={buyer.email} onChange={handleInputChange} required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Confirmar Email *</label>
          <input type="email" name="confirmEmail" value={buyer.confirmEmail} onChange={handleInputChange} required style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
        </div>

        <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "8px", marginTop: "10px" }}>
          <h3 style={{ margin: "0 0 10px 0", textAlign: "center" }}>Resumen de la orden</h3>
          <p style={{ margin: "0", fontSize: "1.1rem", fontWeight: "bold", textAlign: "center" }}>Total a pagar: ${totalCartPrice()}</p>
        </div>

        <button type="submit" disabled={loading} style={{ background: loading ? "#ccc" : "#000", color: "#fff", padding: "12px", border: "none", borderRadius: "5px", cursor: loading ? "not-allowed" : "pointer", fontSize: "1rem", fontWeight: "bold", marginTop: "10px" }}>
          {loading ? "Procesando pedido..." : "Confirmar Pago"}
        </button>
      </form>
    </div>
  );
};