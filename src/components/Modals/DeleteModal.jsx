import React from 'react';
import './Modal.css';

export default function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirmar Exclusão</h3>
        <p className="modal-message">
          Tem certeza que deseja excluir este registro? <br />
          Esta ação não poderá ser desfeita.
        </p>

        <div className="modal-actions">
          <button className="btn-excluir" onClick={onConfirm}>
            Excluir
          </button>
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
