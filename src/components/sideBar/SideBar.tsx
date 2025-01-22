import "rc-menu/assets/index.css";
import { Catalog } from "@components/sideBar/catalog/catalog";
import { Filters } from "./filters/filters";
import { AdditionalFields } from "./additionalFields/additionalFields";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import SideBarButton from "@components/buttons/sideBarButton";
import { validatesSideBar } from "@/helpers/validate";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { GetDataForTable } from "@/api/Api";
import { Product } from "@/props/product";
import { useCallback } from "react";
import { SideBarProps } from "@/props/sideBarProprs";

const SideBar = ({ setTableData, setLoading }: SideBarProps) => {
  const { showSnackbar } = useCustomSnackbar();
  const {
    pathName,
    name,
    extract_code,
    fuzzy_code,
    stock_zero_flag,
    oil_discriptions,
  } = useSelector((state: RootState) => state.data);

  const getTableData = useCallback(async () => {
    if (!validatesSideBar(pathName, name, extract_code, fuzzy_code)) {
      showSnackbar("Выберите Каталог или заполните Фильтры", {
        variant: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await GetDataForTable(
        pathName,
        name,
        extract_code,
        fuzzy_code,
        stock_zero_flag,
        oil_discriptions
      );
      setTableData((prevTableData) => {
        const updatedData = [...prevTableData];
        response.forEach((item: Product) => {
          const index = updatedData.findIndex((el) => el.id === item.id);
          if (index === -1) {
            updatedData.push(item);
          } else {
            updatedData[index] = item;
          }
        });
        return updatedData;
      });
    } catch {
      showSnackbar("Ошибка при получении данных для таблицы", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [
    pathName,
    name,
    extract_code,
    fuzzy_code,
    stock_zero_flag,
    oil_discriptions,
  ]);
  
  return (
    <Box>
      <Box
        overflow="auto"
        sx={{
          height: "84vh",
          mb: 2,
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "lightgrey",
            borderRadius: "4px",
          },
        }}
      >
        <Catalog />

        <Filters />

        <AdditionalFields />
      </Box>

      <SideBarButton
        onClick={getTableData}
        label="Сформировать таблицу"
        isPrimary
      />
    </Box>
  );
};

export default SideBar;
