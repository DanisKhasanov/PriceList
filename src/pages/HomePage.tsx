import { useCallback, useState } from "react";
import { GetDataForTable } from "@/api/Api";
import { useSelector } from "react-redux";
import Table from "@/components/table/Table";
import SideBar from "@/components/sideBar/SideBar";
import { RootState } from "@/store/store";
import { Product } from "@/props/product";
import useCustomSnackbar from "@/hooks/useCustomSnackbar";

const HomePage = () => {
  const [tableData, setTableData] = useState<Product[]>([]);
  const {
    pathName,
    name,
    extract_code,
    fuzzy_code,
    stock_zero_flag,
    oil_discriptions,
  } = useSelector((state: RootState) => state.data);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useCustomSnackbar();

  const fetchTableData = useCallback(async () => {
    setLoading(true);
    try {
      const response: Product[] = await GetDataForTable(
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
    <div className="layout">
      <div className="sidebar">
        <SideBar fetchTableData={fetchTableData} />
      </div>

      <div className="content">
        <Table data={tableData} setTableData={setTableData} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
