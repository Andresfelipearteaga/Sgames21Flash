import { useP1Context } from "../../contexts/p1Context";

const FullScreenView = ( { startAgentMessage } ) => {
  const { isFullScreenVisible, setIsFullScreenVisible, stage } = useP1Context();

  const handleAgentMessage = () => {
    setIsFullScreenVisible(false);
    startAgentMessage('start_p1');
  }
  if (!isFullScreenVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Vista para video introducción</h2>
        <p>Contenido de ejemplo en pantalla completa.</p>

        {stage === "Introducción" ?
                <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={handleAgentMessage}
              >
                Continuar
              </button>
              :
             <button
             className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
             onClick={() => { setIsFullScreenVisible(false)
               
             }}
           >
             Cerrar
           </button>  }
 
      </div>
    </div>
  );
};

export default FullScreenView;
