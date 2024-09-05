import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Authorisation } from "../api/Api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Authorisation(username, password);
      if (response) {
        navigate("/");
      } else {
        alert("Неверный логин или пароль");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Авторизация</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-input-group">
          <label className="login-label">Логин:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div className="login-input-group">
          <label className="login-label">Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
