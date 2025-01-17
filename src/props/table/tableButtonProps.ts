import { Product } from "../product";

export interface TableButtonProps {
  table?: any;
  setDownloading?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setTableData?: React.Dispatch<React.SetStateAction<Product[]>>;
}
