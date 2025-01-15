import { MRT_ColumnDef } from "material-react-table";
import { IconButton } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useMemo } from "react";
import { Product } from "@/props/product";

interface TableColumnsProps {
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
  remainder: boolean;
}

export const TableColumns = ({
  setTableData,
  remainder,
}: TableColumnsProps) =>
  useMemo(() => {
    const deleteRow = (rowIndex: number) => {
      setTableData((prevData: Product[]) =>
        prevData.filter((_, index) => index !== rowIndex)
      );
    };

    const cols: MRT_ColumnDef<Product[]>[] = [
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

      ...(remainder
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
  }, [remainder]);
