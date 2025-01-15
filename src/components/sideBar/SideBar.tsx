import "rc-menu/assets/index.css";
import { Catalog } from "@components/sideBar/catalog/catalog";
import { Filters } from "./filters/filters";
import { AdditionalFields } from "./additionalFields/additionalFields";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";
import SideBarButton from "@components/buttons/sideBarButton";
import { Validates } from "@/helpers/validate";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

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
    <>
      <Catalog />

      <Filters />

      <AdditionalFields />

      <SideBarButton
        onClick={getTableData}
        label="Сформировать данные"
        isPrimary
      />
    </>
  );
};

export default SideBar;
