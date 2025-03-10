import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Importación corregida

const clientId = '530496276357-1h00pg7c533c6khrt85av8tvk4h3jk9m.apps.googleusercontent.com'; // Reemplaza con tu Client ID de Google

interface DecodedToken {
  name: string;
  email: string;
  // Agrega otras propiedades que esperes del token
}

const GoogleAuth: React.FC = () => {
  const onSuccess = (credentialResponse: any) => {
    const decoded: DecodedToken = jwtDecode(credentialResponse.credential); // Usa jwtDecode
    console.log('Login Success:', decoded);
    console.log('Success:');

    // Aquí puedes manejar la respuesta, como enviar el token a tu backend
    // Por ejemplo, puedes guardar la información del usuario en el estado o en un contexto
  };

  const onError = () => {
    console.log('Login Failed');
    console.log('no entro');
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;