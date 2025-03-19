import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../credentials";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);

const CrearForo: React.FC = () => {
const navigate = useNavigate();
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

        alert("Foro creado exitosamente");
        navigate('/ventana-foros')
        setComentario({ texto: "" });
        } catch (error) {
        console.error("Error al guardar el prompt en Firestore:", error);
        }
};

const handleGoBack = () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
        
    if (user) {
            // Si el usuario está autenticado, redirige al homepage
      navigate(-1);
    } else {
            // Si el usuario no está autenticado, redirige a la página anterior
      navigate("/");
      }
  };

return (
    <div>
        <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 font-bold gap-2 px-4 py-2 bg-[#1d6363] text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-[#174f4f]"
      >
        ← Volver
      </button>
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
                        className="bg-blue-500 text-white py-2 rounded-full text-lg font-semibold"
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
