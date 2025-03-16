import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion, getFirestore } from "firebase/firestore";
import { app } from "../credentials";
import PayPalPayment from "./PagoPayPal";
import { UserContext } from "../Context/UserContext";
import HeaderVentanas from "./HeaderVentanas";

const db = getFirestore(app);

type Excursion = {
  id: string;
  nombre: string;
  guia: string;
  costo: string;
};

const VentanaPago: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [excursion, setExcursion] = useState<Excursion | null>(null);
  const profileContext = useContext(UserContext);
  const { logged, profile } = profileContext || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExcursion = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "actividades", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setExcursion({ id: docSnap.id, ...docSnap.data() } as Excursion);
        } else {
          console.error("No se encontró la excursión");
        }
      } catch (error) {
        console.error("Error al obtener la excursión:", error);
      }
    };

    fetchExcursion();
  }, [id]);

  const handlePaymentSuccess = async () => {
    if (!id || !profile?.uid) return;
  
    try {
      const excursionRef = doc(db, "actividades", id);
      const excursionSnap = await getDoc(excursionRef);
  
      if (!excursionSnap.exists()) {
        console.error("La excursión no existe");
        return;
      }
  
      const excursionData = excursionSnap.data();
      const usuariosRegistrados = excursionData?.usuariosRegistrados || [];
  
      // Verificar si el usuario ya está registrado
      if (usuariosRegistrados.includes(profile.nombre)) {
        alert("Ya estás registrado en esta excursión.");
        return;
      }
  
      // Agregar el usuario a la lista de registrados
      await updateDoc(excursionRef, {
        usuariosRegistrados: arrayUnion(profile.nombre), // Agrega el usuario a la lista
      });
  
      alert("Pago exitoso. Has sido registrado en la excursión.");

      const userRef = doc(db, "users", profile.uid); // Usar el uid del usuario
      await updateDoc(userRef, {
        actividadesReservadas: arrayUnion(id), // Agrega el ID de la excursión a la lista de actividades
      });

    alert("Pago exitoso. Has sido registrado en la excursión.");

      navigate(`/excursion/${id}`); // Redirige a la página de detalles de la excursión
    } catch (error) {
      console.error("Error al registrar usuario en la excursión:", error);
    }
  };

  return (
    <div>
      <HeaderVentanas />
      <div className="min-h-screen bg-white flex flex-col items-center p-6">
        <div className="bg-teal-900 p-6 rounded-lg shadow-lg text-center w-96">
          {excursion ? (
            <>
              <h1 className="text-2xl font-bold text-white">{excursion.nombre}</h1>
              <p className="text-white">Guía: {excursion.guia}</p>
              <p className="text-white">Costo: ${excursion.costo}</p>
            </>
          ) : (
            <p>Cargando detalles...</p>
          )}
        </div>

        <div className="mt-6 bg-white">
          {logged ? (
            <PayPalPayment onPaymentSuccess={handlePaymentSuccess} />
          ) : (
            <p className="text-white">Debes iniciar sesión para pagar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VentanaPago;
