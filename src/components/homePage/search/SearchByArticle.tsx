import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addName,
  addExtractCode,
  addFuzzyCode,
} from "../../../store/reducers/DataReducer";
import ExpandLessTwoToneIcon from "@mui/icons-material/ExpandLessTwoTone";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";

export const SearchByArticle = () => {
  const dispatch = useDispatch();

  const [isExtractCodeVisible, setExtractCodeVisible] = useState(false);
  const [isFuzzyCodeVisible, setFuzzyCodeVisible] = useState(false);
  const [isNameVisible, setNameVisible] = useState(false);

  return (
    <div className="search-article-container">
      <div className="article-input">
        <button
          onClick={() => setExtractCodeVisible(!isExtractCodeVisible)}
           className="buttonArticle"
        >
          Код товара
          {isExtractCodeVisible ? (
            <ExpandLessTwoToneIcon />
          ) : (
            <ExpandMoreTwoToneIcon />
          )}
        </button>
        {isExtractCodeVisible && (
          <textarea
            placeholder="Введите код"
            title="Введите код товара через Enter"
            onChange={(e) => dispatch(addExtractCode(e.target.value))}
          />
        )}
      </div>

      <div className="article-input">
        <button
          onClick={() => setFuzzyCodeVisible(!isFuzzyCodeVisible)}
         className="buttonArticle"
        >
          Код товара (нечёткий)
          {isFuzzyCodeVisible ? (
            <ExpandLessTwoToneIcon />
          ) : (
            <ExpandMoreTwoToneIcon />
          )}
        </button>
        {isFuzzyCodeVisible && (
          <input
            type="text"
            placeholder="Введите нечёткий код"
            title="Введите код товара через пробел"
            onChange={(e) => dispatch(addFuzzyCode(e.target.value))}
          />
        )}
      </div>

      <div className="article-input">
        <button
          onClick={() => setNameVisible(!isNameVisible)}
             className="buttonArticle"
        >
          Наименование товара
          {isNameVisible ? (
            <ExpandLessTwoToneIcon />
          ) : (
            <ExpandMoreTwoToneIcon />
          )}
        </button>
        {isNameVisible && (
          <input
            type="text"
            placeholder="Введите наименование"
            title="Введите наименование товара через пробел"
            onChange={(e) => dispatch(addName(e.target.value))}
          />
        )}
      </div>
    </div>
  );
};
