import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeaderVentanas from './HeaderVentanas';
import './VentanaActividades.css';
import { collection, getDocs } from 'firebase/firestore';
import { app } from '../credentials';
import { getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import VentanaPago from './VentanaPago'; 
import { FaFilter } from 'react-icons/fa'; 

const db = getFirestore(app);

type Actividad = {
  id: string;
  nombre: string;
  guia: string;
  puntoEncuentro: string;
  horaInicio: string;
  horaFinal: string;
  fecha: string;
  personasInscritas: number;
  cantMaxPersonas: number;
  campamento: string;
  costo: string;
  imagenActividad: string;
  dificultad: number;
  distancia: string;
  duracion: string;
  puntuacion?: number;
  rutaAvila: string;
};

const VentanaActividades: React.FC = () => {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [selectedActividad] = useState<Actividad | null>(null);

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


  return (
    <div className="page-container min-h-screen mb-10">
      <HeaderVentanas />

        <h2 className="info-title-white mt-10 mb-0">¡Descubre todas las excursiones que tenemos disponibles!</h2>

      <div
        className="info-buttons2 flex-row items-center justify-center gap-2 p-5 pt-0"
      >
        <input className="relative w-full max-w-3xl mt-3 p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-#1d6363" placeholder="Buscar..." type="text" />
        <button
          className="filter-button flex items-center cursor-pointer h-full p-4"
          onClick={() => navigate('/filtro-busqueda')}
        >
          <FaFilter className="mr-2 text-4xl mt-4" />
        </button>
      </div>

    {actividades.map((excursion, index) => (
        <motion.div
        key={index}
        className="relative bg-white rounded-2xl shadow-xl shadow-gray-300 border border-gray-300 w-[90%] mx-auto mt-6 flex p-6 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
      >

        <div className={`absolute top-2 right-4 font-semibold text-gray-600 mt-3 mr-2
            ${typeof excursion.puntuacion === 'number' ? 'text-3xl' : 'text-xl'}`}>
            {typeof excursion.puntuacion === 'number' ? excursion.puntuacion.toFixed(1) : 'Sin calificación'} ⭐
        </div>
        <div className='flex flex-col lg:flex-row lg:gap-6 w-full items-center'>
          {/* Sección Izquierda - Imágenes */}
          <div className="w-full lg:w-1/2 mt-10 mb-8 lg:mb-0 lg:mt-0 lg:ml-20">
              <div className="flex gap-3 w-full justify-center">
              {/* Imagen Principal */}
              <img
                  src={excursion.imagenActividad}
                  alt="Excursión"
                  className="rounded-2xl object-cover w-[50%] h-50"
              />
              
              {/* Imagen Sombreada con "Ver más..." */}
              <div className="relative rounded-2xl w-[50%] h-50 bg-black flex items-center justify-center">
                  <img
                  src={excursion.imagenActividad}
                  alt="Excursión"
                  className="absolute w-full h-full object-cover rounded-2xl opacity-50"
                  />
                  <span className="absolute text-lg font-semibold text-white">Ver más...</span>
              </div>
              </div>
          </div>
      
          {/* Sección Derecha - Información */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between font-semibold lg:mr-8 text-left">
              <div className="ml-8 text-left">
                  <p><strong>Nombre:</strong> {excursion.nombre}</p>
                  <p><strong>Guía:</strong> {excursion.guia}</p>
                  <p><strong>Hora Inicio:</strong> {excursion.horaInicio}</p>
                  <p><strong>Hora Final:</strong> {excursion.horaFinal}</p>
                  <p><strong>Límite de personas:</strong> {excursion.cantMaxPersonas}</p>
                  <p><strong>Distancia:</strong> {excursion.distancia} km</p>
                  <p><strong>Costo:</strong> ${excursion.costo}</p>
                  <p><strong>Dificultad:</strong> {excursion.dificultad}</p>
                  <p><strong>Ruta:</strong> {excursion.rutaAvila}</p>
              </div>
      
              {/* Botones Centrados */}
              <div className="flex gap-3 justify-center mt-4">
              <motion.button
                  className={`login-button flex items-center gap-2 px-4 py-2 !bg-[#1d6363] !text-white !rounded-lg transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f] ${
                  excursion.personasInscritas >= excursion.cantMaxPersonas ? "bg-gray-400" : "bg-green-600"
                  }`}
                  disabled={excursion.personasInscritas >= excursion.cantMaxPersonas}
                  onClick={() => navigate(`/ventana-pago/${excursion.id}`)}
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