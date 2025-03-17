import { useState, useEffect, useContext } from "react";
import { collection, getDocs, getDoc, doc, getFirestore, Timestamp, updateDoc, deleteField, addDoc } from "firebase/firestore";
import { app } from "../credentials";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { UserContext } from "../Context/UserContext";
import HeaderVentanas from "./HeaderVentanas";
import { useParams } from "react-router-dom";

const db = getFirestore(app);

type Comentario = {
    id: string;
    usuario: string;
    contenido: string;
    fecha: Timestamp;
    thumbsUp: number;
    thumbsDown: number;
    votos?: { [key: string]: "up" | "down" };
};

type Prompt = {
    id: string;
    texto: string;
};

const ForoDetallado: React.FC = () => {
    const [comments, setComments] = useState<Comentario[]>([]);
    const [newComment, setNewComment] = useState("");
    const [userVotes, setUserVotes] = useState<{ [commentId: string]: "up" | "down" | null }>({});
    const [prompt, setPrompt] = useState<Prompt | null>(null);
    const profileContext = useContext(UserContext);
    const { id } = useParams<{ id: string }>(); 

    const { logged, profile } = profileContext || {};

    useEffect(() => {
        const fetchPrompt = async () => {
        if (!id) return; 
            try {
                const promptRef = doc(db, "foro", id); 
                const promptSnap = await getDoc(promptRef);

                if (promptSnap.exists()) {
                setPrompt({ id: promptSnap.id, texto: promptSnap.data().texto }); 
                } else {
                console.error("Prompt no encontrado");
                }
            } catch (error) {
                console.error("Error al obtener el prompt:", error);
            }
        };

        const fetchComments = async () => {
        if (!id) return; 
            try {
                const commentsRef = collection(db, "foro", id, "comentarios"); // Accede a la subcolección "comentarios"
                const snapshot = await getDocs(commentsRef);
                setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Comentario)));
            } catch (error) {
                console.error("Error al traer los comentarios:", error);
            }
        };
            fetchPrompt();
            fetchComments();
    }, [id]);

    if (!profileContext) {
        return <div>Cargando...</div>;
    }

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !profile?.nombre || !id) return; 

        const commentData = {
        usuario: profile.nombre,
        contenido: newComment,
        fecha: Timestamp.now(),
        thumbsUp: 0,
        thumbsDown: 0,
        votos: {},
        };

        try {
        const docRef = await addDoc(collection(db, "foro", id, "comentarios"), commentData);
        setComments((prev) => [{ id: docRef.id, ...commentData }, ...prev]);
        setNewComment("");
        } catch (error) {
        console.error("Error al agregar comentario:", error);
        }
    };

    const handleVote = async (commentId: string, type: "up" | "down") => {
        if (!profile?.nombre || !id) return; 

        try {
        const commentRef = doc(db, "foro", id, "comentarios", commentId);
        const commentSnap = await getDoc(commentRef);
        if (!commentSnap.exists()) return;

        const commentData = commentSnap.data() as Comentario;
        const userVote = commentData.votos?.[profile.nombre];

        if (userVote === type) return;

        const updateData: any = {};

        if (userVote) {
            if (userVote === "up") updateData.thumbsUp = commentData.thumbsUp - 1;
            if (userVote === "down") updateData.thumbsDown = commentData.thumbsDown - 1;
            updateData[`votos.${String(profile.nombre)}`] = deleteField();
        }

        if (type === "up") updateData.thumbsUp = (updateData.thumbsUp || commentData.thumbsUp) + 1;
        if (type === "down") updateData.thumbsDown = (updateData.thumbsDown || commentData.thumbsDown) + 1;
        updateData[`votos.${String(profile.nombre)}`] = type;

        await updateDoc(commentRef, updateData);

        setUserVotes((prevVotes) => ({ ...prevVotes, [commentId]: type }));

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
        <div className="min-h-screen">
        <HeaderVentanas />
        <h1 className="text-3xl font-bold text-black mb-6 text-center">{prompt ? prompt.texto : "Cargando..."}</h1>  
        
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Comentar
                </button>
            </form>
            </div>
        )}

        <div className="max-w-7xl mx-auto mt-6 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 border-b pb-3">Comentarios</h2>
            {comments.map((c) => (
            <div key={c.id} className="border-b py-4 flex justify-between items-start">
                <div>
                <h3 className="font-semibold text-gray-800 text-left">{c.usuario}</h3>
                <p className="text-gray-600 text-left">{c.contenido}</p>
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
    );
};

export default ForoDetallado;
