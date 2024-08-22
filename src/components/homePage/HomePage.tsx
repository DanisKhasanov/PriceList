import React, { useState } from "react";
import { GetDataForTable } from "./../api/GetData";
import { useSelector } from "react-redux";
import DataTable from "./table/Table";
import SideBar from "./menu/SideBar";

const HomePage = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const pathNames = useSelector((state: any) => state.data.pathName);
  const name = useSelector((state: any) => state.data.name);
  const extract_code = useSelector((state: any) => state.data.extract_code);
  const [loading, setLoading] = useState(false);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await GetDataForTable(pathNames, name, extract_code);
      const newTableData = [...tableData];
      response.forEach((item) => {
        const index = newTableData.findIndex((el) => el.id === item.id);
        if (index === -1) {
          newTableData.push(item);
        } else {
          newTableData[index] = item;
        }
      });
      setTableData(newTableData);
    } catch (error) {
      console.error("Ошибка при получении данных для таблицы:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <SideBar fetchTableData={fetchTableData} />
      <div className="content">
        <DataTable data={tableData} setTableData={setTableData} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
