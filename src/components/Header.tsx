import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
import { UserContext } from '../Context/UserContext';
import avilaImage11 from '../images/profile.png';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../credentials';

const auth = getAuth(app);


const Header: React.FC = (

) => {

  const profileContext = use(UserContext);
  const {logged, profile} = profileContext;
  console.log(profile, logged);

  const handleLogout = async () => {
      await signOut(auth);
  }

  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">

        <div className="logo-section">
          <div className="logo-oval">
            <div className="logo-text">AVILA EXS</div>
          </div>
        </div>

        <nav className="nav">
          <a className="nav-link" href="#">
            <strong> Principal </strong>
          </a>
          <button className="nav-link !bg-transparent hover:!bg-white hover:!text-#1d6363 text-#1d6363 px-4 py-2 rounded transition" onClick = {() => navigate('/ventana-actividades')}>
          <strong> Actividades </strong>
          </button>
          <a className="nav-link" href="#">
          <strong> Usuario </strong>
          </a>
        </nav>

        <div className="search-section">
          <strong>
          <input
            className="search-input"
            placeholder="Buscar..."
            type="text"
          />
          </strong>
        </div>
        {logged ?
          <>  
            <button className="login-button flex items-center gap-2 p-2 bg-green-600 text-white rounded-full hover:bg-green-700" > <img 
              src={avilaImage11}
              alt="Perfil" 
              className="w-6 h-6 rounded-full" 
            /><strong>{profile.nombre}</strong></button>
            <button className="login-button" onClick={handleLogout}><strong>Log Out</strong></button>
          </> :
          <>  
            <button className="login-button" onClick={goToAbout}><strong>Log In</strong></button>
            
          </>
        }
      </div>
    </header>
  );
};

export default Header;