import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../credentials";


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
      }
    } catch (error) {
      console.error("Error durante la autenticación:", error);
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

