import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const clientId = '530496276357-1h00pg7c533c6khrt85av8tvk4h3jk9m.apps.googleusercontent.com'; // Reemplaza con tu Client ID de Google

interface DecodedToken {
  name: string;
  email: string;
  picture: string;
  // Agrega otras propiedades que esperes del token
}

interface GoogleAuthProps {
  onLoginSuccess: (user: DecodedToken) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ onLoginSuccess }) => {
  const onSuccess = (credentialResponse: any) => {
    const decoded: DecodedToken = jwtDecode(credentialResponse.credential);
    console.log('Login Success:', decoded);
    onLoginSuccess(decoded);
  };

  const onError = () => {
    console.log('Login Failed');
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