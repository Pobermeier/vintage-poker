import React, { useState } from 'react';
import ModalContext from './modalContext';
import Modal, { initialModalData } from '../../components/modals/Modal';

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(initialModalData);

  const openModal = (children, headingText, btnText) => {
    setModalData({ children, headingText, btnText });
    document.body.style.overflow = 'hidden';
    document.getElementById('layout-wrapper').style.filter = 'blur(4px)';
    document.getElementById('layout-wrapper').style.pointerEvents = 'none';
    document.getElementById('layout-wrapper').tabIndex = '-1';
    setShowModal(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'initial';
    document.getElementById('layout-wrapper').style.filter = 'none';
    document.getElementById('layout-wrapper').style.pointerEvents = 'all';
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, modalData, openModal, closeModal }}
    >
      {children}
      {showModal && (
        <Modal
          headingText={modalData.headingText}
          btnText={modalData.btnText}
          onClose={closeModal}
          onBtnClicked={closeModal}
        >
          {modalData.children()}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
