import { createContext, useEffect, useState, ReactNode } from 'react';	
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { app } from '../credentials';

// 📌 1. Define la interfaz para el perfil del usuario
interface UserProfile {
  nombre?: string;
  email?: string;
  uid?: string;
  // Agrega más propiedades según los datos de Firestore
}

// 📌 2. Define la estructura del contexto
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  logged: boolean;
}

// 📌 3. Crear el contexto con el tipo correcto
const UserContext = createContext<UserContextType | null>(null);
export { UserContext };

const auth = getAuth(app);
const db = getFirestore(app);

// 📌 4. Define el tipo de `children`
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userConnected) => {
      if (userConnected) {
        setUser(userConnected);

        const userDocRef = doc(db, 'users', userConnected.uid);
        try {
          const docSnap = await getDoc(userDocRef);

          if (!docSnap.exists()) {
            console.log('No such document');
            setProfile(null);
          } else {
            setProfile(docSnap.data() as UserProfile); // 📌 5. Tipamos correctamente `docSnap.data()`
            console.log(docSnap.data());
          }

          setLogged(true);
        } catch (error) {
          console.log(error);
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
        setLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, profile, setProfile, logged }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

