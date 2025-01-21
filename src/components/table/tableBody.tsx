import { Box } from "@mui/material";
import { MaterialReactTable, MRT_TablePagination } from "material-react-table";

export const TableBody = ({ table }) => {
  return (
    <>
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
          }}
        >
          <MaterialReactTable table={table} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <MRT_TablePagination table={table} />
        </Box>
      </Box>
    </>
  );
};
