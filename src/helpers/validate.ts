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
