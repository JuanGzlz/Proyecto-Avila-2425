import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../credentials";
import googleLogo from '../images/google.png'; 

const db = getFirestore(app);


interface GoogleAuthRegisterProps {
  onLoginSuccess: (user: any) => void; // Define la prop onLoginSuccess
}


const GoogleAuthRegister: React.FC<GoogleAuthRegisterProps> = ({ onLoginSuccess }) => {
  const handleGoogleRegister = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;


      if (!user) {
        alert("Error al obtener los datos del usuario.");
        return;
      }


      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);


      console.log("Verificando usuario en Firestore...");
      console.log("Datos obtenidos:", userSnap.exists() ? userSnap.data() : "No existe");


      if (userSnap.exists()) {
        alert("Este correo ya está registrado. Por favor, inicia sesión.");
        return;
      }

      const nombreCompleto = user.displayName || "";
      const partesNombre = nombreCompleto.split(" ");
      const nombre = partesNombre[0]; // Primer nombre

      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        nombre: nombre,
        fechaCreacion: user.metadata.creationTime,
      });


      alert("Registro exitoso.");
      console.log("Nuevo usuario registrado:", user.uid);
      onLoginSuccess(user);
     


    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Hubo un error al registrarte. Intenta de nuevo.");
      await signOut(auth);
    }
  };


  return (
      <button
        onClick={handleGoogleRegister}
        className="w-full flex items-center justify-center border border-gray-300 hover:bg-blue-500 px-4 py-2 rounded-full shadow-md hover:text-white bg-gray-100 text-gray-700 transition">
      <img src={googleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
        Registrarse con Google
      </button>
  );
};

export default GoogleAuthRegister;
