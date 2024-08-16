import React from "react";

export const SearchByArticle = () => {
  return (
    <div className="search-article-container">
      <div className="article-inputs">
        <div className="article-input">
          <label>Код товара:</label>
          <input type="text" placeholder="Введите код" title="Введите код товара через пробел" />
        </div>

        <div className="article-input">
          <label>Наименование товара:</label>
          <input placeholder="Введите наименования" type="text" title="Введите наименование товара через пробел" />
        </div>
      </div>
    </div>
  );
};
