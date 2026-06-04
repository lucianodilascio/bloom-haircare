# Bloom Haircare 🧴✨
> E-commerce premium de cosmética capilar optimizado con arquitectura moderna de React y persistencia en tiempo real con Firebase Firestore.

Este proyecto fue desarrollado como una aplicación de producción real para el portfolio, priorizando el rendimiento en el cliente, la seguridad de la infraestructura y patrones de diseño altamente escalables.

---

## 🚀 Características Destacadas (Criterio de Producción)

* **Arquitectura Orientada a Features:** 
Organización de directorios estructurada por módulos de negocio (`products`, `cart`, `admin`), garantizando desacoplamiento, legibilidad y escalabilidad del código.

* **React Compiler Integrado (Next-Gen):** 
Configurado nativamente con `babel-plugin-react-compiler`. La aplicación prescinde de optimizaciones manuales de renderizado (`useMemo`, `useCallback`), delegando la gestión de memoria y renders de forma automática al compilador.

* **Sincronización en Tiempo Real (`onSnapshot`):** 
Conexión bidireccional viva con Firestore en el detalle del producto. Cambios de stock o precios impactan instantáneamente en la UI del cliente sin recargar la página.

* **Mitigación de Memory Leaks:** 
Control estricto del ciclo de vida de los efectos mediante funciones de desmontaje limpias (`unsubscribe`), previniendo fugas de memoria y lecturas redundantes en Firebase.

* **Panel Administrativo con "Modo Demo":** 
Panel de gestión de stock protegido por identidad, visor dinámico de contraseña (UX) y un entorno simulación para proteger la base de datos productiva de escrituras malintencionadas en la demo en vivo.

* **UX Defensiva y Selectores Compuestos:** 
El carrito valida existencias contra stock real y maneja variantes complejas combinando el ID del producto con su presentación en mililitros (`id-selectedSize`) para evitar colisiones en el DOM.

* **Rendimiento Nativo:** 
Carrusel de imágenes fluído desarrollado puramente con lógica de estados de React y transformaciones CSS, reduciendo el peso del bundle final al evitar librerías externas de terceros.

---

## 🛠️ Stack Tecnológico

* **Frontend:** React (Modern Stack), Vite, Tailwind CSS.
* **Manejo de Estado:** Context API (Sincronizado nativamente con React Compiler).
* **Enrutamiento:** React Router DOM.
* **Backend como Servicio (BaaS):** Firebase Firestore.
* **Feedback Visual:** SweetAlert2 (Modales premium con estilos unificados).

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/          # Recursos estáticos (Logos y vectores de la marca)
├── components/      # Componentes transversales de la interfaz
│   ├── common/      # Componentes globales de UI (WhatsAppButton)
│   └── layout/      # Estructuras base del diseño (Navbar, Footer)
├── context/         # Motor de estado global del sistema (CartContext)
├── features/        # Módulos encapsulados por dominio de negocio
│   ├── admin/       # Panel de control administrativo y simulación de carga
│   ├── cart/        # Vista consolidada de la orden y CartWidget
│   └── products/    # Catálogo general, tarjetas, detalle y contadores
├── firebase/        # Inicialización y conexión con el SDK de Google (config.js)
└── services/        # Capa de infraestructura y aislamiento de consultas (productService.js)


## ⚙️ Instalación y Configuración Local

Si deseás clonar el repositorio y ejecutarlo en tu entorno local, seguí estos pasos:

1. **Clonar el repositorio:**
```bash
git clone [https://github.com/lucianodilascio/bloom-haircare.git](https://github.com/lucianodilascio/bloom-haircare.git)
cd bloom-haircare

Instalar dependencias:

pnpm install

Configurar variables de entorno:
Creá un archivo .env en la raíz basado en el archivo .env.example e inyectá tus credenciales de Firebase.

Correr el servidor de desarrollo:

pnpm dev