import React, { useState } from "react";
import Xarrow from "react-xarrows";

export default function App() {
  const [connections, setConnections] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [message, setMessage] = useState("");

  // Conexiones correctas predefinidas
  const correctConnections = [
    { from: "img0", to: "box1-1" },
    { from: "box1-1", to: "box0-2" },
    { from: "img1", to: "box0-1" },
    { from: "box0-1", to: "box1-2" },
    { from: "img2", to: "box3-1" },
    { from: "box3-1", to: "box2-2" },
    { from: "img3", to: "box4-1" },
    { from: "box4-1", to: "box3-2" },
    { from: "img4", to: "box2-1" },
    { from: "box2-1", to: "box4-2" },
  ];

  // Función para verificar si un cuadro ya tiene conexiones
  const canConnect = (from, to) => {
    const fromCol = from.startsWith("img") ? 1 : from.includes("-1") ? 2 : 3;
    const toCol = to.startsWith("img") ? 1 : to.includes("-1") ? 2 : 3;

    // Solo permitir conexiones de izquierda a derecha
    if (fromCol >= toCol) return false;

    const connectionsFrom = connections.filter((conn) => conn.from === from);
    const connectionsTo = connections.filter((conn) => conn.to === to);

    // Restricción para los personajes: solo pueden conectarse a un único "Diálogo A"
    if (from.startsWith("img") && connectionsFrom.length >= 1) return false;

    // Restricción para "Diálogo A": solo puede recibir una conexión de un personaje
    if (to.includes("-1") && connectionsTo.length >= 1) return false;

    // Restricción para "Diálogo A" a "Diálogo B": solo puede conectarse a un único "Diálogo B"
    if (to.includes("-1") && connectionsTo.some(conn => conn.to.includes("-2"))) return false;

    // Restricción para "Diálogo B": solo puede recibir una conexión de "Diálogo A"
    if (from.includes("-1") && connectionsTo.length >= 1) return false;

    return true;
  };

  const handleClick = (id) => {
    if (startPoint?.id === id) {
      setStartPoint(null); // Deseleccionar si se vuelve a hacer clic
    } else if (!startPoint) {
      setStartPoint({ id });
    } else {
      if (canConnect(startPoint.id, id)) {
        setConnections([...connections, { from: startPoint.id, to: id }]);
      }
      setStartPoint(null);
    }
  };

  const verifyConnections = () => {
    const isCorrect = correctConnections.every((correct) =>
      connections.some(
        (conn) => conn.from === correct.from && conn.to === correct.to
      )
    );

    setMessage(isCorrect ? "✅ ¡Todas las conexiones son correctas!" : "❌ Hay errores en las conexiones.");
  };

  const removeConnection = (connectionToRemove) => {
    console.log("Removing connection", connectionToRemove);
    setConnections((prevConnections) =>
      prevConnections.filter(
        (conn) =>
          conn.from !== connectionToRemove.from || conn.to !== connectionToRemove.to
      )
    );
  };

  // Character images (using placeholder URLs)
const characterImages = [
    '/api/placeholder/200/200?text=Superhero+1',
    '/api/placeholder/200/200?text=Warrior+1', 
    '/api/placeholder/200/200?text=Wizard+1',
    '/api/placeholder/200/200?text=Archer+1', 
    '/api/placeholder/200/200?text=Rogue+1'
  ];
  
  // Short, quirky dialogues
  const dialogues = [
    [
      "I'm the hero this city needs!",
      "Maybe not the hero it deserves..."
    ],
    [
      "Our quest begins at dawn.",
      "Do we really have to wake up so early?"
    ],
    [
      "The ancient spell will protect us.",
      "Are you sure about this magic?"
    ],
    [
      "Target locked, arrow ready!",
      "Precision is my middle name."
    ],
    [
      "Shadows are my playground.",
      "Stealth is an art form."
    ]
  ];

  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">
          Character Connection Mapper
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {[...Array(5)].map((_, row) => (
            <React.Fragment key={row}>
              {/* Character Image */}
              <div 
                id={`img${row}`}
                className={`
                  rounded-xl overflow-hidden shadow-lg transform transition 
                  hover:scale-105 cursor-pointer
                  ${startPoint?.id === `img${row}` ? "ring-4 ring-yellow-400" : ""}
                `}
                onClick={() => handleClick(`img${row}`)}
              >
                <img 
                  src={characterImages[row]} 
                  alt={`Character ${row + 1}`} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-gray-800 text-white text-center">
                  Character {row + 1}
                </div>
              </div>

              {/* Dialogue A */}
              <div
                id={`box${row}-1`}
                className={`
                  bg-white rounded-xl shadow-md p-4 
                  border-l-4 border-blue-500 
                  hover:bg-blue-50 cursor-pointer
                  transition duration-300
                  ${startPoint?.id === `box${row}-1` ? "ring-4 ring-yellow-400" : ""}
                `}
                onClick={() => handleClick(`box${row}-1`)}
              >
                <p className="text-gray-800 font-medium">
                  {dialogues[row][0]}
                </p>
              </div>

              {/* Dialogue B */}
              <div
                id={`box${row}-2`}
                className={`
                  bg-white rounded-xl shadow-md p-4 
                  border-l-4 border-green-500 
                  hover:bg-green-50 cursor-pointer
                  transition duration-300
                `}
                onClick={() => handleClick(`box${row}-2`)}
              >
                <p className="text-gray-800 font-medium">
                  {dialogues[row][1]}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Connections with Xarrow */}
        {connections.map((conn, index) => (
          <div key={index} className="relative cursor-pointer" onClick={() => removeConnection(conn)}>
            <Xarrow 
              start={conn.from} 
              end={conn.to} 
              color="#6366f1"  // Indigo color
              headSize={4}
              path="smooth"
            />
          </div>
        ))}

        {/* Verification Button */}
        <div className="mt-8 flex flex-col items-center">
          <button
            className="
              px-6 py-3 
              bg-purple-600 text-white 
              rounded-full 
              hover:bg-purple-700 
              transition duration-300 
              shadow-lg 
              hover:shadow-xl
            "
            onClick={verifyConnections}
          >
            Verify Connections
          </button>
          {message && (
            <p className="mt-4 text-lg text-green-600 font-semibold">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
