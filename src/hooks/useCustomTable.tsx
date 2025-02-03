import {
  useMaterialReactTable,
  MRT_ActionMenuItem,
} from "material-react-table";
import PushPinIcon from "@mui/icons-material/PushPin";
import { TableColumns } from "@/components/table/tableColumns";
import { Product } from "@/props/product";
import { UseCustomTableProps } from "@/props/table/useCustomTableProps";
import { MRT_Localization_RU } from "material-react-table/locales/ru";

export const useCustomTable = ({
  data,
  loading,
  setTableData,
  remainder,
  priceToUSD,
}: UseCustomTableProps) => {
  const columns = TableColumns({ setTableData, remainder, priceToUSD });

  const fixRow = (rowIndex: number) => {
    setTableData((prevData: Product[]) => {
      const newData = [...prevData];
      const [pinnedRow] = newData.splice(rowIndex, 1);
      newData.unshift(pinnedRow);
      return newData;
    });
  };

  const table = useMaterialReactTable({
    columns,
    data,
    localization: MRT_Localization_RU,
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
        "& .MuiInput-underline:before": { borderBottom: "none" },
        "& .MuiInput-underline:after": { borderBottom: "none" },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottom: "none",
        },
        "& .MuiInputBase-input::placeholder": {
          fontSize: "0.8vw",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "1vw",
          color: "rgba(0, 0, 0, 0.5)",
        },
      },
      variant: "standard",
    },
    muiTableHeadCellProps: {
      sx: {
        fontSize: "0.8vw",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "0.7vw",
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

  return table;
};
