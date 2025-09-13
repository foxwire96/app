// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { icon: "🏠", label: "Dashboard", path: "/dashboard" },
    { icon: "👨‍🎓", label: "Alunos", path: "/alunos" },
    { icon: "👨‍🏫", label: "Professores", path: "/professores" },
    { icon: "🏫", label: "Turmas", path: "/turmas" },
    { icon: "📝", label: "Avaliações", path: "/avaliacoes" },
    { icon: "📢", label: "Comunicados", path: "/comunicados" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Botão de collapse */}
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Alternar menu"
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      {/* Logo */}
      {!collapsed && (
        <h2 className="sidebar-logo">
          <img src={logo} alt="Logo da Escola" className="sidebar-logo-img" />
        </h2>
      )}

      {/* Navegação */}
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-link ${active ? 'active' : ''}`}
            >
              <span className="emoji-icon">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Rodapé - Logout */}
      <div className="sidebar-footer" onClick={handleLogout}>
        <span className="emoji-icon">🚪</span>
        {!collapsed && <span>Sair</span>}
      </div>
    </aside>
  );
};

export default Sidebar;
