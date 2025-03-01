import React from 'react';
import './Header.css';

const Header: React.FC = () => {
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
            Principal
          </a>
          <a className="nav-link" href="#">
            Actividades
          </a>
          <a className="nav-link" href="#">
            Usuario
          </a>
        </nav>

        <div className="search-section">
          <input 
            className="search-input" 
            placeholder="Buscar..." 
            type="text" 
          />
        </div>

        <button className="login-button">Login</button>

        </div>

      </header>
  );
};

export default Header;