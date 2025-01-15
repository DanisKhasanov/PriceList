import { Box, Button, Checkbox } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import ClearIcon from "@mui/icons-material/Clear";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { setStockShowFlag } from "@/store/reducers/DataReducer";
import { RootState } from "@/store/store";
import { GenerateExcel, SortTableByPopularity } from "@/api/Api";
import { Product } from "@/props/product";

const styleButton = {
  color: "black",
  fontSize: {
    sm: "0px",
    md: "14px",
    lg: "16px",
  },
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
  },
};
interface TableHeaderProps {
  table: Product[];
  setDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
}
const TableHeader = ({
  table,
  setDownloading,
  setTableData,
}: TableHeaderProps) => {
  const dispatch = useDispatch();
  const stockShowFlag = useSelector(
    (state: RootState) => state.data.stock_show_flag
  );
  const download = async (table: any) => {
    if (table.length === 0) {
      return;
    }
    const allTableData = table
      .getPrePaginationRowModel()
      .rows.map((row: any) => {
        const originalData = row.original;
        if (stockShowFlag) {
          return {
            ...originalData,
            quantity: originalData.quantity,
            variants: originalData.variants.map((variant: any) => ({
              ...variant,
              quantity: variant.quantity,
            })),
          };
        } else {
          return {
            ...originalData,
            quantity: null,
            variants: originalData.variants.map((variant: any) => ({
              ...variant,
              quantity: null,
            })),
          };
        }
      });

    setDownloading(true);
    try {
      await GenerateExcel(allTableData);
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    } finally {
      setDownloading(false);
    }
  };

  const clearTable = () => {
    setTableData([]);
  };

  const sortTableByPopularity = async (table: any) => {
    if (table.length === 0) {
      return;
    }
    try {
      setDownloading(true);
      const orderArray = await SortTableByPopularity();
      const dataMap = {};
      const allTableData = table
        .getPrePaginationRowModel()
        .rows.map((row: any) => row.original);

      allTableData.forEach((item: any) => {
        dataMap[item.id] = item;
      });

      const sortedProducts = orderArray
        .map((id: number) => dataMap[id])
        .filter((item: any) => item !== undefined);

      const missingProducts = allTableData.filter(
        (item: any) => !orderArray.includes(item.id)
      );

      const finalSortedProducts = [...sortedProducts, ...missingProducts];
      setTableData(finalSortedProducts);
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
      throw error;
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "30px",
        marginBottom: "15px",
        padding: "15px",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          borderRadius: "20px",
          backgroundColor: "#F4F4F4",
          padding: "10px",
        }}
      >
        <MRT_GlobalFilterTextField table={table} />
      </Box>

      <Box>
        <MRT_ToggleFiltersButton
          table={table}
          sx={{
            "& .MuiSvgIcon-root": { fontSize: "25px", color: "#056bf1" },
          }}
        />
      </Box>

      <Button sx={styleButton}>
        <Checkbox
          checked={stockShowFlag}
          onChange={() => dispatch(setStockShowFlag(!stockShowFlag))}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 27, color: "#056bf1;" } }}
        />
        {"Остаток"}
      </Button>
      <Button sx={styleButton} onClick={() => sortTableByPopularity(table)}>
        <UnfoldLessIcon
          style={{ marginRight: 3, fontSize: "25px", color: "#296BF1" }}
        />
        {"Сортировать по популярности"}
      </Button>

      <Button sx={styleButton} onClick={() => download(table)}>
        <UploadFileIcon
          sx={{ color: "green" }}
          style={{ marginRight: 3, fontSize: "25px" }}
        />
        {"Выгрузить в Excel"}
      </Button>

      <Button sx={styleButton} onClick={() => clearTable()}>
        <ClearIcon
          sx={{ color: "red" }}
          style={{ marginRight: 3, fontSize: "25px" }}
        />
        {"Очистить таблицу"}
      </Button>
    </Box>
  );
};

export default TableHeader;
