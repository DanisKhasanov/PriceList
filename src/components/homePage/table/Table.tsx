import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Box,
  Button,
  IconButton,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import ClearIcon from "@mui/icons-material/Clear";
import PushPinIcon from "@mui/icons-material/PushPin";
import { GenerateExcel, SortTableByPopularity } from "../../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { setStockShowFlag } from "../../../store/reducers/DataReducer";

const Table = ({ data, setTableData, loading }) => {
  const dispatch = useDispatch();
  const [downloading, setDownloading] = useState(false);
  const stockShowFlag = useSelector((state: any) => state.data.stock_show_flag);
  const columns: MRT_ColumnDef<any>[] = useMemo(() => {
    const cols: MRT_ColumnDef<any>[] = [
      {
        header: "Имя",
        accessorKey: "name",
        size: 150,
      },
      {
        header: "Код",
        accessorKey: "code",
        size: 70,
      },
      {
        header: "Артикул",
        accessorKey: "article",
        size: 70,
      },
      {
        header: "Цена",
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

      ...(stockShowFlag
        ? [
            {
              header: "Остаток",
              accessorKey: "quantity",
              size: 50,
            },
          ]
        : []),
      {
        header: "",
        id: "actions",
        Cell: ({ row }) => (
          <IconButton onClick={() => deleteRow(row.index)}>
            <CancelRoundedIcon sx={{ color: "#f40104" }} />
          </IconButton>
        ),
        size: 10,
      },
    ];

    return cols;
  }, [stockShowFlag]);

  const styleButton = {
    color: "black",
    fontSize: {
      sm: "0px",
      md: "14px",
      lg: "16px",
    },
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
    },
  };

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const download = async (table: any) => {
    if (data.length === 0) {
      return;
    }
    const allTableData = table
      .getPrePaginationRowModel()
      .rows.map((row: any) => {
        const originalData = row.original;
        if (stockShowFlag) {
          return {
            ...originalData,
            quantity: originalData.quantity,
            variants: originalData.variants.map((variant: any) => ({
              ...variant,
              quantity: variant.quantity,
            })),
          };
        } else {
          return {
            ...originalData,
            quantity: null,
            variants: originalData.variants.map((variant: any) => ({
              ...variant,
              quantity: null,
            })),
          };
        }
      });

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
    setTableData((prevData: any) =>
      prevData.filter((_, index: number) => index !== rowIndex)
    );
  };

  const clearTable = () => {
    setTableData([]);
  };

  const sortTableByPopularity = async (table: any) => {
    if (data.length === 0) {
      return;
    }
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

  const fixRow = (rowIndex: number) => {
    setTableData((prevData: any) => {
      const newData = [...prevData];
      const [pinnedRow] = newData.splice(rowIndex, 1);
      newData.unshift(pinnedRow);
      return newData;
    });
  };

  const table = useMaterialReactTable({
    columns,
    data,
    state: { isLoading: loading },
    enableCellActions: true,
    enableColumnActions: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    editDisplayMode: "cell",
    renderCellActionMenuItems: ({ closeMenu, table, row }) => [
      <MRT_ActionMenuItem
        icon={<PushPinIcon />}
        key={1}
        label="Закрепить строку"
        onClick={() => {
          fixRow(row.index);
          closeMenu();
        }}
        table={table}
      />,
    ],
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },

    initialState: {
      columnOrder: columns.map((col) => col.accessorKey as string),
      pagination: { pageSize: 8, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiSearchTextFieldProps: {
      placeholder: "Поиск",
      sx: {
        minWidth: "200px",
        "& .MuiInput-underline:before": { borderBottom: "none" },
        "& .MuiInput-underline:after": { borderBottom: "none" },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: "none",
        },
        "& .MuiInputBase-input::placeholder": {
          fontSize: "21px",
          fontWeight: "300",
          color: "rgba(0, 0, 0, 0.8)",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "25px",
          marginTop: "-5px",
          padding: "5px",
          color: "rgba(0, 0, 0, 0.5)",
        },
      },
      variant: "standard",
    },
    muiTableHeadCellProps: {
      sx: {
        fontSize: "16px",
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "none",
      },
    },
    muiTableHeadProps: {
      sx: {
        "& .MuiTableCell-root": {
          borderBottom: "none",
        },
      },
    },
  });

  return (
    <Box>
      {/*Заголовок с кнопками*/}
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
        <Box
          sx={{
            borderRadius: "20px",
            backgroundColor: "#F4F4F4",
            padding: "10px",
          }}
        >
          <MRT_GlobalFilterTextField table={table} />
        </Box>

        <Box>
          <MRT_ToggleFiltersButton
            table={table}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: "25px", color: "#056bf1" },
            }}
          />
        </Box>

        <Button sx={styleButton}>
          <Checkbox
            checked={stockShowFlag}
            onChange={() => dispatch(setStockShowFlag(!stockShowFlag))}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 27, color: "#056bf1;" } }}
          />
          {"Остаток"}
        </Button>
        <Button sx={styleButton} onClick={() => sortTableByPopularity(table)}>
          <UnfoldLessIcon
            style={{ marginRight: 3, fontSize: "25px", color: "#296BF1" }}
          />
          {"Сортировать по популярности"}
        </Button>

        <Button sx={styleButton} onClick={() => download(table)}>
          <UploadFileIcon
            sx={{ color: "green" }}
            style={{ marginRight: 3, fontSize: "25px" }}
          />
          {"Выгрузить в Excel"}
        </Button>

        <Button sx={styleButton} onClick={() => clearTable()}>
          <ClearIcon
            sx={{ color: "red" }}
            style={{ marginRight: 3, fontSize: "25px" }}
          />
          {"Очистить таблицу"}
        </Button>
      </Box>

      {/*Таблица*/}
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

      {/*Пагинация*/}
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

      {/*Загрузка при выгрузке*/}
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
  );
};

export default Table;
