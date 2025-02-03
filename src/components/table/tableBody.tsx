import { Box } from "@mui/material";
import {
  MaterialReactTable,
  MRT_TablePagination,
  type MRT_TableInstance,
} from "material-react-table";

interface TableBodyProps<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const TableBody = <TData extends Record<string, any>>({
  table,
}: TableBodyProps<TData>) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 7,
        padding: "15px",
      }}
    >
      <Box
        sx={{
          height: "73vh",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "lightgrey",
            borderRadius: "4px",
          },
        }}
      >
        <MaterialReactTable table={table} />
      </Box>

      <Box sx={{ m: 0.5, display: "flex", justifyContent: "center" }}>
        <MRT_TablePagination table={table} />
      </Box>
    </Box>
  );
};
