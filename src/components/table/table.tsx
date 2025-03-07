import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TableHeader from "./tableHeader";
import { TableBody } from "./tableBody";
import Loading from "@/helpers/loading";
import { TableProps } from "@/props/table/tableProps";
import { useCustomTable } from "@/hooks/useCustomTable";

const Table = ({ data, setTableData, loading }: TableProps) => {
  const [downloading, setDownloading] = useState(false);
  const remainder = useSelector(
    (state: RootState) => state.data.stock_show_flag
  );
  const priceToUSD = useSelector(
    (state: RootState) => state.data.price_show_flag
  );

  const totalOrders = data.length;

  const table = useCustomTable({
    data,
    loading,
    setTableData,
    remainder,
    priceToUSD,
  });

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);
  return (
    <Box>
      <TableHeader
        table={table}
        setDownloading={setDownloading}
        setTableData={setTableData}
      />

      <TableBody totalOrders= {totalOrders} table={table} />

      <Loading downloading={downloading} />
    </Box>
  );
};

export default Table;
