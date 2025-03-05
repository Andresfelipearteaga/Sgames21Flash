import React from 'react';
import { CheckCircle, BookOpen, Table, Tags, FileText, Lock } from 'lucide-react';  // Usa estos íconos o los que prefieras

const SidebarInfo = ({ SelectedKey }) => {
    const handleItemClick = (key) => {
      console.log(key);
    };
  const renderContent = () => {
    if (SelectedKey === null) {
      return (
        <div className="flex flex-col items-center justify-center space-y-2">
          <Lock className="w-10 h-10 text-white" />
          <span className="text-white text-center font-medium">Aún no hay nada para mostrar aquí</span>
        </div>
      );
    }

    const renderClickableItem = (icon, label) => (
        <div
          onClick={() => handleItemClick(label)}
          className="flex items-center gap-3 text-white cursor-pointer group 
                     p-3 rounded-lg transition-all duration-300 
                     bg-gray-800 hover:bg-purple-700 hover:scale-105 
                     active:scale-95 active:bg-purple-900"
        >
          <div className="flex-shrink-0">{icon}</div>
          <span className="flex-grow font-medium">{label}</span>
        </div>
      );

    switch (SelectedKey) {
      case "Estrategias":
        return (
          <div className="space-y-3">
            {renderClickableItem( <BookOpen className="w-6 h-6" />, "Lectura Crítica y Subrayado")}
            {renderClickableItem( <FileText className="w-6 h-6" />, "Búsqueda de Palabras Clave")}
          </div>
        );

      case "Organización":
        return (
          <div className="space-y-3">
            {renderClickableItem( <Table className="w-6 h-6" />, "Mapas Conceptuales")}
            {renderClickableItem( <Table className="w-6 h-6" />, "Uso de Tablas y Gráficos")}
          </div>
        );

      case "Herramientas":
        return (
          <div className="space-y-3">
           {renderClickableItem( <FileText className="w-6 h-6" />, "Cuadro de Notas")}
            {renderClickableItem( <Tags className="w-6 h-6" />, "Sistema de Etiquetado")}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full rounded p-4 space-y-8 transition-all duration-500 ease-in-out bg-gray-800">
      <div className='flex items-center justify-center'>
        <span className='text-white font-semibold text-xl'> {SelectedKey} </span>
      </div>

      {/* Aquí se muestra la sección dinámica según el SelectedKey */}
      <div className="space-y-4">
        {renderContent()}
      </div>

    </div>
  );
};

export default SidebarInfo;
