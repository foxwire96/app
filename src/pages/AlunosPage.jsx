import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import "./AlunosPage.css";

export default function AlunosPage() {
  const { user } = useAuth();

  // Dados fictícios
  const [alunos, setAlunos] = useState([
    { id: 1, nome: "Ana Souza", email: "ana@escola.com", turma: "6A", notas: { matematica: 8.5 }, presenca: "95%" },
    { id: 2, nome: "Lucas Martins", email: "lucas@escola.com", turma: "6A", notas: { matematica: 7.0 }, presenca: "88%" },
    { id: 3, nome: "Mariana Silva", email: "mariana@escola.com", turma: "7B", notas: { portugues: 9.2 }, presenca: "97%" },
  ]);

  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // === Estados para professor ===
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [showNotaModal, setShowNotaModal] = useState(false);
  const [showPresencaModal, setShowPresencaModal] = useState(false);

  // === Funções do Admin ===
  const handleSave = (data) => {
    if (editData) {
      setAlunos((prev) => prev.map((a) => (a.id === data.id ? data : a)));
    } else {
      setAlunos((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
    setEditData(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      setAlunos((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // === Funções do Professor ===
  const handleSaveNota = (id, nota) => {
    setAlunos(prev =>
      prev.map(a =>
        a.id === id ? { ...a, notas: { ...a.notas, matematica: nota } } : a
      )
    );
    setShowNotaModal(false);
  };

  const handleSavePresenca = (id, presenca) => {
    setAlunos(prev =>
      prev.map(a =>
        a.id === id ? { ...a, presenca: presenca + "%" } : a
      )
    );
    setShowPresencaModal(false);
  };

  // === UI Diferenciada por papel ===
  return (
    <div className="alunos-layout">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1>👨‍🎓 Gestão de Alunos</h1>
        </header>

        {/* Caso seja aluno logado */}
        {user?.role === "aluno" && (
          <div className="aluno-perfil">
            <h2>📌 Meu Perfil</h2>
            <p><strong>Nome:</strong> {user.nome}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Turma:</strong> 6A</p>
            <h3>📖 Meu Boletim</h3>
            <table>
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Matemática</td><td>8.5</td></tr>
                <tr><td>Português</td><td>7.8</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Caso seja professor logado */}
        {user?.role === "professor" && (
          <div className="professor-alunos">
            <h2>👩‍🏫 Alunos das minhas turmas</h2>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Turma</th>
                  <th>Nota</th>
                  <th>Presença</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos
                  .filter((a) => a.turma === "6A") // professor só vê a própria turma (exemplo fixo)
                  .map((a) => (
                  <tr key={a.id}>
                    <td>{a.nome}</td>
                    <td>{a.turma}</td>
                    <td>{a.notas.matematica || a.notas.portugues}</td>
                    <td>{a.presenca}</td>
                    <td>
                      <button onClick={() => { setSelectedAluno(a); setShowNotaModal(true); }}>✏️ Nota</button>
                      <button onClick={() => { setSelectedAluno(a); setShowPresencaModal(true); }}>📋 Presença</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal de Lançar Nota */}
            {showNotaModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Lançar Nota - {selectedAluno?.nome}</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveNota(selectedAluno.id, parseFloat(e.target.nota.value));
                    }}
                  >
                    <label>Nota:</label>
                    <input type="number" step="0.1" min="0" max="10" name="nota" required />
                    <div className="modal-actions">
                      <button type="submit" className="btn-salvar">Salvar</button>
                      <button type="button" className="btn-cancelar" onClick={() => setShowNotaModal(false)}>Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal de Lançar Presença */}
            {showPresencaModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Lançar Presença - {selectedAluno?.nome}</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSavePresenca(selectedAluno.id, e.target.presenca.value);
                    }}
                  >
                    <label>Presença (%):</label>
                    <input type="number" min="0" max="100" name="presenca" required />
                    <div className="modal-actions">
                      <button type="submit" className="btn-salvar">Salvar</button>
                      <button type="button" className="btn-cancelar" onClick={() => setShowPresencaModal(false)}>Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Caso seja admin logado */}
        {user?.role === "admin" && (
          <div className="admin-alunos">
            <div className="alunos-header">
              <h2>📋 Lista de Alunos</h2>
              <button className="btn-add" onClick={() => setShowModal(true)}>
                ➕ Adicionar Aluno
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Turma</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.nome}</td>
                    <td>{a.email}</td>
                    <td>{a.turma}</td>
                    <td>
                      <button onClick={() => { setEditData(a); setShowModal(true); }}>✏️</button>
                      <button onClick={() => handleDelete(a.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal de adicionar/editar */}
            {showModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>{editData ? "Editar Aluno" : "Adicionar Aluno"}</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSave({
                        id: editData ? editData.id : null,
                        nome: e.target.nome.value,
                        email: e.target.email.value,
                        turma: e.target.turma.value,
                      });
                    }}
                  >
                    <label>Nome</label>
                    <input type="text" name="nome" defaultValue={editData?.nome || ""} required />
                    <label>Email</label>
                    <input type="email" name="email" defaultValue={editData?.email || ""} required />
                    <label>Turma</label>
                    <input type="text" name="turma" defaultValue={editData?.turma || ""} required />

                    <div className="modal-actions">
                      <button type="submit" className="btn-salvar">Salvar</button>
                      <button type="button" className="btn-cancelar" onClick={() => { setShowModal(false); setEditData(null); }}>Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
