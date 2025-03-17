import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { app } from "../credentials";
import HeaderVentanas from "./HeaderVentanas";
import Calendario from "./Calendario/Calendario";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);
const storage = getStorage(app);

const CrearActividad: React.FC = () => {
  const [actividad, setActividad] = useState({
    nombre: "",
    guia: "",
    horaInicio: "",
    horaFinal: "",
    cantMaxPersonas: "",
    costo: "",
    puntoEncuentro: "",
    dificultad: "",
    distancia: "",
    imagenPrincipal: "", // URL de la imagen principal
    imagenesAdicionales: [], // Array de URLs de imágenes adicionales
    tipo: "",
  });

  const [imagenPrincipal, setImagenPrincipal] = useState<File | null>(null);
  const [imagenesAdicionales, setImagenesAdicionales] = useState<File[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");

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

  const navigate = useNavigate();

  // Subir imágenes y guardar en Firestore
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      console.log("Subiendo imágenes y guardando datos...");
  
      let imageUrl = "";
      const additionalImageUrls: string[] = [];
  
      // Subir la imagen principal si existe
      if (imagenPrincipal) {
        const storageRef = ref(
          storage,
          `actividades/principal_${imagenPrincipal.name}`
        );
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
        capacidadMaxima: parseInt(actividad.cantMaxPersonas, 10), // Añadir capacidadMaxima
      };
  
      const docRef = await addDoc(collection(db, "actividades"), actividadData);
  
      // Crear subcolección "disponibilidad"
      const disponibilidadRef = doc(
        collection(db, "actividades", docRef.id, "disponibilidad"),
        fechaSeleccionada
      );
  
      await setDoc(disponibilidadRef, {
        personasReservadas: 0,
        usuariosReservados: [], // Inicializar el array de usuariosReservados
      });
  
      console.log("Actividad guardada con ID:", docRef.id);
      alert("Actividad creada exitosamente");
  
      // Limpiar el formulario
      setActividad({
        nombre: "",
        guia: "",
        horaInicio: "",
        horaFinal: "",
        cantMaxPersonas: "",
        costo: "",
        puntoEncuentro: "",
        dificultad: "",
        distancia: "",
        imagenPrincipal: "",
        imagenesAdicionales: [],
        tipo: "",
      });
  
      setImagenPrincipal(null);
      setImagenesAdicionales([]);
  
      // Navegar a la siguiente ventana usando el ID de la actividad recién creada
      navigate(`/datos-sobre-actividad/${docRef.id}`);
    } catch (error) {
      console.error("Error al subir imágenes o guardar datos:", error);
    }
  };

  return (
    <div>
      <HeaderVentanas />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10 pb-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-center text-xl font-semibold mb-6">Crear actividad</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="nombre" value={actividad.nombre} onChange={handleChange} className="border p-2 rounded-full w-full" placeholder="Nombre de la actividad" required />
            <label className="text-gray-700 font-semibold">Guia</label>
              <select
                name="guia"
                value={actividad.guia}
                onChange={(e) => setActividad({ ...actividad, guia: e.target.value })}
                className="border p-2 rounded-full"
                required
              >
                <option value="">Selecciona un guia</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            <label className="col-span-2 text-gray-700 font-semibold">Fecha:</label>
            <div className="col-span-2 flex justify-center">
              <Calendario 
                onSelectDate={(dates: string[]) => {
                  console.log("Fechas seleccionadas:", dates);
                  setFechaSeleccionada(dates.length > 0 ? dates[0] : ""); // Tomamos la primera fecha si hay alguna
                }} 
                markedDates={[]} 
              />
            </div>
            <label className="col-span-2 text-gray-700 font-semibold">Ingresa la hora de inicio:</label>
              <input name="horaInicio" type="time" value={actividad.horaInicio} onChange={handleChange} className="border p-2 rounded-full" required />
            <label className="col-span-2 text-gray-700 font-semibold">Ingresa la hora de finalización:</label>
              <input name="horaFinal" type="time" value={actividad.horaFinal} onChange={handleChange} className="border p-2 rounded-full" required />
            <label className="text-gray-700 font-semibold">Ingresa la cantidad máxima de participantes</label>
              <input name="cantMaxPersonas" type="number" value={actividad.cantMaxPersonas} onChange={handleChange} className="border p-2 rounded-full" placeholder="Cant Max Personas" required />
            <label className="text-gray-700 font-semibold">Ingresa el costo de la actividad</label>
              <input name="costo" type="number" value={actividad.costo} onChange={handleChange} className="border p-2 rounded-full" placeholder="Costo" required />
            <label className="text-gray-700 font-semibold">Ingresa la dirección del punto de encuentro</label>
              <input name="puntoEncuentro" value={actividad.puntoEncuentro} onChange={handleChange} className="border p-2 rounded-full" placeholder="Punto de encuentro" required />
            <label className="text-gray-700 font-semibold">Dificultad</label>
              <select
                name="dificultad"
                value={actividad.dificultad}
                onChange={(e) => setActividad({ ...actividad, dificultad: e.target.value })}
                className="border p-2 rounded-full"
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            <label className="text-gray-700 font-semibold">Ingresa los km de distancia del recorrido</label>
              <input name="distancia" type="number" value={actividad.distancia} onChange={handleChange} className="border p-2 rounded-full" placeholder="Distancia" required />
            <label className="col-span-2 text-gray-700 font-semibold">Tipo de actividad:</label>
              <select
                name="tipo"
                value={actividad.tipo}
                onChange={(e) => setActividad({ ...actividad, tipo: e.target.value })}
                className="border p-2 rounded-full col-span-2"
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="acampar">Acampar</option>
                <option value="excursion">Excursión de un día</option>
                <option value="carrera">Carrera de montaña</option>
                <option value="ciclismo">Ciclismo</option>
              </select>
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

            <button type="submit" className="col-span-2 font-bold gap-2 !px-6 !py-3 !bg-[#1d6363] !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]">
              Crear Actividad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearActividad;
