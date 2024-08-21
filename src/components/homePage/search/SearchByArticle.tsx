import React, { useState } from "react";
import { ExtractCode } from "../../api/GetData"; // Импорт функции ExtractCode

export const SearchByArticle = () => {
  const [productCode, setProductCode] = useState(""); // Состояние для хранения введенного кода товара
  const [productName, setProductName] = useState(""); // Состояние для хранения введенного наименования товара
  const [searchResult, setSearchResult] = useState(null); // Состояние для хранения результата поиска
  console.log(searchResult)
  // Функция обработки изменений в поле ввода кода товара
  const handleCodeChange = (e) => {
    setProductCode(e.target.value);
  };

  // Функция обработки изменений в поле ввода наименования товара
  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  // Функция отправки запроса по коду товара
  const handleSearch = async () => {
    try {
      const result = await ExtractCode(productCode);
      setSearchResult(result); // Сохранение результата поиска в состоянии
    } catch (error) {
      console.error("Ошибка при поиске товара по коду:", error);
    }
  };

  return (
    <div className="search-article-container">
      <div className="article-inputs">
        <div className="article-input">
          <label>Код товара:</label>
          <input
            type="text"
            placeholder="Введите код"
            title="Введите код товара через пробел"
            value={productCode} // Привязка значения к состоянию
            onChange={handleCodeChange} // Обработчик изменений
          />
        </div>

        <div className="article-input">
          <label>Наименование товара:</label>
          <input
            placeholder="Введите наименование"
            type="text"
            title="Введите наименование товара через пробел"
            value={productName} // Привязка значения к состоянию
            onChange={handleNameChange} // Обработчик изменений
          />
        </div>

        <div className="search-button">
          <button onClick={handleSearch}>Поиск по коду</button>
        </div>
      </div>

 
    </div>
  );
};
