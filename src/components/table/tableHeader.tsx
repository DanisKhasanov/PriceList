import { Box } from "@mui/material";
import {
  TableButtonClear,
  TableButtonDowload,
  TableButtonFilters,
  TableButtonPricesToUSD,
  TableButtonRemainder,
  TableButtonSearch,
  TableButtonSort,
} from "../buttons/tableButton";
import { TableHeaderProps } from "@/props/table/tableHeaderProps";

const TableHeader = ({
  table,
  setDownloading,
  setTableData,
}: TableHeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "30px",
        marginBottom: "15px",
        padding: "15px",
        backgroundColor: "#ffffff",
      }}
    >
      <TableButtonSearch table={table} />

      <TableButtonFilters table={table} />

      <TableButtonRemainder />

      <TableButtonPricesToUSD
        table={table}
        setTableData={setTableData}
        setDownloading={setDownloading}
      />

      <TableButtonSort
        table={table}
        setDownloading={setDownloading}
        setTableData={setTableData}
      />

      <TableButtonDowload table={table} setDownloading={setDownloading} />

      <TableButtonClear setTableData={setTableData} />
    </Box>
  );
};

export default TableHeader;
