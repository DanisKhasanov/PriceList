import { SortTableByPopularity } from "@/api/Api";
import { Button, Checkbox, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import { useDispatch, useSelector } from "react-redux";
import { setStockShowFlag } from "@/store/reducers/DataReducer";
import { RootState } from "@/store/store";
import {
  MRT_ToggleFiltersButton,
  MRT_GlobalFilterTextField,
} from "material-react-table";
import { TableButtonProps } from "@/props/table/tableButtonProps";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import { images } from "./test";
import {Logo} from "../../../public/logo";

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
export const TableButtonDowload = ({
  table,
  setDownloading,
}: TableButtonProps) => {
  // const stockShowFlag = useSelector(
  //   (state: RootState) => state.data.stock_show_flag
  // );
  const { showSnackbar } = useCustomSnackbar();
  const download = async (table: any) => {
    const allTableData = table
      .getPrePaginationRowModel()
      .rows.map((row: any) => row.original);

    setDownloading(true);

    try {
      const tableBody = allTableData.map((item: any) => [
        {
          image: images,
          fit: [100, 100],
          margin: [0, 5, 0, 5],
        },
        {
          text: [
            { text: `Артикул: ${item.code}\n`, bold: true },
            { text: `Объем: ${item.volume || "N/A"}\n, `, bold: true },
            { text: `Тип: ${item.type || "N/A"}\n`, bold: true },
            { text: `Материал: ${item.material || "N/A"}\n`, bold: true },
            { text: `Цена: ${item.vip || "N/A"} руб.\n`, bold: true },
            { text: `В коробке: ${item.quantity || "N/A"}\n`, bold: true },
          ],
          margin: [10, 0, 0, 0],
        },
      ]);

      if (tableBody.length === 0) {
        showSnackbar("Сначала заполните таблицу", {
          variant: "error",
        });
        return;
      }

      const docDefinition = {
        content: [
        
          { text: "Список товаров", style: "header" },
          {
            table: {
              widths: [120, "*"],
              body: [
                [
                  { text: "Изображение", bold: true, alignment: "center" },
                  { text: "Детали", bold: true, alignment: "center" },
                ],
                ...tableBody,
              ],
            },
            style: "tableExample",
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
        },
      };

      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      console.error("Ошибка при создании PDF:", error);
    } finally {
      setDownloading(false);
    }
  };
  return (
    <>
      <Button sx={styleButton} onClick={() => download(table)}>
        <UploadFileIcon
          sx={{ color: "green" }}
          style={{ marginRight: 3, fontSize: "25px" }}
        />
        Выгрузить в PDF
      </Button>
    </>
  );
};

export const TableButtonClear = ({ setTableData }: TableButtonProps) => {
  const clearTable = () => {
    setTableData([]);
  };

  return (
    <Button sx={styleButton} onClick={clearTable}>
      <ClearIcon
        sx={{ color: "red" }}
        style={{ marginRight: 3, fontSize: "25px" }}
      />
      Очистить таблицу
    </Button>
  );
};

export const TableButtonSort = ({
  table,
  setDownloading,
  setTableData,
}: TableButtonProps) => {
  const { showSnackbar } = useCustomSnackbar();

  const sortTableByPopularity = async (table: any) => {
    const allTableData = table
      .getPrePaginationRowModel()
      .rows.map((row: any) => row.original);

    if (allTableData.length === 0) {
      showSnackbar("Сначала заполните таблицу", {
        variant: "error",
      });
      return;
    }
    try {
      setDownloading(true);
      const sortArray = await SortTableByPopularity();
      const dataMap = new Map();

      allTableData.forEach((item: any) => {
        dataMap[item.id] = item;
      });

      const sortedProducts = sortArray
        .map((id: number) => dataMap[id])
        .filter((item: any) => item !== undefined);

      const missingProducts = allTableData.filter(
        (item: any) => !sortArray.includes(item.id)
      );

      const finalSortedProducts = [...sortedProducts, ...missingProducts];
      setTableData(finalSortedProducts);
    } catch (error) {
      showSnackbar("Ошибка сервера", {
        variant: "error",
      });
      throw error;
    } finally {
      setDownloading(false);
    }
  };
  return (
    <Button sx={styleButton} onClick={() => sortTableByPopularity(table)}>
      <UnfoldLessIcon
        style={{ marginRight: 3, fontSize: "25px", color: "#296BF1" }}
      />
      Сортировать по популярности
    </Button>
  );
};

export const TableButtonRemainder = () => {
  const dispatch = useDispatch();
  const stockShowFlag = useSelector(
    (state: RootState) => state.data.stock_show_flag
  );
  return (
    <Button
      sx={styleButton}
      onClick={() => dispatch(setStockShowFlag(!stockShowFlag))}
    >
      <Checkbox
        checked={stockShowFlag}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 27, color: "#056bf1;" } }}
      />
      Остаток
    </Button>
  );
};

export const TableButtonFilters = ({ table }: TableButtonProps) => {
  return (
    <Box>
      <MRT_ToggleFiltersButton
        table={table}
        sx={{
          "& .MuiSvgIcon-root": { fontSize: "25px", color: "#056bf1" },
        }}
      />
    </Box>
  );
};

export const TableButtonSearch = ({ table }: TableButtonProps) => {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        backgroundColor: "#F4F4F4",
        padding: "10px",
      }}
    >
      <MRT_GlobalFilterTextField table={table} />
    </Box>
  );
};
