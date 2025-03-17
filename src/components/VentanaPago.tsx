import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, arrayUnion, getFirestore, runTransaction } from "firebase/firestore";
import { app } from "../credentials";
import PayPalPayment from "./PagoPayPal";
import { UserContext } from "../Context/UserContext";
import HeaderVentanas from "./HeaderVentanas";
import Calendario from "./Calendario/Calendario";

const db = getFirestore(app);

type Excursion = {
  id: string;
  nombre: string;
  guia: string;
  costo: string;
  fechasDisponibles: string[]; // Agregar fechasDisponibles
};

const VentanaPago: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [excursion, setExcursion] = useState<Excursion | null>(null);
  const profileContext = useContext(UserContext);
  const { logged, profile } = profileContext || {};
  const navigate = useNavigate();
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>("");
  const [fechasDisponibles, setFechasDisponibles] = useState<string[]>([]); // Nuevo estado

  useEffect(() => {
    const fetchExcursion = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "actividades", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Excursion;
          setExcursion({ ...data }); // Usar solo el spread operator
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

      alert("Pago exitoso. Has sido registrado en la actividad.");
      navigate(`/`);
    } catch (error) {
      console.error("Error al registrar usuario en la actividad:", error);
      alert("error");
    }
  };

  return (
    <div>
      <HeaderVentanas />
      <div className="min-h-screen bg-white flex flex-col items-center p-6">
        <div className="bg-teal-900 p-6 rounded-lg shadow-lg text-center w-96">
          {excursion ? (
            <>
              <h1 className="text-2xl font-bold text-white">{excursion.nombre}</h1>
              <p className="text-white">Guía: {excursion.guia}</p>
              <p className="text-white">Costo: ${excursion.costo}</p>
            </>
          ) : (
            <p>Cargando detalles...</p>
          )}
        </div>

        <div className="col-span-2 flex justify-center">
          <Calendario
            onSelectDate={(dates: string[]) => {
              setFechaSeleccionada(dates.length > 0 ? dates[0] : "");
            }}
            markedDates={fechasDisponibles} // Marcar las fechas disponibles
            multipleDates={false} // Permitir seleccionar solo una fecha
          />
        </div>

        <div className="mt-6 bg-white">
          {logged ? (
            <PayPalPayment onPaymentSuccess={handlePaymentSuccess} />
          ) : (
            <p className="text-white">Debes iniciar sesión para pagar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VentanaPago;