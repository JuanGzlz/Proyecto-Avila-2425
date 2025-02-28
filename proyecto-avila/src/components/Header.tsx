import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <img
            alt="Ávila EXC Logo"
            className="h-10"
            height="50"
            src=""
            width="100"
          />
          <nav className="ml-6">
            <a className="text-white hover:text-gray-300 mx-2" href="#">
              Inicio
            </a>
            <a className="text-white hover:text-gray-300 mx-2" href="#">
              Actividades
            </a>
            <a className="text-white hover:text-gray-300 mx-2" href="#">
              Galería
            </a>
            <a className="text-white hover:text-gray-300 mx-2" href="#">
              Contacto
            </a>
          </nav>
        </div>
        <div className="flex items-center">
          <input className="px-4 py-2 rounded-l-md" placeholder="Buscar..." type="text" />
          <button className="bg-white text-green-800 px-4 py-2 rounded-r-md">Buscar</button>
          <button className="bg-white text-green-800 px-4 py-2 ml-4 rounded-md">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;