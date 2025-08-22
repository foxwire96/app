import React from 'react';
import './DashboardPage.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import Announcements from '../components/Announcements';
import { Users, GraduationCap, Layers, FileText } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Header />

        <div className="content">
          {/* Cards de estatísticas */}
          <div className="stats-grid">
            <StatsCard title="Alunos" value="230" icon={<Users size={28} />} />
            <StatsCard title="Professores" value="18" icon={<GraduationCap size={28} />} />
            <StatsCard title="Turmas" value="12" icon={<Layers size={28} />} />
            <StatsCard title="Avaliações" value="45" icon={<FileText size={28} />} />
          </div>

          {/* Relatórios (cards simples) */}
          <div className="reports">
            <h3>Relatórios</h3>
            <div className="report-cards">
              <div className="report-card">
                <h4>Notas Médias</h4>
                <p>📊 Média geral: 7,3</p>
              </div>
              <div className="report-card">
                <h4>Situação dos Alunos</h4>
                <p>✅ 180 Aprovados</p>
                <p>⚠️ 30 em Recuperação</p>
                <p>❌ 20 Reprovados</p>
              </div>
              <div className="report-card">
                <h4>Próximas Avaliações</h4>
                <p>📅 3 provas agendadas</p>
              </div>
            </div>
          </div>

          {/* Comunicados */}
          <Announcements />
        </div>
      </div>
    </div>
  );
}
