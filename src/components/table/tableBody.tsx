import { Box } from "@mui/material";
import { MaterialReactTable, MRT_TablePagination } from "material-react-table";

export const TableBody = ({ table }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "30px",
          padding: "15px",
          height: "75vh",
          overflow: "auto",
        }}
      >
        <MaterialReactTable table={table} />
      </Box>
      <Box>
        <MRT_TablePagination
          table={table}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Box>
    </>
  );
};
