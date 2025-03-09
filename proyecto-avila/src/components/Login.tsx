import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuthLogin';
import avilaImage10 from '../images/imagen foto perfil.png';

const Login: React.FC = (

) => {

  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/register');
  };

  return (
    <div className="w-full bg-gray-100 flex-col items-center justify-center min-h-screen">
      <div className="w-full bg-white rounded-lg shadow-lg p-8 border border-gray-400 text-black">
      <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 top-4 text-gray-100 bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-900"
        >
          ← Volver
        </button>
        <h1 className="text-center text-2xl font-bold mb-2">AVILA EXS</h1>
        <p className="text-center text-lg mb-4">¡Únete a nuestra familia!</p>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img alt="name for profile picture" className="w-24 h-24 rounded-full border-2 border-gray-300" height="100" src={avilaImage10} width="100"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-camera text-gray-700"></i>
            </div>
          </div>
        </div>
        <form className="space-y-4">
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Correo electrónico" type="email" placeholder="Correo electrónico"/>
          </div>
          <div className="mb-4">
            <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700" name="Contraseña" type="password" placeholder="Contraseña"/>
          </div>
          <div className="flex justify-center">
            <button className="w-full bg-gray-800 text-gray-100 py-2 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700" type="submit">
              Log In
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4 mb-4">
          <div className="w-full">
            <GoogleAuth />
          </div>
        </div>
        <p className="text-center mt-4">
          ¿No tienes una cuenta? <span className="text-green-600 hover:underline" onClick={goToAbout}>Regístrate</span>
        </p>
      </div>
    </div>
  );
} 

export default Login;