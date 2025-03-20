import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { app } from "../credentials";
import Calendario from "./Calendario/Calendario";
import HeaderAdmin from "./HeaderAdmin";
import Modal from "./Modal";

const db = getFirestore(app);

interface Actividad {
  nombre: string;
  guia: string;
  horaInicio: string;
  horaFinal: string;
  costo: number;
  tipo: string;
  puntoEncuentro: string;
  puntoEncuentroRedactado: string;
  horarioRedactado: string;
  guiaRedactado: string;
  dificultadRedactado: string;
  datosExtra: string;
  dificultad: string; // Añadimos dificultad
  rutaAvila: string;
}

const EditarActividad: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [actividad, setActividad] = useState<Actividad | null>(null);
    const [disponibilidades, setDisponibilidades] = useState<string[]>([]);
    const [fechasSeleccionadas, setFechasSeleccionadas] = useState<string[]>([]);
    const [fechasConfirmadas, setFechasConfirmadas] = useState(false);
  
    useEffect(() => {
      const fetchActividad = async () => {
        if (id) {
          const docRef = doc(db, "actividades", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setActividad(docSnap.data() as Actividad);
          } else {
            console.log("No existe el documento");
          }
        }
      };
  
      const fetchDisponibilidades = async () => {
        if (id) {
          const disponibilidadesCollection = collection(db, "actividades", id, "disponibilidad");
          const disponibilidadesSnapshot = await getDocs(disponibilidadesCollection);
          const disponibilidadesData = disponibilidadesSnapshot.docs.map((doc) => doc.id);
          setDisponibilidades(disponibilidadesData);
        }
      };
  
      fetchActividad();
      fetchDisponibilidades();
    }, [id]);
  
    const guardarCambios = async () => {
      if (actividad && id) {
        await updateDoc(doc(db, "actividades", id), actividad as Record<string, any>);
        navigate("/ventana-reservas-admin");
      }
    };

  const eliminarActividad = async () => {
    if (id) {
      const disponibilidadesCollection = collection(db, "actividades", id, "disponibilidad");
      const disponibilidadesSnapshot = await getDocs(disponibilidadesCollection);
      if (disponibilidadesSnapshot.empty) {
        await deleteDoc(doc(db, "actividades", id));
        navigate("/ventana-reservas-admin");
      } else {
        setModalMessage("No se puede eliminar la actividad, tiene fechas disponibles.");
        setIsModalOpen(true);
      }
    }
  };

  const eliminarFecha = async (e: React.MouseEvent, fecha: string) => {
    e.preventDefault();
    if (id) {
      const docRef = doc(db, "actividades", id, "disponibilidad", fecha);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().personasReservadas === 0) {
        await deleteDoc(docRef);
        setDisponibilidades(disponibilidades.filter((disp) => disp !== fecha));
      } else {
        setModalMessage("No se puede eliminar la fecha, hay usuarios registrados.");
        setIsModalOpen(true);
      }
    }
  };

  const agregarFechas = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (id && fechasSeleccionadas.length > 0) {
      const nuevasFechas = fechasSeleccionadas.filter(fecha => !disponibilidades.includes(fecha)); // Filtrar fechas duplicadas
      for (const fecha of nuevasFechas) {
        await setDoc(doc(db, "actividades", id, "disponibilidad", fecha), {
          usuariosReservados: [],
          personasReservadas: 0,
        });
        setDisponibilidades(prev => [...prev, fecha]);
      }
      setFechasSeleccionadas([]); // Limpiar fechas seleccionadas
      setFechasConfirmadas(true); 
    }
  };

  const handleDateSelect = (dates: string[]) => {
    setFechasSeleccionadas(dates);
    setFechasConfirmadas(false); 
  };

  return (
    <div>
      <HeaderAdmin />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10 pb-10">
        {actividad && (
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
            <h2 className="text-center text-xl font-semibold mb-6">Editar Actividad</h2>
            <form onSubmit={(e) => { e.preventDefault(); guardarCambios(); }} className="flex flex-col gap-4">
              <input
                type="text"
                value={actividad.nombre}
                onChange={(e) => setActividad({ ...actividad, nombre: e.target.value })}
                className="border p-2 rounded-full w-full"
                placeholder="Nombre de la actividad"
                required
              />
              <label className="text-gray-700 font-semibold">Guía</label>
              <input
                type="text"
                value={actividad.guia}
                onChange={(e) => setActividad({ ...actividad, guia: e.target.value })}
                className="border p-2 rounded-full w-full"
                required
              />
              <label className="col-span-2 text-gray-700 font-semibold">Hora Inicio</label>
              <input
                type="time"
                value={actividad.horaInicio}
                onChange={(e) => setActividad({ ...actividad, horaInicio: e.target.value })}
                className="border p-2 rounded-full w-full"
                required
              />
              <label className="col-span-2 text-gray-700 font-semibold">Hora Final</label>
              <input
                type="time"
                value={actividad.horaFinal}
                onChange={(e) => setActividad({ ...actividad, horaFinal: e.target.value })}
                className="border p-2 rounded-full w-full"
                required
              />
              <label className="text-gray-700 font-semibold">Costo</label>
              <input
                type="number"
                value={actividad.costo}
                onChange={(e) => setActividad({ ...actividad, costo: Number(e.target.value) })}
                className="border p-2 rounded-full w-full"
                required
              />
              <label className="text-gray-700 font-semibold">Tipo de Actividad</label>
              <select
                value={actividad.tipo}
                onChange={(e) => setActividad({ ...actividad, tipo: e.target.value })}
                className="border p-2 rounded-full col-span-2"
                required
              >
                <option value="">Selecciona un tipo</option>
                <option value="Acampar">Acampar</option>
                <option value="Excursión">Excursión de un día</option>
                <option value="Carrera">Carrera de montaña</option>
                <option value="Ciclismo">Ciclismo</option>
              </select>
              <label className="text-gray-700 font-semibold">Ruta para subir El Ávila</label>
              <select
                  value={actividad.rutaAvila}
                  onChange={(e) => setActividad({ ...actividad, rutaAvila: e.target.value })}
                  className="border p-2 rounded-full"
                  required
                >
                  <option value="">Selecciona una ruta</option>
                  <option value="Sabás Nieves">Sabás Nieves</option>
                  <option value="No Te Apures">No Te Apures</option>
                  <option value="Puerta de Caracas">Puerta de Caracas</option>
                  <option value="Los Venados">Los Venados</option>
                  <option value="Pico Naiguatá">Pico Naiguatá</option>
              </select>
              <label className="text-gray-700 font-semibold">Punto de Encuentro</label>
                        <input
                            type="text"
                            value={actividad.puntoEncuentro}
                            onChange={(e) => setActividad({ ...actividad, puntoEncuentro: e.target.value })}
                            className="border p-2 rounded-full w-full"
                            required
                        />
                        <label className="text-gray-700 font-semibold">Punto de Encuentro Redactado</label>
                        <input
                            type="text"
                            value={actividad.puntoEncuentroRedactado}
                            onChange={(e) => {
                                if (e.target.value.length <= 250) {
                                  setActividad({
                                    ...actividad,
                                    puntoEncuentroRedactado: e.target.value,
                                  });
                                } else {
                                  setActividad({
                                    ...actividad,
                                    puntoEncuentroRedactado: e.target.value.substring(0, 250),
                                  });
                                }
                            }}
                            className="border p-2 rounded-full w-full"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            {actividad.puntoEncuentroRedactado.length}/250 caracteres
                        </p>
                        <label className="text-gray-700 font-semibold">Horario Redactado</label>
                        <input
                            type="text"
                            value={actividad.horarioRedactado}
                            onChange={(e) => {
                                if (e.target.value.length <= 250) {
                                  setActividad({
                                    ...actividad,
                                    horarioRedactado: e.target.value,
                                  });
                                } else {
                                  setActividad({
                                    ...actividad,
                                    horarioRedactado: e.target.value.substring(0, 250),
                                  });
                                }
                            }}
                            className="border p-2 rounded-full w-full"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            {actividad.horarioRedactado.length}/250 caracteres
                        </p>
                        <label className="text-gray-700 font-semibold">Guía Redactado</label>
                        <input
                            type="text"
                            value={actividad.guiaRedactado}
                            onChange={(e) => {
                                if (e.target.value.length <= 250) {
                                  setActividad({
                                    ...actividad,
                                    guiaRedactado: e.target.value,
                                  });
                                } else {
                                  setActividad({
                                    ...actividad,
                                    guiaRedactado: e.target.value.substring(0, 250),
                                  });
                                }
                            }}
                            className="border p-2 rounded-full w-full"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            {actividad.guiaRedactado.length}/250 caracteres
                        </p>
                        <label className="text-gray-700 font-semibold">Dificultad Redactado</label>
                        <input
                            type="text"
                            value={actividad.dificultadRedactado}
                            onChange={(e) => {
                                if (e.target.value.length <= 250) {
                                  setActividad({
                                    ...actividad,
                                    dificultadRedactado: e.target.value,
                                  });
                                } else {
                                  setActividad({
                                    ...actividad,
                                    dificultadRedactado: e.target.value.substring(0, 250),
                                  });
                                }
                            }}
                            className="border p-2 rounded-full w-full"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            {actividad.dificultadRedactado.length}/250 caracteres
                        </p>
                        <label className="text-gray-700 font-semibold">Datos Extra Redactado</label>
                        <input
                            type="text"
                            value={actividad.datosExtra}
                            onChange={(e) => {
                                if (e.target.value.length <= 250) {
                                  setActividad({
                                    ...actividad,
                                    datosExtra: e.target.value,
                                  });
                                } else {
                                  setActividad({
                                    ...actividad,
                                    datosExtra: e.target.value.substring(0, 250),
                                  });
                                }
                            }}
                            className="border p-2 rounded-full w-full"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            {actividad.datosExtra.length}/250 caracteres
                        </p>
                        <label className="text-gray-700 font-semibold">Dificultad</label>
                        <select
                            name="dificultad"
                            value={actividad.dificultad}
                            onChange={(e) => setActividad({ ...actividad, dificultad: e.target.value })}
                            className="border p-2 rounded-full"
                            required
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
              <label className="col-span-2 text-gray-700 font-semibold">Agregar Fechas Disponibles</label>
              <div className="col-span-2 flex justify-center">
                <Calendario
                  onSelectDate={handleDateSelect}
                  markedDates={disponibilidades}
                  multipleDates={true}
                  adminMode={true}
                  fechasConfirmadas={fechasConfirmadas}
                />
              </div>
              <button
                type="button"
                onClick={agregarFechas}
                className="col-span-2 font-bold gap-2 !px-6 !py-3 !bg-green-500 !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-green-600"
              >
                Confirmar Fechas
              </button>
              <label className="text-gray-700 font-semibold">Fechas Disponibles</label>
              <ul>
                {disponibilidades.map((disp) => (
                  <li key={disp} className="flex items-center justify-between">
                    {disp}
                    <button type="button" onClick={(e) => eliminarFecha(e, disp)} className="text-red-500">
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="submit"
                className="col-span-2 font-bold gap-2 !px-6 !py-3 !bg-[#1d6363] !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={eliminarActividad}
                className="col-span-2 font-bold gap-2 !px-6 !py-3 !bg-red-500 !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-red-600"
              >
                Eliminar Actividad
              </button>
            </form>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} />
    </div>
  );
};

export default EditarActividad;