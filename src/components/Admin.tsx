import React from "react";
import HeaderVentanas from "./HeaderVentanas";
import { Link } from "react-router-dom";

const Admin: React.FC = () => {
  return (
    <div>
      <HeaderVentanas/>
      <div className="flex flex-col min-h-screen bg-gray-100 pt-10">
        <h1 className="mb-10 mt-8">
            Bienvenido Administrador!
        </h1>
        <div className="flex justify-center gap-4">
            <Link to="/Crear-actividad" className="login-button flex items-center gap-2 px-4 py-2 !bg-[#1d6363] !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]">Crear actividad</Link>
            <Link to="/ventana-actividades" className="login-button flex items-center gap-2 px-4 py-2 !bg-[#1d6363] !text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:!bg-[#174f4f]">Ver actividades reservadas</Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;