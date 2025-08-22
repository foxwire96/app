// src/components/Modals/DeleteProfessorModal.jsx
import React from "react";
import "./Modal.css";

export default function DeleteProfessorModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Excluir Professor</h3>
        <p className="modal-message">
          Tem certeza que deseja excluir este professor?
        </p>
        <div className="modal-actions">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="btn-excluir" onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  );
}
