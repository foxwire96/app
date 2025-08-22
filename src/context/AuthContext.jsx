// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 🔑 tenta recuperar do localStorage na inicialização
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // lista de usuários fictícios
  const users = [
    { email: "admin@escola.com", senha: "1234", role: "admin", nome: "Administrador" },
    { email: "aluno@escola.com", senha: "1234", role: "aluno", nome: "Ana Souza" },
    { email: "professor@escola.com", senha: "1234", role: "professor", nome: "Carlos Lima" },
  ];

  const login = (email, senha) => {
    const found = users.find((u) => u.email === email && u.senha === senha);
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found)); // 🔒 salva no navegador
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // limpa sessão
  };

  // 🔄 mantém sincronizado com localStorage se mudar
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
