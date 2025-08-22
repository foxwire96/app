import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import "./ProfessoresPage.css";

export default function ProfessoresPage() {
  const { user } = useAuth();

  const [professores, setProfessores] = useState([
    { id: 1, nome: "Carlos Lima", email: "carlos@escola.com", telefone: "11987654321", titulacao: "Mestrado", disciplinas: ["Matemática", "Física"] },
    { id: 2, nome: "Fernanda Oliveira", email: "fernanda@escola.com", telefone: "21999887766", titulacao: "Doutorado", disciplinas: ["Português", "Redação"] },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const filteredProfessores = professores.filter(
    (p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (data) => {
    if (editData) {
      setProfessores((prev) =>
        prev.map((p) => (p.id === data.id ? data : p))
      );
      setFeedback("Professor atualizado com sucesso ✅");
    } else {
      setProfessores((prev) => [...prev, { ...data, id: Date.now() }]);
      setFeedback("Professor adicionado com sucesso ✅");
    }
    setShowModal(false);
    setEditData(null);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este professor?")) {
      setProfessores((prev) => prev.filter((p) => p.id !== id));
      setFeedback("Professor excluído com sucesso 🗑️");
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  // 🔒 Bloqueia alunos
  if (user?.role === "aluno") {
    return (
      <div className="acesso-negado">
        <h2>🚫 Acesso negado</h2>
        <p>Somente professores e administradores podem acessar esta página.</p>
        <button
          className="btn-voltar"
          onClick={() => (window.location.href = "/dashboard")}
        >
          🏠 Voltar ao Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="professores-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1>👨‍🏫 Gestão de Professores</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-add" onClick={() => setShowModal(true)}>
              ➕ Adicionar Professor
            </button>
          </div>
        </header>

        {/* Feedback */}
        {feedback && <div className="feedback">{feedback}</div>}

        {/* Tabela */}
        <div className="professores-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Titulação</th>
                <th>Disciplinas</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfessores.map((prof) => (
                <tr key={prof.id}>
                  <td>{prof.id}</td>
                  <td>{prof.nome}</td>
                  <td>{prof.email}</td>
                  <td>{prof.telefone}</td>
                  <td>{prof.titulacao}</td>
                  <td>{prof.disciplinas?.join(", ") || "—"}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditData(prof);
                        setShowModal(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(prof.id)}>🗑️</button>
                    <button
                      onClick={() => alert(JSON.stringify(prof, null, 2))}
                    >
                      👁️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editData ? "Editar Professor" : "Adicionar Professor"}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave({
                    id: editData ? editData.id : null,
                    nome: e.target.nome.value,
                    email: e.target.email.value,
                    telefone: e.target.telefone.value,
                    titulacao: e.target.titulacao.value,
                    disciplinas: e.target.disciplinas.value
                      .split(",")
                      .map((d) => d.trim()),
                  });
                }}
              >
                <label>Nome</label>
                <input
                  type="text"
                  name="nome"
                  defaultValue={editData?.nome || ""}
                  required
                />

                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editData?.email || ""}
                  required
                />

                <label>Telefone</label>
                <input
                  type="text"
                  name="telefone"
                  defaultValue={editData?.telefone || ""}
                  required
                />

                <label>Titulação</label>
                <select
                  name="titulacao"
                  defaultValue={editData?.titulacao || ""}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Graduação">Graduação</option>
                  <option value="Mestrado">Mestrado</option>
                  <option value="Doutorado">Doutorado</option>
                </select>

                <label>Disciplinas</label>
                <input
                  type="text"
                  name="disciplinas"
                  placeholder="Ex: Matemática, Física"
                  defaultValue={editData?.disciplinas?.join(", ") || ""}
                />

                <div className="modal-actions">
                  <button type="submit" className="btn-salvar">
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={() => {
                      setShowModal(false);
                      setEditData(null);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
