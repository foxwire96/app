import React, { useEffect, useState } from 'react';
import './NewEvaluationModal.css';

const NewEvaluationModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  lockProfessor = false,
  defaultProfessor = ''
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    turma: '',
    disciplina: '',
    tipo: '',
    nota: '',
    professor: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome || '',
        turma: initialData.turma || '',
        disciplina: initialData.disciplina || '',
        tipo: initialData.tipo || '',
        nota: initialData.nota || '',
        professor: initialData.professor || defaultProfessor || ''
      });
    } else {
      setFormData({
        nome: '',
        turma: '',
        disciplina: '',
        tipo: '',
        nota: '',
        professor: defaultProfessor || ''
      });
    }
  }, [initialData, defaultProfessor]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.nome || !formData.turma || !formData.disciplina || !formData.tipo || formData.nota === '') {
      alert('Preencha todos os campos.');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <h3>{initialData ? 'Editar Avaliação' : 'Nova Avaliação'}</h3>
        <label>Nome do aluno</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        <label>Turma</label>
        <input type="text" name="turma" value={formData.turma} onChange={handleChange} />
        <label>Disciplina</label>
        <input type="text" name="disciplina" value={formData.disciplina} onChange={handleChange} />
        <label>Tipo</label>
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="PROVA">Prova</option>
          <option value="TESTE">Teste</option>
          <option value="TRABALHO">Trabalho</option>
        </select>
        <label>Nota</label>
        <input type="number" name="nota" value={formData.nota} onChange={handleChange} min="0" max="10" step="0.5" />
        <label>Professor</label>
        <input type="text" name="professor" value={formData.professor} onChange={handleChange} disabled={lockProfessor} title={lockProfessor ? 'Definido automaticamente pelo sistema' : 'Digite o nome do professor'} />
        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSave}>Salvar</button>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default NewEvaluationModal;
