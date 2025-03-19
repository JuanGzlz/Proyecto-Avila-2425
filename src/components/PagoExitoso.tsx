import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const PagoExitoso: React.FC = () => {
    const location = useLocation();
  const navigate = useNavigate();
  const costo = location.state?.costo ? parseFloat(location.state.costo).toFixed(2) : "0.00";

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
          alt="PayPal" 
          className="w-20 mx-auto mb-4"
        />
        <div className="flex justify-center">
          <motion.div 
            className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-green-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </motion.div>
        </div>
        <h2 className="text-lg font-semibold mt-4">¡Gracias por su compra!</h2>
        <p className="text-gray-600 text-sm mt-1">Ha pagado <strong>USD$ {costo}</strong></p>
        <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition" onClick={() => navigate("/")}>
          Finalizar
        </button>
      </motion.div>
    </div>
  );
};

export default PagoExitoso;