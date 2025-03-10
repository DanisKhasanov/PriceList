import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import TableChartIcon from "@mui/icons-material/TableChart";
import { SideBarButtonProps } from "@/props/sideBarButtonProps";
import { TableButtonProps } from "@/props/table/tableButtonProps";
import { useDispatch } from "react-redux";
import {
  deselectAllPathName,
  resetFields,
  setPriceShowFlag,
  setStockShowFlag,
} from "@/store/reducers/DataReducer";
import { Clear } from "@mui/icons-material";
export const SideBarButton = ({
  onClick,
  label,
  isPrimary,
}: SideBarButtonProps) => {
  return (
    <Button
      sx={{
        width: "100%",
        textTransform: "none",
        fontSize: "16px",
        borderRadius: 3,
      }}
      size="large"
      onClick={onClick}
      variant={isPrimary ? "contained" : "text"}
      color="primary"
      endIcon={!isPrimary ? <RefreshIcon /> : <TableChartIcon />}
    >
      {label}
    </Button>
  );
};

export const SideBarButtonClear = ({
  setTableData = () => {},
}: TableButtonProps) => {
  const dispatch = useDispatch();
  const clearTable = () => {
    setTableData([]);
    dispatch(setPriceShowFlag(false));
    dispatch(setStockShowFlag(false));
    dispatch(deselectAllPathName([]));
    dispatch(resetFields());

  };

  return (
    <Button
      onClick={clearTable}
      variant="outlined"
      sx={{
        width: "100%",
        textTransform: "none",
        fontSize: "16px",
        borderRadius: 3,
        mt: 2,
      }}
    >
      Очистить таблицу, каталог и фильтры
      <Clear
        sx={{ color: "red" }}
        style={{ marginLeft: 5, fontSize: "22px" }}
      />
    </Button>
  );
};
