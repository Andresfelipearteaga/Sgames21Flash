import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const StudyStrategyPlanner = ({SelectedKey, initCheckInicial} ) => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    initCheckInicial('startad_p1');
  }, []);


  const sections = [
    {
    key: "Estrategias",
      title: "¿Qué estrategias utilizarás para identificar los hechos relevantes?",
      options: [
        "Lectura Crítica y Subrayado",
        "Búsqueda de Palabras Clave", 
    
      ]
    },
    {
        key: "Organización",
      title: "¿Cómo organizarás la información encontrada?",
      options: [
        "Mapas Conceptuales",
        "Uso de Tablas y Gráficos"
      ]
    },
    {
        key: "Herramientas",
      title: "¿Qué herramientas te serán útiles?",
      options: [
        "Cuadro de Notas",
        "Sistema de Etiquetado", 
      ]
    }
  ];

  const toggleSection = (index, sectionKey) => {
    console.log('sectionKey', sectionKey);
    
    const isOpen = openSection === index;

    // Solo ejecutar si se está abriendo la sección
    if (!isOpen) {
        if (sectionKey === 'Herramientas') {
            initCheckInicial('select_tool_p1');
        } else if (sectionKey === 'Organización') {
            initCheckInicial('select_organizer_p1');
        } else if (sectionKey === 'Estrategias') {
            initCheckInicial('select_strategy_p1');
        }
    }

    setOpenSection(isOpen ? null : index);
    SelectedKey(isOpen ? null : sectionKey);
};

  const handleSelectOption = (sectionIndex, option) => {
    setSelectedOptions({ ...selectedOptions, [sectionIndex]: option });
  };



  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="overflow-hidden space-y-4">
        {sections.map((section, index) => (
          <div 
            key={section.key} 
            className="transition-all duration-300 ease-in-out"
          >
            <button 
              onClick={() => toggleSection(index, section.key)}
              className={`w-full text-left p-5 flex cursor-pointer justify-between items-center bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-md`}
            >
              <h2 className={`font-semibold text-base text-white`}>
                {section.title}
              </h2>
             
                <div className="text-purple-100 cursor-pointer">
                  {openSection === index ? <ChevronUp /> : <ChevronDown />}
                </div>
             
            </button>

            <div
              className={`
                transition-all duration-500 ease-in-out overflow-hidden
                ${openSection === index ? 'max-h-96 opacity-100 py-5' : 'max-h-0 opacity-0 py-0'}
              `}
            >
              <div className={`p-5`}>
                {section.description && (
                  <p className={`mb-4`}>
                    {section.description}
                  </p>
                )}
                {section.options.length > 0 && (
                  <ul className="space-y-2">
                    {section.options.map((option, optIndex) => (
                      <li 
                        key={optIndex} 
                        onClick={() => handleSelectOption(index, option)}
                        className={`
                          px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 transform 
                          ${selectedOptions[index] === option ? 'bg-purple-800 text-white scale-105 shadow-lg' : 'bg-gray-800 text-white hover:scale-105 hover:bg-purple-900'}
                        `}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyStrategyPlanner;