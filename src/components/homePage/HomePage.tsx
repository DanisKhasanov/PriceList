import React, { useState } from "react";
import { PostDataForTable } from "./../api/GetData";
import { useSelector } from "react-redux";
import DataTable from "./table/Table";
import SideBar from "./menu/SideBar";

const HomePage = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const pathNames = useSelector((state: any) => state.data.pathName);
  const [loading, setLoading] = useState(false);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      if (pathNames.length > 0) {
        const response = await PostDataForTable(pathNames.join("|"));
        setTableData(response);
      }
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
        <DataTable data={tableData} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
