import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../credentials";
import HeaderVentanas from "./HeaderVentanas";

const db = getFirestore(app);

const DatosSobreActividad: React.FC = () => {
  const navigate = useNavigate();

  const [actividad, setActividad] = useState({
    limitePersonas: "",
    hora: "",
    guia: "",
    puntoEncuentro: "",
    dificultad: "",
    nombreRuta: "",
    datosExtra: "",
    distanciaRuta: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que los campos no excedan los 250 caracteres
    for (const key in actividad) {
      if (actividad[key as keyof typeof actividad].length > 250) {
        alert("Cada campo debe tener un máximo de 250 caracteres.");
        return;
      }
    }

    try {
      console.log("Enviando datos a Firestore...");

      const docRef = await addDoc(collection(db, "datosactividades"), actividad);

      console.log("Actividad guardada con ID:", docRef.id);

      alert("Actividad creada exitosamente");
      navigate("/admin");
    } catch (error) {
      console.error("Error al guardar la actividad en Firestore:", error);
    }
  };

  return (
    <div>
      <HeaderVentanas />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10 p-px">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl h-full">
          <h2 className="text-center text-xl font-semibold mb-6">Datos sobre la actividad</h2>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              name="limitePersonas"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Limite de personas"
              value={actividad.limitePersonas}
              onChange={handleChange}
              maxLength={250}
            />
            <input
              name="hora"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Hora"
              value={actividad.hora}
              onChange={handleChange}
              maxLength={250}
            />
            <input
              name="guia"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Guía"
              value={actividad.guia}
              onChange={handleChange}
              maxLength={250}
            />
            <input
              name="puntoEncuentro"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Punto de encuentro"
              value={actividad.puntoEncuentro}
              onChange={handleChange}
              maxLength={250}
            />
            <input
              name="dificultad"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Dificultad"
              value={actividad.dificultad}
              onChange={handleChange}
              maxLength={250}
            />
            <input
              name="nombreRuta"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Nombre de la ruta"
              value={actividad.nombreRuta}
              onChange={handleChange}
              maxLength={250}
            />
            <input
              name="datosExtra"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Datos extra"
              value={actividad.datosExtra}
              onChange={handleChange}
              maxLength={250}
            />
            <input
              name="distanciaRuta"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Distancia de la ruta"
              value={actividad.distanciaRuta}
              onChange={handleChange}
              maxLength={250}
            />
            <button type="submit" className="mt-6 w-full !bg-[#1d6363] text-white py-2 rounded-full text-lg col-span-2">
              Crear actividad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DatosSobreActividad;