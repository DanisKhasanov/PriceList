import { useState } from "react";
import Table from "@/components/table/table";
import SideBar from "@/components/sideBar/SideBar";
import { Product } from "@/props/product";

const HomePage = () => {
  const [tableData, setTableData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="layout">
      <div className="sidebar">
        <SideBar setTableData={setTableData} setLoading={setLoading} />
      </div>

      <div className="content">
        <Table data={tableData} setTableData={setTableData} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
