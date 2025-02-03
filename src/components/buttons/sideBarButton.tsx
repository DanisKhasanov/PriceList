import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { SideBarButtonProps } from "@/props/sideBarButtonProps";

const SideBarButton = ({ onClick, label, isPrimary }: SideBarButtonProps) => {
  return (
    <Button
      sx={{
        width: "100%",
        textTransform: "none",
        fontSize: "1vw",
        borderRadius: 3,
      }}
      size="large"
      onClick={onClick}
      variant={isPrimary ? "contained" : "text"}
      color="primary"
      endIcon={!isPrimary && <RefreshIcon />}
    >
      {label}
    </Button>
  );
};

export default SideBarButton;
