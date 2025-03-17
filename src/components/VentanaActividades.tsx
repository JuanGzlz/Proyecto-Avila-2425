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
  puntuacion?: number;
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


  return (
    <div className="page-container min-h-screen">
      <HeaderVentanas />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="info-title-white mt-10">¡Descubre todas las excursiones que tenemos disponibles!</h2>
      </motion.section>

      <motion.div
        className="info-buttons2 flex-row items-center justify-center gap-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <input className="relative w-full max-w-3xl mt-3 p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-#1d6363" placeholder="Buscar..." type="text" />
        <button
          className="filter-button flex items-center cursor-pointer h-full p-4"
          onClick={() => navigate('/filtro-busqueda')}
        >
          <FaFilter className="mr-2 text-4xl mt-6" />
        </button>
      </motion.div>

    {actividades.map((excursion, index) => (
        <motion.div
        key={index}
        className="relative bg-white rounded-2xl shadow-lg w-[90%] mx-auto mt-6 flex p-6 gap-6 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >

        <div className={`absolute top-2 right-4 font-semibold text-gray-600 
            ${typeof excursion.puntuacion === 'number' ? 'text-3xl' : 'text-xl'}`}>
            {typeof excursion.puntuacion === 'number' ? excursion.puntuacion.toFixed(1) : 'Sin calificación'} ⭐
        </div>
        {/* Sección Izquierda - Imágenes */}
        <div className="w-1/2 flex flex-col items-center ml-20">
            <div className="flex gap-3 w-full justify-center">
            {/* Imagen Principal */}
            <img
                src={avilaImage8}
                alt="Excursión"
                className="rounded-2xl object-cover w-[45%] h-40"
            />
            
            {/* Imagen Sombreada con "Ver más..." */}
            <div className="relative rounded-2xl w-[45%] h-40 bg-black flex items-center justify-center">
                <img
                src={avilaImage8}
                alt="Excursión"
                className="absolute w-full h-full object-cover rounded-2xl opacity-50"
                />
                <span className="absolute text-lg font-semibold text-white">Ver más...</span>
            </div>
            </div>
        </div>
    
        {/* Sección Derecha - Información */}
        <div className="w-1/2 flex flex-col justify-between font-semibold mr-8">
            <div className="text-center">
                <p><strong>Guía:</strong> {excursion.guia}</p>
                <p><strong>Hora Inicio:</strong> {excursion.horaInicio}</p>
                <p><strong>Hora Final:</strong> {excursion.horaFinal}</p>
                <p><strong>Fecha:</strong> {excursion.fecha}</p>
                <p><strong>Personas inscritas:</strong> {excursion.personasInscritas}</p>
                <p><strong>Límite de personas:</strong> {excursion.cantMaxPersonas}</p>
                <p><strong>Campamento:</strong> {excursion.campamento}</p>
                <p><strong>Costo:</strong> ${excursion.costo}</p>
            </div>
    
            {/* Botones Centrados */}
            <div className="flex gap-3 justify-center mt-4">
            <motion.button
                className={`login-button flex items-center gap-2 px-4 py-2 !bg-[#1d6363] !text-white !rounded-lg transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f] ${
                excursion.personasInscritas >= excursion.cantMaxPersonas ? "bg-gray-400" : "bg-green-600"
                }`}
                disabled={excursion.personasInscritas >= excursion.cantMaxPersonas}
                onClick={() => handleAnotarse(excursion)}
                whileHover={{ scale: 1.05 }}
            >
                {excursion.personasInscritas >= excursion.cantMaxPersonas ? "Agotado" : "Anotarse"}
            </motion.button>
            <motion.button
                className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 font-semibold"
                onClick={() => navigate(`/detalles-excursion-seleccionada/${excursion.id}`)}
                whileHover={{ scale: 1.05 }}
            >
                Ver más detalles
            </motion.button>
            </div>
        </div>
        </motion.div>
    ))}
  

      {selectedActividad && (
        <VentanaPago />
      )}
    </div>
  );
};

export default VentanaActividades;