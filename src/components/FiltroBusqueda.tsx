import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaStar, FaCalendarAlt, FaCog, FaMapMarkerAlt, FaExchangeAlt, FaUser } from "react-icons/fa";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "../credentials";
import HeaderVentanas from "./HeaderVentanas";

// Definimos el tipo de actividad fuera del componente
type Activity = {
  id: string;
  nombre: string;
  duracion: string;
  distancia: string;
  guia: string;
  fecha: string;
  recomendados: string;
};

const FiltroBusqueda: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const db = getFirestore(app);

  const filters = [
    { key: "recomendados", icon: <FaStar />, label: "Recomendados" },
    { key: "fecha", icon: <FaCalendarAlt />, label: "Fecha" },
    { key: "nombre", icon: <FaCog />, label: "Nombre" },
    { key: "duracion", icon: <FaMapMarkerAlt />, label: "Duración" },
    { key: "distancia", icon: <FaExchangeAlt />, label: "Distancia" },
    { key: "guia", icon: <FaUser />, label: "Guía" }
  ];

  // Cargar actividades una sola vez al montar el componente
  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "actividades"));
        const querySnapshot = await getDocs(q);
        const fetchedActivities = querySnapshot.docs.map((doc, index) => {
          const data = doc.data();
          // Aseguramos que cada actividad tenga un ID válido, usando el índice como respaldo
          return {
            id: doc.id || `activity-index-${index}`,
            ...data,
          } as Activity;
        });
        setActivities(fetchedActivities);
        setError(null);
      } catch (err) {
        console.error("Error obteniendo actividades:", err);
        setError("No se pudieron cargar las actividades. Intente nuevamente más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [db]);

  // Usar useMemo para filtrar actividades solo cuando cambien las dependencias relevantes
  const filteredActivities = useMemo(() => {
    if (!activities.length) return [];
    
    return activities.filter(activity => {
      // Primero filtramos por término de búsqueda
      const matchesSearch = !searchTerm || 
        Object.entries(activity).some(([key, value]) => {
          // Ignoramos el id y verificamos que el valor exista antes de convertirlo
          return key !== 'id' && 
                 value !== undefined && 
                 value !== null && 
                 value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      
      // Luego aplicamos el filtro seleccionado si existe
      const matchesFilter = !selectedFilter || 
        (activity[selectedFilter as keyof Activity] !== undefined && 
         activity[selectedFilter as keyof Activity] !== null &&
         activity[selectedFilter as keyof Activity] !== "");
      
      return matchesSearch && matchesFilter;
    });
  }, [activities, searchTerm, selectedFilter]);

  // Manejador de cambio de filtro
  const handleFilterChange = (filterKey: string) => {
    setSelectedFilter(prevFilter => prevFilter === filterKey ? null : filterKey);
  };

  // Función para renderizar la información específica según el filtro seleccionado
  const renderActivityInfo = (activity: Activity) => {
    if (!selectedFilter) {
      // Si no hay filtro seleccionado, mostramos la información completa
      return (
        <>
          <div className="font-medium">{activity.nombre}</div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
            {activity.fecha && (
              <span className="flex items-center">
                <FaCalendarAlt className="mr-1" /> {activity.fecha}
              </span>
            )}
            {activity.guia && (
              <span className="flex items-center">
                <FaUser className="mr-1" /> {activity.guia}
              </span>
            )}
            {activity.duracion && (
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-1" /> {activity.duracion}
              </span>
            )}
            {activity.distancia && (
              <span className="flex items-center">
                <FaExchangeAlt className="mr-1" /> {activity.distancia}
              </span>
            )}
          </div>
        </>
      );
    } else {
      // Si hay un filtro seleccionado, mostramos solo la información relacionada con ese filtro
      const filterValue = activity[selectedFilter as keyof Activity];
      
      // Determinamos qué icono mostrar según el filtro seleccionado
      let filterIcon;
      switch (selectedFilter) {
        case "recomendados":
          filterIcon = <FaStar className="mr-2" />;
          break;
        case "fecha":
          filterIcon = <FaCalendarAlt className="mr-2" />;
          break;
        case "nombre":
          filterIcon = <FaCog className="mr-2" />;
          break;
        case "duracion":
          filterIcon = <FaMapMarkerAlt className="mr-2" />;
          break;
        case "distancia":
          filterIcon = <FaExchangeAlt className="mr-2" />;
          break;
        case "guia":
          filterIcon = <FaUser className="mr-2" />;
          break;
        default:
          filterIcon = null;
      }

      return (
        <>
          <div className="font-medium">{activity.nombre}</div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            {filterIcon}
            {filterValue?.toString() || "No disponible"}
          </div>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <HeaderVentanas />
      
      {/* Barra de búsqueda */}
      <div className="relative w-full max-w-3xl mt-6">
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Ingrese un guía, actividad, fecha o ruta..."
          className="w-full p-4 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sección de filtros */}
      <div className="bg-white shadow-md p-6 rounded-lg mt-6 max-w-3xl w-full">
        <h2 className="text-lg font-semibold mb-4">Filtros de búsqueda:</h2>
        <div className="space-y-4">
          {filters.map(({ key, icon, label }, filterIndex) => (
            <button
              key={`filter-${key}-${filterIndex}`}
              className={`bg-white flex items-center w-full p-4 border rounded-lg transition-colors ${
                selectedFilter === key 
                  ? "bg-green-100 border-green-500 text-green-700" 
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleFilterChange(key)}
            >
              <span className="mr-3 text-lg">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Sección de resultados */}
      <div className="bg-white shadow-md p-6 rounded-lg mt-6 max-w-3xl w-full">
        <h2 className="text-lg font-semibold mb-4">
          Resultados: 
          {selectedFilter && (
            <span className="font-normal text-sm ml-2 text-gray-500">
              Filtrando por {filters.find(f => f.key === selectedFilter)?.label || selectedFilter}
            </span>
          )}
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredActivities.length > 0 ? (
          <ul className="divide-y">
            {filteredActivities.map((activity, index) => (
              <li 
                key={`activity-${activity.id || index}-${index}`} 
                className="py-3 hover:bg-gray-50 px-2 transition-colors"
              >
                {renderActivityInfo(activity)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 py-4 text-center">No hay actividades que coincidan con tu búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default FiltroBusqueda;
