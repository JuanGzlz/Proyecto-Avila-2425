import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../credentials";
import HeaderVentanas from "./HeaderVentanas";

const db = getFirestore(app);
const storage = getStorage(app);

const CrearActividad: React.FC = () => {
  const [actividad, setActividad] = useState({
    nombre: "",
    guia: "",
    fecha: "",
    diaSemana: "",
    horaInicio: "",
    horaFinal: "",
    cantMaxPersonas: "",
    costo: "",
    puntoEncuentro: "",
    dificultad: "",
    distancia: "",
    duracion: "",
    imagen: "",
  });

  const [imagen, setImagen] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      console.log("Enviando datos a Firestore...");
  
      const actividadData = {
        nombre: actividad.nombre,
        guia: actividad.guia,
        fecha: actividad.fecha,
        diaSemana: actividad.diaSemana,
        horaInicio: actividad.horaInicio,
        horaFinal: actividad.horaFinal,
        cantMaxPersonas: actividad.cantMaxPersonas,
        costo: actividad.costo,
        puntoEncuentro: actividad.puntoEncuentro,
        dificultad: actividad.dificultad,
        distancia: actividad.distancia,
        duracion: actividad.duracion,
        imagen: "", 
      };
  
      console.log("Datos a guardar:", actividadData);
  
      const docRef = await addDoc(collection(db, "actividades"), actividadData);
  
      console.log("Actividad guardada con ID:", docRef.id);
  
      alert("Actividad creada exitosamente");
      setActividad({
        nombre: "",
        guia: "",
        fecha: "",
        diaSemana: "",
        horaInicio: "",
        horaFinal: "",
        cantMaxPersonas: "",
        costo: "",
        puntoEncuentro: "",
        dificultad: "",
        distancia: "",
        duracion: "",
        imagen: "",
      });
    } catch (error) {
      console.error("Error al guardar la actividad en Firestore:", error);
    }
  };
  
  return (
    <div>
      <HeaderVentanas />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-center text-xl font-semibold mb-6">Crear actividad</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input name="nombre" value={actividad.nombre} onChange={handleChange} className="border p-2 rounded-full" placeholder="Nombre de la actividad" required />
            <input name="fecha" type="date" value={actividad.fecha} onChange={handleChange} className="border p-2 rounded-full" required />
            <input name="guia" value={actividad.guia} onChange={handleChange} className="border p-2 rounded-full" placeholder="Guía" required />
            <input name="diaSemana" value={actividad.diaSemana} onChange={handleChange} className="border p-2 rounded-full" placeholder="Día de la semana" required />
            <input name="horaInicio" type="time" value={actividad.horaInicio} onChange={handleChange} className="border p-2 rounded-full" required />
            <input name="cantMaxPersonas" type="number" value={actividad.cantMaxPersonas} onChange={handleChange} className="border p-2 rounded-full" placeholder="Cant Max Personas" required />
            <input name="horaFinal" type="time" value={actividad.horaFinal} onChange={handleChange} className="border p-2 rounded-full" required />
            <input name="costo" type="number" value={actividad.costo} onChange={handleChange} className="border p-2 rounded-full" placeholder="Costo" required />
            <input name="puntoEncuentro" value={actividad.puntoEncuentro} onChange={handleChange} className="border p-2 rounded-full" placeholder="Punto de encuentro" required />
            <input name="dificultad" type="number" min="1" max="10" value={actividad.dificultad} onChange={handleChange} className="border p-2 rounded-full" placeholder="Dificultad" required />
            <input name="distancia" type="number" value={actividad.distancia} onChange={handleChange} className="border p-2 rounded-full" placeholder="Distancia" required />
            <input name="duracion" type="time" value={actividad.duracion} onChange={handleChange} className="border p-2 rounded-full" placeholder="Duración" required />
            
            <input type="file" onChange={handleImageChange} className="border p-2 rounded-full col-span-2" />
            
            <button type="submit" className="col-span-2 bg-green-500 text-white py-2 rounded-full text-lg">
              Crear Actividad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearActividad;
