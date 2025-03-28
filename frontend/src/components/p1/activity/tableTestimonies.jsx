import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const DeforestationTable = () => {
    const [modalOpen, setModalOpen] = useState({ actor: null, column: null });
    const [tableData, setTableData] = useState({
        "Ganadero": {
            perspective: [],
            solution: [],
            stance: [],
        },
        "Político": {
            perspective: [],
            solution: [],
            stance: [],
        },
        "Científico": {
            perspective: [],
            solution: [],
            stance: [],
        },
        "Personas": {
            perspective: [],
            solution: [],
            stance: [],
        },
        "Empresas": {
            perspective: [],
            solution: [],
            stance: [],
        },
    });

    const columnIdeas = {
        perspective: [
            "Impacto económico directo",
            "Consecuencias ambientales",
            "Presión social y mediática",
            "Perspectiva legal",
            "Tendencias globales",
        ],
        solution: [
            "Innovación tecnológica",
            "Políticas de conservación",
            "Compensación ambiental",
            "Educación y concientización",
            "Alternativas económicas sostenibles",
        ],
        stance: [
            "Totalmente a favor",
            "Parcialmente a favor",
            "Neutral",
            "Parcialmente en contra",
            "Totalmente en contra",
        ],
    };

    const openModal = (actor, column) => {
        setModalOpen({ actor, column });
    };

    const closeModal = () => {
        setModalOpen({ actor: null, column: null });
    };

    const addIdea = (idea) => {
        const { actor, column } = modalOpen;

        // Primero, eliminar la idea de todos los actores en esta columna
        const updatedTableData = Object.keys(tableData).reduce(
            (acc, currentActor) => {
                return {
                    ...acc,
                    [currentActor]: {
                        ...tableData[currentActor],
                        [column]: tableData[currentActor][column].filter(
                            (existingIdea) => existingIdea !== idea
                        ),
                    },
                };
            },
            {},
        );

        // Luego, añadir la idea al actor actual
        updatedTableData[actor][column].push(idea);

        setTableData(updatedTableData);
        closeModal();
    };

    const removeIdea = (actor, column, index) => {
        setTableData((prev) => ({
            ...prev,
            [actor]: {
                ...prev[actor],
                [column]: prev[actor][column].filter((_, i) => i !== index),
            },
        }));
    };

    const handleCellClick = (actor, column, currentIdeas) => {
        if (currentIdeas.length > 0) {
            removeIdea(actor, column, currentIdeas.length - 1);
        }
    };

    const getAvailableIdeas = (column) => {
        // Obtener todas las ideas ya usadas en esta columna
        const usedIdeas = Object.values(tableData).flatMap((actor) =>
            actor[column]
        );

        // Filtrar las ideas originales quitando las ya usadas
        return columnIdeas[column].filter(
            (idea) => !usedIdeas.includes(idea),
        );
    };

    return (
        <div className="container mx-auto p-4 bg-gray-50">
            <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-green-600 text-white">
                    <tr>
                        <th className="p-3 text-left">Actores involucrados</th>
                        <th className="p-3 text-left">Perspectiva</th>
                        <th className="p-3 text-left">Posible solución</th>
                        <th className="p-3 text-left">¿A favor o en contra?</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(tableData).map((actor) => (
                        <tr key={actor} className="border-b">
                            <td className="p-3 font-semibold">{actor}</td>
                            {["perspective", "solution", "stance"].map(
                                (column) => {
                                    const currentIdeas =
                                        tableData[actor][column];
                                    return (
                                        <td
                                            key={column}
                                            className="p-3 relative"
                                            onClick={() =>
                                                handleCellClick(
                                                    actor,
                                                    column,
                                                    currentIdeas,
                                                )}
                                        >
                                            <div className="flex flex-wrap gap-2">
                                                {currentIdeas.map((
                                                    idea,
                                                    index,
                                                ) => (
                                                    <span
                                                        key={index}
                                                        className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs flex items-center"
                                                    >
                                                        {idea}
                                                    </span>
                                                ))}
                                                <Plus
                                                    className="text-green-600 cursor-pointer"
                                                    size={20}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openModal(
                                                            actor,
                                                            column,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    );
                                },
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen.actor && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Selecciona ideas para {modalOpen.actor} -{" "}
                                {modalOpen.column === "perspective"
                                    ? "Perspectiva"
                                    : modalOpen.column === "solution"
                                    ? "Posible solución"
                                    : "Posición"}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="grid gap-2">
                            {getAvailableIdeas(modalOpen.column).map((
                                idea,
                                index,
                            ) => (
                                <button
                                    key={index}
                                    className="w-full text-left p-2 hover:bg-green-100 rounded transition-colors"
                                    onClick={() => addIdea(idea)}
                                >
                                    {idea}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeforestationTable;
