import React, { useContext } from 'react';
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

  // console.log(profile, logged);

  const handleLogout = async () => {
    await signOut(auth);
  };

  

  const goToAbout = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
            <button className="login-button flex items-center gap-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700" >
              <img src={avilaImage12} alt="Perfil" className="w-6 h-8" />
              <strong className="text-2xl"> AVILA EXS </strong>
            </button>

        <nav className="nav">
          <a className="nav-link" href="#">
            Principal
          </a>
          <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick={() => navigate('/ventana-actividades')}>
            Actividades
          </button>
          <a className="nav-link" href="#">
            Reservas
          </a>
        </nav>

        <div className="search-section">
            <input className="search-input" placeholder="Buscar..." type="text" />
        </div>

        {logged ? (
          <>
            <button className="login-button flex items-center gap-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
              onClick={() => navigate('/perfil')} >
              <img src={avilaImage11} alt="Perfil" className="w-6 h-6 rounded-full" />
              {profile?.nombre}
            </button>
            <button className="login-button" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button className="login-button" onClick={goToAbout}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
