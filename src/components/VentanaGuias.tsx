import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../credentials";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const db = getFirestore(app);

const VentanaGuias: React.FC = () => {
  const [guidesList, setGuidesList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchGuides = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "guias"));
            const guiasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setGuidesList(guiasData);
        } catch (error) {
            console.error("Error al obtener actividades:", error);
        }
      };
      fetchGuides();
    }, []);

  return (
    <div className="page-container min-h-screen mb-10">
        <HeaderAdmin />
        <div className="page-container min-h-screen mr-8 ml-8">
          <h2 className="info-title-white mt-10">Administrar Guías</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidesList.length > 0 ? (
                guidesList.map((guia) => (
                <div key={guia.id} className="bg-white p-4 rounded-lg shadow-xl shadow-gray-300 border border-gray-300 flex flex-col items-center">
                    {/* Imagen circular y centrada */}
                    <img 
                    src={guia.fotoPerfil} 
                    alt={guia.nombre} 
                    className="w-36 h-36 rounded-full bg-gray-300 object-cover mb-4" 
                    />
                    <hr className="w-95 border-t-1 border-gray-300 my-3" />
                    {/* Texto debajo de la imagen */}
                    <h3 className="text-lg font-semibold mt-2 text-center">{guia.nombre}</h3>
                    <p className="text-gray-600 text-center">Edad: {guia.edad}</p>
                    <p className="text-gray-600 text-center">Especialidad: {guia.especialidad}</p>
                    <p className="text-gray-600 text-center">Tipo: {guia.tipoActividad}</p>
                    <button 
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => navigate(`/`)}
                    >
                    Eliminar
                    </button>
                </div>
                ))
            ) : (
                <p className="text-center text-gray-500 mt-6">No hay guías contratados.</p>
            )}
            </div>
        </div>
      </div>
    );
  };

    export default VentanaGuias;