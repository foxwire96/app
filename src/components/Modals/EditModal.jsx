import React, { useState, useEffect } from 'react';
import './Modal.css';

export default function EditModal({ isOpen, onClose, data, onSave }) {
  const [form, setForm] = useState({ id: null, aluno: '', prova: 0, trabalho: 0 });

  useEffect(() => { if (data) setForm(data); }, [data]);
  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, prova: Number(form.prova), trabalho: Number(form.trabalho) });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Editar Avaliação</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="aluno">Aluno</label>
            <input type="text" id="aluno" name="aluno" value={form.aluno} readOnly />
          </div>

          <div>
            <label htmlFor="prova">Prova</label>
            <input
              type="number"
              id="prova"
              name="prova"
              step="0.1"
              min="0"
              max="10"
              value={form.prova}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="trabalho">Trabalho</label>
            <input
              type="number"
              id="trabalho"
              name="trabalho"
              step="0.1"
              min="0"
              max="10"
              value={form.trabalho}
              onChange={handleChange}
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
