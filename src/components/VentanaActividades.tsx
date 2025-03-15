import React, { useState, useEffect } from 'react';
import HeaderVentanas from './HeaderVentanas';
import './VentanaActividades.css';
import { collection, getDocs } from 'firebase/firestore';
import { app } from '../credentials';
import { getFirestore } from 'firebase/firestore';
import avilaImage8 from '../images/el avila 21.png';
import { useNavigate } from 'react-router-dom';
import VentanaPago from './VentanaPago'; 

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
  const [selectedActividad, setSelectedActividad] = useState<Actividad | null>(null); // Estado para la actividad seleccionada

  // Obtener las actividades desde Firebase
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

  //Manejar el clic en "Anotarse"
  const handleAnotarse = (excursion: Actividad) => {
    setSelectedActividad(excursion); // Establece la actividad seleccionada
  };

  const handleCloseVentanaPago = () => {
    setSelectedActividad(null); // Cierra la ventana de pago
  };

  return (
    <div className="page-container min-h-screen">
      <HeaderVentanas />

      <section>
        <h2 className="info-title-white">¡Descubre todas las excursiones que tenemos disponibles!</h2>
      </section>

      <div className="info-buttons2">
        <input className="search-input2" placeholder="Buscar..." type="text" />
      </div>

      {actividades.map((excursion, index) => (
        <div key={index} className="excursion-card">
          <div className="images-grid">
            <img src={avilaImage8} alt="" className="excursion-img" />
            <div className="ver-mas">Ver más...</div>
          </div>
          <div className="excursion-info">
            <p>
              <strong>Nombre:</strong> {excursion.nombre}
            </p>
            <p>
              <strong>Guía:</strong> {excursion.guia}
            </p>
            <p>
              <strong>Fecha:</strong> {excursion.fecha}
            </p>
            <p>
              <strong>Día:</strong> {excursion.diaSemana}
            </p>
            <p>
              <strong>Hora Inicio:</strong> {excursion.horaInicio}
            </p>
            <p>
              <strong>Hora Final:</strong> {excursion.horaFinal}
            </p>
            <p>
              <strong>Personas Máx:</strong> {excursion.cantMaxPersonas}
            </p>
            <p>
              <strong>Costo:</strong> ${excursion.costo}
            </p>
            <p>
              <strong>Punto de Encuentro:</strong> {excursion.puntoEncuentro}
            </p>
            <p>
              <strong>Dificultad:</strong> {excursion.dificultad}
            </p>
            <p>
              <strong>Distancia:</strong> {excursion.distancia} km
            </p>
            <p>
              <strong>Duración:</strong> {excursion.duracion}
            </p>
            <button className="anotarse" onClick={() => handleAnotarse(excursion)}>
              Anotarse
            </button>
            <button
              className="detalles"
              onClick={() => navigate(`/detalles-excursion-seleccionada/${excursion.id}`)}
            >
              Ver más detalles
            </button>
          </div>
        </div>
      ))}

      {/* Mostrar VentanaPago si hay una actividad seleccionada */}
      {selectedActividad && (
        <VentanaPago actividad={selectedActividad} onClose={handleCloseVentanaPago} />
      )}
    </div>
  );
};

export default VentanaActividades;