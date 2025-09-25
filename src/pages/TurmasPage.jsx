// src/pages/TurmasPage.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import LancarNotaPresencaModal from "../components/Modals/LancarNotaPresencaModal";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify'; // Importando o ToastContainer e o toast
import "./TurmasPage.css";

export default function TurmasPage() {
  const { user } = useAuth();

  const [turmas, setTurmas] = useState([
    {
      id: 1,
      nome: "6º Ano A",
      disciplina: "Matemática",
      professorId: "prof-1",
      alunos: [
        { id: 101, nome: "Ana Souza", nota: "", presenca: "" },
        { id: 102, nome: "João Silva", nota: "", presenca: "" },
      ],
    },
    {
      id: 2,
      nome: "7º Ano B",
      disciplina: "História",
      professorId: "prof-2",
      alunos: [
        { id: 103, nome: "Marcos Oliveira", nota: "", presenca: "" },
        { id: 104, nome: "Fernanda Lima", nota: "", presenca: "" },
      ],
    },
  ]);

  const [selectedAluno, setSelectedAluno] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTurmaId, setSelectedTurmaId] = useState(null);

  // ✅ Permissões
  const isAdmin = user?.role === "admin";
  const isProfessor = user?.role === "professor";
  const isAluno = user?.role === "aluno";

  // 🛑 Bloqueia aluno
  if (isAluno) {
    return (
      <div className="turmas-layout">
        <Sidebar />
        <div className="main-content">
          <h2>🚫 Acesso negado</h2>
          <p>Somente professores e administradores podem acessar a gestão de turmas.</p>
          <button
            className="btn-voltar"
            onClick={() => (window.location.href = "/dashboard")}
          >
            🔙 Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ✅ Salvar nota/presença
  const handleSave = (updatedAluno) => {
    setTurmas((prev) =>
      prev.map((turma) =>
        turma.id === selectedTurmaId
          ? {
              ...turma,
              alunos: turma.alunos.map((aluno) =>
                aluno.id === updatedAluno.id ? updatedAluno : aluno
              ),
            }
          : turma
      )
    );
    setShowModal(false);
    toast.success("Nota e presença lançadas com sucesso!"); // Exibe o toast após salvar
  };

  // ✅ Adicionar/editar/excluir turmas (apenas Admin)
  const handleAddTurma = () => {
    const nome = prompt("Nome da turma:");
    const disciplina = prompt("Disciplina:");
    if (nome && disciplina) {
      setTurmas((prev) => [
        ...prev,
        { id: Date.now(), nome, disciplina, professorId: "prof-1", alunos: [] },
      ]);
      toast.success("Turma adicionada com sucesso!"); // Exibe o toast após adicionar turma
    }
  };

  const handleDeleteTurma = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta turma?")) {
      setTurmas((prev) => prev.filter((t) => t.id !== id));
      toast.error("Turma excluída!"); // Notificação de erro
    }
  };

  // ✅ Professores só podem ver suas turmas
  const turmasVisiveis = isProfessor
    ? turmas.filter((t) => t.professorId === "prof-1") // simulação: professor logado é "prof-1"
    : turmas;

  return (
    <div className="turmas-layout">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1>📘 Gestão de Turmas</h1>
          {isAdmin && (
            <button className="btn-add" onClick={handleAddTurma}>
              ➕ Nova Turma
            </button>
          )}
        </header>

        {turmasVisiveis.map((turma) => (
          <div key={turma.id} className="turma-card">
            <h2>
              {turma.nome} - {turma.disciplina}
            </h2>

            {isAdmin && (
              <div className="turma-actions">
                <button onClick={() => handleDeleteTurma(turma.id)}>🗑️ Excluir</button>
              </div>
            )}

            <table className="turma-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Aluno</th>
                  <th>Nota</th>
                  <th>Presença</th>
                  {(isProfessor || isAdmin) && <th>Ações</th>}
                </tr>
              </thead>
              <tbody>
                {turma.alunos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.nota || "-"}</td>
                    <td>
                      {aluno.presenca === "presente" && "✅ Presente"}
                      {aluno.presenca === "falta" && "❌ Falta"}
                      {aluno.presenca === "justificada" && "📝 Justificada"}
                      {!aluno.presenca && "-"}
                    </td>
                    {(isProfessor || isAdmin) && (
                      <td>
                        <button
                          className="btn-lancar"
                          onClick={() => {
                            setSelectedAluno(aluno);
                            setSelectedTurmaId(turma.id);
                            setShowModal(true);
                          }}
                        >
                          ➕ Lançar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {showModal && (
          <LancarNotaPresencaModal
            isOpen={showModal}
            aluno={selectedAluno}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          />
        )}
      </div>

      {/* Adicionando o ToastContainer aqui */}
      <ToastContainer
        position="bottom-right"  // Colocando no canto inferior direito
        autoClose={3000}  // Tempo de exibição do toast (em milissegundos)
        hideProgressBar={true}  // Esconde a barra de progresso
        newestOnTop={true}  // Faz com que o último toast apareça em cima
        closeButton={false} // Remove o botão de fechar
        limit={3}  // Limita o número de toasts visíveis ao mesmo tempo
        style={{
         width: '250px', // Largura menor
         fontSize: '0.9rem', // Reduz o tamanho da fonte
        borderRadius: '6px', // Arredonda as bordas
        }}
      />
    </div>
  );
}
