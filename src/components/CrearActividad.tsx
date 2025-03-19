import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs } from "firebase/firestore";
import { app } from "../credentials";
import Calendario from "./Calendario/Calendario";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../supabaseCredentials";
import { getAuth } from "firebase/auth";
import FotoPredeterminada from "../images/subida.png";

const db = getFirestore(app);
const auth = getAuth(app);
const DEFAULT_IMAGE = FotoPredeterminada;

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
    tipo: "",
  });

  const [guias, setGuias] = useState<any[]>([]);

  useEffect(() => {
    const fetchGuias = async () => {
      const querySnapshot = await getDocs(collection(db, "guias"));
      setGuias(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchGuias();
  }, []);

  const [fechasDisponibles, setFechasDisponibles] = useState<string[]>([]); // Estado para múltiples fechas
  const [imagenActividad, setImagenActividad] = useState<string>(DEFAULT_IMAGE);
  const [uploading, setUploading] = useState(false);
  const [errorImagen, setErrorImagen] = useState(false); // Estado para el mensaje de error
  const [errorCosto, setErrorCosto] = useState(false);
  const [errorCantidadPersonas, setErrorCantidadPersonas] = useState(false);
  const [errorDistancia, setErrorDistancia] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });

    if (name === "costo") {
      setErrorCosto(!(Number(value) > 0 && Number(value) < 60));
    }
    if (name === "cantMaxPersonas") {
      setErrorCantidadPersonas(!(Number(value) > 2 && Number(value) < 12));
    }
    if (name === "distancia") {
      setErrorDistancia(!(Number(value) > 0));
    }
  };

  const handleFechasDisponiblesChange = (dates: string[]) => {
    setFechasDisponibles(dates);
  };

  const navigate = useNavigate();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    try {
      setUploading(true);
      const user = auth.currentUser;
      if (!user) return;
  
      // Subir imagen a Supabase
      const imageUrl = await uploadImage(file, "fotos-actividad", user.uid);
      if (!imageUrl) return;
  
      // Guardar la URL en el estado
      setImagenActividad(imageUrl);
      setErrorImagen(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImagenActividad(DEFAULT_IMAGE);
    setErrorImagen(true);
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imagenActividad === DEFAULT_IMAGE) {
      setErrorImagen(true); // ✅ Activa el mensaje de error si no hay imagen
      return;
    }

    if (!(Number(actividad.costo) > 0 && Number(actividad.costo) < 60)) {
      setErrorCosto(true);
    }
    if (!(Number(actividad.cantMaxPersonas) > 2 && Number(actividad.cantMaxPersonas) < 12)) {
      setErrorCantidadPersonas(true);
    }
    if (!(Number(actividad.distancia) > 0)) {
      setErrorDistancia(true);
    }
  
    if (errorImagen || errorCosto || errorCantidadPersonas || errorDistancia) {
      return; // Detiene el envío si hay errores
    }

    try {

      const actividadData = {
        ...actividad,
        capacidadMaxima: parseInt(actividad.cantMaxPersonas, 10),
        fechasDisponibles: fechasDisponibles, // Guardar las fechas disponibles
        imagenActividad: imagenActividad || DEFAULT_IMAGE, // Guardar la imagen de la actividad
      };

      const docRef = await addDoc(collection(db, "actividades"), actividadData);

      // Crear subcolecciones "disponibilidad" para cada fecha
      for (const fecha of fechasDisponibles) {
        const disponibilidadRef = doc(
          collection(db, "actividades", docRef.id, "disponibilidad"),
          fecha
        );
        await setDoc(disponibilidadRef, { personasReservadas: 0, usuariosReservados: [] });
      }

      console.log("Actividad guardada con ID:", docRef.id);

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
        tipo: "",
      });

      setImagenActividad(DEFAULT_IMAGE);
      setFechasDisponibles([]); // Limpiar las fechas disponibles
      setErrorImagen(false);
      setErrorCosto(false);
      setErrorCantidadPersonas(false);
      setErrorDistancia(false);

      navigate(`/datos-sobre-actividad/${docRef.id}`);
    } catch (error) {
      console.error("Error al guardar datos:", error);
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10 pb-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-center text-xl font-semibold mb-6">Crear actividad</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="nombre" value={actividad.nombre} onChange={handleChange} className="border p-2 rounded-full w-full" placeholder="Nombre de la actividad" required />
            <label className="text-gray-700 font-semibold">Guía: </label>
            <select
              name="guia"
              value={actividad.guia}
              onChange={(e) => setActividad({ ...actividad, guia: e.target.value })}
              className="border p-2 rounded-full"
              required
            >
              <option value="">Selecciona un guía</option>
              {guias.map((guia) => (
                <option key={guia.id} value={guia.nombre}>
                  {guia.nombre} ({guia.tipoActividad})
                </option>
              ))}
            </select>
            <label className="col-span-2 text-gray-700 font-semibold">Fechas Disponibles:</label>
            <div className="col-span-2 flex justify-center">
              <Calendario
                onSelectDate={handleFechasDisponiblesChange}
                markedDates={fechasDisponibles}
                multipleDates={true}
                adminMode={true}
              />
            </div>
            <label className="col-span-2 text-gray-700 font-semibold">Ingresa la hora de inicio:</label>
            <input name="horaInicio" type="time" value={actividad.horaInicio} onChange={handleChange} className="border p-2 rounded-full" required />
            <label className="col-span-2 text-gray-700 font-semibold">Ingresa la hora de finalización:</label>
            <input name="horaFinal" type="time" value={actividad.horaFinal} onChange={handleChange} className="border p-2 rounded-full" required />
            <label className="text-gray-700 font-semibold">Ingresa la cantidad máxima de participantes:</label>
            <input name="cantMaxPersonas" type="number" value={actividad.cantMaxPersonas} onChange={handleChange} className="border p-2 rounded-full" placeholder="Cant Max Personas" required />
            {errorCantidadPersonas && <p className="text-red-600 text-sm mt-1">* La cantidad de personas debe ser mayor a 2 y menor a 12.</p>}
            <label className="text-gray-700 font-semibold">Ingresa el costo de la actividad:</label>
              <input name="costo" type="number" value={actividad.costo} onChange={handleChange} className="border p-2 rounded-full" placeholder="Costo" required />
              {errorCosto && <p className="text-red-600 text-sm mt-1">* El costo debe ser mayor a 0 y menor a 60.</p>}
            <label className="text-gray-700 font-semibold">Ingresa la dirección del punto de encuentro:</label>
              <input name="puntoEncuentro" value={actividad.puntoEncuentro} onChange={handleChange} className="border p-2 rounded-full" placeholder="Punto de encuentro" required />
            <label className="text-gray-700 font-semibold">Dificultad:</label>
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
              {errorDistancia && <p className="text-red-600 text-sm mt-1">* La distancia debe ser mayor a 0.</p>}
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

            <label className="text-gray-700 font-semibold">Vistas de la Actividad:</label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                disabled={uploading}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="font-bold gap-2 px-6 py-3 bg-blue-600 text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-blue-700"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Subir Imagen
              </button>

              {errorImagen && <p className="text-red-600 text-sm mt-1">* Debes subir una imagen.</p>}

              {/* Vista previa de la imagen */}
              {imagenActividad && imagenActividad !== DEFAULT_IMAGE && (
                <div className="mt-4 flex flex-col items-center">
                  <img src={imagenActividad} alt="Vista previa" className="w-48 h-48 object-cover rounded-lg shadow-md" />
                  <button
                    type="button"
                    className="mt-2 text-sm text-red-600 hover:underline cursor-pointer"
                    onClick={handleRemoveImage}
                  >
                    Eliminar Imagen
                  </button>
                </div>
              )}

            <button type="submit" className="col-span-2 font-bold gap-2 !px-6 !py-3 !bg-[#1d6363] !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]">
              Guardar Actividad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearActividad;
