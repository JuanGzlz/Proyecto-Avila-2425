import React, { useState, useEffect, useMemo } from "react";
import { FaSearch, FaStar, FaCalendarAlt, FaCog, FaMapMarkerAlt, FaExchangeAlt, FaUser } from "react-icons/fa";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "../credentials";
import HeaderVentanas from "./HeaderVentanas";
import { useNavigate } from "react-router-dom";

// Actualizamos el tipo de actividad para incluir fechasDisponibles
type Activity = {
  id: string;
  nombre: string;
  duracion: string;
  distancia: string;
  guia: string;
  fechasDisponibles: string[]; // Array de fechas disponibles
  recomendados: string;
  puntuacion: number;
};

const FiltroBusqueda: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const db = getFirestore(app);
  const navigate = useNavigate();

  const filters = [
    { key: "recomendados", icon: <FaStar />, label: "Recomendados" },
    { key: "fecha", icon: <FaCalendarAlt />, label: "Fecha" },
    { key: "nombre", icon: <FaCog />, label: "Nombre" },
    { key: "duracion", icon: <FaMapMarkerAlt />, label: "Duración" },
    { key: "distancia", icon: <FaExchangeAlt />, label: "Distancia" },
    { key: "guia", icon: <FaUser />, label: "Guía" }
  ];

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "actividades"));
        const querySnapshot = await getDocs(q);
        const fetchedActivities = querySnapshot.docs.map((doc, index) => {
          const data = doc.data();
          return {
            id: doc.id || `activity-index-${index}`,
            ...data,
            // Aseguramos que puntuación tenga un valor numérico
            puntuacion: data.puntuacion !== undefined ? Number(data.puntuacion) : 0,
            // Aseguramos que fechasDisponibles sea un array
            fechasDisponibles: Array.isArray(data.fechasDisponibles) ? data.fechasDisponibles : []
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

  // Extraer todas las fechas disponibles de todas las actividades
  const availableDates = useMemo(() => {
    const allDates = new Set<string>();
    
    activities.forEach(activity => {
      if (Array.isArray(activity.fechasDisponibles)) {
        activity.fechasDisponibles.forEach(date => allDates.add(date));
      }
    });
    
    return Array.from(allDates).sort();
  }, [activities]);

  // Filtrado y ordenamiento de actividades
  const filteredActivities = useMemo(() => {
    if (!activities.length) return [];
    
    let result = activities.filter(activity => {
      // Filtro por término de búsqueda
      const matchesSearch = !searchTerm || 
        Object.entries(activity).some(([key, value]) => {
          if (key === 'id' || value === undefined || value === null) return false;
          
          // Manejo especial para arrays (como fechasDisponibles)
          if (Array.isArray(value)) {
            return value.some(item => 
              item.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          
          return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        });
      
      // Filtro por fecha específica si está seleccionada
      const matchesDateFilter = !selectedDate || 
        (Array.isArray(activity.fechasDisponibles) && activity.fechasDisponibles.includes(selectedDate));
        
      // Otros filtros
      let matchesOtherFilter = true;
      if (selectedFilter && selectedFilter !== "recomendados" && selectedFilter !== "fecha") {
        matchesOtherFilter = 
          activity[selectedFilter as keyof Activity] !== undefined && 
          activity[selectedFilter as keyof Activity] !== null &&
          activity[selectedFilter as keyof Activity] !== "";
      }
      
      return matchesSearch && matchesDateFilter && matchesOtherFilter;
    });
    
    // Ordenamiento
    if (selectedFilter === "recomendados") {
      // Ordenar por puntuación de mayor a menor
      result = result.sort((a, b) => (b.puntuacion || 0) - (a.puntuacion || 0));
    } else if (selectedFilter === "nombre") {
      // Ordenar alfabéticamente por nombre
      result = result.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
    
    return result;
  }, [activities, searchTerm, selectedFilter, selectedDate]);

  // Manejador de cambio de filtro
  const handleFilterChange = (filterKey: string) => {
    if (filterKey === "fecha") {
      // Si ya estaba seleccionado fecha, lo desactivamos
      if (selectedFilter === "fecha") {
        setSelectedFilter(null);
        setSelectedDate(null);
      } else {
        setSelectedFilter("fecha");
        // No seleccionamos una fecha específica todavía
      }
    } else {
      // Para otros filtros, comportamiento normal
      setSelectedFilter(prevFilter => prevFilter === filterKey ? null : filterKey);
      setSelectedDate(null); // Limpiamos la selección de fecha
    }
  };

  // Manejador para seleccionar una fecha específica
  const handleDateSelect = (date: string) => {
    setSelectedDate(prevDate => prevDate === date ? null : date);
  };

  const handleActivityClick = (activityId: string) => {
    navigate(`/detalles-excursion-seleccionada/${activityId}`);
  };

  // Renderizar información de actividad
  const renderActivityInfo = (activity: Activity) => {
    if (!selectedFilter) {
      // Vista por defecto con información completa
      return (
        <>
          <div className="font-medium">{activity.nombre}</div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
            {activity.puntuacion !== undefined && (
              <span className="flex items-center">
                <FaStar className="mr-1 text-yellow-500" /> {activity.puntuacion.toFixed(1)}
              </span>
            )}
            {activity.fechasDisponibles && activity.fechasDisponibles.length > 0 && (
              <span className="flex items-center">
                <FaCalendarAlt className="mr-1" /> 
                {`${activity.fechasDisponibles.length} fechas disponibles`}
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
    } else if (selectedFilter === "fecha") {
      // Vista específica para filtro de fecha
      return (
        <>
          <div className="font-medium">{activity.nombre}</div>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
            <FaCalendarAlt className="mr-1 mt-1" />
            <div>
              {activity.fechasDisponibles && activity.fechasDisponibles.length > 0 
                ? activity.fechasDisponibles.map((date, i) => (
                    <span key={i} className="mr-2 inline-block">
                      {date}
                      {i < activity.fechasDisponibles.length - 1 ? ", " : ""}
                    </span>
                  ))
                : "No hay fechas disponibles"}
            </div>
          </div>
        </>
      );
    } else if (selectedFilter === "recomendados") {
      // Vista específica para recomendados mostrando puntuación
      return (
        <>
          <div className="font-medium">{activity.nombre}</div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <FaStar className="mr-2 text-yellow-500" />
            <span>Puntuación: {activity.puntuacion !== undefined ? activity.puntuacion.toFixed(1) : "No disponible"}</span>
          </div>
        </>
      );
    } else {
      // Para otros filtros
      const filterValue = activity[selectedFilter as keyof Activity];
      
      // Determinar icono por filtro
      let filterIcon;
      switch (selectedFilter) {
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
    <div>
      <HeaderVentanas />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      
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
        
        {/* Selector de fechas específicas cuando el filtro de fecha está activo */}
        {selectedFilter === "fecha" && availableDates.length > 0 && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium mb-2">Seleccione una fecha:</h3>
            <div className="flex flex-wrap gap-2">
              {availableDates.map((date, index) => (
                <button
                  key={`date-${index}`}
                  className={`text-sm px-3 py-1.5 rounded ${
                    selectedDate === date 
                      ? "bg-green-500 text-white" 
                      : "bg-white border hover:bg-gray-100"
                  }`}
                  onClick={() => handleDateSelect(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sección de resultados */}
      <div className="bg-white shadow-md p-6 rounded-lg mt-6 max-w-3xl w-full">
        <h2 className="text-lg font-semibold mb-4">
          Resultados: 
          {selectedFilter && (
            <span className="font-normal text-sm ml-2 text-gray-500">
              Filtrando por {filters.find(f => f.key === selectedFilter)?.label || selectedFilter}
              {selectedDate && ` - ${selectedDate}`}
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
                className="py-3 hover:bg-gray-50 px-2 transition-colors cursor-pointer"
                onClick={() => handleActivityClick(activity.id)}
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
    </div>
  );
};

export default FiltroBusqueda;
