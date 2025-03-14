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
        <div className="min-h-screen bg-teal-900 flex-col justify-center items-center p-4"> 
          <h1 className="text-2xl font-bold text-gray-800 text-white">
            ¡Has seleccionado: Acampar en el Pico Naiguatá!
          </h1>
          <h2 className="text-white mt-2">
            Una actividad que requiere de mucha disciplina, pero cuyas vistas te recompensarán...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start relative">
          {/* Cuadro de información con líneas divisorias */}
          <div className="bg-gray-100 rounded-lg shadow-md">
            <div className="grid grid-cols-2 border border-gray-300">
              {/* Ítems informativos con bordes */}
              {[
                {
                  icon: "icono1.png",
                  text: "Inicio a las 7:30 am del sábado hasta las 6 pm del siguiente día, con una duración de 8 horas por día.",
                },
                {
                  icon: "icono2.png",
                  text: "El límite de personas acordado por el administrador y el guía será de 10 personas, cada uno con provisiones.",
                },
                {
                  icon: "icono3.png",
                  text: "El punto de encuentro será en la Universidad Metropolitana.",
                },
                {
                  icon: "icono4.png",
                  text: "El guía será Valentino Vegas, el cual tiene conocimientos médicos básicos.",
                },
                {
                  icon: "icono5.png",
                  text: 'Se subirá por la ruta de "La Julia" hasta los 2765 metros sobre el nivel del mar.',
                },
                {
                  icon: "icono6.png",
                  text: "La dificultad es medianamente alta, por lo que se necesitan buenas condiciones físicas.",
                },
                {
                  icon: "icono7.png",
                  text: "Es un recorrido de 8.95 km con una elevación total de 1770 m.",
                },
                {
                  icon: "icono8.png",
                  text: "Desayuno y llevar: Hidratación, proteínas, snacks, ropa térmica y sleeping bag.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 border-gray-300 ${
                    index % 2 === 0 ? "border-r" : "" // Línea vertical a la derecha
                  } ${index < 6 ? "border-b" : ""}`} // Línea horizontal abajo excepto en las últimas dos
                >
                  <img
                    src={`/icons/${item.icon}`}
                    alt="icono"
                    className="w-8 h-8"
                  />
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen destacada */}
          <div className="relative">
            <img
              src="/images/camping.jpg"
              alt="Acampada en el Pico Naiguatá"
              className="w-full h-56 object-cover rounded-lg shadow-md"
            />
            {/* Precio */}
            <div className="absolute bottom-2 right-2 bg-white px-3 py-1 shadow rounded-md">
              <p className="text-gray-800 font-semibold">Costo: USD$ 40</p>
            </div>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="flex justify-center mt-6">
          <button className="bg-green-600 text-white px-6 py-2 rounded-full text-lg shadow hover:bg-green-700">
            Anotarse
          </button>
        </div>

        <div className="max-w-7xl mx-auto mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 text-left mb-4 border-b pb-3">Comentarios y Reseñas</h2>
            {comments.map((c, index) => (
            <div key={index} className="border-b py-4 flex justify-between items-start">
                <div>
                <h3 className="font-semibold text-gray-800 text-left">{c.name}</h3>
                <p className="text-gray-600 text-left">{c.text}</p>
                </div>
                <div className="flex space-x-2">
                <ThumbsUp className="text-gray-500 hover:text-blue-500 cursor-pointer" />
                <ThumbsDown className="text-gray-500 hover:text-red-500 cursor-pointer" />
                </div>
            </div>
            ))}

            <div className="mt-4 flex items-center pt-4">
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