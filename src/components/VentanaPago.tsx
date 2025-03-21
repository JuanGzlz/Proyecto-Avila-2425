import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, arrayUnion, getFirestore, runTransaction } from "firebase/firestore";
import { app } from "../credentials";
import { getAuth } from "firebase/auth";
import PayPalPayment from "./PagoPayPal";
import { UserContext } from "../Context/UserContext";
import Calendario from "./Calendario/Calendario";
import Modal from "./Modal";

const db = getFirestore(app);

type Excursion = {
  id: string;
  nombre: string;
  guia: string;
  costo: string;
  fechasDisponibles: string[];
  dificultad: number;
  distancia: string;
  duracion: string;
  puntuacion?: number;
  imagenActividad: string;
};

const VentanaPago: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { id } = useParams<{ id: string }>();
  const [excursion, setExcursion] = useState<Excursion | null>(null);
  const profileContext = useContext(UserContext);
  const { logged, profile } = profileContext || {};
  const navigate = useNavigate();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");
  const [fechasDisponibles, setFechasDisponibles] = useState<string[]>([]);

  useEffect(() => {
    const fetchExcursion = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "actividades", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Excursion;
          setExcursion({ ...data });
          setFechasDisponibles(data.fechasDisponibles || []);
        } else {
          console.error("No se encontró la excursión");
        }
      } catch (error) {
        console.error("Error al obtener la excursión:", error);
      }
    };

    fetchExcursion();
  }, [id]);

  const handlePaymentSuccess = async () => {
    if (!id || !profile?.uid || !fechaSeleccionada) return;

    try {
      const actividadRef = doc(db, "actividades", id);
      const disponibilidadRef = doc(actividadRef, "disponibilidad", fechaSeleccionada);
      const usuarioRef = doc(db, "users", profile.uid);

      await runTransaction(db, async (transaction) => {
        const disponibilidadDoc = await transaction.get(disponibilidadRef);
        const actividadDoc = await transaction.get(actividadRef);

        if (!actividadDoc.exists()) {
          throw new Error("La actividad no existe.");
        }

        const capacidadMaxima = actividadDoc.data().capacidadMaxima;

        if (!disponibilidadDoc.exists()) {
          transaction.set(disponibilidadRef, {
            personasReservadas: 1,
            usuariosReservados: [profile.uid],
          });
        } else {
          const personasReservadas = disponibilidadDoc.data().personasReservadas;
          const usuariosReservados = disponibilidadDoc.data().usuariosReservados || [];

          if (personasReservadas >= capacidadMaxima) {
            throw new Error("La actividad está llena.");
          }

          if (usuariosReservados.includes(profile.uid)) {
            throw new Error("Ya estás registrado en esta actividad para esta fecha.");
          }

          transaction.update(disponibilidadRef, {
            personasReservadas: personasReservadas + 1,
            usuariosReservados: arrayUnion(profile.uid),
          });
        }

        transaction.update(usuarioRef, {
          actividadesReservadas: arrayUnion({
            idActividad: id,
            fecha: fechaSeleccionada,
          }),
        });
      });

      console.log("Pago exitoso. Has sido registrado en la actividad.");
      navigate("/pago-exitoso", { state: { costo: excursion?.costo } });
    } catch (error) {
      console.error("Error al registrar usuario en la actividad:", error);
      setModalMessage("Error al registrar usuario en la actividad.");
      setIsModalOpen(true);
    }
  };

  const handlePaymentSuccessWithValidation = async () => {
    if (!fechaSeleccionada) {
      setModalMessage("Debes seleccionar una fecha antes de pagar.");
      setIsModalOpen(true);
      return;
    }
    handlePaymentSuccess();
  };

  const handleGoBack = () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6 relative">
      {/* Botón Volver */}
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 font-bold gap-2 px-4 py-2 bg-[#1d6363] text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-[#174f4f]"
      >
        ← Volver
      </button>
  
      {/* Contenedor con calendario a la izquierda y detalles + pago a la derecha */}
      <div className="flex flex-col md:flex-row items-start justify-center mt-12 gap-6">
        {/* Calendario a la izquierda */}
        <div className="w-full calendario-pago">
          <Calendario
            onSelectDate={(dates: string[]) => setFechaSeleccionada(dates.length > 0 ? dates[0] : "")}
            markedDates={fechasDisponibles}
            multipleDates={false}
          />
        </div>
  
        {/* Contenedor de detalles + pago */}
        <div className="bg-teal-900 p-6 rounded-xl shadow-lg text-white w-96">
          {/* Título de la sección */}
          <h2 className="text-lg font-bold text-center mb-1">Información de Pago</h2>

          <div className="border-t border-white my-3"></div>
  
          {/* Imagen y título en la misma línea */}
          {excursion && (
            <div className="flex items-center gap-4">
              <img
                src={excursion.imagenActividad}	
                alt={excursion.nombre}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="ml-5">
                <h2 className="text-lg font-bold text-left">{excursion.nombre}</h2>
                <p className="text-sm text-left"><strong>Guía:</strong> {excursion.guia}</p>
              </div>
            </div>
          )}
  
          {/* Separador */}
          <div className="border-t border-white my-3"></div>
  
          {/* Datos de la excursión */}
          <div className="text-sm">
            <p className="flex justify-between">
              <span className="font-semibold">Dificultad:</span>
              <span>{excursion?.dificultad}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Puntuación:</span>
              <span>{excursion?.puntuacion} ★</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Distancia:</span>
              <span>{excursion?.distancia} km</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Fecha:</span>
              <span>{fechaSeleccionada || "No seleccionada"}</span>
            </p>
          </div>
  
          {/* Separador */}
          <div className="border-t border-white my-3"></div>
  
          {/* Costo total */}
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>USD$ {excursion?.costo}</span>
          </div>
  
          {/* Pago con botón estilizado */}
          <div className="mt-4 flex justify-center">
            {logged ? (
              <div className="bg-white rounded-lg shadow-lg p-3 w-full flex justify-center">
                <PayPalPayment onPaymentSuccess={handlePaymentSuccessWithValidation} 
                amount={excursion?.costo || "0.00"} />
              </div>
            ) : (
              <p className="text-gray-200 text-center">Debes iniciar sesión para pagar.</p>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} />
    </div>
  );
  
  
};

export default VentanaPago;
