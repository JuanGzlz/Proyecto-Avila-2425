// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoxztNTr2EfWNvI2n0Xh3Jv771MDG9ywM",
  authDomain: "proyecto-avila-2425.firebaseapp.com",
  projectId: "proyecto-avila-2425",
  storageBucket: "proyecto-avila-2425.firebasestorage.app",
  messagingSenderId: "67335801045",
  appId: "1:67335801045:web:9f889e37df617153e97a5c",
  measurementId: "G-VZTKRBB8B7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);


// Queda de manera global la variable db
const db = getFirestore(app)

// Aqui se pueden exportar todas las contastes
export { db };