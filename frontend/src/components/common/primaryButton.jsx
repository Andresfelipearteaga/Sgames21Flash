 // Componente para los botones principales
 export const PrimaryButton = ({ children, onClick }) => (
    <button
      className="w-full py-3 bg-purple-800 text-white rounded-lg font-medium shadow-md hover:bg-purple-900 transition-colors cursor-pointer"
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </button>
  );
