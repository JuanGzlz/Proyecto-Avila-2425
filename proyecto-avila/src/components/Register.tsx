import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuthRegister';

const Register: React.FC = () => {

  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Login Success:', response);
    navigate("/");
  };

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full bg-white rounded-lg shadow-lg p-8 border border-gray-400 text-black">
      <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 top-4 bg-black text-white font-bold px-4 py-2 rounded-md hover:bg-gray-800"
        >
          ← Volver
        </button>
        <h1 className="text-center text-2xl font-bold mb-2">AVILA EXS</h1>
        <p className="text-center text-lg mb-4">¡Únete a nuestra familia!</p>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img alt="name for profile picture" className="w-24 h-24 rounded-full border-2 border-gray-300" height="100" src="" width="100"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-camera text-gray-700"></i>
            </div>
          </div>
        </div>
        <form className="space-y-4">
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Nombre" type="text" placeholder="Nombre"/>
          </div>
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Apellido" type="text" placeholder="Apellido"/>
          </div>
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Edad" type="text" placeholder="Edad"/>
          </div>
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Correo electrónico" type="email" placeholder="Correo electrónico"/>
          </div>
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Número telefónico" type="tel" placeholder="Número telefónico"/>
          </div>
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Nueva contraseña" type="password" placeholder="Nueva contraseña"/>
          </div>
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Confirmar contraseña" type="password" placeholder="Confirmar contraseña"/>
          </div>
          <div className="mb-4">
            <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700" name="Habla sobre tus habilidades, experiencias y el por qué deberías ser un guía aquí..." placeholder="Habla sobre tus habilidades, experiencias y el por qué deberías ser un guía aquí..."></textarea>
          </div>
          <div className="flex justify-center">
            <button className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700" type="submit">
              Registrarse
            </button>
          </div>
          <div className="flex justify-center mt-4">
          <GoogleAuth onLoginSuccess={handleGoogleLoginSuccess} />
        </div>
        </form>
      </div>
    </div>
  );
};

export default Register;