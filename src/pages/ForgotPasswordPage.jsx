import React, { useState } from 'react';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Um link de recuperação foi enviado para: ${email}`);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        <h2>Recuperar Senha</h2>
        <p>Digite seu e-mail para receber instruções de recuperação.</p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-enviar">
            Enviar link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
