import { useEffect, useState } from "react";
import {
  MRT_ActionMenuItem,
  useMaterialReactTable,
} from "material-react-table";
import { Box } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import { GenerateExcel, SortTableByPopularity } from "../../api/Api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TableHeader from "./tableHeader";
import { TableBody } from "./tableBody";
import Loading from "@/helpers/loading";
import { TableColumns } from "./tableColumns";
import { Product } from "@/props/product";

interface TableProps {
  data: Product[];
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
}

const Table = ({ data, setTableData, loading }: TableProps) => {
  const [downloading, setDownloading] = useState(false);
  const remainder = useSelector(
    (state: RootState) => state.data.stock_show_flag
  );
  const columns = TableColumns({ setTableData, remainder });

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);


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
      <TableHeader
        table={table}
        setDownloading={setDownloading}
        setTableData={setTableData}

      />

      <TableBody table={table} />

      <Loading downloading={downloading} />
    </Box>
  );
};

export default Table;
