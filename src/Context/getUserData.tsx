
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../credentials";

const db = getFirestore(app);

const getUserData = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.data());



    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No se encontró el documento del usuario.");
      return null;
    }
  } else {
    console.log("No hay usuario autenticado.");
    return null;
  }
};

export { getUserData };