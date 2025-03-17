import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import avilaImage11 from '../images/profile.png';
import avilaImage12 from '../images/avila exs.png';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../credentials';

const auth = getAuth(app);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const profileContext = useContext(UserContext);

  if (!profileContext) {
    return <div>Cargando...</div>; // Manejo de caso en que el contexto sea null
  }

  const { logged, profile } = profileContext;

  console.log(profile, logged);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const goToAbout = () => {
    navigate('/login');
  };

  return (
    <header className="header !shadow-md">
      <div className="container">
        <motion.button 
          className="login-button flex items-center gap-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src={avilaImage12} alt="Perfil" className="w-6 h-8" />
          <strong className="text-2xl"> AVILA EXS </strong>
        </motion.button>

        <nav className="nav">
          {logged ? (
          <>
            <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={() => navigate('/')}>Principal</button> 
            <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={() => navigate('/ventana-actividades')}>Actividades</button>
            <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={goToAbout}>Reservas</button>
            <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={() => navigate('/foro')}>Foro</button>
          </>
        ) : (
          <>
            <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={() => navigate('/')}>Principal</button> 
            <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={goToAbout}>Actividades</button>
            <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={goToAbout}>Reservas</button>
            <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={goToAbout}>Foro</button>
          </>
        )}
        </nav>

        <div className="search-section">
            <input className="search-input" placeholder="Buscar..." type="text" />
        </div>

        {logged ? (
          <>
            <div className="flex gap-4">
              <motion.button 
                className="login-button flex items-center gap-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                onClick={() => navigate('/perfil')} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={avilaImage11} alt="Perfil" className="w-6 h-6 rounded-full" />
                {profile?.nombre}
              </motion.button>

              <motion.button 
                className="login-button" 
                onClick={handleLogout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Log Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <motion.button 
              className="login-button" 
              onClick={goToAbout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Log In
            </motion.button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
