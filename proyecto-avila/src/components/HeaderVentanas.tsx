import React from 'react';
import './HeaderVentanas.css';


const HeaderVentanas: React.FC = () => {
  return (
    <header className="header2">
      <div className="container2">

        <div className="logo-section2">
          <div className="logo-oval2">
            <div className="logo-text2">AVILA EXS</div>
          </div>
        </div>

        <nav className="nav2">
          <a className="nav-link2" href="#">
            Principal
          </a>
          <a className="nav-link2" href="#">
            Actividades
          </a>
          <a className="nav-link2" href="#">
            Reservas
          </a>
          <a className="nav-link2" href="#">
            Usuario
          </a>
        </nav>

        <button className="login-button2"
        >Perfil</button>
      </div>
    </header>
  );
};

export default HeaderVentanas;