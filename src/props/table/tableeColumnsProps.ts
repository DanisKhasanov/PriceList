import { Product } from "../product";

export interface TableColumnsProps {
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
  remainder: boolean;
}
