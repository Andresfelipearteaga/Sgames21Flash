import React, { useState } from "react";
import { Highlighter } from "lucide-react";

const TextHighlighter = () => {
    const [text, setText] = useState(
        `Manuel cada vez se daba cuenta de como los tiempos cambiaron. Las motosierras rugían, los árboles caían y el verde desaparecía. Los ganaderos expandían potreros sin límite, los agricultores talaban para sembrar a gran escala, y los madereros explotaban los árboles centenarios. inversionistas y grandes empresas compraban tierras para proyectos urbanísticos y comerciales, destruyendo más bosque. Manuel recorrió el bosque. Los ríos eran hilos de agua, la tierra estaba seca y los animales huían. Recordó las palabras de su abuelo: "Sin árboles, no hay vida."Sabía que debía hacer algo antes de que todo desapareciera.`,
    );
    const [highlights, setHighlights] = useState([]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);
    const colors = [
        {
            name: "green",
            hex: "#10B981",
            correctHighlights: [
                "motosierras",
                "árboles",
                "verde",
                "caían",
                "desaparecía",
            ],
        },
        {
            name: "yellow",
            hex: "#FBBF24",
            correctHighlights: [
                "ganaderos",
                "agricultores",
                "madereros",
                "empresas",
                "inversionistas",
            ],
        },
        {
            name: "purple",
            hex: "#8B5CF6",
            correctHighlights: [
                "ríos",
                "hilos",
                "tierra",
                "seca",
                "animales",
                "huían",
            ],
        },
    ];

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setVerificationResult(null);
    };

    const handleTextHighlight = (event) => {
        if (!selectedColor) return;

        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (!selectedText || selectedText.includes(" ")) return;

        // Buscar si la palabra está en la lista de correctHighlights del color seleccionado
        const colorData = colors.find((c) => c.hex === selectedColor);
        if (!colorData || !colorData.correctHighlights.includes(selectedText)) {
            return;
        }

        // Encontrar la primera posición de la palabra
        const regex = new RegExp(`\\b${selectedText}\\b`);
        const match = text.match(regex);

        if (!match) return;

        // Buscar si ya existe un highlight para esta palabra
        const existingHighlightIndex = highlights.findIndex(
            (h) => h.text === selectedText && h.position === match.index,
        );

        if (existingHighlightIndex !== -1) {
            const newHighlights = [...highlights];
            newHighlights.splice(existingHighlightIndex, 1);
            setHighlights(newHighlights);
            return;
        }

        // Crear nuevo highlight
        const highlight = {
            text: selectedText,
            color: selectedColor,
            position: match.index,
        };

        setHighlights([...highlights, highlight]);
    };

    const verifyHighlights = () => {
        const results = colors.map((color) => {
            const colorHighlights = highlights.filter((h) =>
                h.color === color.hex
            );
            const correctHighlights = colorHighlights.filter((h) =>
                color.correctHighlights.includes(h.text)
            );

            return {
                color: color.name,
                totalHighlights: colorHighlights.length,
                correctHighlights: correctHighlights.length,
                isCorrect: colorHighlights.length > 0 &&
                    colorHighlights.length === color.correctHighlights.length,
            };
        });

        const overallResult = results.every((r) => r.isCorrect);
        setVerificationResult({
            details: results,
            overallResult,
        });
    };

    const renderHighlightedText = () => {
        let highlightedText = text;

        // Ordenar highlights por posición para evitar problemas de reemplazo
        const sortedHighlights = [...highlights].sort((a, b) =>
            b.position - a.position
        );

        sortedHighlights.forEach((highlight) => {
            // Crear regex que solo coincida con la palabra completa en la posición específica
            const regex = new RegExp(`\\b${highlight.text}\\b`, "g");

            highlightedText = highlightedText.replace(
                regex,
                (match, offset) => {
                    // Solo resaltar si la posición coincide exactamente
                    if (offset === highlight.position) {
                        return `<span style="background-color: ${highlight.color}">${match}</span>`;
                    }
                    return match;
                },
            );
        });

        return highlightedText;
    };

    return (
        <div className="bg-gray-50 min-h-auto flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* New header with interactive circles */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-t-2xl">
                    <div className="flex items-center space-x-4">
                        {[
                            {
                                color: "rojo",
                                text: "¿Qué concepto destacar?",
                            },
                            {
                                color: "amarillo",
                                text: "¿Cómo organizarlo?",
                            },
                            {
                                color: "verde",
                                text: "¿Por qué es importante?",
                            },
                        ].map((q, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2"
                            >
                                <div
                                    className={`w-8 h-8 rounded-full ${
                                        q.color === "rojo"
                                            ? "bg-red-400"
                                            : q.color === "amarillo"
                                            ? "bg-yellow-400"
                                            : "bg-green-400"
                                    }`}
                                />
                                <span className="text-white text-sm">
                                    {q.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex justify-center space-x-4 mb-4">
                        {colors.map((color) => (
                            <div
                                key={color.name}
                                onClick={() => handleColorSelect(color.hex)}
                                className={`w-12 h-12 rounded-full cursor-pointer transition-all 
              ${
                                    selectedColor === color.hex
                                        ? "ring-4 ring-opacity-50 ring-gray-300"
                                        : ""
                                }`}
                                style={{
                                    backgroundColor: color.hex,
                                    transform: selectedColor === color.hex
                                        ? "scale(1.1)"
                                        : "scale(1)",
                                }}
                            />
                        ))}
                    </div>

                    <div
                        onClick={handleTextHighlight}
                        className="p-6 border-2 border-gray-200 rounded-xl cursor-pointer"
                        style={{
                            cursor: selectedColor
                                ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='${
                                    encodeURIComponent(selectedColor)
                                }' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 5l0 14m-5 -5l5 5l5 -5'/%3E%3C/svg%3E") 10 10, pointer`
                                : "default",
                        }}
                        dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(),
                        }}
                    />

                    <div className="flex justify-center mt-4">
                        <button
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                            onClick={verifyHighlights}
                        >
                            Verificar Resaltados
                        </button>
                    </div>
                </div>

                {verificationResult && (
                    <div className="mt-4 p-4 rounded bg-gray-100">
                        <h3 className="font-bold mb-2">
                            Resultado de Verificación:
                            {verificationResult.overallResult
                                ? (
                                    <span className="text-green-600">
                                        ¡Correcto!
                                    </span>
                                )
                                : (
                                    <span className="text-red-600">
                                        Intentalo de nuevo
                                    </span>
                                )}
                        </h3>
                        {verificationResult.details.map((result) => (
                            <div key={result.color} className="mb-2">
                                <p
                                    className={`font-semibold ${
                                        result.isCorrect
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    Color {result.color}:
                                    {result.isCorrect
                                        ? ` Correcto (${result.correctHighlights}/${
                                            colors.find((c) =>
                                                c.name === result.color
                                            ).correctHighlights.length
                                        })`
                                        : ` Incorrecto (${result.correctHighlights}/${
                                            colors.find((c) =>
                                                c.name === result.color
                                            ).correctHighlights.length
                                        })`}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextHighlighter;
