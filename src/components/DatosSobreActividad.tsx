import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../credentials";
import HeaderVentanas from "./HeaderVentanas";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const db = getFirestore(app);

const DatosSobreActividad: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [redirectOnClose, setRedirectOnClose] = useState(false);

  const [actividad, setActividad] = useState({
    limitePersonasRedactado: "",
    horarioRedactado: "",
    guiaRedactado: "",
    puntoEncuentroRedactado: "",
    dificultadRedactado: "",
    especificacionesRutaRedactado: "",
    datosExtra: "",
    distanciaRutaRedactado: "",
    usuariosRegistrados: [],
  });

  useEffect(() => {
    if (id) {
      const fetchActividad = async () => {
        try {
          const actividadDoc = await getDoc(doc(db, "actividades", id));
          if (actividadDoc.exists()) {
            const data = actividadDoc.data();
            // Mapear los datos obtenidos para asegurar que coincidan con el estado
            setActividad({
              limitePersonasRedactado: data.limitePersonasRedactado || "",
              horarioRedactado: data.horarioRedactado || "",
              guiaRedactado: data.guiaRedactado || "",
              puntoEncuentroRedactado: data.puntoEncuentroRedactado || "",
              dificultadRedactado: data.dificultadRedactado || "",
              especificacionesRutaRedactado: data.especificacionesRutaRedactado || "",
              datosExtra: data.datosExtra || "",
              distanciaRutaRedactado: data.distanciaRutaRedactado || "",
              usuariosRegistrados: data.usuariosRegistrados || [],
            });
          } else {
            alert("No se encontró la actividad");
          }
        } catch (error) {
          console.error("Error al obtener los datos de la actividad:", error);
        }
      };
      fetchActividad();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActividad({
      ...actividad,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) {
      alert("Error: No se encontró la actividad");
      return;
    }

    // Validar que los campos no excedan los 250 caracteres
    for (const key in actividad) {
      if (actividad[key as keyof typeof actividad].length > 250) {
        alert("Cada campo debe tener un máximo de 250 caracteres.");
        return;
      }
    }

    try {
      console.log("Enviando datos a Firestore...");

      const actividadRef = doc(db, "actividades", id); // Referencia al documento existente
      await updateDoc(actividadRef, actividad);
      setModalMessage("Actividad creada exitosamente");
      setRedirectOnClose(true); // Habilitar redirección solo en éxito
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al guardar la actividad en Firestore:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (redirectOnClose) {
      navigate("/admin"); // Solo navegar si fue exitoso
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
              name="limitePersonasRedactado"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Limite de personas"
              value={actividad.limitePersonasRedactado}
              onChange={handleChange}
              maxLength={250}
              required
            />
            <input
              name="horarioRedactado"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Hora"
              value={actividad.horarioRedactado}
              onChange={handleChange}
              maxLength={250}
              required
            />
            <input
              name="guiaRedactado"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Guía"
              value={actividad.guiaRedactado}
              onChange={handleChange}
              maxLength={250}
              required
            />
            <input
              name="puntoEncuentroRedactado"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Punto de encuentro"
              value={actividad.puntoEncuentroRedactado}
              onChange={handleChange}
              maxLength={250}
              required
            />
            <input
              name="dificultadRedactado"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Dificultad"
              value={actividad.dificultadRedactado}
              onChange={handleChange}
              maxLength={250}
              required
            />
            <input
              name="especificacionesRutaRedactado"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Especificaciones de la ruta"
              value={actividad.especificacionesRutaRedactado}
              onChange={handleChange}
              maxLength={250}
              required
            />
            <input
              name="datosExtra"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Datos extra"
              value={actividad.datosExtra}
              onChange={handleChange}
              maxLength={250}
              required
            />
            <input
              name="distanciaRutaRedactado"
              className="border p-2 rounded-3xl min-h-24"
              placeholder="Distancia de la ruta"
              value={actividad.distanciaRutaRedactado}
              onChange={handleChange}
              maxLength={250}
              required
            />
            <button type="submit" className="mt-6 w-full !bg-[#1d6363] text-white py-2 rounded-full text-lg col-span-2">
              Crear actividad
            </button>
          </form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} message={modalMessage} />
    </div>
  );
};

export default DatosSobreActividad;
