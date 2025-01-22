import { Product } from "../product";

export interface TableButtonProps {
  table?: any;
  setDownloading?: React.Dispatch<React.SetStateAction<boolean>>;
  setTableData?: React.Dispatch<React.SetStateAction<Product[]>>;
}
