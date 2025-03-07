import { Box, Grid, Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_TablePagination,
  type MRT_TableInstance,
} from "material-react-table";

interface TableBodyProps<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
  totalOrders: number;
}

export const TableBody = <TData extends Record<string, any>>({
  totalOrders,
  table,
}: TableBodyProps<TData>) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 7,
        padding: "12px",
      }}
    >
      <Box
        sx={{
          height: "74vh",
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

      <Grid
        container
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item xs={12} md={3.5}>
          <Typography sx={{ fontSize: "12px", ml: 1 , fontWeight: "bold", color: "text.secondary"}}>
            Всего товаров: {totalOrders}
          </Typography>
        </Grid>

        <Grid
          item
          xs={10}
          md={4}
        >
          <MRT_TablePagination table={table} />
        </Grid>
      </Grid>
    </Box>
  );
};
