import React, { useState, useEffect } from 'react';
import { useP1Context } from '../../contexts/p1Context';
import { useUser } from '../../contexts/userContext';

const Responses = ( {fullMessage} ) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const { setIsAgentTalking } = useP1Context();
  const { user } = useUser();
  console.log(user.nombre_completo);
  const processedMessage = fullMessage
  ? fullMessage.replace("{nombre_usuario}", user?.nombre_completo || "Usuario")
  : "";

  
  console.log(fullMessage);
  
  useEffect(() => {
    if (processedMessage) {
      setText(""); // Reinicia el texto cuando llega un nuevo mensaje
      setIsTyping(true);
      setIsAgentTalking(true);

      let index = 0;
      const interval = setInterval(() => {
        setText((prev) => prev + processedMessage.charAt(index)); // Usamos charAt() para asegurar que toma bien la letra
        index++;

        if (index === processedMessage.length) {
          clearInterval(interval);
          setIsTyping(false);
          setIsAgentTalking(false);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [processedMessage]); // Depende
  
  return (
    <div className="w-full h-full flex items-center">
      <div className="w-full rounded-lg shadow-md p-4">
        <div className="flex items-center mb-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-xs text-white">Mensaje del asistente</div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded-md min-h-16 flex items-center">
          <p className="text-sm text-white">
            {text}
            {isTyping && <span className="ml-1 animate-pulse">|</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Responses;