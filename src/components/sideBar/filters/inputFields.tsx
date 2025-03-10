import { useDispatch, useSelector } from "react-redux";
import {
  addName,
  addExtractCode,
  addFuzzyCode,
  toggleVisibleField,
  resetFields,
} from "@/store/reducers/DataReducer";
import { CustomField } from "./customField";
import { SideBarButton } from "@/components/buttons/sideBarButton";
import { RootState } from "@/store/store";

export const InputFields = () => {
  const dispatch = useDispatch();
  const extractCode = useSelector((state: RootState) => state.data.extract_code[0] || "");
  const fuzzyCode = useSelector((state: RootState) => state.data.fuzzy_code[0] || "");
  const name = useSelector((state: RootState) => state.data.name[0] || "");
  const visibleFields = useSelector((state: RootState) => state.data.visibleFields);

  const handleFieldChange = (
    field: keyof typeof visibleFields,
    value: string
  ) => {
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
    dispatch(resetFields());
  };

  return (
    <div className="search-article-container">
      <CustomField
        label="Код товара"
        placeholder="Введите код товара через Enter"
        isVisible={visibleFields.extractCode}
        setVisible={() => dispatch(toggleVisibleField("extractCode"))}
        value={extractCode}
        onChange={(value) => handleFieldChange("extractCode", value)}
        isTextArea
      />
      <CustomField
        label="Код товара (нечёткий)"
        placeholder="Введите нечёткий код"
        isVisible={visibleFields.fuzzyCode}
        setVisible={() => dispatch(toggleVisibleField("fuzzyCode"))}
        value={fuzzyCode}
        onChange={(value) => handleFieldChange("fuzzyCode", value)}
      />
      <CustomField
        label="Наименование товара"
        placeholder="Введите наименование"
        isVisible={visibleFields.name}
        setVisible={() => dispatch(toggleVisibleField("name"))}
        value={name}
        onChange={(value) => handleFieldChange("name", value)}
      />
      <SideBarButton onClick={handleReset} label="Снять выбор" />
    </div>
  );
};