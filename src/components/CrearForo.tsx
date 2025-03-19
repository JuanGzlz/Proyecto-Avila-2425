import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../credentials";
import HeaderVentanas from "./HeaderVentanas";

const db = getFirestore(app);

const CrearForo: React.FC = () => {
const [comentario, setComentario] = useState({
    texto: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComentario({
        ...comentario,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comentario.texto.length > 100) {
        alert("El prompt no puede exceder los 100 caracteres");
        return;
    }

    try {
        console.log("Enviando prompt a Firestore...");

        const comentarioData = {
            texto: comentario.texto,
            fecha: new Date().toISOString(),
        };

        console.log("Datos a guardar:", comentarioData);

        const docRef = await addDoc(collection(db, "foro"), comentarioData);

        console.log("Prompt guardado con ID:", docRef.id);

        alert("Prompt creado exitosamente");
        setComentario({ texto: "" });
        } catch (error) {
        console.error("Error al guardar el prompt en Firestore:", error);
        }
};

return (
    <div>
        <HeaderVentanas />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg m-5 md:m-0">
                <h2 className="text-center text-xl font-semibold mb-6">Escribe el prompt para el foro</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <input
                        name="texto"
                        value={comentario.texto}
                        onChange={handleChange}
                        className="border p-2 rounded-full"
                        placeholder="Escribe tu prompt (máximo 100 caracteres)"
                        maxLength={100}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-full text-lg"
                    >
                        Crear Prompt
                    </button>
                </form>
            </div>
        </div>
    </div>
    );
};

export default CrearForo;
