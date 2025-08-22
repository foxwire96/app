import React from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-background"></div>

      <div className="login-container">
        <div className="login-header">
          <h2>Sistema de Gestão Escolar</h2>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
