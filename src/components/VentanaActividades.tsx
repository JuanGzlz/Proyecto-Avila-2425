import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeaderVentanas from './HeaderVentanas';
import './VentanaActividades.css';
import { collection, getDocs } from 'firebase/firestore';
import { app } from '../credentials';
import { getFirestore } from 'firebase/firestore';
import avilaImage8 from '../images/el avila 21.png';
import { useNavigate } from 'react-router-dom';
import VentanaPago from './VentanaPago'; 
import { FaFilter } from 'react-icons/fa'; 

const db = getFirestore(app);

type Actividad = {
  id: string;
  nombre: string;
  diaSemana: string;
  guia: string;
  puntoEncuentro: string;
  horaInicio: string;
  horaFinal: string;
  fecha: string;
  personasInscritas: number;
  cantMaxPersonas: number;
  campamento: string;
  costo: string;
  imagen: string[];
  dificultad: number;
  distancia: string;
  duracion: string;
};

const VentanaActividades: React.FC = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [selectedActividad, setSelectedActividad] = useState<Actividad | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actividadesRef = collection(db, 'actividades');
        const snapshot = await getDocs(actividadesRef);
        const actividadesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Actividad[];
        setActividades(actividadesData);
      } catch (error) {
        console.error('Error al traer los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleAnotarse = (excursion: Actividad) => {
    setSelectedActividad(excursion);
  };

  const handleCloseVentanaPago = () => {
    setSelectedActividad(null);
  };

  return (
    <div className="page-container min-h-screen">
      <HeaderVentanas />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="info-title-white">¡Descubre todas las excursiones que tenemos disponibles!</h2>
      </motion.section>

      <motion.div
        className="info-buttons2 flex-row items-center justify-center gap-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <input className="relative w-full max-w-3xl mt-6 p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-#1d6363" placeholder="Buscar..." type="text" />
        <button
          className="filter-button flex items-center cursor-pointer h-full p-4"
          onClick={() => navigate('/filtro-busqueda')}
        >
          <FaFilter className="mr-2 text-xl" />
        </button>
      </motion.div>

      {actividades.map((excursion, index) => (
        <motion.div
          key={index}
          className="excursion-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <motion.div 
            className="images-grid" 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <motion.img 
              src={avilaImage8} 
              alt="" 
              className="excursion-img" 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            />
            <div className="ver-mas">Ver más...</div>
          </motion.div>
          <div className="excursion-info">
            <p><strong>Nombre:</strong> {excursion.nombre}</p>
            <p><strong>Guía:</strong> {excursion.guia}</p>
            <p><strong>Fecha:</strong> {excursion.fecha}</p>
            <p><strong>Día:</strong> {excursion.diaSemana}</p>
            <p><strong>Hora Inicio:</strong> {excursion.horaInicio}</p>
            <p><strong>Hora Final:</strong> {excursion.horaFinal}</p>
            <p><strong>Personas Máx:</strong> {excursion.cantMaxPersonas}</p>
            <p><strong>Costo:</strong> ${excursion.costo}</p>
            <p><strong>Punto de Encuentro:</strong> {excursion.puntoEncuentro}</p>
            <p><strong>Dificultad:</strong> {excursion.dificultad}</p>
            <p><strong>Distancia:</strong> {excursion.distancia} km</p>
            <p><strong>Duración:</strong> {excursion.duracion}</p>
            <motion.button
              className="anotarse"
              onClick={() => handleAnotarse(excursion)}
              whileHover={{ scale: 1.05 }}
            >
              Anotarse
            </motion.button>
            <motion.button
              className="detalles"
              onClick={() => navigate(`/detalles-excursion-seleccionada/${excursion.id}`)}
              whileHover={{ scale: 1.05 }}
            >
              Ver más detalles
            </motion.button>
          </div>
        </motion.div>
      ))}

      {selectedActividad && (
        <VentanaPago actividad={selectedActividad} onClose={handleCloseVentanaPago} />
      )}
    </div>
  );
};

export default VentanaActividades;