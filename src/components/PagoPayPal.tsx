import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

type PagoPaypalProps = {
  onPaymentSuccess: () => void;
  amount: string;
};

const PayPalPayment: React.FC<PagoPaypalProps> = ({ onPaymentSuccess, amount }) => {
  const paypalClientId = "AbuZpgwEz0_kOGjuxBrfl-fYxNFnoeBwqYv7yni_V0I1UtB-eXXOYJH2OcFL3DSj78MKrD1LVUuzkVy1";

  return (
    <PayPalScriptProvider options={{ "clientId": paypalClientId }}>
      <PayPalButtons
        createOrder={(_data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, 
                  currency_code: "USD",
                },
                description: "Reserva de actividad",
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
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;