import React, { useState } from 'react';
import './EvaluationPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EvaluationTable from '../components/EvaluationTable';
import NewEvaluationModal from '../components/Modals/NewEvaluationModal';
import BoletimModal from '../components/Modals/BoletimModal';
import { useAuth } from '../context/AuthContext';

export default function EvaluationPage() {
  const [openNew, setOpenNew] = useState(false);
  const [openBoletim, setOpenBoletim] = useState(false);
  const { user } = useAuth();

  // 🔹 Simulação de boletim do aluno logado
  const boletimAluno = {
    nome: "Ana Souza",
    notas: [
      { disciplina: "Matemática", nota: 8.5, situacao: "✅ Aprovado" },
      { disciplina: "Português", nota: 7.0, situacao: "✅ Aprovado" },
      { disciplina: "História", nota: 5.0, situacao: "⚠️ Recuperação" }
    ]
  };

  return (
    <div className="evaluation-page">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="page-header">
            <div>
              <h2 className="page-title">Avaliações</h2>
              <p className="page-subtitle">Gerencie registros de notas, médias e boletins.</p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {/* Só professor e admin podem criar */}
              {(user?.role === 'professor' || user?.role === 'admin') && (
                <button className="btn-nova" onClick={() => setOpenNew(true)}>
                  + Nova Avaliação
                </button>
              )}

              {/* Só aluno vê o boletim */}
              {user?.role === 'aluno' && (
                <button className="btn-nova" onClick={() => setOpenBoletim(true)}>
                  📘 Ver Boletim
                </button>
              )}
            </div>
          </div>

          <EvaluationTable showOnlyOwn={user?.role === 'aluno'} />

          <NewEvaluationModal
            isOpen={openNew}
            onClose={() => setOpenNew(false)}
          />

          <BoletimModal
            isOpen={openBoletim}
            onClose={() => setOpenBoletim(false)}
            aluno={boletimAluno}
          />
        </div>
      </div>
    </div>
  );
}
