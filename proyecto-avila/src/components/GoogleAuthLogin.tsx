import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../credentials'; 

const db = getFirestore(app);

interface GoogleAuthLoginProps {
  onSuccess: () => void;
}

const GoogleAuthLogin: React.FC<GoogleAuthLoginProps> = ({ onSuccess }) => {
  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guarda los datos del usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      console.log('Usuario autenticado y datos guardados en Firestore:', user.uid);
      onSuccess(); // Llamar a la función de éxito

    } catch (error) {
      console.error('Error durante la autenticación:', error);
    }
  };

  return (
    <button 
      onClick={handleGoogleLogin} 
      className="w-full text-gray-100 !bg-red-500 px-3 py-1 rounded-full hover:!bg-red-600"
    >
      Iniciar sesión con Google
    </button>
  );
};

export default GoogleAuthLogin;



