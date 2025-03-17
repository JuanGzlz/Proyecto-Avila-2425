import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeaderVentanas from './HeaderVentanas';
import { collection, getDocs } from 'firebase/firestore';
import { app } from '../credentials';
import { getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';

const db = getFirestore(app);

type Reserva = {
  id: string;
  usuario: string;
  fechaReserva: string;
  excursion: string;
  cantidadPersonas: number;
  costoTotal: string;
  estado: string;
};

const VentanaReservas: React.FC = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservasRef = collection(db, 'reservas');
        const snapshot = await getDocs(reservasRef);
        const reservasData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Reserva[];
        setReservas(reservasData);
      } catch (error) {
        console.error('Error al traer los datos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page-container min-h-screen">
      <HeaderVentanas />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="info-title-white mt-10">Tus Reservas</h2>
      </motion.section>

      <motion.div
        className="info-buttons2 flex-row items-center justify-center gap-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <input
          className="relative w-full max-w-3xl mt-3 p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-#1d6363"
          placeholder="Buscar reserva..."
          type="text"
        />
        <button
          className="filter-button flex items-center cursor-pointer h-full p-4"
          onClick={() => navigate('/filtro-reservas')}
        >
          <FaFilter className="mr-2 text-4xl mt-6" />
        </button>
      </motion.div>

      {reservas.map((reserva, index) => (
        <motion.div
          key={index}
          className="relative bg-white rounded-2xl shadow-lg w-[90%] mx-auto mt-6 flex p-6 gap-6 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {/* Sección Izquierda - Información de la reserva */}
          <div className="w-1/2 flex flex-col justify-between font-semibold ml-8">
            <div className="text-center">
              <p><strong>Usuario:</strong> {reserva.usuario}</p>
              <p><strong>Fecha de Reserva:</strong> {reserva.fechaReserva}</p>
              <p><strong>Excursión:</strong> {reserva.excursion}</p>
              <p><strong>Cantidad de Personas:</strong> {reserva.cantidadPersonas}</p>
              <p><strong>Costo Total:</strong> ${reserva.costoTotal}</p>
              <p><strong>Estado:</strong> {reserva.estado}</p>
            </div>
          </div>

          {/* Sección Derecha - Botones */}
          <div className="flex gap-3 justify-center w-1/2">
            <motion.button
              className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 font-semibold"
              onClick={() => navigate(`/detalles-reserva/${reserva.id}`)}
              whileHover={{ scale: 1.05 }}
            >
              Ver más detalles
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VentanaReservas;