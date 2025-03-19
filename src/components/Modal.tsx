import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      <Dialog.Content className="fixed bg-white rounded-lg p-8 w-80 max-w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <Dialog.Close className="absolute top-2 right-2 text-xl" onClick={onClose}>
          X
        </Dialog.Close>
        <h3 className="text-center text-xl font-bold mb-4">¡Atención!</h3>
        <p className="text-center">{message}</p>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
