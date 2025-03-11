import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/home/sideBar";
import { Menu } from "lucide-react";

const SidebarLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true); // Controla la visibilidad del botón de menú
  const location = useLocation();

  // Cierra el sidebar cuando cambia la ruta
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Maneja la apertura y cierre del sidebar
  const handleSidebarToggle = (state) => {
    if (!state) {
      setShowMenu(false); // Oculta el botón de menú antes de cerrar
      setTimeout(() => setShowMenu(true), 10); // Muestra el botón después de 500ms
    }
    setSidebarOpen(state);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-900">
      {/* Sidebar con posición absoluta para desplazar el contenido */}
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={handleSidebarToggle} />

      {/* Contenido principal con margen dinámico */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0"
        }`}
      >
        {/* Botón de menú con opacidad y retardo */}
        {showMenu && !sidebarOpen && (
          <button
            onClick={() => handleSidebarToggle(true)}
            className="p-3 fixed top-4 left-4 bg-purple-600 text-white rounded-md shadow-md z-50 opacity-0 animate-fadeIn"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Contenido de la vista */}
        <div className="flex-1 overflow-auto bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
