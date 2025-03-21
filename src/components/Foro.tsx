import { useState, useEffect, useContext } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../credentials";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import HeaderVentanas from "./HeaderVentanas";

const db = getFirestore(app);

type Prompt = {
    id: string;
    texto: string;
};

const Foro: React.FC = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([]);
    const profileContext = useContext(UserContext);

    useEffect(() => {
        const fetchPrompts = async () => {
            try {
                const promptsRef = collection(db, "foro");
                const snapshot = await getDocs(promptsRef);
                setPrompts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Prompt)));
            } catch (error) {
                console.error("Error al traer los prompts:", error);
            }
        };

        fetchPrompts();
    }, []);

    if (!profileContext) {
        return <div>Cargando...</div>;
    }

    const { logged, profile } = profileContext;

    return (
        <div className="items-center justify-center min-h-screen bg-gray-200">
            <HeaderVentanas />
            <h1 className="text-3xl font-bold text-black mb-6 text-center">  </h1>
            {logged && profile && (
                <div className="bg-teal-900 rounded-2xl shadow-lg p-6 m-5 md:m-30 md:mt-10">
                    <h2 className="text-2xl font-bold text-white mb-4">Explorar Foros creados por los Administradores...</h2>
                    <ul className="space-y-4">
                        {prompts.map((prompt) => (
                            <li key={prompt.id} className="p-4 bg-white rounded-xl shadow-md hover:bg-gray-50">
                                <h3 className="text-xl font-semibold text-black text-left">{prompt.texto}</h3>
                                <Link to={`/foro/${prompt.id}`} className="text-white hover:text-gray-800 mt-2 block bg-blue-600 hover:bg-blue-700 rounded p-2">
                                    Participar en el foro
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Foro;

