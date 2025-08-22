import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import "./ComunicadosPage.css";

export default function ComunicadosPage() {
  const { user } = useAuth();

  const [comunicados, setComunicados] = useState([
    {
      id: 1,
      titulo: "Reunião de Pais",
      mensagem: "Reunião marcada para dia 20/08 às 18h.",
      destinatario: "Turma 6A",
      remetente: "Direção",
      data: "2025-08-16",
    },
    {
      id: 2,
      titulo: "Prova de Matemática",
      mensagem: "Prova na próxima sexta-feira.",
      destinatario: "Turma 7B",
      remetente: "Prof. Carlos",
      data: "2025-08-10",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [novoComunicado, setNovoComunicado] = useState({
    titulo: "",
    mensagem: "",
    destinatario: "",
  });

  const handleSave = () => {
    setComunicados(prev => [
      ...prev,
      {
        ...novoComunicado,
        id: Date.now(),
        remetente: user?.nome,
        data: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowModal(false);
    setNovoComunicado({ titulo: "", mensagem: "", destinatario: "" });
  };

  return (
    <div className="comunicados-layout">
      <Sidebar />

      <div className="main-content">
        <header className="header">
          <h1>📢 Comunicados</h1>
          {user?.role !== "aluno" && (
            <button className="btn-add" onClick={() => setShowModal(true)}>
              ➕ Novo Comunicado
            </button>
          )}
        </header>

        <div className="comunicados-table">
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Mensagem</th>
                <th>Destinatário</th>
                <th>Remetente</th>
                <th>Data</th>
                {user?.role !== "aluno" && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {comunicados.map((c) => (
                <tr key={c.id}>
                  <td>{c.titulo}</td>
                  <td>{c.mensagem}</td>
                  <td>{c.destinatario}</td>
                  <td>{c.remetente}</td>
                  <td>{c.data}</td>
                  {user?.role !== "aluno" && (
                    <td>
                      <button onClick={() => alert("Editar em breve")}>✏️</button>
                      <button onClick={() => setComunicados(prev => prev.filter(p => p.id !== c.id))}>
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de Novo Comunicado */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Novo Comunicado</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <label>Título</label>
                <input
                  type="text"
                  value={novoComunicado.titulo}
                  onChange={(e) => setNovoComunicado({ ...novoComunicado, titulo: e.target.value })}
                  required
                />

                <label>Mensagem</label>
                <textarea
                  value={novoComunicado.mensagem}
                  onChange={(e) => setNovoComunicado({ ...novoComunicado, mensagem: e.target.value })}
                  required
                />

                <label>Destinatário</label>
                <input
                  type="text"
                  placeholder="Ex: Turma 6A, Aluno João ou Todos"
                  value={novoComunicado.destinatario}
                  onChange={(e) => setNovoComunicado({ ...novoComunicado, destinatario: e.target.value })}
                  required
                />

                <div className="modal-actions">
                  <button type="submit" className="btn-salvar">Salvar</button>
                  <button type="button" className="btn-cancelar" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
