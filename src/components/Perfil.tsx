import React, { useEffect, useState } from "react";
import HeaderVentanas from "./HeaderVentanas";
import { getUserData } from "../Context/getUserData";

interface UserData {
  nombre: string;
  email: string;
  apellido: string;
  telefono: string;
  carnet: string;
  padecimientos: string;
  edad: string;
  profileImage?: string;
}

const ProfileEdit: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    nombre: "",
    email: "",
    apellido: "",
    telefono: "",
    carnet: "",
    padecimientos: "",
    edad: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      console.log(data);

      if (data) {
        setUserData(data as UserData);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <HeaderVentanas />

      {/* Contenedor principal */}
      <div className="w-full max-w-5xl bg-white border border-black rounded-lg shadow-lg p-4 md:p-8 mt-10 flex flex-col md:flex-row gap-6">
        {/* Sección Izquierda - Foto de Perfil */}
        <div className="w-full md:w-1/3 flex flex-col items-center p-4 border-r">
          <div className="w-54 h-54 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src={userData.profileImage || "/default-profile.png"}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="mt-3 text-sm text-blue-600 hover:underline cursor-pointer">
            Editar foto
          </span>
          <textarea
            className="w-full mt-3 p-2 border rounded-lg text-center resize-none"
            placeholder="Pequeña descripción..."
          />
          <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            Cerrar Sesión
          </button>
        </div>

        {/* Sección Derecha - Formulario */}
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Edición de perfil de usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p
              className="p-3 border rounded-lg !bg-gray-300 !bg-opacity-50 text-left"> {userData.nombre}
            </p>
            <p
              className="p-3 border rounded-lg !bg-gray-300 !bg-opacity-50 text-left"> {userData.email}
            </p>
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={userData.apellido}
              onChange={handleInputChange}
              className="p-3 border rounded-lg"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Número telefónico"
              value={userData.telefono}
              onChange={handleInputChange}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              name="carnet"
              placeholder="Carnet UNIMET / ID de Guía"
              value={userData.carnet}
              onChange={handleInputChange}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              name="padecimientos"
              placeholder="Padecimientos/Afecciones"
              value={userData.padecimientos}
              onChange={handleInputChange}
              className="p-3 border rounded-lg"
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={userData.edad}
              onChange={handleInputChange}
              className="p-3 border rounded-lg col-span-1 md:col-span-2"
            />
          </div>

          <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
            Guardar Datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;