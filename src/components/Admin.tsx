import { FaPlus, FaClipboardList, FaUsers, FaComments } from "react-icons/fa";
import { useEffect } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  
  
  const options = [
    {
      title: "¿Hay pocas excursiones en la plataforma?",
      boton: "Crear Actividad",
      description: "Agrega nuevas actividades disponibles para los usuarios.",
      icon: <FaPlus size={80} className="text-white" />,
      action: () => navigate('/crear-actividad')
    },
    {
      title: "¿No sabes cuáles actividades han sido creadas?",
      boton: "Ver Actividades Reservadas",
      description: "Consulta las actividades que los usuarios han reservado y edita la información.",
      icon: <FaClipboardList size={80} className="text-white" />,
      action: () => navigate('/ventana-reservas-admin')
    },
    {
      title: "¿Falta personal y necesitas más guías?",
      boton: "Generar Perfiles de Guía",
      description: "Contacta con usuarios expertos en un tipo de excursión y genera sus perfiles.",
      icon: <FaUsers size={80} className="text-white" />,
      action: () => navigate('/crear-guia')
    },
    {
      title: "¿Quieres interactuar con los usuarios sobre qué mejorar?",
      boton: "Crear Foro",
      description: "Publica y administra temas en el foro de la comunidad para escuchar las opiniones.",
      icon: <FaComments size={80} className="text-white" />,
      action: () => navigate('/crear-foro')
    }
  ];

  return (
    <div>
      <HeaderAdmin />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">¡Bienvenido Administrador!</h1>
        <div className="w-full max-w-4xl space-y-4">
          {options.map((option, index) => (
            <div key={index} className="flex items-center bg-teal-700 text-white p-6 rounded-lg shadow-lg w-full font-semibold">	
              <div className="mr-4">{option.icon}</div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{option.title}</h2>
                <p className="text-gray-200 text-sm mb-2">{option.description}</p>
                <button
                  className="mt-2 bg-white text-teal-700 px-4 py-2 rounded-lg hover:bg-gray-200"
                  onClick={option.action}
                >
                  {option.boton}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;