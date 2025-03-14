import { useState } from "react";
import { ThumbsUp, ThumbsDown, Paperclip, Send } from "lucide-react";
import HeaderVentanas from "./HeaderVentanas";

const comments = [
  {
    name: "Marcelo Viera",
    text: "Una actividad increíble. 10/10 el guía, alguien muy preparado con todas las provisiones necesarias para una experiencia tan amena.",
  },
  {
    name: "Julio Walter",
    text: "Me gustó mucho! Fue un poco incómodo el lugar donde se durmió, pero lo repetiría totalmente.",
  },
  {
    name: "Nathaly Suárez",
    text: "La pasé súper bien, pero la subida fue bastante fuerte. El guía nos aconsejó en todo momento y estuvo muy atento.",
  },
];

const ExcursionDetails: React.FC = () => {
  const [comment, setComment] = useState("");

  return (
    <div>
        <HeaderVentanas />
        <div className="p-6 bg-gray-100 min-h-screen">
            
        <div className="max-w-4xl mx-auto bg-[#1d6363] rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 text-white">
            ¡Has seleccionado: Acampar en el Pico Naiguatá!
            </h1>
            <p className="text-white mt-2">
            Una actividad que requiere de mucha disciplina, pero cuyas vistas te recompensarán...
            </p>

            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <p className="text-gray-700">Detalles de la excursión...</p>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">Anotarse</button>
        </div>

        <div className="max-w-4xl mx-auto mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800">Comentarios y Reseñas</h2>
            {comments.map((c, index) => (
            <div key={index} className="border-b py-4 flex justify-between items-start">
                <div>
                <h3 className="font-semibold text-gray-800">{c.name}</h3>
                <p className="text-gray-600">{c.text}</p>
                </div>
                <div className="flex space-x-2">
                <ThumbsUp className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                <ThumbsDown className="text-gray-500 hover:text-red-500 cursor-pointer" />
                </div>
            </div>
            ))}

            <div className="mt-4 flex items-center border-t pt-4">
            <input
                type="text"
                className="flex-grow border rounded-lg p-2"
                placeholder="Deja un comentario y adjunta fotos..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Paperclip className="mx-2 text-gray-500 cursor-pointer" />
            <Send className="text-gray-500 cursor-pointer" />
            </div>
        </div>
        </div>
    </div>

  );
}

export default ExcursionDetails;