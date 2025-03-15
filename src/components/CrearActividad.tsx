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
    imagenPrincipal: "", // URL de la imagen principal
    imagenesAdicionales: [], // Array de URLs de imágenes adicionales
  });

  const [imagenPrincipal, setImagenPrincipal] = useState<File | null>(null);
  const [imagenesAdicionales, setImagenesAdicionales] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar imagen principal
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagenPrincipal(e.target.files[0]);
    }
  };

  // Manejar imágenes adicionales
  const handleMultipleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImagenesAdicionales((prev) => [...prev, ...files]);
    }
  };

  // Eliminar una imagen adicional antes de subirla
  const removeAdditionalImage = (index: number) => {
    setImagenesAdicionales((prev) => prev.filter((_, i) => i !== index));
  };

  // Subir imágenes y guardar en Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Subiendo imágenes y guardando datos...");

      let imageUrl = "";
      const additionalImageUrls: string[] = [];

      // Subir la imagen principal si existe
      if (imagenPrincipal) {
        const storageRef = ref(storage, `actividades/principal_${imagenPrincipal.name}`);
        await uploadBytes(storageRef, imagenPrincipal);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Subir imágenes adicionales si existen
      for (const image of imagenesAdicionales) {
        const storageRef = ref(storage, `actividades/adicional_${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(storageRef);
        additionalImageUrls.push(downloadUrl);
      }

      // Guardar en Firestore
      const actividadData = {
        ...actividad,
        imagenPrincipal: imageUrl,
        imagenesAdicionales: additionalImageUrls,
      };

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
        imagenPrincipal: "",
        imagenesAdicionales: [],
      });

      setImagenPrincipal(null);
      setImagenesAdicionales([]);

    } catch (error) {
      console.error("Error al subir imágenes o guardar datos:", error);
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

            {/* Imagen principal */}
            <label className="col-span-2 text-gray-700 font-semibold">Imagen Principal:</label>
            <input type="file" onChange={handleImageChange} className="border p-2 rounded-full col-span-2" />
            {imagenPrincipal && <img src={URL.createObjectURL(imagenPrincipal)} alt="Imagen Principal" className="w-full h-40 object-cover rounded-lg shadow-md" />}

            {/* Imágenes adicionales */}
            <label className="col-span-2 text-gray-700 font-semibold">Imágenes Adicionales:</label>
            <input type="file" multiple onChange={handleMultipleImagesChange} className="border p-2 rounded-full col-span-2" />
            <div className="grid grid-cols-3 gap-2 col-span-2">
              {imagenesAdicionales.map((img, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(img)} alt={`Extra ${index}`} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                  <button type="button" onClick={() => removeAdditionalImage(index)} className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1">X</button>
                </div>
              ))}
            </div>

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

