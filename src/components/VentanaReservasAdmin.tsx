import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../credentials";
import { useNavigate } from "react-router-dom";
import HeaderVentanas from "./HeaderVentanas";

const db = getFirestore(app);

const VentanaReservasAdmin: React.FC = () => {
  const [actividades, setActividades] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "actividades"));
        const actividadesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setActividades(actividadesData);
      } catch (error) {
        console.error("Error al obtener actividades:", error);
      }
    };

    fetchActividades();
  }, []);

  return (
    <div className="page-container min-h-screen">
        <HeaderVentanas />
        <h2 className="text-xl font-semibold mb-6 mt-7">Administrar Actividades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actividades.map((actividad) => (
            <div key={actividad.id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={actividad.imagenPrincipal} alt={actividad.nombre} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-lg font-semibold mt-2">{actividad.nombre}</h3>
                <p className="text-gray-600">Guía: {actividad.guia}</p>
                <p className="text-gray-600">Hora: {actividad.horaInicio} - {actividad.horaFinal}</p>
                <p className="text-gray-600">Costo: ${actividad.costo}</p>
                <button 
                className="mt-4 bg-teal-900 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate(`/editar-actividad/${actividad.id}`)}
                >
                Editar
                </button>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default VentanaReservasAdmin;
