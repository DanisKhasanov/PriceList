import React from "react";
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { dates } from "../data/data";

const columns: MRT_ColumnDef<(typeof dates)[0]>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Code",
    accessorKey: "code",
  },
  {
    header: "Article",
    accessorKey: "article",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Price",
    accessorKey: "vip",
    Cell: ({ cell }) => `${cell.getValue()} руб.`,
  },
  {
    header: "VIP10",
    accessorKey: "vip10",
    Cell: ({ cell }) => `${cell.getValue()} ₽`,
  },
  {
    header: "VIP25",
    accessorKey: "vip25",
    Cell: ({ cell }) => `${cell.getValue()} ₽`,
  },
  {
    header: "VIP50",
    accessorKey: "vip50",
    Cell: ({ cell }) => `$${cell.getValue()}`,
  },
  {
    header: "VIP75",
    accessorKey: "vip75",
    Cell: ({ cell }) => `$${cell.getValue()}`,
  },
];

const DataTable = () => {
  const table = useMaterialReactTable({
    columns,
    data: dates,
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15],
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
  });

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MRT_GlobalFilterTextField table={table} sx={{ width: 600, marginLeft: 2 }} />
        <MRT_TablePagination table={table} />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell align="center" variant="head" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                {row.getVisibleCells().map((cell, _columnIndex) => (
                  <TableCell align="center" variant="body" key={cell.id}>
                    <MRT_TableBodyCellValue
                      cell={cell}
                      table={table}
                      staticRowIndex={rowIndex}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
    </Stack>
  );
};

export default DataTable;
