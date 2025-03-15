import React from 'react';
import { useNavigate } from 'react-router-dom';
import PayPalPayment from './PagoPayPal'; // Importa el componente de PayPal

type VentanaPagoProps = {
  actividad: {
    id: string;
    nombre: string;
    costo: string;
    guia: string;
    fecha: string;
    diaSemana: string;
    horaInicio: string;
    horaFinal: string;
    cantMaxPersonas: number;
    puntoEncuentro: string;
    dificultad: number;
    distancia: string;
    duracion: string;
  };
  onClose: () => void;
};

const VentanaPago: React.FC<VentanaPagoProps> = ({ actividad, onClose }) => {
    const navigate = useNavigate();

    const handlePaymentSuccess = () => {
      onClose(); // Cierra la ventana de pago
      navigate('/pago-exitoso'); // Redirige al usuario a una página de confirmación
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center">Procesar Pago</h1>
        <div className="payment-info mb-4">
          <h2 className="text-xl font-semibold">{actividad.nombre}</h2>
          <p><strong>Guía:</strong> {actividad.guia}</p>
          <p><strong>Fecha:</strong> {actividad.fecha}</p>
          <p><strong>Día:</strong> {actividad.diaSemana}</p>
          <p><strong>Hora Inicio:</strong> {actividad.horaInicio}</p>
          <p><strong>Hora Final:</strong> {actividad.horaFinal}</p>
          <p><strong>Costo:</strong> ${actividad.costo}</p>
          <p><strong>Punto de Encuentro:</strong> {actividad.puntoEncuentro}</p>
          <p><strong>Dificultad:</strong> {actividad.dificultad}</p>
          <p><strong>Distancia:</strong> {actividad.distancia} km</p>
          <p><strong>Duración:</strong> {actividad.duracion}</p>
        </div>
        <PayPalPayment onPaymentSuccess={handlePaymentSuccess} />
      </div>
    </div>
  );
};

export default VentanaPago;