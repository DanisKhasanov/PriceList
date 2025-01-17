import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authorisation } from "@/api/Api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Authorisation(username, password);
      if (response) {
        navigate("/");
      } else {
        setError("Неверный логин и/или пароль");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    }
  };
  const isFormValid = username.trim() !== "" && password.trim() !== "";
  return (
    <div className="login-container">
      <h1 className="login-header">Вход</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-input-group">
          <label className="login-label">Логин</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={`login-input ${error ? "error" : ""}`}
            placeholder="Введите логин"
          />
        </div>
        <div className="login-input-group">
          <label className="login-label">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`login-input ${error ? "error" : ""}`}
            placeholder="Введите пароль"
          />
        </div>
        <button
          type="submit"
          className={`login-button ${isFormValid ? "active" : "inactive"}`}
          disabled={!isFormValid}
        >
          Войти
        </button>
        <div className="error-container">
          {error && <p className="login-error">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
