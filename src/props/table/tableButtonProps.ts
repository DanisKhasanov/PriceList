import { Product } from "../product";
import { MRT_TableInstance } from "material-react-table";

export interface TableButtonProps {
  table?: MRT_TableInstance<Product>;
  setDownloading?: React.Dispatch<React.SetStateAction<boolean>>;
  setTableData?: React.Dispatch<React.SetStateAction<Product[]>>;
}
