import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getFirestore, deleteField, getDocs, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { app } from "../credentials";
import HeaderVentanas from "./HeaderVentanas";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaDollarSign, FaMountain, FaUser, FaCalendarAlt } from "react-icons/fa";

const db = getFirestore(app);

type Excursion = {
  id: string;
  nombre: string;
  guia: string;
  fecha: string;
  costo: string;
  dificultad: number;
  distancia: string;
  duracion: string;
  puntuacion?: number;
};

type Comentario = {
  id: string;
  usuario: string;
  contenido: string;
  fecha: Timestamp;
  thumbsUp: number;
  thumbsDown: number;
  rating?: number;
  votos?: { [key: string]: "up" | "down" };
};

const ExcursionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [excursion, setExcursion] = useState<Excursion | null>(null);
  const [comments, setComments] = useState<Comentario[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userVotes, setUserVotes] = useState<{ [commentId: string]: "up" | "down" | null }>({}); // Nuevo estado para los votos
  const profileContext = useContext(UserContext);
  const { logged, profile } = profileContext || {};
  const [newRating, setNewRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchExcursion = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "actividades", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const excursionData = docSnap.data() as Excursion;
          setExcursion({ id: docSnap.id, ...docSnap.data() } as Excursion);
          setAverageRating(excursionData.puntuacion || 3);
        } else {
          console.error("No se encontró la excursión");
        }
      } catch (error) {
        console.error("Error al obtener la excursión:", error);
      }
    };

    fetchExcursion();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      try {
        const commentsRef = collection(db, "actividades", id, "comentarios");
        const snapshot = await getDocs(commentsRef);
        setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comentario)));
      } catch (error) {
        console.error("Error al traer los comentarios:", error);
      }
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    const updateExcursionRating = async () => {
      if (!id) return;
  
      let calculatedRating = 3; // Valor predeterminado si no hay comentarios
      if (comments.length > 0) {
        const validRatings = comments.map((c) => c.rating ?? 3);
        const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
        calculatedRating = sum / validRatings.length;
      }
  
      setAverageRating(calculatedRating);
  
      // Guardar la puntuación en Firestore
      try {
        const excursionRef = doc(db, "actividades", id);
        await updateDoc(excursionRef, { puntuacion: calculatedRating });
      } catch (error) {
        console.error("Error al actualizar la puntuación:", error);
      }
    };
  
    updateExcursionRating();
  }, [comments, id]);

  if (!profileContext) {
    return <div>Cargando...</div>;
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !profile?.nombre) return;

    const commentData = {
      usuario: profile.nombre,
      contenido: newComment,
      fecha: Timestamp.now(),
      thumbsUp: 0,
      thumbsDown: 0,
      rating: newRating,
      votos: {},
    };

    try {
      const docRef = await addDoc(collection(db, "actividades", id!, "comentarios"), commentData);
      setComments((prev) => [{ id: docRef.id, ...commentData }, ...prev]);
      setNewComment("");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleVote = async (commentId: string, type: "up" | "down") => {
    if (!profile?.nombre || typeof profile.nombre !== "string") {
      console.error("Nombre de usuario no válido");
      return;
    }

    try {
      const commentRef = doc(db, "actividades", id!, "comentarios", commentId);
      const commentSnap = await getDoc(commentRef);
      if (!commentSnap.exists()) return;

      const commentData = commentSnap.data() as Comentario;
      const userVote = commentData.votos?.[profile.nombre];

      if (userVote === type) return; // Evita duplicar votos

      const updateData: any = {};

      if (userVote) {
        // Si ya votó antes, quitar el voto anterior
        if (userVote === "up") updateData.thumbsUp = commentData.thumbsUp - 1;
        if (userVote === "down") updateData.thumbsDown = commentData.thumbsDown - 1;
        updateData[`votos.${String(profile.nombre)}`] = deleteField(); // Elimina el voto anterior
      }

      // Agregar el nuevo voto
      if (type === "up") updateData.thumbsUp = (updateData.thumbsUp || commentData.thumbsUp) + 1;
      if (type === "down") updateData.thumbsDown = (updateData.thumbsDown || commentData.thumbsDown) + 1;
      updateData[`votos.${String(profile.nombre)}`] = type;

      await updateDoc(commentRef, updateData);

      // Actualizamos el estado de votos
      setUserVotes((prevVotes) => ({
        ...prevVotes,
        [commentId]: type, // Guardamos el voto del usuario para este comentario
      }));

      // Refrescar comentarios después de la votación
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                thumbsUp: updateData.thumbsUp ?? c.thumbsUp,
                thumbsDown: updateData.thumbsDown ?? c.thumbsDown,
                votos: { ...c.votos, [String(profile.nombre)]: type },
              }
            : c
        )
      );
    } catch (error) {
      console.error("Error al votar:", error);
    }
  };
  

  return (
    <div>
      <HeaderVentanas />
      <div className="min-h-screen bg-teal-900 flex-col justify-center items-center p-4 ">
        {excursion ? (
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 flex max-w-7xl mx-auto">
          {/* Sección Izquierda - Información de la Excursión */}
          <div className="w-2/3 pr-6">
            <h1 className="text-3xl font-bold text-teal-900 text-center mb-4 pb-6">{excursion.nombre}</h1>
      
            <div className="divide-y divide-gray-300">
              {/* Dificultad y Duración */}
              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="flex items-center">
                  <FaMountain className="text-teal-900 text-xl mr-2" />
                  <span className="font-semibold">Dificultad: </span>  {excursion.dificultad}
                </div>
                <div className="flex items-center">
                  <FaClock className="text-teal-900 text-xl mr-2" />
                  <span className="font-semibold">Duración: </span> {excursion.duracion}
                </div>
              </div>
      
              {/* Distancia y Costo */}
              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-teal-900 text-xl mr-2" />
                  <span className="font-semibold">Distancia: </span> {excursion.distancia} km
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="text-teal-900 text-xl mr-2" />
                  <span className="font-semibold">Costo: </span> ${excursion.costo}
                </div>
              </div>
      
              {/* Guía y Fecha */}
              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="flex items-center">
                  <FaUser className="text-teal-900 text-xl mr-2" />
                  <span className="font-semibold">Guía: </span> {excursion.guia}
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-teal-900 text-xl mr-2" />
                  <span className="font-semibold">Fecha: </span> {excursion.fecha}
                </div>
              </div>
            </div>
      
            <p className="text-lg text-center mt-4 font-semibold text-yellow-500">
              Puntuación Promedio: {averageRating.toFixed(1)} ★
            </p>
          </div>
      
          {/* Sección Derecha - Imagen */}
          <div className="w-1/3 flex justify-center items-center">
            <img
              src="https://via.placeholder.com/300"
              alt="Excursión"
              className="rounded-xl shadow-md object-cover w-full h-48"
            />
          </div>
        </div>
        ) : (
          <p className="text-white">Cargando detalles...</p>
        )}

        <button
           // Volver a la página anterior
          className="bg-white text-teal-900 px-4 py-2 rounded-lg mt-4 hover:bg-gray-200 font-semibold"
          onClick={() => navigate(`/ventana-pago/${id}`)} 
          >¡Pagar!</button>

        {logged && (
          <div className="max-w-7xl mx-auto mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800">Agregar Comentario</h2>
            <form onSubmit={handleCommentSubmit} className="mt-4 space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu comentario..."
                className="w-full p-2 border rounded-lg"
                required
              />

               {/* Selector de estrellas */}
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl ${newRating >= star ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setNewRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Comentar
              </button>
            </form>
          </div>
        )}

        <div className="max-w-7xl mx-auto mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 border-b pb-3">Comentarios y Reseñas</h2>
          {comments.map((c) => (
            <div key={c.id} className="border-b py-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 text-left">{c.usuario}</h3>
                <p className="text-gray-600 text-left">{c.contenido}</p>
                {/* Mostrar estrellas de la calificación */}
                <div className="text-yellow-400 text-xl text-left">
                  {"★".repeat(c.rating ?? 3)}{"☆".repeat(5 - (c.rating ?? 3))}
                </div>
              </div>
              <div className="flex space-x-2">
                <ThumbsUp
                  className={`cursor-pointer ${userVotes[c.id] === "up" ? "text-green-500" : "text-gray-500"}`}
                  onClick={() => handleVote(c.id, "up")}
                />
                {c.thumbsUp}
                <ThumbsDown
                  className={`cursor-pointer ${userVotes[c.id] === "down" ? "text-red-500" : "text-gray-500"}`}
                  onClick={() => handleVote(c.id, "down")}
                />
                {c.thumbsDown}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExcursionDetails;
