import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Cabeza de la pagina</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">Sobre nosotros</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;