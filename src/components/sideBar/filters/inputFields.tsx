import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addName,
  addExtractCode,
  addFuzzyCode,
} from "@/store/reducers/DataReducer";
import { CustomField } from "./customField";
import SideBarButton from "@/components/buttons/sideBarButton";

export const InputFields = () => {
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
      <CustomField
        label="Код товара"
        placeholder="Введите код товара через Enter"
        isVisible={visibleFields.extractCode}
        setVisible={() => toggleFieldVisibility("extractCode")}
        value={fieldValues.extractCode}
        onChange={(value) => handleFieldChange("extractCode", value)}
        isTextArea
      />
      <CustomField
        label="Код товара (нечёткий)"
        placeholder="Введите нечёткий код"
        isVisible={visibleFields.fuzzyCode}
        setVisible={() => toggleFieldVisibility("fuzzyCode")}
        value={fieldValues.fuzzyCode}
        onChange={(value) => handleFieldChange("fuzzyCode", value)}
      />
      <CustomField
        label="Наименование товара"
        placeholder="Введите наименование"
        isVisible={visibleFields.name}
        setVisible={() => toggleFieldVisibility("name")}
        value={fieldValues.name}
        onChange={(value) => handleFieldChange("name", value)}
      />
      <SideBarButton onClick={handleReset} label="Снять выбор" />
    </div>
  );
};
