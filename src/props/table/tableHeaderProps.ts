import { Product } from "../product";

export interface TableHeaderProps {
  table: any;
  setDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
}
