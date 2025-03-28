import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const personajes = [
    {
        id: 1,
        nombre: "Manuel",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto:
            "Manuel es el protagonista que observa los cambios en el bosque.",
    },
    {
        id: 2,
        nombre: "Ganadero",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "El ganadero expande su territorio sin limites.",
    },
    {
        id: 3,
        nombre: "Agricultor",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "El agricultor tala tierras para sembrar.",
    },
    {
        id: 4,
        nombre: "Maderero",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "El maderero extrae arboles centenarios.",
    },
    {
        id: 5,
        nombre: "Inversionista",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "Compra tierras para proyectos comerciales.",
    },
    {
        id: 6,
        nombre: "Empresa",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "Las empresas construyen sin pensar en el ambiente.",
    },
    {
        id: 7,
        nombre: "Animal",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "Los animales huyen del bosque afectado.",
    },
    {
        id: 8,
        nombre: "Rio",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "Los rios se reducen a hilos de agua.",
    },
    {
        id: 9,
        nombre: "Abuelo",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "El abuelo dejo un mensaje sabio sobre los arboles.",
    },
    {
        id: 10,
        nombre: "Tierra",
        img: "https://cdn-icons-png.flaticon.com/512/3873/3873997.png",
        texto: "La tierra se vuelve esteril con la deforestacion.",
    },
];

const TypingText = ({ text, onFinish }) => {
    return (
        <p className="text-lg text-gray-700 whitespace-pre-line">
            <Typewriter
                options={{
                    delay: 40,
                    cursor: "",
                }}
                onInit={(typewriter) => {
                    typewriter
                        .typeString(text)
                        .callFunction(() => {
                            if (onFinish) onFinish();
                        })
                        .start();
                }}
            />
        </p>
    );
};

export default function ActorSelector() {
    const [actorSeleccionado, setActorSeleccionado] = useState(null);
    const [bloqueado, setBloqueado] = useState(false);
    const [textoActual, setTextoActual] = useState("");
    const [lastActorId, setLastActorId] = useState(null);

    const manejarSeleccion = (actor) => {
        if (bloqueado || actor.id === lastActorId) return;

        setBloqueado(true);
        setTextoActual(""); // 🔹 Resetea antes de asignar el nuevo texto
        setTimeout(() => {
            setTextoActual(actor.texto);
        }, 50); // 🔹 Pequeña pausa para reiniciar el efecto

        setActorSeleccionado(actor);
        setLastActorId(actor.id);
    };

    return (
        <div className="flex h-full bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Columna izquierda: Detalles */}
            <div className="w-2/5 p-8 bg-white shadow-lg rounded-r-2xl border-r border-slate-200 flex flex-col justify-center">
                {actorSeleccionado
                    ? (
                        <div className="flex flex-col items-center space-y-6 transform transition-all duration-300 ease-in-out">
                            <div className="relative">
                                <img
                                    src={actorSeleccionado.img}
                                    alt={actorSeleccionado.nombre}
                                    className="w-52 h-52 object-cover rounded-full ring-4 ring-indigo-200 ring-opacity-50 shadow-xl hover:scale-105 transition-transform"
                                />
                                <div className="absolute bottom-2 right-2 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-center space-y-3">
                                <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                    {actorSeleccionado.nombre}
                                </h2>
                                <TypingText
                                    key={textoActual}
                                    text={textoActual}
                                    onFinish={() => setBloqueado(false)}
                                    className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed"
                                />
                            </div>
                        </div>
                    )
                    : (
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-24 w-24 text-slate-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.818-.393-1.544-1-2.2M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.818.393-1.544 1-2.2m0 0a5.002 5.002 0 019 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <p className="text-xl text-slate-500 font-medium">
                                Selecciona un actor para conocer su opinión
                            </p>
                        </div>
                    )}
            </div>

            {/* Columna derecha: Grid de personajes */}
            <div className="w-3/5 p-8 flex items-center">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
                    {personajes.map((actor) => (
                        <motion.div
                            key={actor.id}
                            className={`flex flex-col items-center space-y-2 transform transition-all duration-300 ${
                                bloqueado
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }`}
                            whileHover={!bloqueado ? { scale: 1.05 } : {}}
                            onClick={() => manejarSeleccion(actor)}
                        >
                            <div className="relative">
                                <img
                                    src={actor.img}
                                    alt={actor.nombre}
                                    className="w-28 h-28 object-cover rounded-full border-3 border-indigo-100 shadow-md transition-transform hover:scale-105"
                                />
                                {bloqueado && (
                                    <div className="absolute inset-0 bg-slate-100 bg-opacity-70 rounded-full flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10 text-slate-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm font-semibold text-slate-700 text-center">
                                {actor.nombre}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
