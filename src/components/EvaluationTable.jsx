import React, { useState } from 'react';
import './EvaluationTable.css';
import EditModal from './Modals/EditModal';
import DeleteModal from './Modals/DeleteModal';
import { useAuth } from '../context/AuthContext'; // ✅ pegar usuário logado

export default function EvaluationTable() {
  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, aluno: 'Ana Souza', prova: 8.5, trabalho: 7.0 },
    { id: 2, aluno: 'Carlos Lima', prova: 5.5, trabalho: 6.0 },
    { id: 3, aluno: 'Mariana Silva', prova: 3.5, trabalho: 4.0 },
  ]);

  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { user } = useAuth(); // ✅ pega papel do usuário

  // cálculo média ponderada (peso prova 2, trabalho 1)
  const calcMedia = (prova, trabalho) => {
    return ((prova * 2 + trabalho * 1) / 3).toFixed(1);
  };

  // situação do aluno (regra institucional BR-AV-05)
  const getSituacao = (media) => {
    if (media >= 6) return '✅ Aprovado';
    if (media >= 4) return '⚠️ Recuperação';
    return '❌ Reprovado';
  };

  const handleSave = (newData) => {
    setAvaliacoes((prev) =>
      prev.map((a) => (a.id === newData.id ? newData : a))
    );
  };

  const handleDelete = (id) => {
    setAvaliacoes((prev) => prev.filter((a) => a.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="evaluation-table">
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Prova</th>
            <th>Trabalho</th>
            <th>Média</th>
            <th>Situação</th>
            {user.role !== 'aluno' && <th>Ações</th>} {/* ✅ só mostra p/ prof/admin */}
          </tr>
        </thead>
        <tbody>
          {avaliacoes.map((av) => {
            const media = calcMedia(av.prova, av.trabalho);
            return (
              <tr key={av.id}>
                <td>{av.aluno}</td>
                <td>{av.prova}</td>
                <td>{av.trabalho}</td>
                <td>{media}</td>
                <td>{getSituacao(media)}</td>
                {user.role !== 'aluno' && (   // ✅ aluno não vê botões
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => setEditData(av)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-excluir"
                      onClick={() => setDeleteId(av.id)}
                    >
                      Excluir
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal editar */}
      <EditModal
        isOpen={!!editData}
        data={editData}
        onClose={() => setEditData(null)}
        onSave={handleSave}
      />

      {/* Modal excluir */}
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
      />
    </div>
  );
}
