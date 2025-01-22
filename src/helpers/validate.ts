import { Product } from "@/props/product";
import { SnackbarProps } from "@/props/snackbarProps";

export const Validates = (
  pathName: string[],
  name: string[],
  extract_code: string[],
  fuzzy_code: string[]
): boolean => {
  return [pathName, name, extract_code, fuzzy_code].some((arr) =>
    arr.some((item) => item.trim() !== "")
  );
};


export const validateTable = (
  tableData: Product[],
  showSnackbar: SnackbarProps
): boolean => {
  if (tableData.length === 0) {
    showSnackbar("Сначала заполните таблицу", {
      variant: "error",
    });

    return true;
  }
  return false;
};
