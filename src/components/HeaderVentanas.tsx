import React from 'react';

const HeaderVentanas: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <div className="bg-[#1d6363] text-white font-bold text-lg px-4 py-2 rounded-full">
          AVILA EXS
        </div>

        {/* Navegación */}
        <nav className="flex space-x-4 bg-gray-300 bg-opacity-50 rounded-full px-4 py-2">
          <a href="#" className="px-4 py-2 rounded-full hover:bg-white hover:text-black">Principal</a>
          <a href="#" className="px-4 py-2 rounded-full hover:bg-white hover:text-black">Actividades</a>
          <a href="#" className="px-4 py-2 rounded-full hover:bg-white hover:text-black">Reservas</a>
          <a href="#" className="px-4 py-2 rounded-full hover:bg-white hover:text-black">Usuario</a>
        </nav>

        {/* Botón Perfil */}
        <button className="bg-[#1d6363] text-white px-4 py-2 rounded-full hover:bg-gray-500">
          Perfil
        </button>
      </div>
    </header>
  );
};

export default HeaderVentanas;