// src/components/Modals/BoletimModal.jsx
import React from "react";
import "./BoletimModal.css";

const BoletimModal = ({ isOpen, onClose, aluno }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(
      [JSON.stringify(aluno.notas, null, 2)],
      { type: "application/json" }
    );
    element.href = URL.createObjectURL(file);
    element.download = `boletim-${aluno.nome}.json`; // poderia ser PDF com lib depois
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <h3>📘 Boletim de {aluno.nome}</h3>

        <table className="boletim-table">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Nota</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {aluno.notas.map((n, i) => (
              <tr key={i}>
                <td>{n.disciplina}</td>
                <td>{n.nota}</td>
                <td>{n.situacao}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handlePrint}>🖨️ Imprimir</button>
          <button className="btn-secondary" onClick={handleDownload}>⬇️ Baixar</button>
          <button className="btn-secondary" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default BoletimModal;
