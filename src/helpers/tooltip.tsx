import Tooltip from "@mui/material/Tooltip";
import HelpOutlineTwoToneIcon from "@mui/icons-material/HelpOutlineTwoTone";
import { TooltipProps } from "@/props/tooltipProps";

const CustomTooltip = ({ title }: TooltipProps) => {
  return (
    <Tooltip title={title} arrow>
      <HelpOutlineTwoToneIcon
        style={{
          cursor: "pointer",
          color: "rgba(5, 107, 241, 0.7)",
          fontSize: "15px",
        }}
      />
    </Tooltip>
  );
};

export default CustomTooltip;
