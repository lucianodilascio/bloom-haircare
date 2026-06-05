// src/features/admin/components/AdminDashboard.jsx
import { useState } from 'react';
import { addProduct } from '../../../services/productService';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Íconos de ojo para la contraseña
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  // 🔐 Estados para el Falso Login de Seguridad
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 📝 Estados para los campos del Formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [priceTransfer, setPriceTransfer] = useState('');
  const [category, setCategory] = useState('shampoos-enjuagues');
  const [line, setLine] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sizesInput, setSizesInput] = useState('');

  // 🔒 Manejador del acceso de seguridad
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'bloom2026') {
      setIsAuthorized(true);
      Swal.fire({
        title: '¡Acceso Concedido!',
        text: 'Bienvenido al panel de control de Bloom.',
        icon: 'success',
        confirmButtonColor: '#1c1917',
        background: '#fafaf9',
      });
    } else {
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'La contraseña de administrador es incorrecta.',
        icon: 'error',
        confirmButtonColor: '#1c1917',
        background: '#fafaf9',
      });
    }
  };

  // 🔄 Función inteligente para calcular el precio de transferencia automático (10% OFF)
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);

    if (value) {
      const autoTransferPrice = (Number(value) * 0.90).toFixed(2);
      setPriceTransfer(autoTransferPrice);
    } else {
      setPriceTransfer('');
    }
  };

  // ➕ Manejador para enviar el producto (Modo Demo Activo)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !priceTransfer || !stock || !imageUrl) {
      Swal.fire('Campos incompletos', 'Por favor, llena todos los campos obligatorios.', 'warning');
      return;
    }

    // 🌟 CLAVE: Usamos parseInt con base 10 para remover cualquier intento de número con coma/decimal
    const sizesArray = sizesInput
      .split(',')
      .map((size) => parseInt(size.trim(), 10)) 
      .filter((size) => !isNaN(size) && size > 0);

    const newProduct = {
      name: name.trim(),
      price: Number(price),
      priceTransfer: Number(priceTransfer),
      category,
      line: line.trim() || 'Bloom Line',
      description: description.trim(),
      stock: parseInt(stock, 10), // Forzamos entero también en el stock total
      images: [imageUrl.trim()],
      sizes: sizesArray.length > 0 ? sizesArray : [300]
    };

    try {
      Swal.fire({
        title: 'Guardando producto...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      /* 🛡️ MODO DEMO ACTIVADO PARA EL PORTFOLIO */
      // await addProduct(newProduct);

      await new Promise((resolve) => setTimeout(resolve, 1200));

      Swal.fire({
        title: '¡Producto Creado! <br/> (Modo Demo)',
        html: `El producto <strong>${newProduct.name}</strong> pasó todas las validaciones estructurales y simuló la subida a Firestore con éxito.`,
        icon: 'success',
        confirmButtonColor: '#1c1917',
        background: '#fafaf9',
      });

      setName('');
      setPrice('');
      setPriceTransfer('');
      setLine('');
      setDescription('');
      setStock('');
      setImageUrl('');
      setSizesInput('');

    } catch (error) {
      Swal.fire('Error', 'No se pudo simular el guardado del producto.', 'error');
    }
  };

  // 🛑 PANTALLA 1: Acceso de seguridad
  if (!isAuthorized) {
  return (
    <main className="max-w-md mx-auto px-4 py-20 min-h-[600px] flex flex-col justify-center">
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm text-center">
        <span className="text-3xl">🔒</span>
        <h2 className="text-2xl font-black text-stone-800 tracking-tight mt-2">Panel de Administración</h2>
        
        {/* ✨ MODIFICADO: Le dejamos la pista en bandeja de plata */}
        <p className="text-xs text-stone-500 mt-1 mb-6">
          Ingresá la clave de desarrollo para gestionar el stock. <br />
          <span className="font-semibold text-stone-700 bg-stone-100 px-1.5 py-0.5 rounded inline-block mt-1">Clave: bloom2026</span>
        </p>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña de administrador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 text-sm rounded-xl pl-4 pr-10 h-11 text-center focus:outline-none focus:border-stone-400 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer flex items-center justify-center p-1"
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium h-11 rounded-xl text-sm transition-all active:scale-[0.98]"
            >
              Verificar Identidad
            </button>
          </form>
          <Link to="/" className="text-xs text-stone-400 underline block mt-4 hover:text-stone-600">
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  // 🟢 PANTALLA 2: Formulario de Carga Premium
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
        <div className="text-left">
          <h2 className="text-3xl font-black text-stone-800 tracking-tight">Carga de Productos</h2>
          <p className="text-xs text-stone-500 mt-0.5">Añadí nuevo stock directamente a Firebase Firestore en tiempo real.</p>
        </div>
        <button 
          onClick={() => {
            setIsAuthorized(false);
            setShowPassword(false);
            setPassword('');
          }} 
          className="text-s border border-stone-500 bg-stone-50 hover:bg-black px-3 py-1.5 rounded-lg text-stone-700 hover:text-white font-medium transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm text-left grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Nombre del Producto */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Nombre del Producto *</label>
          <input
            type="text"
            placeholder="Ej: Shampoo CONTROL LISS (Nanoqueratinas)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        {/* Categoría */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Categoría *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:border-stone-400 font-medium text-stone-700 cursor-pointer"
          >
            <option value="shampoos-enjuagues">Shampoos y Enjuagues</option>
            <option value="mascaras-tratamientos">Máscaras y Tratamientos</option>
            <option value="serums-ampollas">Sérums y Ampollas</option>
          </select>
        </div>

        {/* Línea de Producto */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Línea comercial</label>
          <input
            type="text"
            placeholder="Ej: Control Liss / Argán Line"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        {/* Precio Lista */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Precio de Lista ($) *</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="Ej: 13500"
            value={price}
            onChange={handlePriceChange}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        {/* Precio Transferencia */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Precio Transferencia ($) *</label>
            <span className="text-[9px] text-stone-400 font-medium tracking-wide bg-stone-100 px-1.5 py-0.5 rounded">Sugerido (10% OFF)</span>
          </div>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="Ej: 12150"
            value={priceTransfer}
            onChange={(e) => setPriceTransfer(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        {/* Stock */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Stock Inicial (Unidades) *</label>
          <input
            type="number"
            required
            min="0"
            placeholder="Ej: 10"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        {/* Tamaños / Variantes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Tamaños</label>
          <input
            type="text"
            placeholder="Ej: 15, 300, 500, 1000"
            value={sizesInput}
            onChange={(e) => setSizesInput(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        {/* URL de la Imagen */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">URL de la Imagen *</label>
          <input
            type="url"
            required
            placeholder="https://images.unsplash.com/..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl px-4 h-11 focus:outline-none focus:border-stone-400 transition-colors"
          />
        </div>

        {/* Descripción Detallada */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Descripción Detallada</label>
          <textarea
            rows="4"
            placeholder="Escribe las propiedades, modo de uso y beneficios del producto..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-sm rounded-xl p-4 focus:outline-none focus:border-stone-400 transition-colors resize-none"
          />
        </div>

        {/* Botón de Envío */}
        <div className="sm:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium h-12 rounded-xl text-sm transition-all shadow-sm active:scale-[0.99] duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            🚀 Publicar Producto en Firestore
          </button>
        </div>

      </form>
    </main>
  );
};

export default AdminDashboard;