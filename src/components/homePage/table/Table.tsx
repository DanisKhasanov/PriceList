import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  createTheme,
  ThemeProvider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Box, Button, IconButton, CircularProgress, Tooltip } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { GenerateExcel, SortTableByPopularity } from "../../api/Api";
import { useSelector } from "react-redux";

const DataTable = ({ data, setTableData, loading }) => {
  const [downloading, setDownloading] = useState(false);
  const globalTheme = useTheme();
  const isSmallScreen = useMediaQuery(globalTheme.breakpoints.down("sm"));
  const stockShowFlag = useSelector((state: any) => state.data.stock_show_flag);

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

  const columns: MRT_ColumnDef<any>[] = useMemo(() => {
    const cols: MRT_ColumnDef<any>[] = [
      {
        header: "",
        id: "actions",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton color="error" onClick={() => deleteRow(row.index)}>
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

    // Добавляем колонку Quantity только если stockShowFlag = true
    if (stockShowFlag) {
      cols.splice(4, 0, {
        header: "Quantity",
        accessorKey: "quantity",
        size: 70,
      });
    }

    return cols;
  }, [stockShowFlag]);

  useEffect(() => {
    if (data) {
      setTableData(data);
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
      console.error("Ошибка при скачивании файла:", error);
    } finally {
      setDownloading(false);
    }
  };

  const deleteRow = (rowIndex: number) => {
    setTableData((prevData) =>
      prevData.filter((_, index: number) => index !== rowIndex)
    );
  };
  const clearTable = () => {
    setTableData([]);
  };

  const sortTableByPopularity = async (table: any) => {
    try {
      setDownloading(true);
      const orderArray = await SortTableByPopularity();
      const dataMap = {};
      const allTableData = table
        .getPrePaginationRowModel()
        .rows.map((row: any) => row.original);

      allTableData.forEach((item: any) => {
        dataMap[item.id] = item;
      });

      const sortedProducts = orderArray
        .map((id: number) => dataMap[id])
        .filter((item: any) => item !== undefined);

      const missingProducts = allTableData.filter(
        (item: any) => !orderArray.includes(item.id)
      );

      const finalSortedProducts = [...sortedProducts, ...missingProducts];
      setTableData(finalSortedProducts);
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
      throw error;
    } finally {
      setDownloading(false);
    }
  };

  return (
    <ThemeProvider theme={tableTheme}>
      <Box sx={{ position: "relative", height: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={data}
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
              height: "calc(100vh - 114px)",
            },
          }}
          renderToolbarInternalActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                alignItems: isSmallScreen ? "stretch" : "center",
              }}
            >
              <Tooltip title="Фильтры">
                <MRT_ToggleFiltersButton
                  sx={{
                    borderRadius: "3px",
                    border: "1px solid #ccc;",
                    height: "40px",
                    marginLeft: isSmallScreen ? "0" : "5px",
                    marginBottom: isSmallScreen ? "5px" : "0",
                    ":hover": {
                      border: "1px solid black",
                      background: "white",
                    },
                  }}
                  table={table}
                />
              </Tooltip>
              <Tooltip title="Полный экран">
                <MRT_ToggleFullScreenButton
                  sx={{
                    borderRadius: "3px",
                    border: "1px solid #ccc;",
                    height: "40px",
                    marginLeft: isSmallScreen ? "0" : "10px",
                    marginBottom: isSmallScreen ? "5px" : "0",
                    ":hover": {
                      border: "1px solid black",
                      background: "white",
                    },
                  }}
                  table={table}
                />
              </Tooltip>
              <Tooltip title="Сортировка по популярности">
                <Button
                  sx={{
                    color: "black",
                    marginLeft: isSmallScreen ? "0" : "10px",
                    marginBottom: isSmallScreen ? "5px" : "0",
                    border: "1px solid #ccc;",
                    fontSize: "13px",
                    height: "40px",
                    ":hover": {
                      border: "1px solid black",
                      background: "white",
                    },
                  }}
                  onClick={() => sortTableByPopularity(table)}
                >
                  <SwapVertIcon style={{ marginRight: 7 }} />
                  {!isSmallScreen && "Сортировка по популярности"}
                </Button>
              </Tooltip>
              <Tooltip title="Загрузить Excel">
                <Button
                  sx={{
                    color: "black",
                    marginLeft: isSmallScreen ? "0" : "10px",
                    marginBottom: isSmallScreen ? "5px" : "0",
                    border: "1px solid #ccc;",
                    fontSize: "13px",
                    height: "40px",
                    ":hover": {
                      border: "1px solid black",
                      background: "white",
                    },
                  }}
                  onClick={() => download(table)}
                >
                  <GetAppIcon style={{ marginRight: 7 }} />
                  {!isSmallScreen && "Загрузить Excel"}
                </Button>
              </Tooltip>
              <Tooltip title="Очистить таблицу">
                <Button
                  sx={{
                    color: "black",
                    height: "40px",
                    marginLeft: isSmallScreen ? "0" : "10px",
                    marginBottom: isSmallScreen ? "5px" : "0",
                    background: "#F08080",
                    border: "1px solid #ccc;",
                    fontSize: "13px",
                    ":hover": {
                      border: "1px solid black",
                      background: "red",
                    },
                  }}
                  onClick={clearTable}
                >
                  <HighlightOffSharpIcon style={{ marginRight: 7 }} />
                  {!isSmallScreen && "Очистить таблицу"}
                </Button>
              </Tooltip>
            </Box>
          )}
          muiTableBodyCellProps={() => ({
            sx: {
              whiteSpace: "normal",
              wordWrap: "break-word",
            },
          })}
        />
        {downloading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 1000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default DataTable;
