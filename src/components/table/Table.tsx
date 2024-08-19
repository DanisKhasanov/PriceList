import { useMemo } from "react";
import React from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { dates } from "../data/data";

const columns: MRT_ColumnDef<(typeof dates)[0]>[] = [
  {
    header: "Name",
    accessorKey: "name",
    size: 150,
  },
  {
    header: "Code",
    accessorKey: "code",
    size: 70,
  },
  {
    header: "Article",
    accessorKey: "article",
    size: 70,
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
    size: 70,
  },
  {
    header: "Price",
    accessorKey: "vip",
    Cell: ({ cell }) => `${cell.getValue()} руб.`,
    size: 50,
  },
  {
    header: "VIP10",
    accessorKey: "vip10",
    Cell: ({ cell }) => `${cell.getValue()} руб.`,
    size: 50,
  },
  {
    header: "VIP25",
    accessorKey: "vip25",
    Cell: ({ cell }) => `${cell.getValue()} руб.`,
    size: 50,
  },
  {
    header: "VIP50",
    accessorKey: "vip50",
    Cell: ({ cell }) => `${cell.getValue()} руб.`,
    size: 50,
  },
  {
    header: "VIP75",
    accessorKey: "vip75",
    Cell: ({ cell }) => `${cell.getValue()} руб.`,
    size: 50,
  },
];

const DataTable = () => {
  const globalTheme = useTheme();
  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode,
          primary: {
            main: "#1976d2",
          },
          background: {
            default: "#ffffff",
          },
        },
        components: {
          MuiTableCell: {
            styleOverrides: {
              head: {
                color: "black",
                fontSize: "1.1rem",
              },
            },
          },
        },
      }),
    [globalTheme]
  );

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={dates}
        enableRowSelection
        enableHiding={false}
        enableDensityToggle={false}
        initialState={{
          density: "compact",
          pagination: { pageSize: 20, pageIndex: 0 },
        }}
        paginationDisplayMode="pages"
        enableColumnActions={false}
        layoutMode={"grid"}
        enableStickyFooter={false}
        muiTableContainerProps={{
          sx: {
            height: "calc(100vh - 115px)",
          },
        }}
      />
    </ThemeProvider>
  );
};

export default DataTable;
