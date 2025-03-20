import React, { useEffect, useState } from "react";
import HeaderVentanas from "./HeaderVentanas";
import { getUserData } from "../Context/getUserData";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { app } from "../credentials";
import { uploadImage } from "../supabaseCredentials";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import FotoPredeterminada from "../images/subir foto.png";
import Modal from "./Modal";

const auth = getAuth(app);
const db = getFirestore(app);
const DEFAULT_IMAGE = FotoPredeterminada;

interface UserData {
  nombre: string;
  email: string;
  apellido: string;
  telefono: string;
  carnet: string;
  cedula: string;
  edad: string;
  carrera: string;
  descripcion: string;
  profileImage?: string;
}

const ProfileEdit: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    nombre: "",
    email: "",
    apellido: "",
    telefono: "",
    carnet: "",
    cedula: "",
    edad: "",
    carrera: "",
    descripcion: "",
    profileImage: DEFAULT_IMAGE,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData({
          nombre: data.nombre || "",
          email: data.email || "",
          apellido: data.apellido || "",
          telefono: data.telefono || "",
          carnet: data.carnet || "",
          cedula: data.cedula || "",
          edad: data.edad || "",
          carrera: data.carrera || "",
          descripcion: data.descripcion || "",
          profileImage: data.profileImage || DEFAULT_IMAGE,
        });
      }
    };
    fetchUserData();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const user = auth.currentUser;
      if (!user) return;

      // Subir imagen a Supabase
      const imageUrl = await uploadImage(file, "foto-perfil", user.uid);
      if (!imageUrl) return;

      // Guardar URL en Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { profileImage: imageUrl });

      // Actualizar el estado local
      setUserData((prevUserData) => ({
        ...prevUserData,
        profileImage: imageUrl,
      }));
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveProfileImage = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Restaurar imagen predeterminada en Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { profileImage: DEFAULT_IMAGE });

      // Actualizar el estado local
      setUserData((prevUserData) => ({
        ...prevUserData,
        profileImage: DEFAULT_IMAGE,
      }));
    } catch (error) {
      console.error("Error al eliminar la foto de perfil:", error);
    }
  };

  const handleSaveData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
  
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        apellido: userData.apellido,
        telefono: userData.telefono,
        carnet: userData.carnet,
        cedula: userData.cedula,
        edad: userData.edad,
        carrera: userData.carrera,
        descripcion: userData.descripcion,
      });
  
      setModalMessage("Datos guardados exitosamente.");// Habilitar redirección solo en éxito
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }
  };

  const openFileSelector = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleLogout = async () => {
      await signOut(auth);
      navigate('/');
    };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <HeaderVentanas />

      {/* Contenedor principal */}
      <div className="w-95 md:w-full max-w-5xl bg-white border border-black rounded-lg shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-6 m-10">
        {/* Sección Izquierda - Foto de Perfil */}
        <div className="w-full md:w-1/3 flex flex-col items-center p-4 md:border-r">
          <div className="w-54 h-54 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src={userData.profileImage}
              alt="Foto de perfil"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            disabled={uploading}
            onChange={handleFileChange}
          />

          <div className="mt-3 flex items-center gap-4">
            {/* Botón para editar foto */}
            <span
              className="mt-2 text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={openFileSelector}
            >
              Editar foto
            </span>

            {/* Botón para eliminar foto (solo aparece si el usuario tiene una personalizada) */}
            {userData.profileImage !== DEFAULT_IMAGE && (
              <button
                className="mt-2 text-sm text-red-600 hover:underline cursor-pointer"
                onClick={handleRemoveProfileImage}
              >
                Eliminar foto
              </button>
            )}
          </div>

          <input
            type="text"
            name="descripcion"
            placeholder="Pequeña descripción..."
            value={userData.descripcion}
            onChange={(e) => setUserData({ ...userData, descripcion: e.target.value })}
            className="w-full mt-3 p-2 border rounded-lg text-center"
          />
          <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>

        {/* Sección Derecha - Formulario */}
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Edición de perfil de usuario
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="p-3 border rounded-lg bg-gray-300 bg-opacity-50 text-left">
              {userData.nombre}
            </p>
            <p className="p-3 border rounded-lg bg-gray-300 bg-opacity-50 text-left">
              {userData.email}
            </p>
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={userData.apellido}
              onChange={(e) => setUserData({ ...userData, apellido: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Número telefónico"
              value={userData.telefono}
              onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              name="carnet"
              placeholder="Carnet UNIMET"
              value={userData.carnet}
              onChange={(e) => setUserData({ ...userData, carnet: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              name="cedula"
              placeholder="Cédula de identidad"
              value={userData.cedula}
              onChange={(e) => setUserData({ ...userData, cedula: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="number"
              name="edad"
              placeholder="Edad"
              value={userData.edad}
              onChange={(e) => setUserData({ ...userData, edad: e.target.value })}
              className="p-3 border rounded-lg"
            />
            <input
              type="text"
              name="Carrera"
              placeholder="Carrera"
              value={userData.carrera}
              onChange={(e) => setUserData({ ...userData, carrera: e.target.value })}
              className="p-3 border rounded-lg"
            />
          </div>

          <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800" onClick={handleSaveData}>
            Guardar Datos
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} />
    </div>
  );
};

export default ProfileEdit;

