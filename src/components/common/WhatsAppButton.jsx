import { FaWhatsapp } from 'react-icons/fa'; // O el ícono que uses

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/" // Reemplazá por el número real
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
      
      {/* 💡 Efecto opcional: Un texto que aparece sutilmente al pasar el mouse */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out font-medium text-sm whitespace-nowrap">
        ¿Alguna consulta? Escribenos!
      </span>
    </a>
  );
};

export default WhatsAppButton;