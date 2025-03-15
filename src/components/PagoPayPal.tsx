import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

type PagoPaypalProps = {
  onPaymentSuccess: () => void;
};

const PayPalPayment: React.FC<PagoPaypalProps> = ({ onPaymentSuccess }) => {
  //Credenciales de PayPal (Client ID obtenido)
  const paypalClientId = "AbuZpgwEz0_kOGjuxBrfl-fYxNFnoeBwqYv7yni_V0I1UtB-eXXOYJH2OcFL3DSj78MKrD1LVUuzkVy1";

  return (
    <PayPalScriptProvider options={{ "clientId": paypalClientId }}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">Procesar Pago</h1>
          <p className="text-gray-600 mb-6 text-center">
            Completa tu compra de manera segura con PayPal.
          </p>

          {/* Componente de PayPal Buttons */}
          <PayPalButtons
            createOrder={(_data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "100.00", // Monto del pago (llega a cambiar)
                      currency_code: "USD", // Moneda (puedes cambiarla)
                    },
                    description: "Reserva de actividad", // Descripción del pago
                  },
                ],
                intent: 'CAPTURE'
              });
            }}
            onApprove={(_data, actions) => {
              if (!actions.order) {
                throw new Error("No se pudo capturar la orden.");
              }
              return actions.order.capture().then((details) => {
                alert(`Pago completado por ${details.payer?.name?.given_name}`);
                console.log("Detalles del pago:", details);
                onPaymentSuccess();
              });
            }}
            onError={(error) => {
              console.error("Error en el pago:", error);
              alert("Ocurrió un error al procesar el pago. Inténtalo de nuevo.");
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;