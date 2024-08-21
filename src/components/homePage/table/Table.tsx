import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  type MRT_ColumnDef,
} from "material-react-table";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { Box, Button, IconButton, CircularProgress } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { GenerateExcel } from "../../api/GetData";

const DataTable = ({ data, loading }) => {
  const [tableData, setTableData] = useState(data.products || []);
  const [downloading, setDownloading] = useState(false);
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

  const columns: MRT_ColumnDef<any>[] = [
    {
      header: "Delete",
      id: "actions",
      Cell: ({ row }) => (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton color="error" onClick={() => handleDeleteRow(row.index)}>
            <DeleteForeverSharpIcon />
          </IconButton>
        </Box>
      ),
      size: 30,
    },
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

  useEffect(() => {
    if (data?.products) {
      setTableData(data.products);
    }
  }, [data]);

  const download = async (table: any) => {
    const allTableData = table
      .getPrePaginationRowModel()
      .rows.map((row: any) => row.original);

    setDownloading(true);
    try {
      await GenerateExcel(allTableData);
    } catch (error) {
      console.error("Ошибка при скачивании файла:", error);
    } finally {
      setDownloading(false); // Сбрасываем состояние загрузки
    }
  };

  const handleDeleteRow = (rowIndex: number) => {
    setTableData((prevData) =>
      prevData.filter((_, index: number) => index !== rowIndex)
    );
  };

  const clearTable = () => {
    setTableData([]);
  };

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableStickyFooter={false}
        enableColumnActions={false}
        paginationDisplayMode="pages"
        layoutMode={"grid"}
        initialState={{
          density: "compact",
          pagination: { pageSize: 20, pageIndex: 0 },
          showGlobalFilter: true,
        }}
        state={{ isLoading: loading }}
        muiTableContainerProps={{
          sx: {
            height: "calc(100vh - 112px)",
          },
        }}
        renderToolbarInternalActions={({ table }) => (
          <Box>
            <MRT_ToggleFiltersButton
              sx={{
                borderRadius: "3px",
                border: "1px solid #ccc;",
                height: "40px",
                marginLeft: "5px",
                ":hover": { border: "1px solid black", background: "white" },
              }}
              table={table}
            />
            <MRT_ToggleFullScreenButton
              sx={{
                borderRadius: "3px",
                border: "1px solid #ccc;",
                height: "40px",
                marginLeft: "10px",
                ":hover": { border: "1px solid black", background: "white" },
              }}
              table={table}
            />
            <Button
              sx={{
                color: "black",
                marginLeft: "10px",
                border: "1px solid #ccc;",
                fontSize: "13px",
                height: "40px",
                ":hover": { border: "1px solid black", background: "white" },
              }}
              onClick={() => download(table)}
              disabled={downloading}
              startIcon={
                downloading ? <CircularProgress size={20} /> : <GetAppIcon />
              }
            >
              {downloading ? "Downloading..." : "Download"}
            </Button>
            <Button
              sx={{
                color: "black",
                height: "40px",
                marginLeft: "10px",
                background: "#F08080",
                border: "1px solid #ccc;",
                fontSize: "13px",
                ":hover": { border: "1px solid black", background: "red" },
              }}
              onClick={clearTable}
            >
              <HighlightOffSharpIcon />
              Clear Table
            </Button>
          </Box>
        )}
        muiTableBodyCellProps={() => ({
          sx: {
            whiteSpace: "normal",
            wordWrap: "break-word",
          },
        })}
      />
    </ThemeProvider>
  );
};

export default DataTable;
