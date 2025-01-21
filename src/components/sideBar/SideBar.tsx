import "rc-menu/assets/index.css";
import { Catalog } from "@components/sideBar/catalog/catalog";
import { Filters } from "./filters/filters";
import { AdditionalFields } from "./additionalFields/additionalFields";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import SideBarButton from "@components/buttons/sideBarButton";
import { Validates } from "@/helpers/validate";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const SideBar = ({ fetchTableData }: { fetchTableData: () => void }) => {
  const { showSnackbar } = useCustomSnackbar();
  const { pathName, name, extract_code, fuzzy_code } = useSelector(
    (state: RootState) => state.data
  );
  const getTableData = () => {
    if (!Validates(pathName, name, extract_code, fuzzy_code)) {
      showSnackbar("Выберите Каталог или заполните Фильтры", {
        variant: "error",
      });
    } else {
      fetchTableData();
    }
  };
  return (
    <Box>
      <Box
        sx={{
          height: "84vh",
          overflowX: "auto",
          scrollbarWidth: "thin",
          mb: 2,
        }}
      >
        <Catalog />

        <Filters />

        <AdditionalFields />
      </Box>

      <Box>
        <SideBarButton
          onClick={getTableData}
          label="Сформировать данные"
          isPrimary
        />
      </Box>
    </Box>
  );
};

export default SideBar;
