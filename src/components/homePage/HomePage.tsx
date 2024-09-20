import React, { useEffect, useState } from "react";
import { GetDataForTable } from "./../api/Api";
import { useSelector } from "react-redux";
import Table from "./table/Table";
import SideBar from "./sideBar/SideBar";

const HomePage = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const {
    pathName,
    name,
    extract_code,
    fuzzy_code,
    stock_zero_flag,
    oil_discriptions,
    stock_show_flag,
  } = useSelector((state: any) => state.data);
  const [loading, setLoading] = useState(false);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await GetDataForTable(
        pathName,
        name,
        extract_code,
        fuzzy_code,
        stock_zero_flag,
        oil_discriptions,
        stock_show_flag
      );
      const newTableData = [...tableData];
      response.forEach((item: any) => {
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
