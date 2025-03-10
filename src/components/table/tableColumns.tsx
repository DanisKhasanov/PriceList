import { MRT_ColumnDef } from "material-react-table";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useMemo } from "react";
import { Product } from "@/props/product";
import { TableColumnsProps } from "@/props/table/tableColumnsProps";

export const TableColumns = ({
  setTableData,
  remainder,
  priceToUSD,
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
        size: 70,
      },
      {
        header: "Код",
        accessorKey: "code",
        size: 50,
      },
      {
        header: "Артикул",
        accessorKey: "article",
        size: 70,
      },
      {
        header: "Цена",
        accessorKey: "vip",
        Cell: ({ cell }) => `${cell.getValue()} ${priceToUSD ? "USD" : "руб."}`,
        size: 50,
      },
      {
        header: "VIP10",
        accessorKey: "vip10",
        Cell: ({ cell }) => `${cell.getValue()} ${priceToUSD ? "USD" : "руб."}`,
        size: 50,
      },
      {
        header: "VIP25",
        accessorKey: "vip25",
        Cell: ({ cell }) => `${cell.getValue()} ${priceToUSD ? "USD" : "руб."}`,
        size: 50,
      },
      {
        header: "VIP50",
        accessorKey: "vip50",
        Cell: ({ cell }) => `${cell.getValue()} ${priceToUSD ? "USD" : "руб."}`,
        size: 50,
      },
      {
        header: "VIP75",
        accessorKey: "vip75",
        Cell: ({ cell }) => `${cell.getValue()} ${priceToUSD ? "USD" : "руб."}`,
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
          <CancelRoundedIcon
            sx={{ color: "#f40104", cursor: "pointer", fontSize: "20px" }}
            onClick={() => deleteRow(row.index)}
          />
        ),
        size: 10,
      },
    ];

    return cols;
  }, [remainder, priceToUSD]);
