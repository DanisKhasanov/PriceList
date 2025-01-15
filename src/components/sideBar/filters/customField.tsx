import { CustomFieldProps } from "@/props/customFieldProps";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export const CustomField = ({
  label,
  placeholder,
  isVisible,
  setVisible,
  value,
  onChange,
  isTextArea = false,
}: CustomFieldProps) => (
  <div className="article-input">
    <button onClick={() => setVisible(!isVisible)} className="buttonArticle">
      <span className="button-text">{label}</span>
      {isVisible ? (
        <ArrowDropUpIcon style={{ fontSize: 23, color: "black" }} />
      ) : (
        <ArrowDropDownIcon style={{ fontSize: 23, color: "black" }} />
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
