import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserContext } from '../Context/UserContext';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import HeaderVentanas from './HeaderVentanas';
import { useNavigate } from 'react-router-dom';

const VentanaReservas: React.FC = () => {
  const { user } = useContext(UserContext) || {};
  const [reservas, setReservas] = useState<any[]>([]);
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      const fetchReservas = async () => {
        const userDocRef = doc(db, 'users', user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const actividadesReservadas = data.actividadesReservadas || [];
            const actividadesDetalles = await obtenerActividadesDetalles(actividadesReservadas);
            setReservas(actividadesDetalles);
          }
        } catch (error) {
          console.error('Error obteniendo reservas:', error);
        }
      };

      fetchReservas();
    }
  }, [user?.uid, db]);

  const obtenerActividadesDetalles = async (actividadesReservadas: { idActividad: string, fecha: string }[]) => {
    const actividadesRef = collection(db, 'actividades');
    const actividadesSnapshot = await getDocs(actividadesRef);
    const actividades = actividadesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return actividadesReservadas.map(reserva => {
      const actividadDetalle = actividades.find(actividad => actividad.id === reserva.idActividad);
      return actividadDetalle ? { ...actividadDetalle, fechaReserva: reserva.fecha } : null;
    }).filter(detalle => detalle !== null);
  };

  return (
    <div className="page-container min-h-screen">
      <HeaderVentanas />
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="info-title-white mt-10">Mis Reservas</h2>
      </motion.section>
      {reservas.length > 0 ? (
        reservas.map((excursion, index) => (
          <motion.div
            key={index}
            className="relative bg-white rounded-2xl shadow-lg w-[90%] mx-auto mt-6 flex p-6 gap-6 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="w-1/2 flex flex-col justify-between font-semibold ml-8">
              <div className="text-center">
                <p><strong>Nombre:</strong> {excursion.nombre}</p>
                <p><strong>Guía:</strong> {excursion.guia}</p>
                <p><strong>Hora Inicio:</strong> {excursion.horaInicio}</p>
                <p><strong>Hora Final:</strong> {excursion.horaFinal}</p>
                <p><strong>Fecha de Reserva:</strong> {excursion.fechaReserva}</p>
              </div>
            </div>
            <div className="flex gap-3 justify-center w-1/2">
              <motion.button
                className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 font-semibold"
                onClick={() => navigate(`/detalles-excursion-seleccionada/${excursion.id}`)}
                whileHover={{ scale: 1.05 }}
              >
                Ver más detalles
              </motion.button>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-6">No tienes reservas registradas.</p>
      )}
    </div>
  );
};

export default VentanaReservas;