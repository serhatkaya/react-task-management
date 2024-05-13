import { useState } from 'react';
import Modal from '../components/ui/Modal';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const open = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const close = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return {
    open,
    close,
    Modal: () => (
      <Modal isOpen={isModalOpen} onClose={close}>
        {modalContent}
      </Modal>
    ),
  };
};

export default useModal;
