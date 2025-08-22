import React, { useState } from 'react';
import './Modal.css';

export default function NewEvaluationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    aluno: '',
    tipo: 'Prova',
    nota: '',
    peso: 1,
    data: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nova Avaliação registrada:', form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Nova Avaliação</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="aluno">Aluno</label>
            <input
              type="text"
              id="aluno"
              name="aluno"
              placeholder="Digite o nome do aluno"
              value={form.aluno}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="tipo">Tipo de Avaliação</label>
            <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange}>
              <option>Prova</option>
              <option>Trabalho</option>
            </select>
          </div>

          <div>
            <label htmlFor="nota">Nota</label>
            <input
              type="number"
              id="nota"
              name="nota"
              step="0.1"
              min="0"
              max="10"
              placeholder="0,0 a 10,0"
              value={form.nota}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="peso">Peso</label>
            <input
              type="number"
              id="peso"
              name="peso"
              min="1"
              max="5"
              value={form.peso}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="data">Data</label>
            <input
              type="date"
              id="data"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-salvar">Salvar</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
