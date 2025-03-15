import React, { useState, useEffect } from "react";
import { FaSearch, FaStar, FaCalendarAlt, FaCog, FaMapMarkerAlt, FaExchangeAlt, FaUser } from "react-icons/fa";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "../credentials"; // Asegúrate de importar la configuración de Firebase.
import HeaderVentanas from "./HeaderVentanas";

const FiltroBusqueda: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const db = getFirestore(app);

  const filters = [
    { key: "recomendados", icon: <FaStar />, label: "Recomendados" },
    { key: "fecha", icon: <FaCalendarAlt />, label: "Fecha" },
    { key: "nombre", icon: <FaCog />, label: "Nombre" },
    { key: "duracion", icon: <FaMapMarkerAlt />, label: "Duración" },
    { key: "distancia", icon: <FaExchangeAlt />, label: "Distancia" },
    { key: "guia", icon: <FaUser />, label: "Guía" }
  ];

  useEffect(() => {
    if (selectedFilter) {
      fetchActivities(selectedFilter);
    }
  }, [selectedFilter]);

  const fetchActivities = async (filter: string) => {
    try {
      const q = query(collection(db, "actividades"), where(filter, "!=", ""));
      const querySnapshot = await getDocs(q);
      const fetchedActivities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(fetchedActivities);
    } catch (error) {
      console.error("Error obteniendo actividades:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <HeaderVentanas />
      <div className="relative w-full max-w-3xl mt-6">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Ingrese un guía, actividad, fecha o ruta..."
          className="w-full p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div className="bg-white shadow-md p-6 rounded-lg mt-6 max-w-3xl w-full">
        <h2 className="text-lg font-semibold mb-4">Filtros de búsqueda:</h2>
        <div className="space-y-4">
          {filters.map(({ key, icon, label }) => (
            <button
              key={key}
              className={`bg-white flex items-center w-full p-4 border rounded-lg hover:bg-gray-100 ${
                selectedFilter === key ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedFilter(key)}
            >
              <span className="mr-3 text-lg">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mostrar resultados */}
      <div className="bg-white shadow-md p-6 rounded-lg mt-6 max-w-3xl w-full">
        <h2 className="text-lg font-semibold mb-4">Resultados:</h2>
        {activities.length > 0 ? (
          <ul>
            {activities.map(activity => (
              <li key={activity.id} className="border-b py-2">
                {selectedFilter === "nombre" && activity.nombre}
                {selectedFilter === "duracion" && activity.duracion}
                {selectedFilter === "distancia" && activity.distancia}
                {selectedFilter === "guia" && activity.guia}
                {selectedFilter === "fecha" && activity.fecha}
                {selectedFilter === "recomendados" && activity.recomendados}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay actividades para este filtro.</p>
        )}
      </div>
    </div>
  );
};

export default FiltroBusqueda;
