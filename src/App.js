// src/App.js
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EvaluationPage from './pages/EvaluationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfessoresPage from './pages/ProfessoresPage'; 
import AlunosPage from './pages/AlunosPage'; 
import TurmasPage from './pages/TurmasPage'; 
import ComunicadosPage from './pages/ComunicadosPage'; // ✅ nova página


function App() {
  return (
    <Routes>
      {/* Login & recuperação */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />

      {/* Páginas principais */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/avaliacoes" element={<EvaluationPage />} />
      <Route path="/professores" element={<ProfessoresPage />} /> 
      <Route path="/alunos" element={<AlunosPage />} />
      <Route path="/turmas" element={<TurmasPage />} />
      <Route path="/comunicados" element={<ComunicadosPage />} /> {/* ✅ nova rota */}
    </Routes>
  
  );
}

export default App;
