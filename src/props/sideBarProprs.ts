import { Product } from "./product";

export interface SideBarProps {
    setTableData: React.Dispatch<React.SetStateAction<Product[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }