import { InputFields } from "./inputFields";
import CustomTooltip from "@/helpers/tooltip";

export const Filters = () => {
  return (
    <div className="menu-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="menu-title">Фильтры</p>
        <CustomTooltip title="После добавления фильтра формируйте таблицу заново" />
      </div>
      <InputFields />
    </div>
  );
};
