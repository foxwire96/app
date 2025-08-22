// src/components/Header.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Bell, Search, User } from "lucide-react";
import "./Header.css";
import logo from "../assets/logo.png";

export default function Header({ title }) {
  const { user } = useAuth();

  return (
    <header className="main-header">
      {/* Logo sozinha */}
      <div className="header-left">
        <img src={logo} alt="Logo Escola" className="header-logo" />
      </div>

      {/* Título central */}
      <h1 className="header-title">{title}</h1>

      {/* Ações lado direito */}
      <div className="header-actions">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Buscar..." />
        </div>

        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <div className="user-box">
          <User size={20} />
          <span>{user?.nome || "Convidado"}</span>
        </div>
      </div>
    </header>
  );
}
