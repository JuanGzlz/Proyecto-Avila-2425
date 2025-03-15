import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../credentials";
import googleLogo from '../images/google.png'; 

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


      // Verifica si el usuario existe en Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);


      if (userSnap.exists()) {
        console.log("Inicio de sesión exitoso:", user.uid);
        onSuccess(); // Llamar a la función de éxito (redirigir, cambiar estado, etc.)
      } else {
        alert("Este correo no está registrado. Por favor, regístrate primero.");
        await signOut(auth); // Cerrar sesión si el usuario no está registrado
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error);
      await signOut(auth);
      
    }
  };


  return (
    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center border border-gray-300 hover:bg-blue-500 px-4 py-2 rounded-full shadow-md hover:text-white bg-gray-100 text-gray-700 transition">
      <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
      Iniciar sesión con Google
    </button>
  );
};


export default GoogleAuthLogin;

