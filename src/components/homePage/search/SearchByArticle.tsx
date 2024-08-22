import React from "react";
import { addName, addExtractCode } from "../../../store/reducers/DataReducer";
import { useDispatch } from "react-redux";

export const SearchByArticle = () => {
  const dispatch = useDispatch();

  return (
    <div className="search-article-container">
      <div className="article-inputs">
        <div className="article-input">
          <label>Код товара:</label>
          <input
            type="text"
            placeholder="Введите код"
            title="Введите код товара через пробел"
            onChange={(e) => dispatch(addExtractCode(e.target.value))}
          />
        </div>

        <div className="article-input">
          <label>Наименование товара:</label>
          <input
            placeholder="Введите наименование"
            type="text"
            title="Введите наименование товара через пробел"
            onChange={(e) => dispatch(addName(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
