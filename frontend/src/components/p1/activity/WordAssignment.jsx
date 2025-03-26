import { useState } from "react";

export default function WordAssignment() {
    const categories = [
        {
            title: "¿Dónde ocurre la historia?",
            correctWords: ["Sabana cordobesa"],
        },
        {
            title: "¿Qué cambios ha sufrido el ecosistema?",
            correctWords: [
                "Talado de árboles",
                "Los suelos están secos",
                "Los ríos han perdido caudal",
            ],
        },
        {
            title:
                "¿Quiénes son los principales autores de la deforestación y sus profesiones?",
            correctWords: [
                "Ganaderos",
                "Empresas",
                "Agricultura",
                "Inversionistas",
            ],
        },
    ];

    const [selectedWord, setSelectedWord] = useState(null);
    const [assignedWords, setAssignedWords] = useState([[], [], []]);
    const [availableWords, setAvailableWords] = useState(
        categories.flatMap((category) => category.correctWords),
    );

    const handleWordClick = (word) => {
        setSelectedWord(word);
    };

    const handleCategoryClick = (index) => {
        if (selectedWord) {
            const newAssignments = [...assignedWords];
            const newAvailableWords = [...availableWords];

            // Verifica si la palabra ya está en otro contenedor y la elimina
            newAssignments.forEach((words, i) => {
                if (i !== index) {
                    const wordIndex = words.indexOf(selectedWord);
                    if (wordIndex !== -1) {
                        words.splice(wordIndex, 1);
                        newAvailableWords.push(selectedWord);
                    }
                }
            });

            // Añadir la palabra al nuevo contenedor si no está ya en él
            if (!newAssignments[index].includes(selectedWord)) {
                newAssignments[index] = [
                    ...newAssignments[index],
                    selectedWord,
                ];
            }

            setAssignedWords(newAssignments);
            setAvailableWords(
                newAvailableWords.filter((w) =>
                    !newAssignments.flat().includes(w)
                ),
            );
            setSelectedWord(null);
        }
    };

    const removeWordFromCategory = (word, index) => {
        const newAssignments = [...assignedWords];
        newAssignments[index] = newAssignments[index].filter((w) => w !== word);
        setAssignedWords(newAssignments);
        setAvailableWords([...availableWords, word]);
    };

    const checkAnswers = () => {
        const isCorrect = categories.every((category, index) => {
            return (
                assignedWords[index].length === category.correctWords.length &&
                assignedWords[index].every((word) =>
                    category.correctWords.includes(word)
                )
            );
        });
        alert(
            isCorrect
                ? "¡Correcto! Todas las palabras están bien ubicadas."
                : "Algunas palabras están mal ubicadas.",
        );
    };

    return (
        <div className="h-auto flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                <h1 className="text-3xl font-extrabold text-white text-center tracking-tight">
                    Asigna las palabras
                </h1>
            </div>
            
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={`
                                transform transition-all duration-300 ease-in-out 
                                border-2 rounded-xl p-4 
                                ${selectedWord 
                                    ? "border-purple-500 hover:shadow-lg" 
                                    : "border-gray-200 hover:border-purple-300"
                                }
                                bg-white 
                                hover:scale-[1.02]
                                cursor-pointer
                            `}
                            onClick={() => handleCategoryClick(index)}
                        >
                            <h2 className="text-base font-bold text-purple-600 mb-3">
                                {category.title}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {assignedWords[index].map((word, i) => (
                                    <span
                                        key={i}
                                        className="
                                            bg-purple-100 text-purple-800 
                                            px-3 py-1 rounded-full 
                                            text-sm font-medium
                                            hover:bg-purple-200
                                            transition-colors duration-200
                                            cursor-pointer
                                        "
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeWordFromCategory(word, index);
                                        }}
                                    >
                                        {word}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
    
                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {availableWords.map((word, index) => (
                            <button
                                key={index}
                                className={`
                                    px-4 py-2 rounded-full 
                                    text-sm font-semibold 
                                    transition-all duration-300 ease-in-out
                                    ${selectedWord === word 
                                        ? "bg-purple-600 text-white scale-105 shadow-md" 
                                        : "bg-gray-100 text-gray-700 hover:bg-purple-100"
                                    }
                                `}
                                onClick={() => handleWordClick(word)}
                            >
                                {word}
                            </button>
                        ))}
                    </div>
                </div>
    
                <div className="text-center mt-6">
                    <button
                        onClick={checkAnswers}
                        className="
                            px-8 py-3 
                            bg-gradient-to-r from-purple-600 to-indigo-600 
                            text-white 
                            font-bold 
                            rounded-full 
                            hover:from-purple-700 hover:to-indigo-700
                            transition-all duration-300
                            transform hover:scale-105
                            shadow-lg hover:shadow-xl
                        "
                    >
                        Verificar respuestas
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}
