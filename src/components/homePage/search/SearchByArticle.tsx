import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addName,
  addExtractCode,
  addFuzzyCode,
} from "../../../store/reducers/DataReducer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import RefreshIcon from "@mui/icons-material/Refresh";

interface SearchFieldProps {
  label: string;
  placeholder: string;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  isTextArea?: boolean;
}

const SearchField = ({
  label,
  placeholder,
  isVisible,
  setVisible,
  value,
  onChange,
  isTextArea = false,
}: SearchFieldProps) => (

  <div className="article-input">
    <button onClick={() => setVisible(!isVisible)} className="buttonArticle">
      <span className="button-text">{label}</span>
      {isVisible ? (
        <ArrowDropUpIcon style={{ fontSize: 23 }} />
      ) : (
        <ArrowDropDownIcon style={{ fontSize: 23 }} />
      )}
    </button>
    {isVisible &&
      (isTextArea ? (
        <textarea
          value={value}
          placeholder={placeholder}
          title={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          title={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ))}
  </div>
);

export const SearchByArticle = () => {
  const dispatch = useDispatch();
  const [visibleFields, setVisibleFields] = useState({
    extractCode: false,
    fuzzyCode: false,
    name: false,
  });
  const [fieldValues, setFieldValues] = useState({
    extractCode: "",
    fuzzyCode: "",
    name: "",
  });

  const toggleFieldVisibility = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFieldChange = (
    field: keyof typeof fieldValues,
    value: string
  ) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }));
    switch (field) {
      case "extractCode":
        dispatch(addExtractCode(value));
        break;
      case "fuzzyCode":
        dispatch(addFuzzyCode(value));
        break;
      case "name":
        dispatch(addName(value));
        break;
    }
  };

  const handleReset = () => {
    setFieldValues({
      extractCode: "",
      fuzzyCode: "",
      name: "",
    });
    dispatch(addExtractCode(""));
    dispatch(addFuzzyCode(""));
    dispatch(addName(""));
  };

  return (
    <div className="search-article-container">
      <SearchField
        label="Код товара"
        placeholder="Введите код товара через Enter"
        isVisible={visibleFields.extractCode}
        setVisible={() => toggleFieldVisibility("extractCode")}
        value={fieldValues.extractCode}
        onChange={(value) => handleFieldChange("extractCode", value)}
        isTextArea
      />
      <SearchField
        label="Код товара (нечёткий)"
        placeholder="Введите нечёткий код"
        isVisible={visibleFields.fuzzyCode}
        setVisible={() => toggleFieldVisibility("fuzzyCode")}
        value={fieldValues.fuzzyCode}
        onChange={(value) => handleFieldChange("fuzzyCode", value)}
      />
      <SearchField
        label="Наименование товара"
        placeholder="Введите наименование"
        isVisible={visibleFields.name}
        setVisible={() => toggleFieldVisibility("name")}
        value={fieldValues.name}
        onChange={(value) => handleFieldChange("name", value)}
      />
      <button className="buttonSelect" onClick={handleReset}>
        Снять выбор
        <RefreshIcon style={{ color: "#056BF1", marginLeft: "10px" }} />
      </button>
    </div>
  );
};
