import React from 'react';

const Register: React.FC = () => {
  return (
    <div>
      <head>
        <meta charSet="utf-8"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
        <title>Registration Form</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
      </head>
      <body className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-center text-2xl font-bold mb-2">AVILA EXS</h1>
          <p className="text-center text-lg mb-4">¡Únete a nuestra familia!</p>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img alt="Placeholder for profile picture" className="w-24 h-24 rounded-full border-2 border-gray-300" height="100" src="https://storage.googleapis.com/a1aa/image/0Uceqn_Wo8svea0w51eV5zAH0znr9Gl1if-H__6dYrg.jpg" width="100"/>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-camera text-gray-500"></i>
              </div>
            </div>
          </div>
          <form>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nombre" type="text"/>
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Apellido" type="text"/>
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Edad" type="text"/>
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Correo electrónico" type="email"/>
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Número telefónico" type="tel"/>
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Nueva contraseña" type="password"/>
            </div>
            <div className="mb-4">
              <input className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Confirmar contraseña" type="password"/>
            </div>
            <div className="mb-4">
              <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Habla sobre tus habilidades, experiencias y el por qué deberías ser un guía aquí..."></textarea>
            </div>
            <div className="flex justify-center">
              <button className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500" type="submit">
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
};

export default Register;
