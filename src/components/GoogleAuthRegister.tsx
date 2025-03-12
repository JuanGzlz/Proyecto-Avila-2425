import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../credentials";


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


      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        nombre: user.displayName,
        fechaCreacion: user.metadata.creationTime,
      });


      alert("Registro exitoso.");
      console.log("Nuevo usuario registrado:", user.uid);
      onLoginSuccess(user);
     


    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Hubo un error al registrarte. Intenta de nuevo.");
    }
  };


  return (
      <button
        onClick={handleGoogleRegister}
        className="w-full text-gray-100 !bg-red-500 px-3 py-1 rounded-full hover:!bg-red-600"
      >
        Registrarse con Google
      </button>
  );
};


export default GoogleAuthRegister;
