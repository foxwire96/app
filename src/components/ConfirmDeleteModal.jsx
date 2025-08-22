// src/components/ConfirmDeleteModal.jsx
import React from 'react';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Não renderiza se estiver fechado

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirmação</h3>
        <p>Tem certeza que deseja excluir esta avaliação?</p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-confirm" onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
