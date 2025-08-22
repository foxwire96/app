import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginForm.css";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login(form.email, form.senha)) {
      navigate("/dashboard");
    } else {
      alert("Credenciais inválidas! Tente novamente.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h3>Acesse sua conta</h3>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          name="senha"
          placeholder="Digite sua senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-login">
        Entrar
      </button>

      <Link to="/recuperar-senha" className="link-button">
        Esqueci minha senha
      </Link>
    </form>
  );
};

export default LoginForm;
