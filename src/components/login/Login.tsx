import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/jwt/login",
        new URLSearchParams({
          username: username,
          password: password,
          grant_type: "",
          scope: "",
          client_id: "",
          client_secret: "",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          withCredentials: true, // Обязательно для работы с cookie
        }
      );

      // Проверяем, успешно ли был выполнен вход
      // if (response.status === 200) {
        navigate("/home"); // Переходим на главную страницу
      // } else {
        // console.error("Ошибка авторизации");
      // }
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    }
  };

  return (
    <div style={{color:'black'}}>
      <h1>Войти</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
