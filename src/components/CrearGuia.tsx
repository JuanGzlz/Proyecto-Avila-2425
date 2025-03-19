import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../credentials";
import { uploadImage } from "../supabaseCredentials";
import { getAuth } from "firebase/auth";
import fotoPredeterminada from "../images/imagen foto perfil.png";

const db = getFirestore(app);
const auth = getAuth(app);
const DEFAULT_IMAGE = fotoPredeterminada;

const CrearGuia: React.FC = () => {
  const navigate = useNavigate();
  const [guia, setGuia] = useState({
    nombre: "",
    edad: "",
    experiencia: "",
    especialidad: "",
    tipoActividad: "",
    fotoPerfil: DEFAULT_IMAGE,
  });
  const [uploading, setUploading] = useState(false);
  const [guidesList, setGuidesList] = useState<any[]>([]);
  const [errorEdad, setErrorEdad] = useState(false);
  const [errorImagen, setErrorImagen] = useState(false);

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  console.log(uploading, guidesList);
  useEffect(() => {
    const fetchGuides = async () => {
      const querySnapshot = await getDocs(collection(db, "guias"));
      setGuidesList(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchGuides();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setGuia({
      ...guia,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const user = auth.currentUser;
      if (!user) return;
      const imageUrl = await uploadImage(file, "fotos-guia", user.uid);
      if (!imageUrl) return;
      setGuia({ ...guia, fotoPerfil: imageUrl });
      setErrorImagen(false);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setUploading(false);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que se haya subido una imagen
    if (guia.fotoPerfil === DEFAULT_IMAGE) {
        setErrorImagen(true);
        return;
    } else {
        setErrorImagen(false);
    }

    if (parseInt(guia.edad) < 18) {
      setErrorEdad(true);
      return;
    } else {
      setErrorEdad(false);
    }

    try {
        await addDoc(collection(db, "guias"), guia);
        alert("Guía creado exitosamente.");
        navigate("/ventana-guias")
        setGuia({ nombre: "", edad: "", experiencia: "", especialidad: "", tipoActividad: "", fotoPerfil: DEFAULT_IMAGE });
    } catch (error) {
        console.error("Error al guardar datos:", error);
    }
};

  const handleRemoveImage = () => {
    try {
        setGuia((prevGuia) => ({
            ...prevGuia,
            fotoPerfil: DEFAULT_IMAGE, // Restablece la imagen del guía
        }));
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const handleGoBack = () => {
      const auth = getAuth(app);
      const user = auth.currentUser;
          
      if (user) {
              // Si el usuario está autenticado, redirige al homepage
        navigate(-1);
      } else {
              // Si el usuario no está autenticado, redirige a la página anterior
        navigate("/");
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleGoBack}
        className="absolute top-4 left-4 font-bold gap-2 px-4 py-2 bg-[#1d6363] text-white rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-[#174f4f]"
      >
        ← Volver
      </button>
            <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-2xl">
                <h2 className="text-xl font-bold mb-4">Generar Perfil de Guía</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input name="nombre" value={guia.nombre} onChange={handleChange} className="border p-2 rounded" placeholder="Nombre" required />
                    <input 
                      name="edad" 
                      type="number" 
                      value={guia.edad} 
                      onChange={handleChange} 
                      className="border p-2 rounded" 
                      placeholder="Edad" 
                      required 
                    />
                    {errorEdad && <p className="text-red-600 text-sm mt-1">* La edad debe ser 18 años o más.</p>}
                    <input name="experiencia" value={guia.experiencia} onChange={handleChange} className="border p-2 rounded" placeholder="Experiencia" required />
                    <input name="especialidad" value={guia.especialidad} onChange={handleChange} className="border p-2 rounded" placeholder="Especialidad" required />
                    <select name="tipoActividad" value={guia.tipoActividad} onChange={handleChange} className="border p-2 rounded" required>
                    <option value="">Selecciona un tipo de actividad</option>
                    <option value="acampar">Acampar</option>
                    <option value="excursion">Excursión de un día</option>
                    <option value="carrera">Carrera de montaña</option>
                    <option value="ciclismo">Ciclismo</option>
                    </select>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
                    {errorImagen && <p className="text-red-600 text-sm mt-1">* Debes subir una imagen.</p>}
                    {guia.fotoPerfil && <img src={guia.fotoPerfil} alt="Foto de perfil" className="mt-2 w-24 h-24 object-cover rounded-full mx-auto" />}
                    {guia.fotoPerfil && guia.fotoPerfil !== DEFAULT_IMAGE && (
                        <div className="flex flex-col items-center">
                            <button
                            type="button"
                            className="text-sm text-red-600 hover:underline cursor-pointer mb-2"
                            onClick={handleRemoveImage}
                            >
                            Eliminar Imagen
                            </button>
                        </div>
                        )}
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded">Crear Guía</button>
                </form>
            </div>
    </div>
  );
};

export default CrearGuia;