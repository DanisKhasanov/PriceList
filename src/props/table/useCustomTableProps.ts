import { Product } from "../product";

export interface UseCustomTableProps {
  data: any;
  loading: boolean;
  setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
  remainder: boolean;
  priceToUSD: boolean;
}
