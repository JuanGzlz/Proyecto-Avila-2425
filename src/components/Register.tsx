import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuthRegister';
import avilaImage11 from '../images/imagen foto perfil.png';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../credentials';
import { useState } from 'react';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const db = getFirestore(app);
const auth = getAuth(app);

const Register: React.FC = () => {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate('/login');
  };

  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Login Success:', response);
    navigate("/");
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); //Estado para confirmar contraseña
  const [age, setAge] = useState<string>(''); //Estado para la edad
  const [passwordError, setPasswordError] = useState<string | null>(null); //Estado para el mensaje de error de la contraseña
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null); //Estado para el mensaje de error de confirmación de contraseña
  const [ageError, setAgeError] = useState<string | null>(null); //Estado para el mensaje de error de la edad

  //Función para validar la contraseña
  const validarPassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    } else {
      setPasswordError(null); //Limpiar el mensaje de error si la contraseña es válida
      return true;
    }
  };

  //Función para validar la confirmación de contraseña
  const validarConfirmarPassword = (confirmPassword: string): boolean => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Las contraseñas no coinciden.");
      return false;
    } else {
      setConfirmPasswordError(null); //Limpiar el mensaje de error si las contraseñas coinciden
      return true;
    }
  };

  //Función para validar la edad
  const validarEdad = (age: string): boolean => {
    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber)) {
      setAgeError("La edad debe ser un número válido!.");
      return false;
    } else if (ageNumber < 18 || ageNumber > 100) {
      setAgeError("La edad ingresada debe ser mayor que 18 y menor a 100.");
      return false;
    } else {
      setAgeError(null); //Limpiar el mensaje de error si la edad es válida
      return true;
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    //Validar la contraseña antes de continuar
    if (!validarPassword(password)) {
      return; //Detener el proceso si la contraseña no es válida
    }

    //Validar la confirmación de contraseña antes de continuar
    if (!validarConfirmarPassword(confirmPassword)) {
      return; //Detener el proceso si las contraseñas no coinciden
    }

    //Validar la edad antes de continuar
    if (!validarEdad(age)) {
      return; //Detener el proceso si la edad no es válida
    }

    try {
      const nombreRegistrado = await createUserWithEmailAndPassword(auth, email, password);
      console.log(nombreRegistrado.user.email);

      await setDoc(doc(db, 'users', nombreRegistrado.user.uid), {
        nombre: name,
        email: email,
        edad: parseInt(age, 10), //Guardar la edad como número
        uid: nombreRegistrado.user.uid,
        fechaCreacion: new Date(),
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAge("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoBack = () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
  
    if (user) {
      // Si el usuario está autenticado, redirige al homepage
      navigate("/");
    } else {
      // Si el usuario no está autenticado, redirige a la página anterior
      navigate(-1);
    }
  };

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-7/10 m-auto bg-white rounded-lg shadow-lg p-8 border border-gray-400 text-black">
        <button
          onClick={handleGoBack}
          className="absolute left-4 top-4 text-gray-100 !bg-gray-800 px-3 py-1 rounded-full hover:!bg-gray-900"
        >
          ← Volver
        </button>
        <h1 className="text-center text-2xl font-bold mb-2">AVILA EXS</h1>
        <p className="text-center text-lg mb-4">¡Únete a nuestra familia!</p>
        <div className="flex justify-center mb-4">
          <div className="relative">
            <img
              alt="name for profile picture"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
              height="100"
              src={avilaImage11}
              width="100"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="fas fa-camera text-gray-700"></i>
            </div>
          </div>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="mb-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
              name="name"
              type="text"
              placeholder="Nombre"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
              name="Apellido"
              type="text"
              placeholder="Apellido"
            />
          </div>
          <div className="mb-4">
            <input
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                validarEdad(e.target.value); 
              }}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
              name="Edad"
              type="text"
              placeholder="Edad"
            />
            {ageError && (
              <p className="text-red-500 text-sm mt-1">{ageError}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
              name="email"
              type="email"
              placeholder="Correo electrónico"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
              name="Número telefónico"
              type="tel"
              placeholder="Número telefónico"
            />
          </div>
          <div className="mb-4">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validarPassword(e.target.value); // Validar la contraseña en tiempo real
              }}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
              name="password"
              type="password"
              placeholder="Nueva contraseña, mínimo 6 caracteres"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validarConfirmarPassword(e.target.value); 
              }}
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-700"
              name="Confirmar contraseña"
              type="password"
              placeholder="Confirmar contraseña"
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
            )}
          </div>
          <div className="mb-4">
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              name="Habla sobre tus habilidades, experiencias y el por qué deberías ser un guía aquí..."
              placeholder="Habla sobre tus habilidades, experiencias y el por qué deberías ser un guía aquí..."
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              className="w-full !bg-gray-800 text-gray-100 py-2 rounded-full hover:!bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
              type="submit"
            >
              Registrarse
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <div className="w-full">
            <GoogleAuth onLoginSuccess={handleGoogleLoginSuccess} />
          </div>
        </div>
        <p className="text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <span className="text-green-600 hover:underline" onClick={goToAbout}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;