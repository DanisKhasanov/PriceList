import { CustomSwitch } from "./customSwitch";
import CustomTooltip from "@/helpers/tooltip";

export const AdditionalFields = () => {
  return (
    <div className="menu-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="menu-title">Дополнительные поля</p>
        <CustomTooltip title="После применения доп. полей формируйте таблицу заново" />
      </div>
      <CustomSwitch />
    </div>
  );
};
