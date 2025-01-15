import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-header">404</h1>
        <h2 className="notfound-subheader">Страница не найдена</h2>
        <p className="notfound-text">
          Ой! Страница, которую вы ищете, не существует.
        </p>
        <button className="notfound-button" onClick={goHome}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
