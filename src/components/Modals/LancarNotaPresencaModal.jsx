import React, { useState, useEffect } from "react";
import "./LancarNotaPresencaModal.css";

export default function LancarNotaPresencaModal({ isOpen, onClose, onSave, aluno }) {
  const [nota, setNota] = useState("");
  const [presenca, setPresenca] = useState("presente");

  useEffect(() => {
    if (aluno) {
      setNota(aluno.nota || "");
      setPresenca(aluno.presenca || "presente");
    }
  }, [aluno]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Lançar Nota e Presença</h3>
        <p><strong>Aluno:</strong> {aluno?.nome}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave({
              ...aluno,
              nota,
              presenca,
            });
            onClose();
          }}
        >
          <label>Nota (0 a 10)</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            required
          />

          <label>Presença</label>
          <select value={presenca} onChange={(e) => setPresenca(e.target.value)}>
            <option value="presente">✅ Presente</option>
            <option value="falta">❌ Falta</option>
            <option value="justificada">📝 Justificada</option>
          </select>

          <div className="modal-actions">
            <button type="submit" className="btn-salvar">Salvar</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
