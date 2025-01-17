import { Product } from "../product";

export interface TableProps {
  data: any;
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
}
