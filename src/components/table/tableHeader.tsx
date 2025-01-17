import { Box } from "@mui/material";
import {
  TableButtonClear,
  TableButtonDowload,
  TableButtonFilters,
  TableButtonRemainder,
  TableButtonSearch,
  TableButtonSort,
} from "../buttons/tableButton";
import { TableHeaderProps } from "@/props/tableHeaderProps";

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
