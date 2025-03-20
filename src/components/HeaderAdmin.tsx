import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import avilaImage11 from '../images/profileW.png';
import avilaImage12 from '../images/avila exs.png';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../credentials';

const auth = getAuth(app);

const HeaderAdmin: React.FC = () => {
  const navigate = useNavigate();
  const profileContext = useContext(UserContext);

  if (!profileContext) {
    return <div>Cargando...</div>; // Manejo de caso en que el contexto sea null
  }

  const { logged, profile } = profileContext;

  console.log(profile, logged);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const goToAbout = () => {
    navigate('/login');
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="hidden hidden lg:flex h-[100px] w-full mx-auto px-6 justify-between items-center">
        <motion.button 
          className="login-button flex items-center gap-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src={avilaImage12} alt="Perfil" className="w-6 h-8" />
          <strong className="login-button flex text-lg items-center font-bold gap-2 px-4 py-2 !bg-teal-700 !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]"> AVILA EXS </strong>
        </motion.button>

        <nav className="nav font-semibold">
            <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/admin')}>Funciones</button> 
            <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/ventana-reservas-admin')}>Actividades</button>
            <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/ventana-guias')}>Guías</button>
            <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/ventana-foros')}>Foros</button>
        </nav>

        {logged ? (
          <>
            <div className="flex gap-4">
              <motion.button 
                className="login-button flex items-center gap-2 px-4 py-2 !bg-teal-700 !text-white rounded-full hover:!bg-[#174f4f]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={avilaImage11} alt="Perfil" className="w-6 h-6 rounded-full" />
                Admin
              </motion.button>

              <motion.button 
                className="login-button flex items-center gap-2 p-2 !bg-teal-700 !text-white rounded-full hover:!bg-[#174f4f]" 
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
      <div className="flex lg:hidden flex-col justify-around pt-2.5 pb-2.5">
        <div className='flex mb-5 justify-center '>
          <motion.button 
            className="login-button flex items-center gap-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={avilaImage12} alt="Perfil" className="w-6 h-8" />
            <strong className="login-button flex text-lg items-center font-bold gap-2 px-4 py-2 !bg-teal-700 !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]"> AVILA EXS </strong>
          </motion.button>

          {logged ? (
            <>
              <div className="flex gap-4">
                <motion.button 
                  className="login-button flex items-center gap-2 p-2 !bg-teal-700 !text-white rounded-full hover:!bg-[#174f4f]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={avilaImage11} alt="Perfil" className="w-6 h-6 rounded-full" />
                  Admin
                </motion.button>

                <motion.button 
                  className="login-button flex items-center gap-2 p-2 !bg-teal-700 !text-white rounded-full hover:!bg-[#174f4f]" 
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
        <nav className="flex justify-around space-x-4 bg-gray-300 bg-opacity-50 rounded-full px-4 py-2 font-semibold mx-2 mb-2">
        <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/admin')}>Funciones</button> 
            <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/ventana-reservas-admin')}>Actividades</button>
            <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/ventana-guias')}>Guías</button>
            <button className="!bg-transparent px-4 py-2 !rounded-full hover:!bg-[#1d6363] hover:!text-white" onClick={() => navigate('/ventana-foros')}>Foros</button>
        </nav>

        
      </div>
    </header>
  );
};

export default HeaderAdmin;