import { GetPricesToUSD, SortTableByPopularity } from "@/api/Api";
import { Button, Checkbox, Box } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ClearIcon from "@mui/icons-material/Clear";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import { useDispatch, useSelector } from "react-redux";
import {
  setPriceShowFlag,
  setStockShowFlag,
} from "@/store/reducers/DataReducer";
import { RootState } from "@/store/store";
import {
  MRT_ToggleFiltersButton,
  MRT_GlobalFilterTextField,
} from "material-react-table";
import { TableButtonProps } from "@/props/table/tableButtonProps";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import { images } from "./test";
// import { Logo } from "../../../public/logo";
import { Product } from "@/props/product";
import { useState } from "react";
import { validateTable } from "@/helpers/validate";
import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

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
  setDownloading = () => {},
}: TableButtonProps) => {
  const { showSnackbar } = useCustomSnackbar();
  const priceShowFlag = useSelector(
    (state: RootState) => state.data.price_show_flag
  );
  const download = (table: any) => {
    const allTableData = table
      .getPrePaginationRowModel()
      .rows.map((row: any) => row.original);

    if (validateTable(allTableData, showSnackbar)) return;

    try {
      setDownloading(true);
      const tableBody = allTableData.map((item: any) => [
        {
          image: images,
          fit: [150, 150],
        },
        {
          text: [
            { text: `Артикул: `, bold: true },
            `${item.code}\n`,
            // { text: `Описание: `, bold: true },
            // `${item.description || "N/A"}\n`,
            { text: `Цена: `, bold: true },
            priceShowFlag
              ? `${item.vip || "N/A"} USD.\n`
              : `${item.vip || "N/A"} руб.\n`,
            { text: `В коробке: `, bold: true },
            `${item.quantity || "N/A"}\n`,
          ],
        },
      ]);

      const docDefinition = {
        watermark: { text: "FLX", color: "red", opacity: 0.1, italics: false },
        content: [
          // {
          //   image: Logo,
          //   width: 200
          // },
          {
            table: {
              widths: [150, "*"],
              body: tableBody,
              dontBreakRows: true,
            },
            layout: {
              hLineWidth: () => 0,
              vLineWidth: () => 0,
              paddingLeft: () => 5,
              paddingRight: () => 5,
              paddingTop: () => 5,
              paddingBottom: () => 5,
            },
          },
        ],
      };

      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      showSnackbar("Ошибка при запросе на создания PDF файла", {
        variant: "error",
      });
      throw error;
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

export const TableButtonClear = ({
  setTableData = () => {},
}: TableButtonProps) => {
  const dispatch = useDispatch();
  const clearTable = () => {
    setTableData([]);
    dispatch(setPriceShowFlag(false));
    dispatch(setStockShowFlag(false));
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
  setDownloading = () => {},
  setTableData = () => {},
}: TableButtonProps) => {
  const { showSnackbar } = useCustomSnackbar();

  const sortTableByPopularity = async (table: any) => {
    const allTableData = table
      .getPrePaginationRowModel()
      .rows.map((row: any) => row.original);

    if (validateTable(allTableData, showSnackbar)) return;

    try {
      setDownloading(true);
      const sortArray = await SortTableByPopularity();
      const dataMap = new Map<number, any>();

      allTableData.forEach((item: any) => {
        dataMap.set(item.id, item);
      });

      const sortedProducts = sortArray
        .map((id: number) => dataMap.get(id))
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
  const handleStockShowFlag = () => {
    dispatch(setStockShowFlag(!stockShowFlag));
  };
  return (
    <Button sx={styleButton} onClick={handleStockShowFlag}>
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

export const TableButtonPricesToUSD = ({
  table,
  setTableData = () => {},
  setDownloading = () => {},
}: TableButtonProps) => {
  const { showSnackbar } = useCustomSnackbar();
  const dispatch = useDispatch();
  const priceShowFlag = useSelector(
    (state: RootState) => state.data.price_show_flag
  );

  const [originalTableData, setOriginalTableData] = useState<Product[]>([]);

  const toggleCurrency = async () => {
    const allTableData = table
      .getPrePaginationRowModel()
      .rows.map((row: any) => row.original);

    if (validateTable(allTableData, showSnackbar)) return;

    try {
      setDownloading(true);

      if (!priceShowFlag) {
        const priceToRUB = await GetPricesToUSD();
        if (!priceToRUB || priceToRUB <= 0) {
          showSnackbar("Некорректный курс валют, попробуйте позже", {
            variant: "error",
          });
          return;
        }

        setOriginalTableData(allTableData);

        const updatedTableData = allTableData.map((item: any) => ({
          ...item,
          vip: (item.vip / priceToRUB).toFixed(2),
          vip10: (item.vip10 / priceToRUB).toFixed(2),
          vip25: (item.vip25 / priceToRUB).toFixed(2),
          vip50: (item.vip50 / priceToRUB).toFixed(2),
          vip75: (item.vip75 / priceToRUB).toFixed(2),
        }));

        setTableData(updatedTableData);
        showSnackbar("Цены переведены в доллары", { variant: "success" });
      } else {
        setTableData(originalTableData);
        showSnackbar("Цены возвращены в рубли", { variant: "success" });
      }

      dispatch(setPriceShowFlag(!priceShowFlag));
    } catch {
      showSnackbar("Ошибка при обработке данных", { variant: "error" });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button sx={styleButton} onClick={toggleCurrency}>
      <Checkbox
        checked={priceShowFlag}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 27, color: "#056bf1;" } }}
      />
      {priceShowFlag ? "Цены в RUB" : "Цены в USD"}
    </Button>
  );
};
