import { Lock, ChevronRight } from "lucide-react";
import forest from "../../assets/forest.jpg";

const ModuleCard = ({ title, description, isLocked }) => {
  return (
    <div
      className={`group relative overflow-hidden cursor-pointer rounded-lg shadow-md transition-all duration-300 transform ${
        isLocked ? "bg-gray-800 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-1"
      }`}
    >
      {/* Fondo y Overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
          isLocked ? "opacity-40 grayscale" : "opacity-70 group-hover:opacity-40 cursor-pointer"
        }`}
        style={{ backgroundImage: `url(${forest})` }}
      />
      
      {/* Overlay de bloqueo */}
      {isLocked && (
        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
          <Lock className="w-12 h-12 text-white opacity-80" />
        </div>
      )}

      {/* Contenido */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        <h3
          className={`text-xl font-bold transition-colors duration-300 ${
            isLocked ? "opacity-0" : "text-gray-300 group-hover:text-white"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 transition-colors duration-300 ${
            isLocked ? "opacity-0" : "text-gray-200 group-hover:text-white/80"
          }`}
        >
          {description}
        </p>
        <div className="mt-auto pt-4 flex justify-end">
          {!isLocked && <ChevronRight className="w-5 h-5 text-white transition-colors duration-300" />}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;