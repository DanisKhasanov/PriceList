import React, { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { Box, Button } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import { GenerateExcel } from "../../api/GetData";

const columns: MRT_ColumnDef<any>[] = [
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

const DataTable = ({ data }) => {
  const tableData = data?.products || [];

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
  
  const download = (table) => {


    const allTableData = table.getPrePaginationRowModel().rows.map((row) => row.original);
    console.log("Current Table Data:", allTableData);

    GenerateExcel(allTableData);

  };

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
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
        renderTopToolbarCustomActions={({ table }) => (
          <Box sx={{ gap: "1rem", p: "4px" }}>
            <Button
              sx={{
                color: "black",
                background: "white",
                borderRadius: "10px",
                ":hover": { background: "#F5F5F5" },
              }}
              onClick={() => download(table)}
              variant="contained"
            >
              <GetAppIcon />
              Download
            </Button>
          </Box>
        )}
      />
    </ThemeProvider>
  );
};

export default DataTable;
