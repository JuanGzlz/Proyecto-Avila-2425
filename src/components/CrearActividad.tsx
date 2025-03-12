import React from "react";
import HeaderVentanas from "./HeaderVentanas";

const CrearActividad: React.FC = () => {
  return (
    <div>
      <HeaderVentanas/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-center text-xl font-semibold mb-6">Crear actividad</h2>
          <form className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded-full" placeholder="Nombre de la actividad" />
            <input type="date" className="border p-2 rounded-full" />
            <input className="border p-2 rounded-full" placeholder="Guía" />
            <input className="border p-2 rounded-full" placeholder="Día de la semana" />
            <input type="time" className="border p-2 rounded-full" placeholder="Hora inicio" />
            <input type="number" className="border p-2 rounded-full" placeholder="Cant Max Personas" />
            <input type="time" className="border p-2 rounded-full" placeholder="Hora final" />
            <input type="number" className="border p-2 rounded-full" placeholder="Costo" />
            <input className="border p-2 rounded-full" placeholder="Punto de encuentro" />
            <input type="number" step="1" min="1" max="10" className="border p-2 rounded-full" placeholder="Dificultad" />
            <input type="number" className="border p-2 rounded-full" placeholder="Distancia" />
            <input type="time" className="border p-2 rounded-full" placeholder="Duración" />
          </form>
          <div className="mt-4 flex justify-center">
            <input className="border p-2 rounded-full w-1/2" placeholder="Duración" />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
              <img src="/mnt/data/image.png" alt="Subir foto" className="object-cover" />
            </div>
            <p className="text-sm text-[#1d6363] mt-2">Subir foto de la actividad</p>
          </div>
          <button className="mt-6 w-full !bg-[#1d6363] text-white py-2 rounded-full text-lg">Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default CrearActividad;