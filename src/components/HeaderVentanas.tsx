import React, { useContext } from 'react';
import { app } from '../credentials';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import avilaImage15 from '../images/profileW.png';

const HeaderVentanas: React.FC = () => {
  const navigate = useNavigate();
  const profileContext = useContext(UserContext);
  
  if (!profileContext) {
    return <div>Cargando...</div>; // Manejo de caso en que el contexto sea null
  }
  
  const { logged, profile } = profileContext;
  
  console.log(profile, logged);
  
  const handleGoBack = () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
        
    if (user) {
            // Si el usuario está autenticado, redirige al homepage
      navigate(-1);
    } else {
            // Si el usuario no está autenticado, redirige a la página anterior
      navigate("/");
      }
  };

  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="Contenedor Volver">
        <button
          onClick={handleGoBack}
          className="login-button flex items-center font-bold gap-2 px-4 py-2 !bg-[#1d6363] !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]"
        >
          ← Volver
        </button>
        </div>

        {/* Navegación */}
        <nav className="flex space-x-4 bg-gray-300 bg-opacity-50 rounded-full px-4 py-2 font-semibold">
          <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/')}>Principal</button>
          <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/ventana-actividades')}>Actividades</button>
          <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/ventana-reserva')}>Reservas</button>
          <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/foro')}>Foro</button>
        </nav>

        {/* Botón Perfil */}
        <button className="login-button flex items-center gap-2 px-4 py-2 !bg-[#1d6363] !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]">
          <img src={avilaImage15} alt="Perfil" className="w-6 h-6 rounded-full" />
          {profile?.nombre}
        </button>
      </div>
    </header>
  );
};

export default HeaderVentanas;